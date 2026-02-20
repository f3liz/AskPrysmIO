from db_connection import supabase

def get_first_document():
    response = supabase.table("PDFdocuments").select("*").limit(1).execute()

    if response.data:
        return response.data[0]
    else:
        return {"message": "No rows found in PDFdocuments table"}

if __name__ == "__main__":
    result = get_first_document()
    print(result)