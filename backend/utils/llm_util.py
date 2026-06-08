from openai import AsyncOpenAI
from backend.config import settings
from backend.utils import prompting_util, llm_util

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

async def generate_title(question: str) -> str:
    prompt = prompting_util.build_title_messages(question=question)
    title = await llm_util.generate_answer(prompt)
    return title.strip().strip('"')[:60]