-- Multi-tenant Row Level Security.
--
-- Model:
--   * Dashboard users authenticate via Supabase Auth (role = authenticated).
--     They may only read/write rows for restaurants they are a member of.
--   * The voice backend (FastAPI) connects with the service_role key, which
--     bypasses RLS entirely — it can write orders for any tenant.
--
-- The membership lookups are wrapped in SECURITY DEFINER functions so the
-- policies don't recurse on restaurant_members' own RLS.

alter table restaurants enable row level security;
alter table restaurant_members enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table call_logs enable row level security;

create or replace function is_member(rid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from restaurant_members m
    where m.restaurant_id = rid
      and m.user_id = auth.uid()
  );
$$;

create or replace function is_owner(rid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from restaurant_members m
    where m.restaurant_id = rid
      and m.user_id = auth.uid()
      and m.role = 'owner'
  );
$$;

-- restaurants: members read; owners update.
create policy restaurants_select on restaurants
  for select to authenticated using (is_member(id));
create policy restaurants_update on restaurants
  for update to authenticated using (is_owner(id)) with check (is_owner(id));

-- restaurant_members: members read; owners manage.
create policy members_select on restaurant_members
  for select to authenticated using (is_member(restaurant_id));
create policy members_insert on restaurant_members
  for insert to authenticated with check (is_owner(restaurant_id));
create policy members_update on restaurant_members
  for update to authenticated
  using (is_owner(restaurant_id)) with check (is_owner(restaurant_id));
create policy members_delete on restaurant_members
  for delete to authenticated using (is_owner(restaurant_id));

-- menu_categories: members have full access within their restaurant.
create policy menu_categories_all on menu_categories
  for all to authenticated
  using (is_member(restaurant_id)) with check (is_member(restaurant_id));

-- menu_items: members have full access within their restaurant.
create policy menu_items_all on menu_items
  for all to authenticated
  using (is_member(restaurant_id)) with check (is_member(restaurant_id));

-- orders: members have full access within their restaurant.
create policy orders_all on orders
  for all to authenticated
  using (is_member(restaurant_id)) with check (is_member(restaurant_id));

-- order_items: members have full access within their restaurant.
create policy order_items_all on order_items
  for all to authenticated
  using (is_member(restaurant_id)) with check (is_member(restaurant_id));

-- call_logs: members may read; writes happen via the backend (service_role).
create policy call_logs_select on call_logs
  for select to authenticated using (is_member(restaurant_id));
