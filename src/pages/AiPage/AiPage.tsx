import "./AiPage.css";
import LeftSide from "./LeftSide/LeftSide";
import RightSide, { type IChatMessage } from "./RightSide/RightSide";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getSpecificSessionsDetail } from "@/api/ai";
import type { IServerMessage } from "@/types/SessionsDataTypes";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import Header from "@/components/Header/Header";
import AuthLocked from "@/components/AuthLocked/AuthLocked";

const AiPage = () => {
  const [selectedMode, setSelectedMode] = useState("CREATIVE");
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const { sessionId } = useParams();
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  const loadHistory = async (id: string) => {
    try {
      const data = await getSpecificSessionsDetail(id);
      const formattedHistory = data.messages.map((el: IServerMessage) => ({
        role: el.role,
        text: el.content,
      }));
      setMessages((prev) => {
        if (prev.length > 0 && formattedHistory.length === 0) {
          return prev;
        }
        return formattedHistory;
      });
    } catch (error) {
      console.error("Ошибка загрузки истории:", error);
    }
  };

  useEffect(() => {
    const stateMessages = location.state?.preserveMessages;
    if (stateMessages && Array.isArray(stateMessages)) {
      setMessages(stateMessages);
      window.history.replaceState({}, document.title, location.pathname);
      return;
    }

    if (sessionId) {
      loadHistory(sessionId);
    } else {
      setMessages([]);
    }
  }, [sessionId, location.state, location.pathname]);

  return (
    <div className="ai-page-layout">
      {isAuthenticated && (
        <LeftSide
          sessionId={sessionId}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
      )}

      <main className="ai-main-wrapper">
        <Header />

        {isAuthenticated ? (
          <RightSide
            sessionId={sessionId}
            selectedMode={selectedMode}
            messages={messages}
            setMessages={setMessages}
          />
        ) : (
          <AuthLocked />
        )}
      </main>
    </div>
  );
};

export default AiPage;
