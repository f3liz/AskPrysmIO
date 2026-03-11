from db import supabase
from .embedding_util import question_embedding
import re

def question_cleanup(question: str) -> str:
    question = question.strip()

    question = re.sub(r"\s+", " ", question)

    return question

async def search_docs(question: str, matches: int = 5, threshold = 0.75):
    embedding = question_embedding(question)

    response = supabase.rpc(
        "match_documents",
        {
            "query_embedding" : embedding,
            "match_threshold" : threshold,
            "match_count" : matches
        }
    ).execute()

    return response.data