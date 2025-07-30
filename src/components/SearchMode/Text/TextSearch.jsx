import React, { useState, useEffect, useRef } from "react";
import search from "../../../assets/search.png";
import historyIcon from "../../../assets/history.png";

const TextSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const boxRef = useRef();

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("search-history")) || [];
    setHistory(stored);
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    const newHistory = [
      searchText,
      ...history.filter((item) => item !== searchText),
    ];
    const trimmed = newHistory.slice(0, 10);
    setHistory(trimmed);
    localStorage.setItem("search-history", JSON.stringify(trimmed));
    setShowHistory(false);
    console.log("Searching:", searchText);
  };

  const handleSelect = (text) => {
    setSearchText(text);
    setShowHistory(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#daf1de]">
      <div ref={boxRef} className="w-[60%] max-w-2xl bg-white rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex items-center overflow-hidden rounded-3xl px-4 py-4"
        >
          <div className="mr-3 flex justify-center items-center">
            <img src={search} alt="Search icon" className="h-6 w-6" />
          </div>
          <input
            type="text"
            value={searchText}
            onFocus={() => history.length > 0 && setShowHistory(true)}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="flex-1 text-gray-800 text-sm outline-none border-none bg-transparent"
          />
        </form>

        {/* Dropdown history below input */}
        {showHistory && history.length > 0 && (
          <div className="max-h-[200px] overflow-y-auto">
            {history.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-2 px-6 py-2 mt-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                  index === history.length - 1 ? "hover:rounded-b-3xl" : ""
                }`}
              >
                <img src={historyIcon} alt="History icon" className="h-4 w-4" />
                <span className="text-[16px]">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSearch;
