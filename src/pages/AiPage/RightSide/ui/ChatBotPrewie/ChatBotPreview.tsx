import { ChatBotPreview } from "@/const/ChatBotPreview";
import { Typography } from "antd";
import "./ChatBotPrewie.css";

const ChatBotPrewiew = () => {
  return (
    <div className="all-block">
      <div className="AI-title-block">
        <Typography className="AI-title">Chat Bot</Typography>
        <Typography className="AI-description">Ver 1.0</Typography>
      </div>
      <div className="all-notification">
        {ChatBotPreview.map((el) => (
          <div className="notification-element" key={el.id}>
            <div className="notification-block-wrapper">
              <div className="icon-block">{el.blockIcon}</div>
              <div>
                <Typography className="first-block-title">
                  {el.firstBlock.blockTitle}
                </Typography>
                <Typography className="first-block-description">
                  {el.firstBlock.blockDescription}
                </Typography>
              </div>
            </div>
            <div className="notification-block-wrapper">
              <Typography>{el.secondBlock.blockDescription}</Typography>
            </div>
            <div className="notification-block-wrapper">
              <Typography>{el.thirdBlock.blockDescription}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBotPrewiew;
