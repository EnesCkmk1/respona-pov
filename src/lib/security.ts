/**
 * Security helpers shared by the Worker: response hardening headers,
 * client-IP extraction, and a small D1-backed rate limiter.
 */

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Cross-Origin-Resource-Policy": "same-origin"
};

/** JSON response with security headers merged in. */
export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  const res = Response.json(data, init);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(key, value);
  }
  return res;
}

/** Best-effort client IP. Cloudflare sets CF-Connecting-IP at the edge. */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

async function hashKey(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Fixed-window rate limiter backed by D1. Identifies callers by a hash of
 * "<route>:<ip>" so no raw IP is persisted.
 */
export async function checkRateLimit(
  db: D1Database,
  route: string,
  ip: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const key = await hashKey(`${route}:${ip}`);
  const now = Date.now();

  const row = await db
    .prepare("SELECT count, window_start FROM rate_limits WHERE key = ?")
    .bind(key)
    .first<{ count: number; window_start: number }>();

  if (!row || now - row.window_start >= windowMs) {
    await db
      .prepare(
        `INSERT INTO rate_limits (key, count, window_start)
         VALUES (?, 1, ?)
         ON CONFLICT(key) DO UPDATE SET count = 1, window_start = excluded.window_start`
      )
      .bind(key, now)
      .run();
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (row.count >= limit) {
    const retryAfterSeconds = Math.ceil(
      (row.window_start + windowMs - now) / 1000
    );
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  await db
    .prepare("UPDATE rate_limits SET count = count + 1 WHERE key = ?")
    .bind(key)
    .run();
  return {
    allowed: true,
    remaining: limit - row.count - 1,
    retryAfterSeconds: 0
  };
}
