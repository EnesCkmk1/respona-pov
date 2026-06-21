"""Text-to-Speech. Real target: ElevenLabs now, Deepgram Aura-2 at scale.

The stub returns a fake audio URL instead of synthesizing audio, so you can
develop and test the conversation flow for free.
"""

from __future__ import annotations

from ..config import settings


async def synthesize(text: str) -> str | None:
    """Return a URL/handle to synthesized audio for `text`.

    Stub mode returns None (no audio produced). Real mode would stream audio
    bytes back to the caller as they're generated for low latency.
    """
    if settings.elevenlabs_api_key and not settings.use_stubs:
        # TODO: stream from ElevenLabs (or Deepgram Aura-2) and pipe audio out.
        # See https://elevenlabs.io/docs and https://developers.deepgram.com/docs/tts
        raise NotImplementedError("ElevenLabs/Aura streaming not wired yet")

    preview = text[:32].replace(" ", "+")
    return f"stub://audio/{preview}"
