import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from backend.routers import chats, check, embeddings, auth

load_dotenv()

app = FastAPI()

logger = logging.getLogger("uvicorn.error")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(
    f"Unhandled exception on {request.method} {request.url.path}",
    exc_info=True
    )

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