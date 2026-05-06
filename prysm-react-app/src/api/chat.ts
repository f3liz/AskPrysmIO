import { api } from "./api";

export async function sendChatQuestion(question: string): Promise<string> {
  try {
    const response = await api.post("/chats/", { question });
    return response.data.answer;
  } catch (error) {
    console.error("Question failed to send: ", error);
    throw error;
  }
}
