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
- This route verifies that the backend can successfully connect to Supabase. Main purpose of this route is to be used as a health check endpoint to confirm access to our database.
    - If connection is successful
    ```
    {
        "Status": "Connected to Supabase",
        "Rows": 1
    }
    ```
    - If connection is unsuccessful
    ```
    {
        "Status": "error",
        "Error": "error message"
    }
    ```
    - Example call using Check route
    ```
    async function checkDB() {
        const res = await fetch("http://localhost:8000/check/db");
        return await res.json();
    }

    checkDB().then(console.log);
    ```

## Embedding Route
- This POST route is responsible for taking in our PDFs that contain data and breaking them down to smaller pieces for embedding then storing them inside Supabase for later retrieval.
    - Requires form data with a file and title field with file being type PDF and title type string
    - Successful call of this route should return
    ```
    {
        "Total chunks inserted": 10
    }
    ```
    - Example call using Embedding route
    ```
    export async function sendEmbeddings(formData: object) {
    
        const route = import.meta.env.

        const response = await fetch(route, {
        method: "POST",
        headers: {
            enctype: "multipart/form-data",
        },
        body: JSON.stringify(formData),
        });

        const data = await response.json();
        return data.answer;
    } 
    ```