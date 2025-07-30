import React from "react";
import { ReactComponent as ChatbotIcon } from "../assets/chatbot.svg";

const SearchHome = () => {
  return (
    <div className="w-full h-screen bg-gray-400 flex justify-center items-center">
      <div className="w-[70%] h-[80%] bg-gray-200 rounded-3xl px-24 py-10">
        <p className="text-3xl font-bold">Select Search Mode</p>
        <div className="w-[10%] h-[6px] bg-[#38a44a] rounded-2xl mt-1"></div>
        <div className="w-full h-[70%] flex justify-between items-center mt-6">
          <div className="w-[30%] h-[70%] bg-white rounded-2xl">
            <ChatbotIcon className="w-16 h-16 fill-[#38a44a] hover:fill-green-600" />
          </div>
          <div className="w-[30%] h-[70%] bg-white rounded-2xl"></div>
          <div className="w-[30%] h-[70%] bg-white rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
