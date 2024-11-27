from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    APP_NAME: str = "Knowledge Window API"
    DEBUG: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
