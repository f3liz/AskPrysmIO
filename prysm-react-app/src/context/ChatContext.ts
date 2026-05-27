import type { Message } from "../types";
import { createContext } from "react";

export interface ChatContextType {
    activeChat: string | null;
    changeActiveChat: (chatID: string) => void;
    startNewChat: () => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);