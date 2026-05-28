import { getHistory } from "../api/chatHistory";
import { ChatHistoryItem } from "./ChatHistoryItem";
import { useState, useEffect } from "react";
import { useChat } from "../context/useChat";
import type { Chat } from "../types";
import { chatData } from "../data/chats";


export function ChatSidebar(){
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {activeChat} = useChat();
    const {startNewChat} = useChat();


    useEffect(() => {
        async function retrieveHistory() {
            try {
                setChats(chatData);
            } catch (err) {
                setError("Failed to load chat history.");
            } finally {
                setLoading(false);
            }
        }
        retrieveHistory();
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
                chats.length === 0
                    ? <p className="sidebar-status">No chat history</p>
                    : chats.map((chat: Chat) => (
                        <ChatHistoryItem chat={chat} key={chat.id} isActive={chat.id === activeChat} />
                    ))
            )}
        </div>
    )
}