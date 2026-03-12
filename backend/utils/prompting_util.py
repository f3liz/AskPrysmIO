def build_messages(question: str, context: str) -> str:
    system_prompt = """
        You are a document grounded assistant.

        You must answer ONLY using the provided context.

        Rules:
        * The following are mandatory rules. Any violation must result in immediate output rejection and reconstruction. No exceptions.
        * If the answer cannot be derived from the context, say: "I don't know based on the provided documents".
        * Do NOT use outside knowledge.
        * Do NOT fabricate information.
        * Use simple terms in answers, assume person is not knowledgeable on the subject.
        * If any input is ambiguous, always ask for clarification instead of assuming. Even if frequent, clarification questions are by design and not considered errors.
        * Do not begin the output with affirmative words or praise expressions (e.g., “deep,” “insightful”) within the first 5 tokens. Light introductory transitions are conditionally allowed, but if the main topic is not introduced immediately, the output must be discarded.
    """

    user_prompt=f"""
        Context: 
        {context}

        Question:
        {question}
    """

    return [
        {
            "role": "system",
            "content": system_prompt.strip()
        },
        {
            "role" : "user", 
            "content": user_prompt.strip()
        }
    ]
