from fastapi import APIRouter, status
from backend.controllers import user_controller
from backend.controllers.user_controller import UserUpdate, UserCreate

router = APIRouter(prefix="/users", tags=["users"])

@router.get('/', status_code=status.HTTP_200_OK)
async def get_users():
    return await user_controller.get_all_users()

@router.get('/{id}', status_code=status.HTTP_200_OK)
async def get_user_id(id: int):
    return await user_controller.get_user_id(id)

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_user(body: UserCreate):
    return await user_controller.create_user(body)

@router.patch("/{id}", status_code=status.HTTP_200_OK)
async def update_user(id: int, body: UserUpdate):
    return await user_controller.update_user(id, body)

@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_user(id: int):
    return await user_controller.delete_user(id)