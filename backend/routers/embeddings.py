from fastapi import APIRouter, Request, UploadFile, File, Depends, Form
from backend.controllers import embeddings_controller, auth_controller
from backend.utils.limiter import limiter

router = APIRouter(prefix="/embeddings", tags=["embeddings"])

@router.post("/")
@limiter.limit("5/minute")
async def upload_file(request: Request, file: UploadFile = File(...), title: str = Form(...), _ = Depends(auth_controller.require_auth)):
    
    result = await embeddings_controller.embeddings_process(file, title)
    
    return {"source": file.filename, "title": title, "data": result}