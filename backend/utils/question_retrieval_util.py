from db import supabase
from embedding_util import question_embedding

async def search_docs(question: str, matches: int = 5, threshold = 0.75):
    embedding = await question_embedding(question)

    response = supabase.rpc(
        "match_docments",
        {
            "question_embedding" : question_embedding,
            "match_threshold" : threshold,
            "match_count" : matches
        }
    ).execute()

    return response.data