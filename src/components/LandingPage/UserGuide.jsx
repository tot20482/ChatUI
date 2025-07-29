import React from "react";
import userGuide from "../../assets/userGuide.png";

const UserGuide = () => {
  return (
    <section id="userGuide" class="h-[70vh] w-full bg-[#daf1de] py-8 px-16 ">
      <p className="text-3xl font-bold text-start ml-4 mb-6">
        <span className="text-[#00b552]">How</span> It Works
      </p>
      <div className="w-full flex justify-start items-center space-x-16 ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[50%]">
          <p className="text-start ml-4">
            Explore three intuitive ways to search and review AML risk
            information. Choose from keyword-based search, guided forms, or our
            smart chatbot to quickly access risk insights in the way that works
            best for you.
          </p>
          <img src={userGuide} alt="User Guide Image" className="h-45" />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center space-y-10">
          <div className="flex justify-center items-center space-x-8 ">
            <div className="flex justify-center items-center p-4 bg-[#00b550] rounded-2xl w-[30%]">
              <p className="font-bold text-lg text-white text-center">
                Search by Text
              </p>
            </div>
            <div className="w-[70%]">
              <p>
                Quickly find risk information by entering names or keywords into
                the search bar.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-8">
            <div className="flex justify-center items-center p-4 bg-[#00b550] rounded-2xl w-[30%]">
              <p className="font-bold text-lg text-white text-center">
                Guided Form
              </p>
            </div>
            <div className="w-[70%]">
              <p>
                Submit personal info through a structured form for precise
                results.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-8 ">
            <div className="flex justify-center items-center p-4 bg-[#00b550] rounded-2xl w-[30%]">
              <p className="font-bold text-lg text-white text-center">
                Smart Chatbot
              </p>
            </div>
            <div className="w-[70%]">
              <p>
                Chat naturally with our AI assistant to ask questions and get
                instant answers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserGuide;
