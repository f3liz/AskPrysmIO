from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_LLM_KEY: str
    OPENAI_EMBEDDING_KEY: str
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    OPENROUTER_API_KEY: str
    OPENROUTER_BASE_URL: str
    APP_URL: str
    APP_NAME: str
    LLM_MODEL: str

    class Config:
        env_file = ".env"

settings = Settings()