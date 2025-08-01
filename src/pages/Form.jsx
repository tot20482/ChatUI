import NavBar from "../components/SearchMode/NavBar";
import History from "../components/ChatBot/History";
import PersonForm from "../components/ChatBot/PersonForm";
import { useState } from "react";

const Form = () => {
  const [isHistory, setIsHistory] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://18.143.201.110:80/get-name-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: formData.name,
          top_k: 5,
        }),
      });

      const result = await response.json();
      setDetailData(result);
      console.log(detailData);
    } catch (error) {
      console.error("Lỗi khi gửi API:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <NavBar isHistory={isHistory} setIsHistory={setIsHistory} />
      {isHistory === true ? (
        <div className="h-full w-full flex">
          <div className="w-[20%]">
            <History />
          </div>
          <div className="w-[80%] flex justify-center items-center">
            <PersonForm onSubmit={handleSubmit} detailData={detailData} />
          </div>
        </div>
      ) : (
        <PersonForm onSubmit={handleSubmit} detailData={detailData} />
      )}
    </div>
  );
};

export default Form;
