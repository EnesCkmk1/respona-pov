"""FastAPI entrypoint for the Respona voice backend (PoV skeleton).

Run locally:  uvicorn app.main:app --reload
Docs:         http://localhost:8000/docs

Everything works with zero credentials (stub mode). Add keys in `.env` to wire
real providers later.
"""

from __future__ import annotations

from fastapi import FastAPI, HTTPException, Response, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from . import db
from .config import settings
from .pipeline import run_turn
from .schemas import Order, OrderIn, StatusUpdate
from .services.telephony import incoming_call_twiml

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


@app.post("/webhooks/twilio/voice")
async def twilio_voice(request_host: str = "localhost:8000") -> Response:
    """Twilio hits this on an inbound call; we return TwiML to start streaming."""
    ws_url = f"wss://{request_host}/ws/call/{db.DEMO_RESTAURANT_ID}"
    return Response(content=incoming_call_twiml(ws_url), media_type="application/xml")


@app.websocket("/ws/call/{restaurant_id}")
async def call_socket(websocket: WebSocket, restaurant_id: str) -> None:
    """Dev harness for the voice loop.

    Send text frames (simulated transcripts); receive the agent's reply as JSON.
    A real Twilio Media Stream would send base64 audio frames instead of text.
    """
    await websocket.accept()
    history: list[str] = []
    try:
        while True:
            inbound = await websocket.receive_text()
            turn = await run_turn(inbound, history=history)
            history.extend([turn.user_text, turn.agent_text])
            await websocket.send_json(turn.model_dump())
    except WebSocketDisconnect:
        return
