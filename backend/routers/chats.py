from fastapi import APIRouter, Depends, Request
from backend.controllers import chat_controller, auth_controller
from pydantic import BaseModel
from typing import Optional
from backend.utils.sanitize import sanitize_input
from backend.utils.limiter import limiter

router = APIRouter(prefix="/chats", tags=["chats"])


class ChatRequest(BaseModel): 
    question: str
    chat_id: Optional[str] = None


class ChatResponse(BaseModel):
    chat_id: str
    answer: str

class ChatHistoryItem(BaseModel):
    id: str
    title: str | None = None
    created_at: str
    updated_at: str

@router.post("/", response_model=ChatResponse)
@limiter.limit("10/minute") 
async def chat(
    request: Request,          
    payload: ChatRequest,      
    user = Depends(auth_controller.require_auth)
) -> ChatResponse:
    clean_question = sanitize_input(payload.question)

    result = await chat_controller.generate_response(
        question=clean_question,
        chat_id=payload.chat_id,
        user_id=user["id"]
    )

    return ChatResponse(
        chat_id=result["chat_id"],
        answer=result["answer"]
    )