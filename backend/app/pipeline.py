"""The voice loop: STT -> agent -> TTS, measured end-to-end.

This is intentionally simple. The real version streams every stage concurrently
and supports barge-in (caller interrupts). Keep the target round-trip under
~800 ms or the agent feels robotic.
"""

from __future__ import annotations

import time

from .agent import OrderSession
from .schemas import AgentTurn, CallTurn, CartItem
from .services import llm, stt, tts


async def run_turn(inbound: str, history: list[str] | None = None) -> AgentTurn:
    """Stateless single round-trip (handy for smoke-testing STT/LLM/TTS)."""
    started = time.perf_counter()

    transcript = await stt.transcribe_chunk(inbound)
    agent_text = await llm.reply(transcript.text, history=history)
    audio_url = await tts.synthesize(agent_text)

    latency_ms = int((time.perf_counter() - started) * 1000)
    return AgentTurn(
        user_text=transcript.text,
        agent_text=agent_text,
        audio_url=audio_url,
        latency_ms=latency_ms,
    )


async def run_call_turn(session: OrderSession, inbound: str) -> CallTurn:
    """One order-taking turn: STT -> stateful agent -> TTS, with the live cart.

    Persistence (creating the order when `finalized`) is the caller's job, so
    this stays free of database concerns.
    """
    started = time.perf_counter()

    transcript = await stt.transcribe_chunk(inbound)
    agent_text = await session.handle(transcript.text)
    await tts.synthesize(agent_text)

    latency_ms = int((time.perf_counter() - started) * 1000)
    return CallTurn(
        user_text=transcript.text,
        agent_text=agent_text,
        cart=[CartItem(**item.model_dump()) for item in session.cart],
        cart_total=session.total,
        finalized=session.finalized,
        latency_ms=latency_ms,
    )
