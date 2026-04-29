import "../styles/chatbot.css";
import type { Message } from "../types";

export default function ChatBubble({
  content,
  role,
  timestamp,
}: Message) {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message ${role}`}>
      <div className="bubble">
        <p>{content}</p>
        <span className="timestamp">{time}</span>
      </div>
    </div>
  );
}