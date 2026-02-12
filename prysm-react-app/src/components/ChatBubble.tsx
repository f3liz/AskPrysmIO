import '../styles/chatbot.css'
import type { Message } from '../types'

export default function ChatBubble({content, role} : Message){

    return(
        <div className={`message ${role}`}>
            <p>{content}</p>
        </div>
    )
}