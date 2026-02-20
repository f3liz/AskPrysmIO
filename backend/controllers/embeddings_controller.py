import pymupdf
from fastapi import UploadFile, File, HTTPException
from typing import List
from utils import chunk_processing

async def embeddings_process(file: UploadFile = File()):
    if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        #pdf_content takes the file and turns it into 1 and 0
        pdf_content = await file.read()

        # doc is now an object that understands pdf structure like pages, fonts, images
        doc = pymupdf.open(stream=pdf_content, filetype="pdf")
        
        # gets all text from each page in doc
        full_text = ""
        for page in doc:
            full_text += page.get_text()

        # chunks is an array of each 500 characters
        chunks = chunk_processing.chunk_text(full_text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Processing Error: {str(e)}")