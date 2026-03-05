from utils import question_retrieval_util

async def generate_response(question: str) -> str:
    results = await question_retrieval_util.search_docs(question)

    if not results:
        return "No relevant information found in database."
    
    context = "\n\n".join(chunk["content"] for chunk in results)

    return context[:500]