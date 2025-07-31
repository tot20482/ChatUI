import React, { useState } from "react";
import Navbar from "../components/LandingPage/Navbar";
import Header from "../components/LandingPage/Header";
// import { useNavigate } from "react-router-dom";
import Solutions from "../components/LandingPage/Solutions";
import UserGuide from "../components/LandingPage/UserGuide";
import AboutUs from "../components/LandingPage/AboutUs";
import Footer from "../components/LandingPage/Footer";

const LandingPage = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  // const navigate = useNavigate();
  // const handleGetStarted = () => {
  //   navigate("/chatbot");
  // };
  return (
    <div className="w-full">
      <div className="w-full h-screen">
        <div className="h-[15%]">
          <Navbar
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />
        </div>
        <div className="h-[85%] flex justify-center mt-4">
          <Header setIsSignIn={setIsSignIn} />
        </div>
      </div>
      <Solutions />
      <UserGuide />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
