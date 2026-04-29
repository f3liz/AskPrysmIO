from fastapi import APIRouter, UploadFile, File, Form, Depends
from backend.controllers import embeddings_controller, auth_controller

router = APIRouter(prefix="/embeddings", tags=["embeddings"])

@router.post("/")
async def upload_file(file: UploadFile = File(...), title: str = Form(...), _ = Depends(auth_controller.require_auth)):
    
    result = await embeddings_controller.embeddings_process(file, title)
    
    return {"source": file.filename, "title": title, "data": result}