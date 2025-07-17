import { useState } from "react";
import up from "../../assets/up-arrow.png";
import Results from "./Results";
import Individual from "./Individual";
import Organization from "./Organization";
import PersonForm from "./PersonForm";
import ErrorHandler from "../ErrorHandler";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isIndividual, setIsIndividual] = useState(false);
  const [isOrganization, setIsOrganization] = useState(false);
  const [searchMode, setSearchMode] = useState("text"); // "text" or "form"
  const questions = [
    "AI solutions for AML compliance in banking",
    "Automated adverse media screening tools for financial institutions",
    "Real-time AML risk scoring platforms",
    "Best AML software with NLP and machine learning",
  ];

  // Sample response data for demonstration
  const sampleResponseData = {
    success: true,
    response: {
      result: {
        person_info: {
          full_name: "Nguyễn Văn A",
          age: 45,
          gender: "Nam",
          occupation_or_position: "Giám đốc",
          organization: "Công ty XYZ",
          personal_relationships: "Con trai của Nguyễn Văn B, cựu chủ tịch Công ty ABC"
        },
        invidual_AML: {
          "Vi phạm 1": {
            violation_type: "Rửa tiền",
            legal_status: "Đang điều tra",
            role: "Đối tượng chính",
            date: "2023-05-15",
            amount: "5,000,000,000 VND",
            description: "Nghi ngờ rửa tiền thông qua giao dịch bất động sản",
            media_ids: ["news1", "news2"]
          },
          "Vi phạm 2": {
            violation_type: "Gian lận thuế",
            legal_status: "Đã kết án",
            role: "Đồng phạm",
            date: "2022-11-20",
            amount: "2,500,000,000 VND",
            description: "Khai man thuế doanh nghiệp",
            media_ids: ["news3"]
          }
        },
        organization_AML: {
          "Vi phạm tổ chức 1": {
            violation_type: "Gian lận tài chính",
            legal_status: "Đang điều tra",
            role: "Tổ chức liên quan",
            date: "2023-02-10",
            amount: "15,000,000,000 VND",
            description: "Báo cáo tài chính gian lận",
            media_ids: ["news4", "news5"]
          }
        }
      },
      ml_prediction: {
        risk_level: "AML cao",
        prediction: 0.85,
        probabilities: {
          Class_Very_Low: 0.05,
          Class_Low: 0.10,
          Class_Medium: 0.15,
          Class_High: 0.25,
          Class_Very_High: 0.45
        }
      },
      total_violations: 3,
      total_violation_types: 3,
      total_legal_statuses: 2,
      total_roles: 3,
      details: {
        violation_types: {
          individual: ["Rửa tiền", "Gian lận thuế"],
          organization: ["Gian lận tài chính"]
        }
      }
    }
  };

  // Sample error response for demonstration
  const sampleErrorData = {
    success: true,
    response: {
      message: "Không tìm thấy thông tin về người này trong cơ sở dữ liệu"
    }
  };

  const handleApiCall = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if the response contains an error message
      if (data.response && data.response.message) {
        // This is an error response, even if success might be true
        setResponseData(data);
      } else if (data.success && data.response && data.response.result) {
        // Valid success response with result data
        setResponseData(data);
      } else {
        // Unexpected format
        setError("Định dạng phản hồi không hợp lệ");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi gọi API");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    await handleApiCall(query);
  };

  const handleFormSubmit = async (formQuery) => {
    await handleApiCall(formQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleErrorDismiss = () => {
    // Clear the response data with error
    setResponseData(null);
  };

  // Function to show sample data
  const showSampleData = (type) => {
    setLoading(true);
    setTimeout(() => {
      if (type === 'success') {
        setResponseData(sampleResponseData);
      } else {
        setResponseData(sampleErrorData);
      }
      setLoading(false);
    }, 1000); // Simulate API delay
  };

  return (
    <div className="flex flex-col  items-center w-full p-6">
      {/* Error Handler */}
      <ErrorHandler 
        responseData={responseData} 
        onDismiss={handleErrorDismiss} 
      />
      
      <div className="mb-8 w-full flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Bạn muốn hỏi cái gì?</h1>
      </div>

      {/* Search Mode Toggle */}
      <div className="mb-6 flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSearchMode("text")}
          className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
            searchMode === "text"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Tìm kiếm bằng văn bản
        </button>
        <button
          onClick={() => setSearchMode("form")}
          className={`px-4 py-2 rounded-md transition-colors cursor-poiter ${
            searchMode === "form"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Tìm kiếm bằng form
        </button>
      </div>

      {/* Text Search Mode */}
      {searchMode === "text" && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-between items-center w-[60%] bg-primary-600 rounded-2xl gap-4 mt-4 border-[1px] border-gray-200 shadow"
        >
          <div className="w-full h-full p-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Hãy nhập câu hỏi của bạn..."
              className="font-normal text-[14px] text-primary-500 h-[60px] w-full px-4 rounded-l-2xl bg-primary-600 no-focus focus:outline-none focus:ring-0 overflow-auto custom-scrollbar-navbar resize-none"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="cursor-pointer mr-4 flex justify-center items-center w-[40px] h-[40px] rounded-full bg-primary-400 aspect-square bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            {loading ? (
              <div className="w-[20px] h-[20px] border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <img src={up} alt="icon up" className="w-[20px] h-[20px]" />
            )}
          </button>
        </form>
      )}

      {/* Form Search Mode */}
      {searchMode === "form" && (
        <PersonForm onSubmit={handleFormSubmit} loading={loading} />
      )}

      {/* Sample Data Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => showSampleData('success')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Hiển thị dữ liệu mẫu thành công
        </button>
        <button
          onClick={() => showSampleData('error')}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Hiển thị lỗi mẫu
        </button>
      </div>

      {/* Error Display for non-backend errors */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg w-[60%]">
          <h3 className="font-bold">Lỗi:</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg w-[60%] text-center">
          <p>Đang xử lý truy vấn...</p>
        </div>
      )}

      {/* Results Display - Only show if response is successful and has no error message */}
      {responseData && responseData.success && !responseData.response.message && !loading && (
        <Results
          responseData={responseData}
          setIsIndividual={setIsIndividual}
          setIsOrganization={setIsOrganization}
        />
      )}

      {/* Modal Components */}
      {isIndividual && responseData?.response?.result?.invidual_AML && (
        <Individual
          setIsIndividual={setIsIndividual}
          individualData={responseData.response.result.invidual_AML}
        />
      )}

      {isOrganization && responseData?.response?.result?.organization_AML && (
        <Organization
          setIsOrganization={setIsOrganization}
          organizationData={responseData.response.result.organization_AML}
        />
      )}

      <div
        className={`grid gap-2 mt-6 w-[60%] ${
          questions.every((q) => q.length < 60) ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-lg text-sm bg-white shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              setQuery(q);
              handleApiCall(q);
            }}
          >
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}
