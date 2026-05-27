import { useState, type ReactNode} from 'react';
import type { Message } from '../types';
import { ChatContext } from './ChatContext';

export const ChatProvider = ({children}: {children: ReactNode}) =>{
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const changeActiveChat = (chatID: string) => {
        setActiveChat(chatID);
        setMessages([])
    };

    const startNewChat = () => {
        console.log("Starting new chat")
        setActiveChat(null);
        setMessages([]);
    }

    return(
        <ChatContext.Provider value={{activeChat, changeActiveChat, startNewChat, messages, setMessages}}>
            {children}
        </ChatContext.Provider>
    )
}