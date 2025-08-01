import { useState, useMemo } from "react";
import NewsPopup from "../SearchMode/NewsPopup";

const Individual = ({ setShowIndividual, individualData }) => {
  const [newsPopup, setNewsPopup] = useState({
    isOpen: false,
    data: null,
    loading: false,
    error: null,
  });

  const personEntries = useMemo(() => {
    const raw = individualData?.response?.result?.personal_risk_analysis;

    if (!Array.isArray(raw)) {
      console.warn("Dữ liệu không hợp lệ.");
      return [];
    }

    const transformed = {};

    raw.forEach((item) => {
      const person = item.person_name || "";
      const violation = item.violation_type || "Không xác định";

      if (!transformed[person]) {
        transformed[person] = {};
      }

      transformed[person][violation] = {
        customer_role: item.customer_role || "Không rõ",
        legal_status: item.legal_status || "Không rõ",
        media_ids: item.media_ids || (item.media_id ? [item.media_id] : []),
      };
    });

    return Object.entries(transformed);
  }, [individualData]);

  const handleMediaClick = async (mediaId) => {
    setNewsPopup({ isOpen: true, data: null, loading: true, error: null });

    try {
      const response = await fetch(
        `https://dinhthienan203.id.vn/media/${mediaId}`
      );

      const result = await response.json();
      console.log("Media:", result);

      if (response.ok && result.success) {
        setNewsPopup({
          isOpen: true,
          data: result,
          loading: false,
          error: null,
        });
      } else {
        setNewsPopup({
          isOpen: true,
          data: null,
          loading: false,
          error: result.error || "Không lấy được nội dung bài báo",
        });
      }
    } catch (error) {
      setNewsPopup({
        isOpen: true,
        data: null,
        loading: false,
        error: error.message,
      });
    }
  };

  const closeNewsPopup = () => {
    setNewsPopup({ isOpen: false, data: null, loading: false, error: null });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setShowIndividual(false)}
      >
        <div
          className="flex flex-col justify-between items-center relative w-[70%] max-h-[80vh] rounded-xl bg-white p-10 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Phân tích rủi ro Cá nhân
          </h2>

          <div className="flex flex-wrap justify-center gap-8 w-full">
            {personEntries.map(([personName, violations]) => (
              <div key={personName} className="w-full mb-4 pb-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                  {personName}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(violations).map(
                    ([violationType, details], idx) => (
                      <div
                        key={violationType}
                        className="flex flex-col justify-between items-center bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <h4 className="text-lg font-semibold text-gray-800">
                            Tội {idx + 1}
                          </h4>
                          <div className="w-14 h-[3px] bg-green-500 mb-4" />
                          <div className="flex flex-col items-start w-full">
                            <p className="text-sm text-gray-700 leading-snug mb-2">
                              <strong>Loại:</strong> {violationType}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Vai trò:</strong> {details.customer_role}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                              <strong>Tình trạng:</strong>{" "}
                              {details.legal_status}
                            </p>
                          </div>
                        </div>

                        {details.media_ids && details.media_ids.length > 0 && (
                          <div className="w-full">
                            <p className="text-xs text-gray-500 mb-2 text-center">
                              Bài báo liên quan ({details.media_ids.length}):
                            </p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {details.media_ids.map((mediaId, mediaIdx) => (
                                <button
                                  key={mediaId}
                                  onClick={() => handleMediaClick(mediaId)}
                                  className="px-5 py-2 bg-[#00b552] text-white text-xs rounded hover:brightness-110 transition-colors cursor-pointer"
                                >
                                  <p className="text-[14px] font-semibold">
                                    Báo {mediaIdx + 1}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowIndividual(false)}
            className="mt-6 px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:brightness-110 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>

      <NewsPopup
        isOpen={newsPopup.isOpen}
        onClose={closeNewsPopup}
        newsData={newsPopup.data}
        loading={newsPopup.loading}
      />

      {newsPopup.error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-70">
          <p className="text-sm">Lỗi: {newsPopup.error}</p>
          <button
            onClick={() => setNewsPopup((prev) => ({ ...prev, error: null }))}
            className="text-xs underline mt-1"
          >
            Đóng
          </button>
        </div>
      )}
    </>
  );
};

export default Individual;
