from fastapi import APIRouter
from controllers import check_controller

router = APIRouter(prefix="/check", tags=["check"])

@router.get("/db")
def check_db_connection():
    return check_controller.check_supabase_connection()