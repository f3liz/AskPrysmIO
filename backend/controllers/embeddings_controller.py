import pymupdf
from fastapi import UploadFile, File, HTTPException
from typing import List
from utils import  pdf_util, chunk_util

async def embeddings_process(file: UploadFile = File()):
    if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        pdf_content = await file.read()
        pages = pdf_util.extract_text(pdf_content)
        
        for page in pages:
             chunks = chunk_util.chunk_text(page["content"])
        return{
             "Pages": pages,
             "Chunk": chunks
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Processing Error: {str(e)}")