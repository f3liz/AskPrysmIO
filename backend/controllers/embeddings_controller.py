import logging
from fastapi import UploadFile, File, HTTPException, Form
from backend.utils import pdf_util, chunk_util, embedding_util
from backend.db import supabase
from backend.config import settings
import asyncio

logger = logging.getLogger("uvicorn.error")


async def validate_pdf_upload(file: UploadFile):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=415,
            detail="Invalid file type. Only PDF files are allowed."
        )

    first_chunk = await file.read(2048)

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=415, detail="Only PDF files are allowed")

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

async def embeddings_process(file: UploadFile = File(), title: str = None):
    await validate_pdf_upload(file)

    try:
        pdf_content = await file.read()
        pages = await asyncio.to_thread(
            pdf_util.extract_text,
            pdf_content
        )

        total_chunks = 0
        chunk_index = 0

        for page in pages:
            chunks = chunk_util.chunk_text(page["content"])
            embeddings = await embedding_util.text_embedding(chunks)

            for chunk, embedding in zip(chunks, embeddings):
                await asyncio.to_thread(
                    lambda chunk=chunk, embedding=embedding, chunk_index=chunk_index: supabase.table("pdfdocuments").insert({
                        "title": title,
                        "source": file.filename,
                        "content": chunk,
                        "page_number": page["page_number"],
                        "chunk_index": chunk_index,
                        "embedding": embedding
                    }).execute()
                )

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