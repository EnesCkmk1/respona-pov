"""Pydantic models shared across the API. These mirror the Supabase tables."""

from __future__ import annotations

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class OrderStatus(str, Enum):
    new = "new"
    preparing = "preparing"
    ready = "ready"
    completed = "completed"
    cancelled = "cancelled"


class OrderChannel(str, Enum):
    ai_phone = "ai_phone"
    manual_phone = "manual_phone"


class OrderItemIn(BaseModel):
    name: str
    qty: int = Field(gt=0)
    price: int = Field(ge=0, description="Price in whole DKK")
    note: str | None = None


class OrderItem(OrderItemIn):
    id: str


class OrderIn(BaseModel):
    ref: str
    customer_name: str | None = None
    customer_phone: str | None = None
    channel: OrderChannel = OrderChannel.ai_phone
    status: OrderStatus = OrderStatus.new
    items: list[OrderItemIn]


class Order(BaseModel):
    id: str
    restaurant_id: str
    ref: str
    customer_name: str | None = None
    customer_phone: str | None = None
    channel: OrderChannel
    status: OrderStatus
    placed_at: datetime
    items: list[OrderItem]

    @property
    def total(self) -> int:
        return sum(item.price * item.qty for item in self.items)


class StatusUpdate(BaseModel):
    status: OrderStatus


# --- Voice pipeline ---


class TranscriptChunk(BaseModel):
    text: str
    is_final: bool = True


class AgentTurn(BaseModel):
    """One round-trip of the voice loop, useful for debugging the pipeline."""

    user_text: str
    agent_text: str
    audio_url: str | None = None
    latency_ms: int


class CartItem(BaseModel):
    name: str
    qty: int = Field(gt=0)
    price: int = Field(ge=0)


class CallTurn(BaseModel):
    """A turn during an order-taking call, including the running cart."""

    user_text: str
    agent_text: str
    cart: list[CartItem]
    cart_total: int
    finalized: bool
    order: Order | None = None
    latency_ms: int
