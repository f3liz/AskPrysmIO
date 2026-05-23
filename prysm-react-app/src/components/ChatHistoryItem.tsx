import type { Chat } from "../types"

type ChatHistoryItemProps = {
    chat: Chat,
    onClick: () => void;
}

export function ChatHistoryItem({chat, onClick}: ChatHistoryItemProps){

    return(
        <div className="chat-history-item" onClick={onClick}>
            <p>${chat.title}</p>
        </ div>
    )
}