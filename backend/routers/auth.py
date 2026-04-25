from fastapi import APIRouter, Response, Depends, Request
from pydantic import BaseModel
from backend.controllers.auth_controller import process_login, process_logout, refresh_logic

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(request: LoginRequest, response: Response):
    return process_login(request, response)

@router.post("/logout")
def logout(response: Response):
    return process_logout(response)

@router.get("/refresh")
async def refresh_token(request: Request, response: Response):
    return refresh_logic(request, response)
