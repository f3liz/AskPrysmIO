import { useState } from "react"
import ChatBubble from "./ChatBubble";
import type { Message } from '../types'
import '../styles/chatbot.css'

export default function Chatbot(){

    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState<Message[]>([])

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (!question) return

        setChat(prev => [...prev, 
            { content: question, role: "user" },
            { content: "It's best to use your index finger for the scan.", role: "assistant" }
        ])

        setQuestion("")
    }


    return(
        <div className="chat-container">
            <div className="chat-messages">
                {chat.map((message, index) => (
                    <ChatBubble key={index} content={message.content} role={message.role} />
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