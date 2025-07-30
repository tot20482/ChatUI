import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatBot from "./pages/ChatBot";
import SearchHome from "./pages/SearchHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<SearchHome />} />
      </Routes>
    </Router>
  );
};

export default App;
