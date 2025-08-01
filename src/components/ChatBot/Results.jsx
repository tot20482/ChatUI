import Individual from "./Individual";

const Results = ({
  responseData,
  setShowIndividual,
  setShowOrganization,
  individualData,
  organizationData,
  setResults,
}) => {
  if (!responseData || !responseData.response) return null;

  const { response } = responseData;
  const { result, ml_prediction } = response;

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case "AML cao":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const handleOutsideClick = () => {
    setResults(false);
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-30 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[80%] h-[90%] px-6 py-12 flex justify-center items-center bg-white rounded-lg shadow-lg"
      >
        <button
          onClick={() => setResults(false)}
          className="absolute top-2 right-6 text-gray-500 hover:text-red-600 text-3xl font-bold cursor-pointer"
          title="Đóng"
        >
          &times;
        </button>
        <div className="w-[90%] h-[100%] max-h-screen overflow-y-auto p-6">
          {result.person_info && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Họ tên:</strong> {result.person_info.full_name}
                  </p>
                  <p>
                    <strong>Tuổi:</strong> {result.person_info.age}
                  </p>
                  <p>
                    <strong>Giới tính:</strong> {result.person_info.gender}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Chức vụ:</strong>{" "}
                    {result.person_info.occupation_or_position}
                  </p>
                  <p>
                    <strong>Tổ chức:</strong> {result.person_info.organization}
                  </p>
                </div>
              </div>
              {result.person_info.personal_relationships && (
                <div className="mt-3">
                  <p>
                    <strong>Mối quan hệ:</strong>{" "}
                    {result.person_info.personal_relationships}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ML Prediction */}
          {ml_prediction && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Đánh giá rủi ro AI
              </h3>
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${getRiskLevelColor(
                    ml_prediction.risk_level
                  )}`}
                >
                  {ml_prediction.risk_level}
                </span>
                <span className="text-gray-600">
                  Điểm dự đoán: {ml_prediction.prediction}
                </span>
              </div>

              {/* Probabilities */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">
                  Xác suất các mức độ rủi ro:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                  {Object.entries(ml_prediction.probabilities).map(
                    ([level, prob]) => (
                      <div key={level} className="text-center">
                        <div className="font-medium">
                          {level.replace("Class_", "").replace("_", " ")}
                        </div>
                        <div className="text-blue-600">
                          {(prob * 100).toFixed(1)}%
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Summary Statistics */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">
              Thống kê tổng quan
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {response.total_violations}
                </div>
                <div className="text-sm text-gray-600">Tổng vi phạm</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {response.total_violation_types}
                </div>
                <div className="text-sm text-gray-600">Loại vi phạm</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {response.total_legal_statuses}
                </div>
                <div className="text-sm text-gray-600">Tình trạng pháp lý</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {response.total_roles}
                </div>
                <div className="text-sm text-gray-600">Vai trò</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-40 justify-center">
            {individualData?.response?.result?.personal_risk_analysis?.length >
              0 && (
              <button
                onClick={() => {
                  setShowIndividual(true);
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors font-semibold"
              >
                Xem phân tích rủi ro Cá nhân (
                {individualData.response.result.personal_risk_analysis.length})
              </button>
            )}

            {result.organization_AML &&
              organizationData?.response?.result?.organizer_risk_analysis
                ?.length > 0 && (
                <button
                  onClick={() => setShowOrganization(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors font-semibold"
                >
                  Xem phân tích rủi ro Tổ chức (
                  {
                    organizationData?.response.result.organizer_risk_analysis
                      ?.length
                  }
                  )
                </button>
              )}
          </div>

          {/* Violation Types - Split into Individual and Organization */}
          {response.details && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Individual Violations */}
              {response.details.violation_types && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    Vi phạm Cá nhân
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {response.details.violation_types.individual.map(
                      (violation, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2 rounded border text-sm"
                        >
                          {violation}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Organization Violations */}
              {response.details.violation_types && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    Vi phạm Tổ chức
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {response.details.violation_types.organization.map(
                      (violation, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2 rounded border text-sm"
                        >
                          {violation}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
