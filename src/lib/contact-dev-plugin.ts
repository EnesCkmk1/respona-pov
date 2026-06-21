import type { Plugin } from "vite";
import { contactSchema } from "./contact";

export function contactApiDevPlugin(): Plugin {
  const submissions: unknown[] = [];

  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/contact" || req.method !== "POST") {
          return next();
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
          }
          const body = JSON.parse(Buffer.concat(chunks).toString());
          const parsed = contactSchema.safeParse(body);

          if (!parsed.success) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: parsed.error.issues[0]?.message ?? "Ugyldige felter"
              })
            );
            return;
          }

          submissions.push({
            ...parsed.data,
            id: crypto.randomUUID(),
            at: new Date().toISOString()
          });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({ ok: true, message: "Besked modtaget (dev mode)" })
          );
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Serverfejl" }));
        }
      });
    }
  };
}
