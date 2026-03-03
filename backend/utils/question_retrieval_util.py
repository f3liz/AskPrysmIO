from db import supabase
from embedding_util import question_embedding

async def search_docs(question: str, matches: int = 5):
    embedding = await question_embedding(question)

    response = supabase