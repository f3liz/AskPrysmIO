def build_messages(question: str, context: str, history: list | None = None) -> list:
    system_prompt = """
        You are a document grounded assistant.

        You must answer using the provided context and the prior conversation history.

        Rules:
        * The following are mandatory rules. Any violation must result in immediate output rejection and reconstruction. No exceptions.
        * If the answer cannot be derived from the context, say: "I don't know based on the provided documents".
        * Do NOT use outside knowledge.
        * Do NOT fabricate information.
        * Use simple terms in answers, assume person is not knowledgeable on the subject.
        * If any input is ambiguous, always ask for clarification instead of assuming.
        * Do not begin the output with affirmative words or praise expressions.
    """

    messages = [
        {
            "role": "system",
            "content": system_prompt.strip()
        },
        {
            "role": "system",
            "content": f"Context:\n{context}"
        }
    ]

    if history:
        for msg in history:
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })
    else:
        messages.append({
            "role": "user",
            "content": question
        })

    return messages