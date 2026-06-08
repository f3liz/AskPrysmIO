import type { Message } from "../types";
import ReactMarkdown from 'react-markdown'

export default function ChatBubble({
  content,
  role,
  created_at,
}: Message) {
  const time = new Date(created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message ${role}`}>
      <div className="bubble">
        <div className="markdown">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <span className="timestamp">{time}</span>
      </div>
    </div>
  );
}