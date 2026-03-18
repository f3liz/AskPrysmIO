from openai import AsyncOpenAI
from config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_EMBEDDING_KEY)

async def embed_text(input_text: str | list[str]):
    response = await client.embeddings.create(
        model="text-embedding-3-small",
        input=input_text
    )

    if isinstance(input_text, list):
        return [item.embedding for item in response.data]
    
    return response.data[0].embedding

async def question_embedding(question: str) -> list[float]:
    return await embed_text(question)

async def text_embedding(text_chunks: list[str]) -> list[list[float]]:
    return await embed_text(text_chunks)