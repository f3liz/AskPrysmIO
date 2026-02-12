import '../styles/chatbot.css'
import type { Message } from '../types'

export default function ChatBubble({content, role} : Message){

    return(
        <div className="chat-bubble">
            <p>{content}</p>
        </div>
    )
}