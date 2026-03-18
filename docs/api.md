# API Documentation
- Instructions on how to use each route. 
    - What content / parameters are needed for each API route?
    - What purpose does each API route serve?
    - Are there any known errors when using this route?
    - How could a developer call / implement each API route in their own code.

## Chat Route
- This is a POST route to send user questions to backend and receive a generateed response back. Main entry point for interacting with our RAG chatbot.
    - This endpoint requires a question field to be sent in with a type of string
    ```
    {
        "question": "Which finger do  I use to scan with?"
    }
    ```
    - This endpoint with return an answer field with a type of string
    ```
    {
        "answer": "It's best to use your index finger."
    }
    ```
    - If question is missing or not a string, FastAPI validation returns 422 error
    - Example call using Chat route
    ```
    export async function sendChatQuestion(question: string): Promise<string> {

        const response = await fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        const data = await response.json();
        return data.answer
    }
    ```

## Check Route

## Embedding Route