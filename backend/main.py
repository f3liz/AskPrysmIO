from fastapi import FastAPI
from routers import chats, check, embeddings
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

app.include_router(chats.router, prefix="/api", tags=["Chat"])
app.include_router(check.router, prefix="/api", tags=["Health"])
app.include_router(embeddings.router, prefix="/api", tags=["Embeddings"])