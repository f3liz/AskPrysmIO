import { api } from "./api";
import type { Chat } from "../types";

export async function retrieveMessages(): Promise<Chat[]> {
    try{
        const response = await api.get("/chats/history");
        return response.data;
    } catch (error){
        console.error("Failed to retrieve message history");
        throw error;
    }
}

export async function retrieveChatHistory(id: string | null): Promise<any> {
    try{
        const response = await api.get(`/chats/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve chat history.`);
        throw error;
    }
}