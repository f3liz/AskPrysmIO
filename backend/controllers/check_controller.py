from backend.db import supabase

def check_supabase_connection():
    try:
        response = supabase.table("pdfdocuments").select("*").limit(1).execute()
        return {
            "Status": "Connected to Supabase",
            "Rows" : len(response.data)
        }
    except Exception as e:
        return {
            "Status" : "error",
            "Error" : str(e)
        }