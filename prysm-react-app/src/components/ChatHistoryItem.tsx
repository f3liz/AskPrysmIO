import type { Chat } from "../types";
import { useAuth } from "../context/useAuth";

type ChatHistoryItemProps = {
    chat: Chat,
    isActive: boolean,
}

export function ChatHistoryItem({chat, isActive}: ChatHistoryItemProps){

    const {changeActiveChat} = useAuth()

    return(
        <div className={`chat-history-item ${isActive ? "active" : ""}`} onClick={()=>changeActiveChat(chat.id)}>
            <p>{chat.title}</p>
        </ div>
    )
}