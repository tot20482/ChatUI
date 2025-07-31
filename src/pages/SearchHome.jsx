import React, { useState } from "react";
import text from "../assets/textG.png";
import form from "../assets/formG.png";
import chatbot from "../assets/chatbotG.png";
import { useNavigate } from "react-router-dom";

const SearchHome = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("");

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    navigate(`/home/${mode}`);
  };

  return (
    <div className="w-full h-screen bg-gray-400 flex justify-center items-center">
      <div className="w-[70%] h-[80%] bg-gray-200 bg-opacity-100 rounded-3xl px-24 py-10">
        <p className="text-3xl font-bold">Select Search Mode</p>
        <div className="w-[10%] h-[6px] bg-[#38a44a] rounded-2xl mt-1"></div>
        <div className="w-full h-[70%] flex justify-between items-center mt-6">
          <div
            onClick={() => handleSelectMode("text")}
            className="w-[30%] h-[70%] bg-white rounded-2xl flex flex-col justify-center items-center space-y-4 hover:bg-[#daf1df] cursor-pointer"
          >
            <img src={text} alt="Search by text" className="h-[40%]" />
            <p className="text-xl font-bold ">Search by Text</p>
          </div>
          <div
            onClick={() => handleSelectMode("form")}
            className="w-[30%] h-[70%] bg-white rounded-2xl flex flex-col justify-center items-center space-y-4 hover:bg-[#daf1df] cursor-pointer"
          >
            <img src={form} alt="Guided Form" className="h-[40%]" />
            <p className="text-xl font-bold ">Guided Form</p>
          </div>
          <div
            onClick={() => handleSelectMode("chatbot")}
            className="w-[30%] h-[70%] bg-white rounded-2xl flex flex-col justify-center items-center space-y-4 hover:bg-[#daf1df] cursor-pointer"
          >
            <img src={chatbot} alt="Smart Chatbot" className="h-[40%]" />
            <p className="text-xl font-bold ">Smart Chatbot</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="px-10 py-3 bg-gray-100 rounded-4xl hover:scale-105 active:scale-100 cursor-pointer"
          >
            <p className="font-semibold text-gray-500">Back</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
