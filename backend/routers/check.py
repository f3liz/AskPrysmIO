from fastapi import APIRouter, Depends
from backend.controllers import check_controller, auth_controller

router = APIRouter(prefix="/check", tags=["check"])

@router.get("/db")
def check_db_connection(_ = Depends(auth_controller.require_auth)):
    return check_controller.check_supabase_connection()

@router.get("/")
def check_auth_connection(_ = Depends(auth_controller.require_auth)):
    return check_controller.check_auth_connection()