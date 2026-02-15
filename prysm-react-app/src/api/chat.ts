export async function sendChatQuestion(question: string): Promise<string> {
    try {
        const response = await fetch("route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error(`Error with backend: ${response.status}`)
        }

        const data = await response.json();
        return data.answer
    } catch (error) {
        console.error("Question failed to send: ", error)
        throw error
    }
}