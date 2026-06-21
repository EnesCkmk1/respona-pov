"""Stateful order-taking agent (stub).

`OrderSession` keeps a running cart across turns of a single call. It matches
menu items deterministically and composes Danish replies. When the caller
signals they're done, the session is `finalized` and can be turned into an
`OrderIn` for persistence.

This is the shape the real Claude agent will take — except the model will own
the conversation and call tools (find_menu_item, add_to_cart, finalize_order)
instead of this rule-based logic.
"""

from __future__ import annotations

import random

from .menu import match_items
from .schemas import CartItem, OrderChannel, OrderIn, OrderItemIn
from .services import llm

_FINALIZE_PHRASES = (
    "det var det",
    "det var alt",
    "det er det hele",
    "ikke mere",
    "nej tak",
    "det var alt tak",
    "så er det det",
)


def _format_price(amount: int) -> str:
    return f"{amount} kr."


class OrderSession:
    def __init__(self) -> None:
        self.cart: list[CartItem] = []
        self.finalized = False

    @property
    def total(self) -> int:
        return sum(item.price * item.qty for item in self.cart)

    def _add(self, name: str, qty: int, price: int) -> None:
        for item in self.cart:
            if item.name == name:
                item.qty += qty
                return
        self.cart.append(CartItem(name=name, qty=qty, price=price))

    async def handle(self, user_text: str) -> str:
        """Update the cart from `user_text` and return the agent's reply."""
        matched = match_items(user_text)
        for hit in matched:
            self._add(str(hit["name"]), int(hit["qty"]), int(hit["price"]))

        lowered = user_text.lower()
        wants_to_finish = any(p in lowered for p in _FINALIZE_PHRASES)

        if wants_to_finish and self.cart:
            self.finalized = True
            lines = ", ".join(f"{i.qty}× {i.name}" for i in self.cart)
            return (
                f"Perfekt! Jeg har {lines} til i alt {_format_price(self.total)}. "
                "Den er klar til afhentning om cirka 20 minutter."
            )

        if matched:
            lines = ", ".join(f"{int(h['qty'])}× {h['name']}" for h in matched)
            return f"Super, jeg har tilføjet {lines}. Skulle der være andet?"

        # No menu items recognized — fall back to the conversational stub.
        return await llm.reply(user_text)

    def to_order_in(self) -> OrderIn:
        return OrderIn(
            ref=f"#{random.randint(1000, 9999)}",
            channel=OrderChannel.ai_phone,
            items=[
                OrderItemIn(name=i.name, qty=i.qty, price=i.price)
                for i in self.cart
            ],
        )
