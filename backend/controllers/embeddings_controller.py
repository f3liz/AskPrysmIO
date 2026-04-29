import logging
import magic
from fastapi import UploadFile, File, HTTPException
from utils import pdf_util, chunk_util, embedding_util
from backend.db import supabase
from config import settings

logger = logging.getLogger("uvicorn.error")


async def validate_pdf_upload(file: UploadFile):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=415,
            detail="Invalid file type. Only PDF files are allowed."
        )

    first_chunk = await file.read(2048)

    mime_type = magic.from_buffer(first_chunk, mime=True)
    if mime_type != "application/pdf":
        raise HTTPException(
            status_code=415,
            detail="Invalid file type. Only PDF files are allowed."
        )

    total_size = len(first_chunk)

    while True:
        chunk = await file.read(1024 * 1024)
        if not chunk:
            break

        total_size += len(chunk)

        if total_size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="File too large. Maximum size is 20MB."
            )

    await file.seek(0)

from fastapi import UploadFile, File, HTTPException, Form
from backend.utils import  pdf_util, chunk_util, embedding_util
from backend.db import supabase

async def embeddings_process(file: UploadFile = File(), title: str = None):
    await validate_pdf_upload(file)

    try:
        pdf_content = await file.read()
        pages = pdf_util.extract_text(pdf_content)

        total_chunks = 0
        chunk_index = 0

        for page in pages:
            chunks = chunk_util.chunk_text(page["content"])
            embeddings = await embedding_util.text_embedding(chunks)

            for chunk, embedding in zip(chunks, embeddings):
                supabase.table("pdfdocuments").insert({
                    "title": title,
                    "source": file.filename,
                    "content": chunk,
                    "page_number": page["page_number"],
                    "chunk_index": chunk_index,
                    "embedding": embedding
                }).execute()

                chunk_index += 1

            total_chunks += len(chunks)

        return {
            "Total chunks inserted": total_chunks
        }

    except HTTPException:
        raise
    except Exception:
        logger.exception("PDF embedding process failed")
        raise HTTPException(
            status_code=500,
            detail="Failed to process PDF."
        )