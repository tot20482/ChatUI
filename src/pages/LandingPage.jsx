import React from "react";
import Navbar from "../components/LandingPage/Navbar";
import Header from "../components/LandingPage/Header";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/chatbot");
  };
  return (
    <div className="w-full h-screen">
      <div className="h-[15%]">
        <Navbar handleGetStarted={handleGetStarted} />
      </div>
      <div className="h-[85%] flex items-end justify-center">
        <Header handleGetStarted={handleGetStarted} />
      </div>
    </div>
  );
};

export default LandingPage;
