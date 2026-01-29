import React, { useEffect, useRef, useState } from "react";
import "./ComicChat.css";
import type { IMessages } from "@/pages/AdminPage/ui/Messages/types/chatTypes";
import { io, Socket } from "socket.io-client";

const ComicChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [input, setInput] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim() && socketRef.current) {
      const messagePayload = {
        content: input,
        ...(activeChatId ? { chatId: activeChatId } : {}),
      };
      socketRef.current.emit("send_message", messagePayload);
      setInput("");
    }
  };

  useEffect(() => {
    if (isOpen) {
      const socket = io("http://localhost:3000/support", {
        withCredentials: true,
        transports: ["polling", "websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("join_chat");
      });

      socket.on("message_history", (data) => {
        if (Array.isArray(data)) {
          setMessages(data);
          if (data.length > 0) {
            setActiveChatId(data[0].chatId);
          }
        } else if (data && Array.isArray(data.messages)) {
          setMessages(data.messages);
          setActiveChatId(data.chatId);
        }
      });

      socket.on("new_message", (msg: IMessages) => {
        setMessages((prev) => [...prev, msg]);
        if (!activeChatId) {
          setActiveChatId(msg.chatId);
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [activeChatId, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`comic-chat-container ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div className="comic-chat-window">
          <div className="header-container">
            <div className="comic-chat-header">
              <span className="comic-chat-title">SUPPORT HERO!</span>
            </div>
            <button
              className="comic-chat-close"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
          <div className="comic-chat-messages">
            {messages.map((msg, idx) => {
              const isUser = msg.senderRole?.trim().toUpperCase() === "USER";

              return (
                <div
                  key={idx}
                  className={`comic-message-bubble ${isUser ? "user" : "admin"}`}
                  style={{ alignSelf: isUser ? "flex-end" : "flex-start" }}
                >
                  <div className="message-content">{msg.content}</div>
                  {msg.createdAt && (
                    <div className="message-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="comic-chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="comic-chat-input"
            />
            <button className="comic-chat-send" onClick={handleSend}>
              SEND!
            </button>
          </div>
        </div>
      )}
      <button className="comic-chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "?" : "HELP!"}
      </button>
    </div>
  );
};

export default ComicChat;
