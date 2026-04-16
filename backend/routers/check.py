from fastapi import APIRouter
from controllers import check_controller

router = APIRouter(prefix="/check", tags=["check"])

@router.get("/db")
def check_db_connection(_: Depends(auth.require_auth)):
    return check_controller.check_supabase_connection()