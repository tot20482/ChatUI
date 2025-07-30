import React, { useState } from "react";
import newchat from "../../assets/newchat.png";

const History = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const historyItems = [
    { id: 1, title: "Image tag in React" },
    { id: 2, title: "Connect API using Axios" },
    { id: 3, title: "Build Chatbot Interface" },
  ];

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 shadow transition-all duration-300 ease-in-out flex flex-col ${"w-64 px-4"} py-4`}
    >
      {/* New Chat */}
      <div className="flex items-center space-x-3 mb-5 hover:bg-gray-100 rounded-lg cursor-pointer p-2">
        <img src={newchat} alt="New Chat" className="w-6 h-6" />
        <span className="font-medium">New Chat</span>
      </div>

      {/* Chat List */}
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-2 ml-1">
          Chat History
        </p>
        <div className="flex flex-col space-y-1 overflow-y-auto">
          {historyItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`py-2 px-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
                activeIndex === index ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
