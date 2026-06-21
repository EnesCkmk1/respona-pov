-- Respona — core multi-tenant schema for the voice agent backend.
-- Money is stored as whole DKK (integer kroner) for PoV simplicity.
-- Switch to integer øre (price_ore) later if you need sub-krone precision.

create type order_status as enum (
  'new',
  'preparing',
  'ready',
  'completed',
  'cancelled'
);
create type order_channel as enum ('ai_phone', 'manual_phone');
create type member_role as enum ('owner', 'staff');
create type restaurant_plan as enum ('pilot', 'pro');

-- Tenants. Each restaurant is one customer.
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  phone text,
  plan restaurant_plan not null default 'pilot',
  agent_name text not null default 'Sofia',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Which auth users may access which restaurant (multi-user per tenant).
create table restaurant_members (
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role member_role not null default 'staff',
  created_at timestamptz not null default now(),
  primary key (restaurant_id, user_id)
);

create table menu_categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  category_id uuid references menu_categories (id) on delete set null,
  name text not null,
  price integer not null check (price >= 0),
  available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  ref text not null,
  customer_name text,
  customer_phone text,
  channel order_channel not null default 'ai_phone',
  status order_status not null default 'new',
  placed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- restaurant_id is denormalized onto order_items so RLS stays simple/fast.
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  name text not null,
  qty integer not null check (qty > 0),
  price integer not null check (price >= 0),
  note text
);

-- Optional: call metadata. Store recordings/transcripts only with consent (GDPR).
create table call_logs (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  order_id uuid references orders (id) on delete set null,
  caller_phone text,
  duration_seconds integer,
  transcript text,
  recording_url text,
  consent_given boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_members_user on restaurant_members (user_id);
create index idx_menu_categories_restaurant on menu_categories (restaurant_id);
create index idx_menu_items_restaurant on menu_items (restaurant_id);
create index idx_orders_restaurant on orders (restaurant_id, placed_at desc);
create index idx_orders_status on orders (restaurant_id, status);
create index idx_order_items_order on order_items (order_id);
create index idx_order_items_restaurant on order_items (restaurant_id);
create index idx_call_logs_restaurant on call_logs (restaurant_id, created_at desc);

-- Order refs are unique within a restaurant, not globally.
create unique index uq_orders_ref on orders (restaurant_id, ref);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_restaurants_updated before update on restaurants
for each row execute function set_updated_at();
create trigger trg_menu_items_updated before update on menu_items
for each row execute function set_updated_at();
create trigger trg_orders_updated before update on orders
for each row execute function set_updated_at();
