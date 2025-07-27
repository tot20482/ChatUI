import { useState, useRef, useEffect } from "react";
import up from "../../assets/up-arrow.png";
import Results from "./Results";
import Individual from "./Individual";
import Organization from "./Organization";
import PersonForm from "./PersonForm";
import ErrorHandler from "../ErrorHandler";
import { result } from "../../mocks";
import BoxResult from "./BoxResult";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  // const [isIndividual, setIsIndividual] = useState(false);
  // const [isOrganization, setIsOrganization] = useState(false);
  const [searchMode, setSearchMode] = useState("text"); // "text", "form", or "chatbot"
  const [boxResult, setBoxResult] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Xin chào! Tôi là trợ lý AML. Bạn có thể hỏi tôi về thông tin liên quan đến rửa tiền, tuân thủ AML, hoặc tìm kiếm thông tin về cá nhân/tổ chức. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const chatEndRef = useRef(null);

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
          personal_relationships:
            "Con trai của Nguyễn Văn B, cựu chủ tịch Công ty ABC",
        },
        invidual_AML: {
          "Vi phạm 1": {
            violation_type: "Rửa tiền",
            legal_status: "Đang điều tra",
            role: "Đối tượng chính",
            date: "2023-05-15",
            amount: "5,000,000,000 VND",
            description: "Nghi ngờ rửa tiền thông qua giao dịch bất động sản",
            media_ids: ["news1", "news2"],
          },
          "Vi phạm 2": {
            violation_type: "Gian lận thuế",
            legal_status: "Đã kết án",
            role: "Đồng phạm",
            date: "2022-11-20",
            amount: "2,500,000,000 VND",
            description: "Khai man thuế doanh nghiệp",
            media_ids: ["news3"],
          },
        },
        organization_AML: {
          "Vi phạm tổ chức 1": {
            violation_type: "Gian lận tài chính",
            legal_status: "Đang điều tra",
            role: "Tổ chức liên quan",
            date: "2023-02-10",
            amount: "15,000,000,000 VND",
            description: "Báo cáo tài chính gian lận",
            media_ids: ["news4", "news5"],
          },
        },
      },
      ml_prediction: {
        risk_level: "AML cao",
        prediction: 0.85,
        probabilities: {
          Class_Very_Low: 0.05,
          Class_Low: 0.1,
          Class_Medium: 0.15,
          Class_High: 0.25,
          Class_Very_High: 0.45,
        },
      },
      total_violations: 3,
      total_violation_types: 3,
      total_legal_statuses: 2,
      total_roles: 3,
      details: {
        violation_types: {
          individual: ["Rửa tiền", "Gian lận thuế"],
          organization: ["Gian lận tài chính"],
        },
      },
    },
  };

  // Sample error response for demonstration
  const sampleErrorData = {
    success: true,
    response: {
      message: "Không tìm thấy thông tin về người này trong cơ sở dữ liệu",
    },
  };

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current && searchMode === "chatbot") {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, searchMode]);

  const handleApiCall = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setResponseData(null);

    if (
      searchMode === "text" ||
      searchMode === "form" ||
      searchMode === "chatbot"
    ) {
      // set mock data vào state
      setBoxResult(result);
      setShowBox(true); // hiển thị màn hình fixed
    }

    // Add user message to chat if in chatbot mode
    if (searchMode === "chatbot") {
      setChatMessages((prev) => [...prev, { type: "user", text: searchQuery }]);
    }

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

        // Add error message to chat if in chatbot mode
        if (searchMode === "chatbot") {
          setChatMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: data.response.message,
              isError: true,
            },
          ]);
        }
      } else if (data.success && data.response && data.response.result) {
        // Valid success response with result data
        setResponseData(data);

        // Add success message to chat if in chatbot mode
        if (searchMode === "chatbot") {
          const personInfo = data.response.result.person_info;
          let botResponse = "";

          if (personInfo) {
            botResponse = `Tôi đã tìm thấy thông tin về ${personInfo.full_name}. `;
            if (data.response.total_violations > 0) {
              botResponse += `Có ${data.response.total_violations} vi phạm liên quan. Bạn có thể xem chi tiết bên dưới.`;
            } else {
              botResponse += "Không tìm thấy vi phạm nào liên quan.";
            }
          } else {
            botResponse =
              "Tôi đã tìm thấy thông tin phù hợp với yêu cầu của bạn.";
          }

          setChatMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: botResponse,
              hasResults: true,
              results: data,
            },
          ]);
        }
      } else {
        // Unexpected format
        setError("Định dạng phản hồi không hợp lệ");

        // Add error message to chat if in chatbot mode
        if (searchMode === "chatbot") {
          setChatMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: "Định dạng phản hồi không hợp lệ",
              isError: true,
            },
          ]);
        }
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi gọi API");
      console.error("API Error:", err);

      // Add error message to chat if in chatbot mode
      if (searchMode === "chatbot") {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: err.message || "Có lỗi xảy ra khi gọi API",
            isError: true,
          },
        ]);
      }
    } finally {
      setLoading(false);
      setQuery(""); // Clear input after sending
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
      if (type === "success") {
        setResponseData(sampleResponseData);

        // Add to chat if in chatbot mode
        if (searchMode === "chatbot") {
          setChatMessages((prev) => [
            ...prev,
            { type: "user", text: "Tìm thông tin về Nguyễn Văn A" },
            {
              type: "bot",
              text: "Tôi đã tìm thấy thông tin về Nguyễn Văn A. Có 3 vi phạm liên quan. Bạn có thể xem chi tiết bên dưới.",
              hasResults: true,
              results: sampleResponseData,
            },
          ]);
        }
      } else {
        setResponseData(sampleErrorData);

        // Add to chat if in chatbot mode
        if (searchMode === "chatbot") {
          setChatMessages((prev) => [
            ...prev,
            { type: "user", text: "Tìm thông tin về Nguyễn Văn X" },
            {
              type: "bot",
              text: sampleErrorData.response.message,
              isError: true,
            },
          ]);
        }
      }
      setLoading(false);
    }, 1000); // Simulate API delay
  };

  return (
    <div className="flex flex-col items-center w-full p-6">
      {/* Error Handler - Only show in text/form modes */}
      {searchMode !== "chatbot" && (
        <ErrorHandler
          responseData={responseData}
          onDismiss={handleErrorDismiss}
        />
      )}

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
          className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
            searchMode === "form"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Tìm kiếm bằng form
        </button>
        <button
          onClick={() => setSearchMode("chatbot")}
          className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
            searchMode === "chatbot"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Giao diện chat
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

      {/* Chatbot Mode */}
      {searchMode === "chatbot" && (
        <div className="w-[80%] max-w-4xl flex flex-col h-[60vh] bg-white rounded-lg shadow-lg">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : message.isError
                      ? "bg-red-100 text-red-800 rounded-bl-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>

                  {/* Show results if available */}
                  {message.hasResults && message.results && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => setResponseData(message.results)}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                      >
                        Xem kết quả chi tiết
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-4 flex items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn của bạn..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
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
              )}
            </button>
          </form>
        </div>
      )}

      {/* Sample Data Buttons - Only show in text/form modes */}
      {searchMode !== "chatbot" && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => showSampleData("success")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors"
          >
            Hiển thị dữ liệu mẫu thành công
          </button>
          <button
            onClick={() => showSampleData("error")}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer transition-colors"
          >
            Hiển thị lỗi mẫu
          </button>
        </div>
      )}

      {/* Error Display for non-backend errors - Only show in text/form modes */}
      {searchMode !== "chatbot" && error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg w-[60%]">
          <h3 className="font-bold">Lỗi:</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Loading State - Only show in text/form modes */}
      {searchMode !== "chatbot" && loading && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg w-[60%] text-center">
          <p>Đang xử lý truy vấn...</p>
        </div>
      )}

      {/* Results Display - Only show if response is successful and has no error message */}
      {/* {responseData &&
        responseData.success &&
        !responseData.response.message &&
        !loading && (
          // <Results
          //   responseData={responseData}
          //   setIsIndividual={setIsIndividual}
          //   setIsOrganization={setIsOrganization}
          // />
        )} */}

      {/* Modal Components */}
      {/* {isIndividual && responseData?.response?.result?.invidual_AML && (
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
      )} */}

      {showBox && (
        <BoxResult onClose={() => setShowBox(false)} data={boxResult} />
      )}

      <div
        className={`grid gap-2 mt-6 w-[60%] ${
          questions.every((q) => q.length < 60) ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-lg text-sm bg-gray-50 shadow hover:bg-gray-200 cursor-pointer"
          >
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}
