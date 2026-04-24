import pytest, os, time
from pydantic_settings import BaseSettings
from fastapi.testclient import TestClient 
from backend.main import app
from jose import jwt

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
INVALID_TOKEN = "123456789"

@pytest.fixture
def client():
    c = TestClient(app)
    yield c
    c.cookies.clear()

def make_token(token_type: str, expires_in: int | None = None):
    payload = {"sub": "test", "type": token_type}
    if expires_in is not None:
        payload["exp"] = int(time.time()) + expires_in
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def test_that_i_can_test(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message":"Backend running"}


# ---------- /auth/refresh ----------
def test_refresh_success(client):
    client.cookies.set("refresh_token", make_token(token_type="refresh"))

    r = client.get("/auth/refresh")

    assert r.status_code == 200
    assert r.json() == {"message": "Token refreshed"}
    assert "access_token" in r.cookies

    decoded = jwt.decode(r.cookies["access_token"], SECRET_KEY, algorithms=[ALGORITHM])
    assert decoded["sub"] == "test"

@pytest.mark.parametrize(
    "token_factory, expected_detail",
    [
        (lambda: None,                                       "Refresh token missing"),
        (lambda: "123456789",                                "Error refreshing token."),
        (lambda: make_token(token_type="refresh", expires_in=-60), "Error refreshing token."),
        (lambda: make_token(token_type="access"),            "Invalid token type"),
    ],
    ids=["missing", "garbage", "expired", "wrong_type"],
)
def test_refresh_401(client, token_factory, expected_detail):
    token = token_factory()
    if token is not None:
        client.cookies.set("refresh_token", token)

    r = client.get("/auth/refresh")

    assert r.status_code == 401
    assert r.json() == {"detail": expected_detail}

# ---------- require_auth() ----------
def test_require_auth_success(client):
    token = make_token("access")

    response = client.get(
        "/check/",
        cookies={"access_token": token}
    )

    assert response.status_code == 200
    assert response.json() == {"message":"Successfully authenticated!"}
        
def test_require_auth_missing_token(client):
    response = client.get("/check/")

    assert response.status_code == 401
    assert response.json() == {"detail":"Not authenticated"}

def test_require_auth_invalid_token(client):

    response = client.get(
        "/check/",
        cookies={"access_token": INVALID_TOKEN}
    )

    assert response.status_code == 401
    assert response.json() == {"detail":"Invalid or expired token"}

def test_require_auth_expired_token(client):
    token = make_token("access", -60)

    response = client.get(
        "/check/",
        cookies={"access_token": token}
    )

    assert response.status_code == 401
    assert response.json() == {"detail":"Invalid or expired token"}

