import React from "react";

const SignUp = ({ show }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        background: "linear-gradient(to right, #094993, #38a44a)",
      }}
    >
      <div className="w-[85%] h-[90%] bg-white rounded-4xl flex">
        <div className="w-[40%] h-full p-10">
          <div
            className="w-full h-full rounded-4xl flex flex-col justify-center items-start pl-16"
            style={{
              background: "linear-gradient(to right, #094993, #38a44a)",
            }}
          >
            <p className="text-3xl font-semibold tracking-wide text-white">
              Create your <br /> Account
            </p>
            <p className="text-medium text-white mt-2">
              Try our AI-powered system and <br /> discover smarter AML risk
              insights.
            </p>
          </div>
        </div>
        <div className="w-[60%] flex flex-col justify-center pl-24">
          <p className="font-bold text-4xl">Sign Up</p>
          <form className="space-y-4 mt-8">
            <div>
              <label className="block text-lg font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-[80%] px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:border-[1px] focus:border-[#38a44a]"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-1">
                Set Password
              </label>
              <input
                type="password"
                className="w-[80%] px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:border-[1px] focus:border-[#38a44a]"
                placeholder="Enter your password"
              />
            </div>
            <div className="w-[80%] flex items-start space-x-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 accent-[#38a44a]"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I accept all{" "}
                <span className="text-[#38a44a] font-medium">terms</span> and{" "}
                <span className="text-[#38a44a] font-medium">
                  privacy policy
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-[80%] py-2 px-6 bg-[#38a44a] text-white rounded-md hover:brightness-110 mt-8 hover:cursor-pointer hover:scale-105 transition-all duration-300 active:scale-100"
            >
              <p className="text-lg">Sign Up</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
