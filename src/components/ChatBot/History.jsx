import React, { useState } from "react";

const History = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const historyItems = [
    { id: 1, title: "Thẻ img trong React" },
    { id: 2, title: "Kết nối API với Axios" },
    { id: 3, title: "Tạo giao diện chatbot" },
  ];

  return (
    <div className="flex flex-col py-6 px-2 h-full w-full border-r border-gray-200 shadow">
      <div className="ml-3">
        <p className="text-gray-500">Đoạn chat</p>
      </div>

      <div className="flex flex-col mt-2 space-y-2 h-full">
        {historyItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`py-2 px-3 rounded-lg cursor-pointer transition-all ${
              activeIndex === index ? "bg-gray-200" : ""
            }`}
          >
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
