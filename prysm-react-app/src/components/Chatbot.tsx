import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from "./ChatBubble";
import type { Message } from "../types";
import "../styles/chatbot.css";
import { sendChatQuestion } from "../api/chat";
import { sanitizeMessage } from "../utils/sanitize";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // scrolling
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!question.trim() || isTyping) return;

    const currentQuestion = question;

    const userMessage: Message = {
      content: currentQuestion,
      role: "user",
      timestamp: Date.now(),
      id: uuidv4()
    };

    setChat((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsTyping(true);

    try {
      const answer = await sendChatQuestion(currentQuestion);

      const botMessage: Message = {
        content: answer,
        role: "assistant",
        timestamp: Date.now(),
        id: uuidv4()
      };

      setChat((prev) => [...prev, botMessage]);
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

      setChat((prev) => [
        ...prev,
        {
          content: errorMessage,
          role: "assistant",
          timestamp: Date.now(),
          id: uuidv4()
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chat.map((message) => (
          <ChatBubble
            key={index}
            content={sanitizeMessage(message.content)}
            key={message.id}
            content={message.content}
            role={message.role}
            timestamp={message.timestamp}
            id={message.id}
          />
        ))}
        {/* Shows the typing indicator */}
        {isTyping && (
          <div className="message assistant typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

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
