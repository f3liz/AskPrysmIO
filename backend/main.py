from fastapi import FastAPI
from routers import chats, check, embeddings, auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer


app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
app.include_router(embeddings.router)
app.include_router(auth.router)