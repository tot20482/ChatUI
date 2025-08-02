import React from "react";

const NewsPopup = ({ isOpen, onClose, newsData, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[80%] max-h-[80vh] bg-white rounded-lg shadow-xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        {/* Nội dung */}
        {loading ? (
          <div className="text-center text-gray-500 text-sm">
            Đang tải bài báo...
          </div>
        ) : newsData?.content ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Tóm tắt sự kiện
            </h2>
            <p className="mb-6 text-gray-800 text-sm leading-relaxed whitespace-pre-line">
              {newsData.content.event_summary}
            </p>

            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Nội dung bài báo
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {newsData.content.content}
            </p>
          </>
        ) : (
          <p className="text-red-600 text-sm font-medium">
            Không tìm thấy nội dung bài báo.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsPopup;
