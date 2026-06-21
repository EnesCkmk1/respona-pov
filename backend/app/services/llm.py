"""The conversational brain. Real target: Claude (Haiku for simple turns,
Sonnet for complex orders).

The stub implements a tiny rule-based "agent" so the pipeline produces sensible
replies during a fake call without any API spend.
"""

from __future__ import annotations

from ..config import settings

_SYSTEM_PROMPT = (
    "Du er en venlig dansk telefon-assistent for en restaurant. "
    "Tag imod bestillinger, bekræft varer og vær kortfattet."
)


async def reply(user_text: str, history: list[str] | None = None) -> str:
    """Generate the agent's next utterance given the latest user text."""
    if settings.anthropic_api_key and not settings.use_stubs:
        # TODO: call Claude with streaming + tool use for order capture.
        # System prompt: _SYSTEM_PROMPT
        # See https://docs.anthropic.com/en/api/messages-streaming
        raise NotImplementedError("Claude not wired yet")

    text = user_text.lower()
    if any(word in text for word in ("hej", "goddag", "hallo")):
        return "Hej og velkommen til Bella Napoli! Hvad kunne du tænke dig at bestille?"
    if "pizza" in text or "margherita" in text or "pepperoni" in text:
        return "Super, det noterer jeg. Skal der være noget at drikke eller tilbehør til?"
    if any(word in text for word in ("nej", "det var det", "tak")):
        return "Perfekt, din ordre er noteret. Den er klar til afhentning om cirka 20 minutter."
    return "Det forstår jeg. Vil du bestille en pizza, tilbehør eller en drikkevare?"
