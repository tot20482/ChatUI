import React from "react";

const Solutions = () => {
  return (
    <section
      id="solutions"
      class="h-[70vh] px-16 flex flex-col justify-start items-center space-y-10 py-8"
    >
      <div>
        <p className="text-3xl font-bold">
          <span className="text-[#00b552]">Solutions</span> for Smart AML Risk
          Detection
        </p>
      </div>
      <div className="flex justify-center items-center w-full space-x-16">
        <div className="flex flex-col justify-center items-center rounded-2xl w-[25%] ">
          <div
            className="w-full px-3 py-6 rounded-t-2xl"
            style={{
              background: "linear-gradient(to right, #094993, #38a44a)",
            }}
          >
            <p className="text-xl font-semibold text-white text-center ">
              Adverse media review is still manual and inefficient
            </p>
          </div>
          <div className="w-full px-3 py-4 border-b-[2px] border-l-[2px] border-r-[2px] rounded-b-2xl border-[#38a44a]">
            <p className="text-lg text-center ">
              Reviewing information from news sources and social media is
              currently done manually.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded-2xl w-[25%] ">
          <div
            className="w-full px-3 py-6 rounded-t-2xl"
            style={{
              background: "linear-gradient(to right, #094993, #38a44a)",
            }}
          >
            <p className="text-xl font-semibold text-white text-center ">
              Outdated and Inconsistent Blacklist Management
            </p>
          </div>
          <div className="w-full px-3 py-4 border-b-[2px] border-l-[2px] border-r-[2px] rounded-b-2xl border-[#38a44a]">
            <p className="text-lg text-center ">
              Use semantic search and AI to unify duplicate entries and keep the
              blacklist updated.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded-2xl w-[25%] ">
          <div
            className="px-3 py-6 rounded-t-2xl w-full"
            style={{
              background: "linear-gradient(to right, #094993, #38a44a)",
            }}
          >
            <p className="text-xl font-semibold text-white text-center ">
              Lack of Objective Risk <br /> Scoring
            </p>
          </div>
          <div className="w-full px-3 py-4 border-b-[2px] border-l-[2px] border-r-[2px] rounded-b-2xl border-[#38a44a]">
            <p className="text-lg text-center">
              Apply machine learning to assess and explain risk levels based on
              customer and media data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
