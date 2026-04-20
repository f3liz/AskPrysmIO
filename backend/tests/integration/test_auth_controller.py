import pytest, jwt, os
from pydantic_settings import BaseSettings
from fastapi.testclient import TestClient 
from backend.main import app

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

client = TestClient(app)

def create_test_token():
    return jwt.encode(
        {"sub": "test"},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def test_that_i_can_test():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message":"Backend running"}

def test_require_auth_success():
    token = create_test_token()

    response = client.get(
        "/check/",
        cookies={"access_token": token}
    )

    assert response.status_code == 200
    assert response.json() == {"message":"Successfully authenticated!"}
        
def test_require_auth_missing_token():
    response = client.get("/check/")

    assert response.status_code == 401
    assert response.json() == {"detail":"Not authenticated"}

def test_require_auth_invalid_token():
    response = client.get(
        "/check/",
        cookies={"access_token": "scs2e"}
    )

    assert response.status_code == 401
    assert response.json() == {"detail":"Invalid or expired token"}



