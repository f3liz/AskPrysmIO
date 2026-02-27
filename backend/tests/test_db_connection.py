from db import supabase

def get_first_document():
    response = supabase.table("pdfdocuments").select("*").limit(1).execute()

    if response.data:
        return response.data[0]
    else:
        return {"message": "No rows found in pdfdocuments table"}

if __name__ == "__main__":
    result = get_first_document()
    print(result)