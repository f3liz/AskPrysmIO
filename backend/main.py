from fastapi import FastAPI
from routers import chats

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello, World!"}
app.include_router(chats.router)