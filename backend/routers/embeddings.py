from fastapi import APIRouter, UploadFile, File, Form
from controllers import embeddings_controller # Adjust path to your controller

router = APIRouter(prefix="/embeddings", tags=["embeddings"])

@router.post("/")
async def upload_file(file: UploadFile = File(...), title: str = Form(...)):
    # Pass the file to your controller method
    result = await embeddings_controller.embeddings_process(file, title)
    
    return {"source": file.filename, "title": title, "data": result}