import '../styles/chatbot.css'

export default function ChatBubble({ content }: {content: String}){

    return(
        <div className="chat-bubble">
            <p>{content}</p>
        </div>
    )
}