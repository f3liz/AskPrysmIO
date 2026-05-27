import logging
import traceback
import json
import uuid
from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from backend.routers import chats, check, embeddings, auth
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from backend.utils.limiter import limiter

from backend.routers import chats, check, embeddings, auth

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

logger = logging.getLogger("uvicorn.error")


def sanitize(data: dict):
    sensitive_keys = {
        "password",
        "token",
        "access_token",
        "refresh_token"
    }

    return {
        k: ("***" if k.lower() in sensitive_keys else v)
        for k, v in data.items()
    }


@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    start_time = datetime.utcnow()

    try:
        response = await call_next(request)

        # success log
        log = {
            "request_id": request_id,
            "timestamp": start_time.isoformat(),
            "level": "INFO",
            "endpoint": request.url.path,
            "method": request.method,
            "status_code": response.status_code,
        }

        logger.info(json.dumps(log))

        return response

    except Exception as e:
        # error log
        log = {
            "request_id": request_id,
            "timestamp": start_time.isoformat(),
            "level": "ERROR",
            "endpoint": request.url.path,
            "method": request.method,
            "error": str(e),
        }

        logger.error(json.dumps(sanitize(log)))
        raise


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):

    logger.error(
        f"Unhandled exception on {request.method} {request.url.path}: {exc}"
    )
    logger.error(traceback.format_exc())

    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please try again later."
        }
    )


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = [
    "http://localhost:5173",
    "https://askprysmio.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend running"}


app.include_router(chats.router)
app.include_router(check.router)
app.include_router(embeddings.router)
app.include_router(auth.router)