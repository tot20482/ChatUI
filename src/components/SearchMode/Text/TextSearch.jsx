import React, { useState, useEffect, useRef } from "react";
import search from "../../../assets/search.png";
import historyIcon from "../../../assets/history.png";
import ResultList from "../ResultList";
import Loading from "../../Loading";

const TextSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const boxRef = useRef();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("search-history")) || [];
    setHistory(stored);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitSearch = async (query) => {
    const newHistory = [query, ...history.filter((item) => item !== query)];
    const trimmed = newHistory.slice(0, 10);
    setHistory(trimmed);
    localStorage.setItem("search-history", JSON.stringify(trimmed));
    setShowHistory(false);
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://dinhthienan203.id.vn/get-name-list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            person_id: query,
            top_k: 5,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setResults(result.results);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    submitSearch(searchText);
  };

  const handleSelect = (text) => {
    setSearchText(text);
    submitSearch(text);
  };

  const handleCloseResults = () => {
    setSearchText("");
    setResults([]);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#daf1de]">
      <div ref={boxRef} className="w-[60%] max-w-2xl bg-white rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex items-center overflow-hidden rounded-3xl px-4 py-[10px]"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => history.length > 0 && setShowHistory(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            placeholder="Search..."
            className="flex-1 text-gray-800 text-[16px] outline-none border-none bg-transparent ml-2"
          />
          <button type="submit" className="hidden"></button>{" "}
          <button
            type="submit"
            className="mr-3 flex justify-center items-center h-[100%] cursor-pointer"
          >
            <img src={search} alt="Search icon" className="h-7 w-7 " />
          </button>
        </form>

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
      {loading && <Loading />}

      {results.length > 0 && (
        <ResultList data={results} onClose={handleCloseResults} />
      )}
    </div>
  );
};

export default TextSearch;
