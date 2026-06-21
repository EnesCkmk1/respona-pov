"""Data access layer.

If Supabase credentials are present, queries hit Supabase using the service_role
key (which bypasses RLS — this is trusted server code). Otherwise everything
falls back to an in-memory store seeded with the same demo data as the
dashboard, so the backend is fully runnable for free with zero setup.
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from .config import settings
from .schemas import Order, OrderIn, OrderItem, OrderStatus

DEMO_RESTAURANT_ID = "00000000-0000-0000-0000-000000000001"

_supabase = None


def _client():
    """Lazily build a Supabase client; cache it for reuse."""
    global _supabase
    if _supabase is None and settings.supabase_enabled:
        from supabase import create_client  # imported lazily

        _supabase = create_client(
            settings.supabase_url,
            settings.supabase_service_role_key,
        )
    return _supabase


# --- In-memory fallback store ---

_orders: dict[str, Order] = {}


def _seed_memory() -> None:
    if _orders:
        return
    demo = [
        ("#1042", "Anders Holm", "+45 28 14 55 90", "ai_phone", "new",
         [("Margherita", 2, 89, None), ("Hvidløgsbrød", 1, 45, None),
          ("Cola 0,5L", 2, 25, None)]),
        ("#1041", "Mette Sørensen", "+45 51 22 18 73", "ai_phone", "preparing",
         [("Calzone", 1, 110, "Uden løg"), ("Tiramisu", 1, 55, None)]),
        ("#1039", "Sara Lind", "+45 42 71 09 88", "manual_phone", "ready",
         [("Quattro Stagioni", 1, 115, None), ("Cola 0,5L", 1, 25, None)]),
    ]
    for ref, name, phone, channel, status, items in demo:
        oid = str(uuid.uuid4())
        _orders[oid] = Order(
            id=oid,
            restaurant_id=DEMO_RESTAURANT_ID,
            ref=ref,
            customer_name=name,
            customer_phone=phone,
            channel=channel,
            status=status,
            placed_at=datetime.now(timezone.utc),
            items=[
                OrderItem(id=str(uuid.uuid4()), name=n, qty=q, price=p, note=note)
                for (n, q, p, note) in items
            ],
        )


# --- Public API ---


async def list_orders(restaurant_id: str) -> list[Order]:
    client = _client()
    if client is None:
        _seed_memory()
        return [o for o in _orders.values() if o.restaurant_id == restaurant_id]

    orders_res = (
        client.table("orders")
        .select("*")
        .eq("restaurant_id", restaurant_id)
        .order("placed_at", desc=True)
        .execute()
    )
    items_res = (
        client.table("order_items")
        .select("*")
        .eq("restaurant_id", restaurant_id)
        .execute()
    )
    items_by_order: dict[str, list[OrderItem]] = {}
    for row in items_res.data:
        items_by_order.setdefault(row["order_id"], []).append(
            OrderItem(
                id=row["id"],
                name=row["name"],
                qty=row["qty"],
                price=row["price"],
                note=row.get("note"),
            )
        )
    return [
        Order(**row, items=items_by_order.get(row["id"], []))
        for row in orders_res.data
    ]


async def create_order(restaurant_id: str, payload: OrderIn) -> Order:
    client = _client()
    order = Order(
        id=str(uuid.uuid4()),
        restaurant_id=restaurant_id,
        ref=payload.ref,
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        channel=payload.channel,
        status=payload.status,
        placed_at=datetime.now(timezone.utc),
        items=[
            OrderItem(id=str(uuid.uuid4()), **item.model_dump())
            for item in payload.items
        ],
    )

    if client is None:
        _seed_memory()
        _orders[order.id] = order
        return order

    client.table("orders").insert(
        {
            "id": order.id,
            "restaurant_id": restaurant_id,
            "ref": order.ref,
            "customer_name": order.customer_name,
            "customer_phone": order.customer_phone,
            "channel": order.channel.value,
            "status": order.status.value,
        }
    ).execute()
    client.table("order_items").insert(
        [
            {
                "order_id": order.id,
                "restaurant_id": restaurant_id,
                "name": item.name,
                "qty": item.qty,
                "price": item.price,
                "note": item.note,
            }
            for item in order.items
        ]
    ).execute()
    return order


async def update_status(
    restaurant_id: str, order_id: str, status: OrderStatus
) -> Order | None:
    client = _client()
    if client is None:
        _seed_memory()
        order = _orders.get(order_id)
        if order is None or order.restaurant_id != restaurant_id:
            return None
        order.status = status
        return order

    client.table("orders").update({"status": status.value}).eq(
        "id", order_id
    ).eq("restaurant_id", restaurant_id).execute()
    orders = await list_orders(restaurant_id)
    return next((o for o in orders if o.id == order_id), None)
