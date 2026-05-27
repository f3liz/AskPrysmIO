import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatWindow } from "./ChatWindow";
import type { Message } from "../types";
import { sendChatQuestion } from "../api/chat";
import { useChat } from "../context/useChat";
import { messageData } from "../data/messages";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {activeChat, messages, setMessages} = useChat();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // scrolling
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(()=> {
    if (!activeChat) return

    async function loadMessages(){
      setMessages(messageData);
    }

    loadMessages();
  }, [activeChat])

  useEffect(()=>{
    console.log(messages)
  }, [messages])
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!question.trim() || isTyping) return;

    const currentQuestion = question;

    const userMessage: Message = {
      content: currentQuestion,
      role: "user",
      id: uuidv4(),
      created_at: new Date(),
      chat_id: "",
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setQuestion("");
    setIsTyping(true);

    try {
      const answer = await sendChatQuestion(currentQuestion);

      const botMessage: Message = {
        content: answer,
        role: "assistant",
        created_at: new Date(),
        id: uuidv4(),
        chat_id: "",
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (error: unknown) {
      console.error("Chat API Error:", error);

      // Default fallback message
      let errorMessage = "Unable to answer question";

      if (typeof error === "object" && error !== null) {
        const err = error as {
          status?: number;
          response?: {
            status?: number;
            data?: {
              detail?: string;
              error?: { type?: string; message?: string };
            };
          };
          message?: string;
        };

        if (err.message?.includes("Network Error")) {
          errorMessage =
            "Unable to connect to the server. Please refresh the page or try again later.";
        } else if (
          err.status === 429 ||
          err.response?.status === 429 ||
          err.message?.includes("429")
        ) {
          errorMessage =
            "Too many requests. Please wait a couple of seconds and try again.";
        } else if (err.response?.status === 503 && err.response?.data?.detail) {
          errorMessage = err.response.data.detail;
        } else if (
          err.response?.data?.error?.type === "insufficient_quota" ||
          err.response?.data?.error?.message?.includes(
            "exceeded your current quota",
          )
        ) {
          errorMessage =
            "Our AI is currently out of credits! Please try again later.";
        }
      }

      setMessages([...updatedMessages, {
        content: errorMessage,
        role: "assistant",
        created_at: new Date(),
        id: uuidv4(),
        chat_id: "",
    }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-container">
      <ChatWindow messages={messages} isTyping={isTyping} bottomRef={bottomRef} activeChatID={activeChat} />

      <form className="chatbot-input" onSubmit={handleSubmit}>
        <input
          className="input-area"
          placeholder="Type your message..."
          type="text"
          value={question}
          disabled={isTyping}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit" disabled={isTyping}>
          {isTyping ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
