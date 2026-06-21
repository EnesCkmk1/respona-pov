"""Speech-to-Text. Real target: Deepgram Nova-3 streaming over WebSocket.

The stub just echoes text frames back as "final" transcripts so the rest of the
pipeline can be developed without spending money or sending audio anywhere.
"""

from __future__ import annotations

from ..config import settings
from ..schemas import TranscriptChunk


async def transcribe_chunk(text_or_audio: str) -> TranscriptChunk:
    """Turn an inbound frame into a transcript chunk.

    In stub mode the input is already text. With a real Deepgram connection this
    would receive PCM/mulaw audio frames and yield partial + final transcripts.
    """
    if settings.deepgram_api_key and not settings.use_stubs:
        # TODO: open a Deepgram streaming connection and forward audio frames.
        # See https://developers.deepgram.com/docs/streaming
        raise NotImplementedError("Deepgram streaming not wired yet")

    return TranscriptChunk(text=text_or_audio.strip(), is_final=True)
