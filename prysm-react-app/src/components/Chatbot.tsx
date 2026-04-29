import { useState } from "react"
import ChatBubble from "./ChatBubble";
import type { Message } from '../types'
import '../styles/chatbot.css'
import { sendChatQuestion } from "../api/chat";

export default function Chatbot(){
    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (!question.trim()) return

        setChat(prev => [...prev, {content: question, role: "user"}]);
        setQuestion(""); 
        
        setIsLoading(true);

        try {
            const answer = await sendChatQuestion(question);
            setChat(prev => [...prev, {content: answer, role: "assistant"}]);
        } catch(error) {
            setChat(prev => [...prev, {content: "Unable to answer question", role: "assistant"}]);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="chat-container">
            <div className="chat-messages">
                {chat.map((message, index) => (
                    <ChatBubble key={index} content={message.content} role={message.role} />
                ))}
                
                {isLoading && (
                    <div className="message assistant">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
            </div>
            <form className="chatbot-input" onSubmit={handleSubmit}>
                <input 
                    className="input-area" 
                    placeholder="Type your message..." 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>Send</button>
            </form>
        </div>
    )
}