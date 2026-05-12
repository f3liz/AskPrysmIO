from pydantic_settings import BaseSettings
from pydantic import field_validator

class Settings(BaseSettings):
    # API KEYS
    OPENAI_LLM_KEY: str
    OPENAI_EMBEDDING_KEY: str
    OPENROUTER_API_KEY: str
    OPENROUTER_BASE_URL: str

    # SUPABASE
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # APP
    APP_URL: str
    APP_NAME: str
    LLM_MODEL: str

    # AUTH
    ADMIN_USER: str
    ADMIN_PASSWORD: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # FILE LIMITS
    MAX_FILE_SIZE: int = 20971520

    # VALIDATION
    @field_validator("*")
    def not_empty(cls, v, field):
        if isinstance(v, str) and not v.strip():
            raise ValueError(f"{field.name} cannot be empty")
        return v

    class Config:
        env_file = ".env"

settings = Settings()