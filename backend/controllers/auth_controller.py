import os
import hashlib
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status, Request, Response
from jose import JWTError, jwt
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASSWORD_PLAIN = os.getenv("ADMIN_PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
pre_hashed_admin_pwd = hashlib.sha256(ADMIN_PASSWORD_PLAIN.encode('utf-8')).hexdigest().encode('utf-8')
ADMIN_PASSWORD_HASH = bcrypt.hashpw(pre_hashed_admin_pwd, bcrypt.gensalt())

class LoginRequest(BaseModel):
    username: str
    password: str

def create_refresh_token(data: dict):
    expires = timedelta(days=ACCESS_TOKEN_EXPIRE)
    return create_token(data, expires, "refresh")

def create_access_token(data: dict):
    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE)
    return create_token(data, expires, "access")

def require_auth(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=401, 
            detail="Not authenticated"
            )
    
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

def verify_password(plain_password: str, hashed_password: bytes):

    pre_hashed_attempt = hashlib.sha256(plain_password.encode('utf-8')).hexdigest().encode('utf-8')
    

    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
        
    return bcrypt.checkpw(pre_hashed_attempt, hashed_password)

def create_token(data: dict, expires_delta: timedelta, token_type: str):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "type": token_type})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def refresh_logic(request: Request, response: Response):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])

        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        username = payload.get("sub")

        new_access_token = create_access_token(data={"sub": username})

        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            secure=False,
            samesite="none",
            max_age=ACCESS_TOKEN_EXPIRE * 60
        )

        return {"message": "Token refreshed"}
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Error refreshing token."
        )

def process_login(body: LoginRequest, response: Response):
    if body.username != ADMIN_USER or not verify_password(body.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(
        data={"sub": body.username}
    )
    refresh_token = create_refresh_token(
        data={"sub": body.username}
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        path="/",
        max_age=ACCESS_TOKEN_EXPIRE * 60
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        path="/auth/refresh",
        max_age=7 * 24 * 60 * 60,
    )
    return {"message": "Login successful"}

def process_logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}

