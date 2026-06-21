"""The voice loop: STT -> LLM -> TTS, measured end-to-end.

This is intentionally simple. The real version streams every stage concurrently
and supports barge-in (caller interrupts). Keep the target round-trip under
~800 ms or the agent feels robotic.
"""

from __future__ import annotations

import time

from .schemas import AgentTurn
from .services import llm, stt, tts


async def run_turn(inbound: str, history: list[str] | None = None) -> AgentTurn:
    """Process one caller utterance and produce the agent's spoken reply."""
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
