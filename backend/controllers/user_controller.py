import os
from typing import Optional
from dotenv import load_dotenv
from fastapi import HTTPException
from pydantic import BaseModel, Field
from supabase import create_client, Client
from passlib.context import CryptContext

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
# ------------------------

class UserCreate(BaseModel):
    username: str
    password: str = Field(..., max_length=72)
    is_admin: Optional[bool] = False

class UserUpdate(BaseModel):
    username: Optional[str] = None
    is_admin: Optional[bool] = None
    password: Optional[str] = Field(None, max_length=72)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(
        f"Critical Environment Variables Missing: "
        f"SUPABASE_URL={SUPABASE_URL}, SUPABASE_SERVICE_ROLE_KEY={'Set' if SUPABASE_KEY else 'None'}"
    )

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_all_users():
    response = supabase.table("users").select("*").execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="No users found")
    return {"users": response.data}
        
async def get_user_id(id: int):
    response = supabase.table("users").select("*").eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user": response.data[0]}

async def create_user(body: UserCreate):
    user_data = body.model_dump()
    
    user_data["password"] = get_password_hash(user_data["password"])
    
    response = supabase.table("users").insert(user_data).execute()
    
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create user")
        
    return {"user": response.data[0]}

async def update_user(id: int, body: UserUpdate):
    update_data = body.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No data provided to update")

    if "password" in update_data:
        update_data["password"] = get_password_hash(update_data["password"])

    response = supabase.table("users").update(update_data).eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {"user": response.data[0]}

async def delete_user(id: int):
    # 1. Wipe the user's chats first to satisfy the database foreign key constraint
    supabase.table("chats").delete().eq("user_id", id).execute()
    
    # 2. Now the database will allow you to delete the user safely
    response = supabase.table("users").delete().eq("id", id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found or already deleted")
        
    return {"message": "User deleted successfully", "deleted_user": response.data[0]}