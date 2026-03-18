from openai import OpenAI
from config import settings

client = OpenAI(api_key=settings.OPENAI_EMBEDDING_KEY)

def embed_text(input_text: str | list[str]):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=input_text
    )

    if isinstance(input_text, list):
        return [item.embedding for item in response.data]
    
    return response.data[0].embedding

def question_embedding(question: str) -> list[float]:
    return embed_text(question)

def text_embedding(text_chunks: list[str]) -> list[list[float]]:
    return embed_text(text_chunks)