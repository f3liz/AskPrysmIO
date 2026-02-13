from fastapi import APIRouter
from controllers import chat_controller
from pydantic import BaseModel

router = APIRouter(prefix="/chats", tags=["chats"])

class Request(BaseModel):
    question: str

class Response(BaseModel):
    answer: str
@router.post("/", response_model=Response)
async def chat(request: Request) -> Response:
    answer = await chat_controller.generate_response(request.question)
    return Response(answer=answer)