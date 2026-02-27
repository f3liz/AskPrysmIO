from fastapi import FastAPI
from routers import chats, check
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    )

@app.get("/")
def home():
    return {"message": "Backend running"}

app.include_router(chats.router)
app.include_router(check.router)