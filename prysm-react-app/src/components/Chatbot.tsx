import { useState } from "react"
import ChatBubble from "./ChatBubble";
import '../styles/chatbot.css'

export default function Chatbot(){

    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState<string[]>([])

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (!question) return

        setChat(prev => [...prev, "You: " + question, "PrysmIO Chatbot: It's best to use your index finger for the scan."])

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