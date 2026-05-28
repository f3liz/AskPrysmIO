import type { Chat } from "../types";
import { useChat } from "../context/useChat";

type ChatHistoryItemProps = {
    chat: Chat,
    isActive: boolean,
}

export function ChatHistoryItem({chat, isActive}: ChatHistoryItemProps){

    const {changeActiveChat} = useChat()

    return(
        <div className={`chat-history-item ${isActive ? "active" : ""}`} onClick={()=>changeActiveChat(chat.id)}>
            <p>{chat.title}</p>
        </ div>
    )
}