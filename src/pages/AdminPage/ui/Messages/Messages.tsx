import { useState, useEffect, useRef } from "react";
import "./Messages.css";
import { initSupport } from "@/api/chat";
import type { IChat, IMessages } from "./types/chatTypes";
import { io, Socket } from "socket.io-client";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const currentChat = chats.find((c) => c.id === selectedChat);

  const handleSend = () => {
    if (input.trim() && selectedChat && socketRef.current) {
      socketRef.current.emit("send_message", {
        chatId: selectedChat,
        content: input,
      });
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  useEffect(() => {
    const socket = io("http://localhost:3000/support", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      if (selectedChat)
        socket.emit("admin_join_chat", { chatId: selectedChat });
    });

    socket.on("message_history", ({ chatId, messages }) => {
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, messages } : c)),
      );
    });

    socket.on("new_message", (message: IMessages) => {
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (chat.id === message.chatId) {
            return {
              ...chat,
              messages: [...(chat.messages || []), message],
            };
          }
          return chat;
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat && socketRef.current) {
      socketRef.current.emit("admin_join_chat", { chatId: selectedChat });
    }
  }, [selectedChat]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await initSupport();
        setChats(data);
      } catch (error) {
        console.error("Ошибка при получении чатов:", error);
      }
    };
    getChats();
  }, []);

  return (
    <div className="comic-messages-container">
      <div className="chats-sidebar">
        <div className="sidebar-header">
          <h2 className="panel-title">CHATS! </h2>
        </div>
        <div className="chats-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat === chat.id ? "active" : ""}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="chat-avatar">{chat.user.email[0]}</div>
              <div className="chat-info">
                <div className="chat-name">{chat.user.email}</div>
                {/* <div className="chat-last-msg">{chat.lastMessage}</div> */}
              </div>
              <div className={`status-indicator ${chat.status}`}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {selectedChat && currentChat ? (
          <>
            <div className="chat-header">
              <h2 className="chat-title">
                TALKING TO {currentChat.user.email}!
              </h2>
            </div>
            <div className="messages-display">
              {currentChat.messages.map((el) => {
                return (
                  <div
                    key={el.id}
                    className={`message-row ${el.senderRole === "USER" ? "user" : "admin"}`}
                  >
                    <div className="message-bubble">
                      <p className="message-text">{el.content}</p>
                      <span className="message-time">
                        {new Date(el.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="message-input-area">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="comic-input"
                  placeholder="TYPE SOMETHING DRAMATIC!..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="comic-send-btn" onClick={handleSend}>
                  SEND! BAM!
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="comic-card">
              <p>CHOOSE A HERO TO TALK TO!</p>
              <p className="sub-text">THE WORLD IS WAITING...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
