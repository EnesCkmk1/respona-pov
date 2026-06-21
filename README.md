# Voice Agent PoV

Proof of concept for a real-time voice agent on Cloudflare.

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind, Kumo UI |
| Backend | Cloudflare Workers |
| Real-time agent | [Agents SDK](https://developers.cloudflare.com/agents/) (Durable Objects + WebSockets) |
| AI | Workers AI (via `workers-ai-provider`) |
| Database | Cloudflare D1 (SQLite) |
| Deploy | Wrangler |

## Prerequisites

- Node.js 18+
- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Wrangler CLI (included as dev dependency)

## Getting started

```bash
# Install dependencies
npm install

# Log in to Cloudflare (required for Workers AI in dev and for deploy)
npx wrangler login

# Optional: enable remote Workers AI during local dev by setting "remote": true
# on the ai binding in wrangler.jsonc after logging in.

# Apply D1 migrations locally
npx wrangler d1 migrations apply voiceagent-pov-db --local

# Start dev server (frontend + worker)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Health checks

- `GET /api/health` — worker status
- `GET /api/health/db` — D1 connectivity

## Project structure

```
src/
  server.ts    # Worker entry: ChatAgent + API routes
  app.tsx      # React UI (chat for now; voice UI comes next)
  client.tsx   # React entry point
  styles.css   # Tailwind + Kumo styles
migrations/    # D1 schema
public/        # Static assets
wrangler.jsonc # Cloudflare bindings (AI, D1, Durable Objects)
```

## Deploy

```bash
# Create remote D1 and apply migrations (first deploy)
npx wrangler d1 migrations apply voiceagent-pov-db --remote

# Build and deploy
npm run deploy
```

On first deploy, Wrangler provisions the D1 database if it does not exist yet.

## Environment variables

Copy `.dev.vars.example` to `.dev.vars` for local secrets. Workers AI works without an API key on Cloudflare.

## What's next

- [ ] Voice input (STT) and output (TTS)
- [ ] Session management via D1
- [ ] Branding / product name
