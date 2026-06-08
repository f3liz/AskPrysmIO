import { retrieveMessages } from "../api/chatHistory";
import { ChatHistoryItem } from "./ChatHistoryItem";
import { useState, useEffect } from "react";
import { useChat } from "../context/useChat";
import type { Chat } from "../types";


export function ChatSidebar(){
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {activeChat} = useChat();
    const {startNewChat} = useChat();


    useEffect(() => {
        let active = true;
        async function retrieveHistory() {
            try {
                const response = await retrieveMessages()
                if (active) setChats(response);
            } catch (err) {
                if (active) setError("Failed to load chat history.");
            } finally {
                if (active) setLoading(false);
            }
        }
        retrieveHistory();
        return () => {active = false;}
    }, []);

    return (
        <div className="sidebar">
            <button className="new-chat-btn" onClick={startNewChat}>New Chat</button>
            {loading && (
                <p className="sidebar-status">Loading...</p>
            )}

            {error && (
                <p className="sidebar-status sidebar-error">{error}</p>
            )}

            {!loading && !error && (
                chats.length === 0 ? (
                    <p className="sidebar-status">No chat history</p>
                ) : (
                    <div className="sidebar-items">
                        {chats.map((chat: Chat) => (
                            <ChatHistoryItem
                                chat={chat}
                                key={chat.id}
                                isActive={chat.id === activeChat}
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    )
}