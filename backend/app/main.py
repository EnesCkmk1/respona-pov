"""FastAPI entrypoint for the Respona voice backend (PoV skeleton).

Run locally:  uvicorn app.main:app --reload
Docs:         http://localhost:8000/docs

Everything works with zero credentials (stub mode). Add keys in `.env` to wire
real providers later.
"""

from __future__ import annotations

from fastapi import FastAPI, HTTPException, Response, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from . import db
from .agent import OrderSession
from .config import settings
from .pipeline import run_call_turn
from .schemas import CallTurn, Order, OrderIn, StatusUpdate
from .services.telephony import incoming_call_twiml


class SimulateCall(BaseModel):
    """A list of caller utterances to replay through the agent."""

    utterances: list[str]


app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, object]:
    return {
        "status": "ok",
        "environment": settings.environment,
        "stub_mode": settings.use_stubs,
        "supabase": settings.supabase_enabled,
    }


@app.get("/restaurants/{restaurant_id}/orders", response_model=list[Order])
async def get_orders(restaurant_id: str) -> list[Order]:
    return await db.list_orders(restaurant_id)


@app.post("/restaurants/{restaurant_id}/orders", response_model=Order, status_code=201)
async def post_order(restaurant_id: str, payload: OrderIn) -> Order:
    return await db.create_order(restaurant_id, payload)


@app.patch("/restaurants/{restaurant_id}/orders/{order_id}", response_model=Order)
async def patch_order_status(
    restaurant_id: str, order_id: str, update: StatusUpdate
) -> Order:
    order = await db.update_status(restaurant_id, order_id, update.status)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@app.post("/restaurants/{restaurant_id}/simulate-call", response_model=list[CallTurn])
async def simulate_call(
    restaurant_id: str, payload: SimulateCall
) -> list[CallTurn]:
    """Replay a scripted call through the agent and persist the captured order.

    Great for testing the whole loop with a single curl, no audio or WS client.
    """
    session = OrderSession()
    turns: list[CallTurn] = []
    for utterance in payload.utterances:
        turn = await run_call_turn(session, utterance)
        if turn.finalized and turn.order is None:
            turn.order = await db.create_order(restaurant_id, session.to_order_in())
        turns.append(turn)
    return turns


@app.post("/webhooks/twilio/voice")
async def twilio_voice(request_host: str = "localhost:8000") -> Response:
    """Twilio hits this on an inbound call; we return TwiML to start streaming."""
    ws_url = f"wss://{request_host}/ws/call/{db.DEMO_RESTAURANT_ID}"
    return Response(content=incoming_call_twiml(ws_url), media_type="application/xml")


@app.websocket("/ws/call/{restaurant_id}")
async def call_socket(websocket: WebSocket, restaurant_id: str) -> None:
    """Dev harness for the voice loop.

    Send text frames (simulated transcripts); receive each turn as JSON with the
    running cart. When the caller finishes, the order is persisted and included.
    A real Twilio Media Stream would send base64 audio frames instead of text.
    """
    await websocket.accept()
    session = OrderSession()
    order_created = False
    try:
        while True:
            inbound = await websocket.receive_text()
            turn = await run_call_turn(session, inbound)
            if turn.finalized and not order_created:
                turn.order = await db.create_order(
                    restaurant_id, session.to_order_in()
                )
                order_created = True
            await websocket.send_json(turn.model_dump(mode="json"))
    except WebSocketDisconnect:
        return
