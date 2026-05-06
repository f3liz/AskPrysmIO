import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from "./ChatBubble";
import type { Message } from "../types";
import "../styles/chatbot.css";
import { sendChatQuestion } from "../api/chat";

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

    // prevent sending 
    if (!question.trim() || isTyping) return;

    const userMessage: Message = {
      content: question,
      role: "user",
      timestamp: Date.now(),
      id: uuidv4()
    };

    setChat((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsTyping(true);

    try {
      const answer = await sendChatQuestion(question);

      const botMessage: Message = {
        content: answer,
        role: "assistant",
        timestamp: Date.now(),
        id: uuidv4()
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          content: "Unable to answer question",
          role: "assistant",
          timestamp: Date.now(),
          id: uuidv4()
        },
      ]);
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chat.map((message) => (
          <ChatBubble
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