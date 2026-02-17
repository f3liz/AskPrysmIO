import { useState } from "react"
import ChatBubble from "./ChatBubble";
import '../styles/chatbot.css'
import { sendChatQuestion } from "../api/chat";

export default function Chatbot(){

    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState<string[]>([])

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (!question) return

        // mocked chat
        // setChat(prev => [...prev, "You: " + question, "PrysmIO Chatbot: It's best to use your index finger for the scan."])

        setChat(prev => [...prev, "You: " + question]);

        try {
            const answer = await sendChatQuestion(question);

            setChat(prev => [...prev, "PrysmIO Chatbot: " + answer]);
        } catch(error) {
            setChat(prev => [...prev, "PrysmIO Chatbot: Unable to get answer."]);
            console.log(error)
        }

        setQuestion("")
    }


    return(
        <div className="chat-container">
            <div className="chat-messages">
                {chat.map((line) => (
                    <ChatBubble content={line} />
                ))}
            </div>
            <form className="chatbot-input" onSubmit={handleSubmit}>
                <input className="input-area" placeholder="Type your message..." type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                />
                <button type="submit"></button>
            </form>
        </div>

    )
}