# Respona — Voice backend (PoV skeleton)

FastAPI service that orchestrates the voice loop: **Telephony → STT → LLM → TTS**.
Every provider is **stubbed**, so the whole thing runs locally for free with no
API keys. Wire real providers one at a time when you're ready to spend.

```
backend/
  app/
    main.py              # FastAPI app: REST + WebSocket
    config.py            # settings (all credentials optional)
    schemas.py           # Pydantic models (mirror the Supabase tables)
    db.py                # Supabase access + in-memory fallback
    pipeline.py          # STT -> LLM -> TTS, with latency timing
    services/
      telephony.py       # Twilio (stub)
      stt.py             # Deepgram Nova-3 (stub)
      llm.py             # Claude (stub, rule-based reply)
      tts.py             # ElevenLabs / Aura-2 (stub)
  requirements.txt
  .env.example
```

## Run it (free, no keys)

```bash
cd backend
python -m venv .venv
# Windows:  .venv\Scripts\activate
# macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- API docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Try the endpoints

```bash
# List orders (in-memory demo data in stub mode)
curl http://localhost:8000/restaurants/00000000-0000-0000-0000-000000000001/orders
```

### Simulate a whole call (no audio, no WS client)

The agent understands the menu, builds a cart, and persists the order when the
caller is done. Replay a scripted call with one request:

```bash
curl -X POST \
  http://localhost:8000/restaurants/00000000-0000-0000-0000-000000000001/simulate-call \
  -H "Content-Type: application/json" \
  -d '{"utterances": [
        "Hej, jeg vil gerne bestille to margherita",
        "Og en cola",
        "Det var det, tak"
      ]}'
```

The last turn contains `finalized: true` and the created `order`. Re-list orders
(above) and you'll see it. The same logic runs over the WebSocket:

```
wscat -c ws://localhost:8000/ws/call/00000000-0000-0000-0000-000000000001
> Hej, jeg vil gerne bestille en pepperoni
< {"user_text": "...", "agent_text": "...", "cart": [...], "finalized": false, ...}
```

## How the stubs map to real providers

| Stub                    | Real target                               | Where                           |
| ----------------------- | ----------------------------------------- | ------------------------------- |
| `services/telephony.py` | Twilio Programmable Voice + Media Streams | TwiML + WS audio                |
| `services/stt.py`       | Deepgram Nova-3 streaming                 | audio frames → transcript       |
| `services/llm.py`       | Claude (Haiku/Sonnet)                     | streaming + tool use for orders |
| `services/tts.py`       | ElevenLabs → Deepgram Aura-2              | stream audio back               |

To go live, set the keys in `.env`, flip `USE_STUBS=false`, and implement the
`NotImplementedError` branches one provider at a time.

## Data

In stub mode, `db.py` serves in-memory demo orders. Set `SUPABASE_URL` +
`SUPABASE_SERVICE_ROLE_KEY` to read/write the real multi-tenant database (see
`../supabase`). The backend uses the service_role key and bypasses RLS by design.

## Latency note

Keep the full round-trip under ~800 ms or the agent feels robotic. The real
pipeline must stream every stage concurrently (LLM tokens → TTS as they arrive)
and support barge-in. `pipeline.py` already returns `latency_ms` so you can watch
this from day one.
