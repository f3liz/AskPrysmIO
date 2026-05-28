"""
Users Structure
- id
- username
- is_admin
- password
- created_at (auto?)
"""

from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

class UserUpdate(BaseModel):
    username: Optional[str] = None
    is_admin: Optional[bool] = None
    password: Optional[str] = None


users_db = [
    {
        "id": 1,
        "username": "admin_user",
        "is_admin": True,
        "password": "hashed_password_1",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": 2,
        "username": "jdoe",
        "is_admin": False,
        "password": "hashed_password_2",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": 3,
        "username": "alice_dev",
        "is_admin": False,
        "password": "hashed_password_3",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]


async def get_all_users():
    if not users_db:
        raise HTTPException(status_code=404, detail="No users found")
    
    return {"users": users_db}
        

async def get_user_id(id:int):
    for users in users_db:
        if users.get("id") == id:
            return {"user": users}
    raise HTTPException(status_code=404)


async def update_user(id: int, body: UserUpdate):
    for index, user in enumerate(users_db):
        if user.get("id") == id:
            update_data = body.model_dump(exclude_unset=True)
            user.update(update_data)
            
            users_db[index] = user
            return {"user": user}
            
    raise HTTPException(status_code=404, detail="User not found")