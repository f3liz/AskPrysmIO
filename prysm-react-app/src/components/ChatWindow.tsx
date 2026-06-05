import type { Message } from "../types";
import ChatBubble from "./ChatBubble";
import { sanitizeMessage } from "../utils/sanitize";
type ChatWindowProps = {
    messages: Message[]
    isTyping: boolean
    isLoading: boolean
    bottomRef: React.RefObject<HTMLDivElement | null>
    activeChatID: string | null
}

export function ChatWindow({ messages, isTyping, isLoading, bottomRef, activeChatID }: ChatWindowProps) {
    return (
    <div className="chat-messages">
        {isLoading ? (
            <p>Loading...</p>
        ) : messages.length > 0 ? (
            messages.map((message) => (
                <ChatBubble
                    content={sanitizeMessage(message.content)}
                    key={message.id}
                    role={message.role}
                    created_at={message.created_at}
                    id={message.id}
                    chat_id={message.chat_id}
                />
            ))
        ) : (
            <p>Start a new chat today!</p>
        )}

        {isTyping && (
            <div className="message assistant typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        )}

            <div ref={bottomRef} />
        </div>
    )
}