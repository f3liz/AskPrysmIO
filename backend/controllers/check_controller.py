import logging
from db import supabase

logger = logging.getLogger("uvicorn.error")

def check_supabase_connection():
    try:
        response = supabase.table("pdfdocuments").select("*").limit(1).execute()
        return {
            "Status": "Connected to Supabase",
            "Rows" : len(response.data)
        }
    except Exception:
        logger.exception("Supabase connection check failed")

        return {
            "Status": "error",
            "Error": "Unable to verify database connection."
        }