import React from "react";
import NavBar from "../components/SearchMode/Text/NavBar";
import TextSearch from "../components/SearchMode/Text/TextSearch";

const Text = () => {
  return (
    <div className="h-screen w-full">
      <NavBar />
      <div className="h-[87vh] w-full">
        <TextSearch />
      </div>
    </div>
  );
};

export default Text;
