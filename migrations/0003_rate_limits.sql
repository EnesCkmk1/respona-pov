-- Lightweight rate limiting for public endpoints (e.g. contact form).
-- Keys are SHA-256 hashes of "<route>:<client-ip>" so no raw IP is stored (GDPR data minimization).

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL
);
