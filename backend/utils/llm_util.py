from openai import AsyncOpenAI
from config import settings

client = AsyncOpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url=settings.OPENROUTER_BASE_URL,
)

async def generate_answer(messages: list[dict]) -> str:
    response = await client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=messages,
        temperature=0.2,
        extra_headers={
            "HTTP-Referer": settings.APP_URL,
            "X-Title": settings.APP_NAME
        }
    )

    return response.choices[0].message.content