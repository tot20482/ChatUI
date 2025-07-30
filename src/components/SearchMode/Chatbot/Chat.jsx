import React, { useState } from "react";

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Hello! How can I help you?" },
    { type: "user", text: "Can you explain our system?" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user's message to chat
    const newMessage = { type: "user", text: inputText };
    setChatMessages((prev) => [...prev, newMessage]);

    // Clear input
    setInputText("");

    // (Optional) Add bot response placeholder
    setChatMessages((prev) => [
      ...prev,
      newMessage,
      { type: "bot", text: "This is a static response." },
    ]);
  };

  return (
    <div className="w-[80%] max-w-4xl flex flex-col h-[70vh] bg-white rounded-2xl shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-[#daf1de] rounded-t-2xl py-8 px-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                message.type === "user"
                  ? "bg-[#38a44a] text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-4 flex items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập tin nhắn của bạn..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="ml-2 bg-[#38a44a] text-white rounded-full w-10 h-10 flex items-center justify-center hover:brightness-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
