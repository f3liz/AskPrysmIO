import { api } from "./api";

export async function sendChatQuestion(question: string,chatID: string | null): Promise<{ answer: string; chatId: string }> {
  try {
    const response = await api.post("/chats/", {
      question,
      chat_id: chatID,
    });
    return {
      answer: response.data.answer,
      chatId: response.data.chat_id,
    };
  } catch (error) {
    console.error("Question failed to send: ", error);
    throw error;
  }
}
