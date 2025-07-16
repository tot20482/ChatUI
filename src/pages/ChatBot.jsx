import Chat from "../components/ChatBot/Chat";
import History from "../components/ChatBot/History";

const ChatBot = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[20%]">
        <History />
      </div>
      <div className="w-[80%]">
        <Chat />
      </div>
    </div>
  );
};

export default ChatBot;
