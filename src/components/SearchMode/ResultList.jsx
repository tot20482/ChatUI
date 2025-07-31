import React, { useRef, useState } from "react";
import Individual from "../ChatBot/Individual";
import left from "../../assets/left-arrow.png";
import right from "../../assets/right-arrow.png";
import Loading from "../Loading";

<style jsx>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>;

const ResultList = ({ data, onClose }) => {
  const scrollRef = useRef();
  const [detailData, setDetailData] = useState(null); // Dữ liệu trả về khi click box
  const [loading, setLoading] = useState(false);
  const [showIndividual, setShowIndividual] = useState(false);
  const [individualData, setIndividualData] = useState(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleItemClick = async (item) => {
    try {
      setLoading(true);

      const response = await fetch("http://18.143.201.110:80/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: item.per_id,
          person_name: item.per_name,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDetailData(data);
      setIndividualData(data);
      console.log(individualData);
      setShowIndividual(true);
    } catch (error) {
      console.error("Error fetching details:", error);
      setDetailData({ error: "Failed to fetch details" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-30 flex justify-center items-center z-50">
      <div className="w-[80%] h-[80%] bg-gray-300 rounded-3xl px-12 py-10 overflow-hidden shadow-xl relative flex flex-col justify-between">
        {/* Title */}
        <div>
          <p className="text-3xl font-bold text-gray-800">Search Results</p>
          <div className="w-[10%] h-[6px] bg-[#38a44a] rounded-2xl mt-1 mb-6"></div>
        </div>

        <div className="w-full h-[55%] flex flex-col items-center justify-between">
          <div
            ref={scrollRef}
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="flex overflow-x-auto space-x-4 w-full h-[85%] px-4 scroll-smooth no-scrollbar py-2"
          >
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  className="flex-none w-[30%] h-full bg-[#38a44a] rounded-2xl flex flex-col justify-center items-center 
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:brightness-110 hover:cursor-pointer 
                  active:scale-100"
                >
                  <p className="font-bold text-xl text-white">
                    {item.per_name}
                  </p>
                  <p className="text-white">Score: {item.relevance_score}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </div>

          <div className="flex gap-6 justify-center mt-4">
            <button
              onClick={scrollLeft}
              className="bg-white text-[#38a44a] shadow-md p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <img src={left} alt="left arrow" className="h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-white shadow-md p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <img src={right} alt="right arrow" className="h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:scale-105 transition active:scale-100 cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
      {loading && <Loading />}
      {showIndividual && detailData && (
        <Individual
          setIsIndividual={setShowIndividual}
          individualData={individualData}
        />
      )}
    </div>
  );
};

export default ResultList;
