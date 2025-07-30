import { useState } from "react";
import History from "../components/ChatBot/History";
import NavBar from "../components/SearchMode/NavBar";
import Chat from "../components/SearchMode/Chatbot/Chat";

const ChatBot = () => {
  const [isHistory, setIsHistory] = useState(false);
  return (
    <div className="h-full w-full">
      <NavBar isHistory={isHistory} setIsHistory={setIsHistory} />
      {isHistory === true ? (
        <div className="min-h-[87vh] w-full flex">
          <div className="w-[20%]">
            <History />
          </div>
          <div className="w-[80%] flex justify-center items-center">
            <Chat />
          </div>
        </div>
      ) : (
        <div className="w-full min-h-[87vh]  flex justify-center items-center">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
