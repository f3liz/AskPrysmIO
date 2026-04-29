from fastapi import APIRouter, Depends
from backend.controllers import chat_controller, auth_controller
from pydantic import BaseModel

router = APIRouter(prefix="/chats", tags=["chats"])

class Request(BaseModel):
    question: str

class Response(BaseModel):
    answer: str
@router.post("/", response_model=Response)
async def chat(request: Request, _ = Depends(auth_controller.require_auth)) -> Response:
    answer = await chat_controller.generate_response(request.question)
    return Response(answer=answer)