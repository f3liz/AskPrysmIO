import { api } from "./api";

export async function getHistory(): Promise<string> {
    try{
        const response = await api.get("/chats/history");
        return response.data;
    } catch (error){
        console.error("Failed to retrieve chat history");
        throw error;
    }
}