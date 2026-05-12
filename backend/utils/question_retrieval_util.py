from backend.db import supabase
from .embedding_util import question_embedding
import re
import asyncio

def question_cleanup(question: str) -> str:
    question = question.strip()

    question = re.sub(r"\s+", " ", question)

    question = re.sub(r"[^a-zA-Z0-9\s.,!?'-]", "", question)

    return question

async def search_docs(question: str, matches: int = 3, threshold=0.75):
    clean_question = question_cleanup(question)

    embedding = await question_embedding(clean_question)

    response = await asyncio.to_thread(
        lambda: supabase.rpc(
            "match_documents",
            {
                "query_embedding": embedding,
                "match_threshold": threshold,
                "match_count": matches
            }
        ).execute()
    )

    return response.data