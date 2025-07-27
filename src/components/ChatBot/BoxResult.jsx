import React from "react";

const BoxResult = ({ data, onClose }) => {
  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full h-[70%] flex flex-col items-center overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold uppercase text-[#3D10BD] mb-4">
          Kết quả tìm kiếm
        </h2>

        <div className="grid grid-cols-3 gap-2 w-full h-full place-items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[80%] h-[80%] rounded-lg shadow-md flex flex-col justify-center items-center text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{
                background:
                  "linear-gradient(to bottom right, #62BDFF, #3D10BD)",
              }}
            >
              <h1 className="text-lg font-bold uppercase">{item.name}</h1>
              <p className="text-md font-semibold">Score: {item.score}</p>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
          >
            <p className="font-semibold">Đóng</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxResult;
