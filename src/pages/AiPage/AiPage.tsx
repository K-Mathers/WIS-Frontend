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
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeInDown } from "@/utils/animations";

const AiPage = () => {
  const [selectedMode, setSelectedMode] = useState("CREATIVE");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const { sessionId } = useParams();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const {
    data: historyData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["session-history", sessionId],
    queryFn: () => getSpecificSessionsDetail(sessionId as string),
    enabled: !!sessionId,
    select: (data) => {
      return data.messages.map((el: IServerMessage) => ({
        role: el.role,
        text: el.content,
      }));
    },
  });

  useEffect(() => {
    const stateMessages = location.state?.preserveMessages;
    if (stateMessages && Array.isArray(stateMessages)) {
      setMessages(stateMessages);
      window.history.replaceState({}, document.title, location.pathname);
      return;
    }

    if (historyData) {
      setMessages(historyData);
    } else if (!sessionId) {
      setMessages([]);
    }
  }, [historyData, sessionId, location.state, location.pathname]);

  if (isPending && !!sessionId)
    return <div className="comic-loader">LOADING MESSAGES...</div>;
  if (isError)
    return <div className="error">Error loading data: {error.message}</div>;

  return (
    <div className="ai-page-layout">
      {isAuthenticated && (
        <LeftSide
          sessionId={sessionId}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
      )}

      <motion.main
        className="ai-main-wrapper"
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
      >
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
      </motion.main>
    </div>
  );
};

export default AiPage;
