import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatBot from "./pages/ChatBot";
import SearchHome from "./pages/SearchHome";
import Text from "./pages/Text";
import Form from "./pages/Form";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<SearchHome />} />
        <Route path="/home/text" element={<Text />} />
        <Route path="/home/chatbot" element={<ChatBot />} />
        <Route path="/home/form" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
