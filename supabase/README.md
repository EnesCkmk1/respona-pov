# Supabase — Respona backend database

Multi-tenant Postgres schema for the voice agent. Each restaurant is a tenant;
Row Level Security keeps every tenant's data isolated. The dashboard talks to
Supabase as an authenticated user; the FastAPI voice backend uses the
`service_role` key (which bypasses RLS).

All of this runs on the **Supabase free tier** — no cost until you upgrade to
Pro for production (daily backups, no project pausing, more resources).

## Layout

```
supabase/
  config.toml                       # local CLI config
  migrations/
    20260621120000_init.sql         # tables, enums, indexes, triggers
    20260621120100_rls.sql          # RLS + helper functions + policies
  seed.sql                          # dev data (mirrors the dashboard mock)
```

## Run it locally (free)

1. Install the CLI: https://supabase.com/docs/guides/cli
2. Start the local stack (Docker required):

   ```bash
   supabase start
   ```

3. Apply migrations + seed:

   ```bash
   supabase db reset
   ```

4. Open Studio at http://localhost:54323 to browse the data.

## Use a hosted free-tier project instead

1. Create a project at https://supabase.com (pick an **EU region** for GDPR).
2. Link and push:

   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

## Seeing data in the dashboard

`seed.sql` inserts a demo restaurant but no membership (memberships need a real
auth user). After signing up a user, link it:

```sql
insert into restaurant_members (restaurant_id, user_id, role)
values ('00000000-0000-0000-0000-000000000001', '<your-auth-user-id>', 'owner');
```

## Security model

- **authenticated** users: can only touch rows for restaurants they're a member
  of (`is_member` / `is_owner` helpers).
- **service_role** (voice backend): bypasses RLS — keep that key server-side
  only, never in the frontend.
- Store call recordings/transcripts (`call_logs`) only with `consent_given = true`.
