import React, { useState } from "react";
import newchat from "../../assets/newchat.png";
import vpbanklogo from "../../assets/VPBank_logo.png";
import sidebarOpen from "../../assets/sidebar_open.png";
import sidebarClose from "../../assets/sidebar_close.png";

const History = ({ isSidebarOpen, setSidebarOpen }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const historyItems = [
    { id: 1, title: "Thẻ img trong React" },
    { id: 2, title: "Kết nối API với Axios" },
    { id: 3, title: "Tạo giao diện chatbot" },
  ];

  return (
    <div
      className={`h-full border-r border-gray-200 shadow py-4 bg-white transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-[60px]"
      }`}
    >
      <div className="mx-3 flex justify-between items-center mb-8">
        {isSidebarOpen && (
          <div className="h-10 flex items-center justify-center">
            <img src={vpbanklogo} alt="Logo uit" className="h-[24px]" />
          </div>
        )}
        <button
          className="cursor-pointer flex justify-center items-center w-8 h-8 rounded-full "
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <img
            src={isSidebarOpen ? sidebarClose : sidebarOpen}
            alt={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            className="w-7 h-7"
          />
        </button>
      </div>

      <div className="mx-1 flex items-end space-x-3 mb-6 hover:bg-gray-100 rounded-lg cursor-pointer p-2">
        <img src={newchat} alt="Add" className="w-7 h-7" />
        {isSidebarOpen && <p>Đoạn chat mới</p>}
      </div>

      {isSidebarOpen && (
        <>
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
        </>
      )}
    </div>
  );
};

export default History;
