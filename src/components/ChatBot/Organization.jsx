import { useState } from "react";
// import NewsPopup from "./NewsPopup";

const Organization = ({ setShowOrganization, organizationData }) => {
  const [newsPopup, setNewsPopup] = useState({
    isOpen: false,
    data: null,
    loading: false,
    error: null,
  });

  if (!organizationData) return null;

  const raw = organizationData?.response?.result?.organizer_risk_analysis;

  const orgEntries = (() => {
    if (!Array.isArray(raw)) return [];

    const transformed = {};
    raw.forEach((item) => {
      const org = item.organization_name || "Không rõ tổ chức";
      const violation = item.violation_type || "Không xác định";

      if (!transformed[org]) {
        transformed[org] = {};
      }

      transformed[org][violation] = {
        customer_role: item.customer_role || "Không rõ",
        legal_status: item.legal_status || "Không rõ",
        media_ids: item.media_ids || [],
      };
    });

    return Object.entries(transformed);
  })();

  const handleMediaClick = async (mediaId) => {
    setNewsPopup({ isOpen: true, data: null, loading: true, error: null });

    try {
      const response = await fetch(
        `https://dinhthienan203.id.vn/media/${mediaId}`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        setNewsPopup({
          isOpen: true,
          data: result,
          loading: false,
          error: null,
        });
      } else {
        const errorMessage =
          result.error || `Failed to fetch media: ${response.statusText}`;
        setNewsPopup({
          isOpen: true,
          data: null,
          loading: false,
          error: errorMessage,
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

  // const closeNewsPopup = () => {
  //   setNewsPopup({ isOpen: false, data: null, loading: false, error: null });
  // };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setShowOrganization(false)}
      >
        <div
          className="flex flex-col justify-between items-center relative w-[70%] max-h-[80vh] rounded-xl bg-white p-10 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Phân tích rủi ro Tổ chức
          </h2>

          <div className="flex flex-wrap justify-center gap-8 w-full">
            {orgEntries.map(([orgName, violations], orgIdx) => (
              <div key={orgName} className="w-full pb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
                  {orgName}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(violations).map(
                    ([violationType, details], idx) => (
                      <div
                        key={violationType}
                        onClick={handleMediaClick}
                        className="flex flex-col items-center bg-gray-50 p-4 rounded-lg"
                      >
                        <h4 className="text-lg font-semibold text-gray-800">
                          Vi phạm {idx + 1}
                        </h4>
                        <div className="w-20 h-[3px] bg-red-500 mb-4" />
                        <div className="flex flex-col items-start w-full">
                          <p className=" text-sm text-gray-700 leading-snug mb-2">
                            <strong>Loại:</strong> {violationType}
                          </p>
                          <p className=" text-sm text-gray-600 mb-2">
                            <strong>Vai trò:</strong> {details.customer_role}
                          </p>
                          <p className=" text-sm text-gray-600 mb-3">
                            <strong>Tình trạng:</strong> {details.legal_status}
                          </p>
                        </div>

                        {details.media_ids.length > 0 && (
                          <div className="w-full">
                            <p className="text-xs text-gray-500 mb-2 text-center">
                              Bài báo liên quan ({details.media_ids.length}):
                            </p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {details.media_ids.map((mediaId, mediaIdx) => (
                                <button
                                  key={mediaId}
                                  onClick={() => handleMediaClick(mediaId)}
                                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                                >
                                  Báo {mediaIdx + 1}
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
            onClick={() => setShowOrganization(false)}
            className="mt-6 px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:brightness-110 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* <NewsPopup
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
      )} */}
    </>
  );
};

export default Organization;
