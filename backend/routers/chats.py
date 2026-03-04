from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from controllers.chat_controller import generate_response

router = APIRouter()

# Request schema
class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        answer = await generate_response(request.question)

        return {
            "question": request.question,
            "answer": answer
        }

    except Exception as e:
        print("Chat router error:", e)
        raise HTTPException(status_code=500, detail="Chat request failed")