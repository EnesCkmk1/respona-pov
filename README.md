# Respona

AI voice agent platform til restauranter — tager telefonen, forstår bestillinger
på dansk og lægger dem direkte ind i et dashboard. Dette repo indeholder
marketing-sitet, restaurant-dashboardet, databasen og voice-backenden.

> **Status:** PoV under opbygning. Alt nuværende kører **gratis** — ingen betalte
> API'er er koblet på endnu.

---

## Indhold / arkitektur

Projektet består af tre dele, der kan udvikles uafhængigt:

| Del                       | Stack                                        | Hosting (plan)        | Status        |
| ------------------------- | -------------------------------------------- | --------------------- | ------------- |
| **Marketing + dashboard** | React 19, Vite, Tailwind, Cloudflare Workers | Cloudflare (free)     | ✅ Kører      |
| **Database**              | Supabase (Postgres + RLS + Auth)             | Supabase (free → Pro) | ✅ Skema klar |
| **Voice-backend**         | FastAPI (Twilio/Deepgram/Claude/ElevenLabs)  | Railway (senere)      | 🟡 Stub kører |

Bevidst opdeling: marketing-sitet og dashboardet ligger på Cloudflare (samme
repo, `src/`), mens voice-produktet (database + telefoni-backend) er adskilt
(`supabase/` + `backend/`), fordi det skal sættes op per kunde senere.

```
src/                  # Marketing-site + /dashboard (React/Vite/Cloudflare)
  pages/              #   HomePage (landing), DashboardPage
  components/landing/ #   Landing-sektioner
  components/dashboard/#  Dashboard-views (Orders, Menu, Settings)
  content/            #   site.ts (brand/SEO), dashboard.ts (mock-data)
  server.ts           #   Cloudflare Worker: kontaktformular-API (D1)
migrations/           # D1-skema (kun til marketing-kontaktformular)
supabase/             # Voice-produktets database (skema, RLS, seed)
backend/              # FastAPI voice-backend (stub-agent)
```

---

## Hvad er lavet ✅

### Marketing-site (Respona)

- [x] Rebrand til Respona med egen identitet, farver og tekster
- [x] SEO: meta-tags, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`
- [x] Sektioner: hero, how-it-works, capabilities (bento), testimonials, FAQ, CTA, kontakt
- [x] Smooth UX: scroll-reveal, FAQ-accordion, ingen "glow" (professionelt look)
- [x] Kontaktformular med D1-lagring, rate limiting, honeypot, CORS, security headers
- [x] CI (`npm run check`: oxfmt + oxlint + tsc) grøn

### Dashboard (`/dashboard`)

- [x] Sidebar-layout + topbar med tema-toggle, "Log ind"-link fra landing
- [x] **Ordrer**: stat-kort, status-filtre, detalje-panel, live status-skift
- [x] **Menu**: retter pr. kategori med tilgængeligheds-toggle
- [x] **Indstillinger**: profil, telefonnummer, AI-agent, åbningstider
- [x] Kører på mock-data (`src/content/dashboard.ts`)

### Database (Supabase)

- [x] Multi-tenant skema: `restaurants`, `restaurant_members`, `menu_categories`,
      `menu_items`, `orders`, `order_items`, `call_logs`
- [x] RLS med `is_member()` / `is_owner()` (tenant-isolation)
- [x] Dev-seed der matcher dashboardets mock-data
- [x] Lokal CLI-config + README

### Voice-backend (FastAPI)

- [x] Stub-mode kører helt uden API-keys (in-memory fallback-DB)
- [x] Pipeline: Telefoni → STT → LLM → TTS (alle stubbet)
- [x] **Ordre-optagende agent**: menu-matching (dansk antal), kurv, finalize
- [x] `/simulate-call` + WebSocket — testet end-to-end (opkald → gemt ordre)
- [x] REST: list/create/patch ordrer; Supabase-klar via service_role

---

## Hvad mangler 🟡 (gratis, kan laves nu)

- [ ] **Koble dashboardet til voice-backenden** (env-gated, fallback til mock)
      → simuleret opkald dukker op live i UI'en
- [ ] **Koble dashboardet til Supabase** (free tier): login (Auth) + ægte ordrer
- [ ] **Supabase Realtime**: nye ordrer popper ind på skærmen live
- [ ] Lille pytest-suite for agenten (menu-matching, finalize, totaler)
- [ ] Frontend-tilstande: loading/error/empty når data kommer fra API

## Hvad mangler 💰 (kræver penge — senere)

- [ ] **Twilio**: telefonnummer + Media Streams til rigtige opkald
- [ ] **Deepgram Nova-3**: real STT-streaming
- [ ] **Claude**: rigtig samtale + tool-use til ordre-capture
- [ ] **ElevenLabs → Deepgram Aura-2**: real TTS
- [ ] **Railway**: hosting af FastAPI + Redis (session under opkald)
- [ ] **Supabase Pro** ($25/md): produktion (backups, ingen pausing)
- [ ] Latency-tuning: hold round-trip < ~800 ms, streaming + barge-in
- [ ] GDPR: EU-region, samtykke ved opkaldsoptagelse

---

## Kørsel lokalt

### Marketing-site + dashboard

```bash
npm install
npm run dev          # http://localhost:5173  (dashboard: /dashboard)
npm run check        # oxfmt + oxlint + tsc (kør før commit!)
```

> ⚠️ `npm run check` kører `oxfmt --check .` på **hele** repoet — også Markdown.
> Kør `npm run format` før du committer nye `.md`/`.json`-filer, ellers fejler CI.

### Voice-backend (FastAPI)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
uvicorn app.main:app --reload    # http://localhost:8000/docs
```

Test et helt opkald uden lyd:

```bash
curl -X POST http://localhost:8000/restaurants/00000000-0000-0000-0000-000000000001/simulate-call \
  -H "Content-Type: application/json" \
  -d '{"utterances":["Hej, jeg vil bestille to margherita","Og en cola","Det var det, tak"]}'
```

### Database (Supabase)

```bash
cd supabase
supabase start        # kræver Docker
supabase db reset     # anvender migrations + seed
# Studio: http://localhost:54323
```

Se `supabase/README.md` og `backend/README.md` for detaljer.

---

## Næste session — anbefalet rækkefølge

1. **Dashboard ↔ backend**: ny `src/lib/api.ts` der henter ordrer fra FastAPI
   når `VITE_API_URL` er sat, ellers mock. Vis live opkalds-ordrer i UI'en.
2. **Supabase free tier**: opret EU-projekt, kør `db push`, sæt
   `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` i backendens `.env`.
3. **Auth + Realtime** i dashboardet (login, live ordrer).
4. Først derefter: betalte voice-API'er, én ad gangen, i stub→ægte-rækkefølgen.

## Repo / deploy noter

- Git-identitet: commits laves som `RealLaaers`.
- Marketing-sitet deployes med `npm run deploy` (Wrangler → Cloudflare).
- D1 (`migrations/`) bruges **kun** til marketing-kontaktformularen — ikke voice-data.
- Voice-data lever i Supabase (`supabase/`).

---

## Open source

Respona udgives under [MIT-licensen](LICENSE). Det betyder, at du frit må
bruge, ændre, distribuere og også anvende koden kommercielt, så licensnoticen
bevares.

Bidrag er velkomne — se [CONTRIBUTING.md](CONTRIBUTING.md). Rapportér
sikkerhedsproblemer efter retningslinjerne i [SECURITY.md](SECURITY.md), og
commit aldrig nøgler, telefonnumre, kundedata eller opkaldsoptagelser.
