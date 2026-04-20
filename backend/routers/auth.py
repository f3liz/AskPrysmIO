from fastapi import APIRouter, Response, Depends
from pydantic import BaseModel
from backend.controllers.auth_controller import process_login, process_logout

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(request: LoginRequest, response: Response):
    return process_login(request.username, request.password, response)

@router.post("/logout")
def logout(response: Response):
    return process_logout(response)
