import logging
from fastapi import HTTPException
from backend.utils import question_retrieval_util, prompting_util, llm_util

logger = logging.getLogger("uvicorn.error")

MAX_CHARS_CONTEXT = 4000


async def generate_response(question: str) -> str:
    try:
        results = await question_retrieval_util.search_docs(question)

        if not results:
            return "No relevant information found in database."

        context_chunks = []
        size = 0

        for chunk in results:
            text = chunk["content"]

            if size + len(text) > MAX_CHARS_CONTEXT:
                break

            context_chunks.append(text)
            size += len(text)

        context = "\n\n".join(context_chunks)

        messages = prompting_util.build_messages(question, context)

        answer = await llm_util.generate_answer(messages)

        return answer

    except HTTPException:
        raise

    except Exception:
        logger.error("Chat response generation failed", exc_info=True)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate response. Please try again later."
        )