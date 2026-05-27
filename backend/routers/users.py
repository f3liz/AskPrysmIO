from fastapi import APIRouter, Request, UploadFile, File, Depends, Form
from backend.controllers import user_controller
from backend.utils.limiter import limiter

router = APIRouter(prefix="/users", tags=["users"])

@router.get('/')
async def get_users():
    return user_controller.get_all_users()