from openai import OpenAI
from config import settings

client = OpenAI(api_key=settings.OPENAI_EMBEDDING_KEY)

def text_embedding(text_chunks: list[str]) -> list[list[float]]:
    response = client.embeddings.create(
        model="text-embedding-3-large",
        input=text_chunks
    )

    return [item.embedding for item in response.data]