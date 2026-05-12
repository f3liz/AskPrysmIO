from fastapi import APIRouter, Depends
from backend.controllers import chat_controller, auth_controller
from pydantic import BaseModel
from backend.utils.sanitize import sanitize_input

router = APIRouter(prefix="/chats", tags=["chats"])

class Request(BaseModel):
    question: str

class Response(BaseModel):
    answer: str
@router.post("/", response_model=Response)
async def chat(request: Request, _ = Depends(auth_controller.require_auth)) -> Response:
    clean_question = sanitize_input(request.question)
    answer = await chat_controller.generate_response(clean_question)
    return Response(answer=answer)