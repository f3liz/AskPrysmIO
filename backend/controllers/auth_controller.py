import os
import hashlib
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status, Request, Response
from jose import JWTError, jwt
from dotenv import load_dotenv

load_dotenv()

ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASSWORD_PLAIN = os.getenv("ADMIN_PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
pre_hashed_admin_pwd = hashlib.sha256(ADMIN_PASSWORD_PLAIN.encode('utf-8')).hexdigest().encode('utf-8')
ADMIN_PASSWORD_HASH = bcrypt.hashpw(pre_hashed_admin_pwd, bcrypt.gensalt())

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

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def process_login(username: str, password: str, response: Response):
    if username != ADMIN_USER or not verify_password(password, ADMIN_PASSWORD_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    return {"message": "Login successful"}

def process_logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}

