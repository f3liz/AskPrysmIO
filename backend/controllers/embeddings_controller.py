from fastapi import UploadFile, File, HTTPException, Form
from utils import  pdf_util, chunk_util, embedding_util
from db import supabase

async def embeddings_process(file: UploadFile = File(), title: str = Form(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        pdf_content = await file.read()
        pages = pdf_util.extract_text(pdf_content)

        total_chunks = 0
        chunk_index = 0
        
        for page in pages:
            chunks = chunk_util.chunk_text(page["content"])
            embeddings = embedding_util.text_embedding(chunks)

            for chunk, embedding in zip(chunks, embeddings):
                supabase.table("pdfdocuments").insert({
                    "title" : title,
                    "source" : file.filename,
                    "content" : chunk,
                    "page_number" : page["page_number"],
                    "chunk_index" : chunk_index,
                    "embedding" : embedding
                }).execute()

                chunk_index += 1

        total_chunks += len(chunks)

        return{
            "Total chunks inserted" : total_chunks
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Embedding Error: {str(e)}")