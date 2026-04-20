from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient 
from backend.main import app

client = TestClient(app)

def test_that_i_can_test():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Backend running"}

