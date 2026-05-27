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
        