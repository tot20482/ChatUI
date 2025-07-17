import { useState } from "react";
import Chat from "../components/ChatBot/Chat";
import History from "../components/ChatBot/History";

const ChatBot = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex">
      <div className={`${isSidebarOpen ? "w-[20%]" : "w-[5%]"} h-full`}>
        <History
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div
        className={`${
          isSidebarOpen ? "w-[80%]" : "w-[95%]"
        } h-full flex justify-center items-center`}
      >
        <Chat />
      </div>
    </div>
  );
};

export default ChatBot;
