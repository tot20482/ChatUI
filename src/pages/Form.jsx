import NavBar from "../components/SearchMode/NavBar";
import History from "../components/ChatBot/History";
import PersonForm from "../components/ChatBot/PersonForm";
import { useState } from "react";

const Form = () => {
  const [isHistory, setIsHistory] = useState(false);
  return (
    <div className="h-full w-full">
      <NavBar isHistory={isHistory} setIsHistory={setIsHistory} />
      {isHistory === true ? (
        <div className="h-full w-full flex">
          <div className="w-[20%]">
            <History />
          </div>
          <div className="w-[80%] flex justify-center items-center">
            <PersonForm />
          </div>
        </div>
      ) : (
        <PersonForm />
      )}
    </div>
  );
};

export default Form;
