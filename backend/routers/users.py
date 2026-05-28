from fastapi import APIRouter, Request, UploadFile, File, Depends, Form
from backend.controllers import user_controller
from backend.utils.limiter import limiter

router = APIRouter(prefix="/users", tags=["users"])

@router.get('/')
async def get_users():
    return await user_controller.get_all_users()

@router.get('/{id}')
async def get_user_id(id: int):
    return await user_controller.get_user_id(id)

@router.patch("/{id}")
async def get_user_id(id: int, body: dict[str, Any]):
    return await user_controller.update_user(id, body)