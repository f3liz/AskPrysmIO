from fastapi import APIRouter, Depends, Request
from backend.controllers import chat_controller, auth_controller
from pydantic import BaseModel
from backend.utils.limiter import limiter

router = APIRouter(prefix="/chats", tags=["chats"])

class ChatRequest(BaseModel): 
    question: str

class Response(BaseModel):
    answer: str

@router.post("/", response_model=Response)
@limiter.limit("10/minute") 
async def chat(
    request: Request,          
    payload: ChatRequest,      
    _ = Depends(auth_controller.require_auth)
) -> Response:

    answer = await chat_controller.generate_response(payload.question) 
    return Response(answer=answer)