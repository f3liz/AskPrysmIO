from utils import question_retrieval_util, prompting_util, llm_util

MAX_CHARS_CONTEXT = 4000

async def generate_response(question: str) -> str:
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