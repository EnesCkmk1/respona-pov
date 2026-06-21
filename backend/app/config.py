"""Application settings.

Every external credential is optional so the app boots and runs fully on stubs
without any paid API keys. Set keys in `.env` (see `.env.example`) when you're
ready to wire real providers.
"""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Respona Voice Backend"
    environment: str = "development"

    # When true, all providers return canned data and no paid API is called.
    use_stubs: bool = True

    # Supabase (server-side service role — never expose to the frontend).
    supabase_url: str | None = None
    supabase_service_role_key: str | None = None

    # Telephony / STT / TTS / LLM. Left empty => stubbed.
    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    deepgram_api_key: str | None = None
    elevenlabs_api_key: str | None = None
    anthropic_api_key: str | None = None

    # CORS origins allowed to call this backend (the dashboard, locally).
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    @property
    def supabase_enabled(self) -> bool:
        return bool(self.supabase_url and self.supabase_service_role_key)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
