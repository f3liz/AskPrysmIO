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
    ADMIN_USER : str
    ADMIN_PASSWORD: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str
    ALGORITHM : str
    SECRET_KEY: str
    class Config:
        env_file = ".env"

settings = Settings()