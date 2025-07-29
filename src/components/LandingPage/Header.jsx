import Robot from "../../assets/robot.png";

const Header = ({ handleGetStarted }) => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #094993, #38a44a)",
      }}
      className="w-[95%] h-[95%] rounded-4xl px-16 flex justify-center items-center space-x-28"
    >
      <div className="flex flex-col justify-center items-start space-y-6">
        <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
          AI-Powered <br />
          <span className="text-[#00b550]">AML Risk Analysis</span> for <br />
          Banks Institutions
        </h1>
        <p className="text-white text-lg ">
          Automatically detect and assess adverse media and blacklist risks —
          enabling <br /> fast insights, accurate scoring, and robust compliance
          to protect your <br /> organization from financial crime.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-10 py-4 rounded-4xl bg-[#00b550]
              shadow-[0_0_6px_1px_rgba(0,190,80,0.6),0_0_40px_8px_rgba(0,190,80,0.4)] 
              text-white
              transition-all duration-300 ease-out
              hover:scale-105 hover:brightness-110 hover:cursor-pointer 
              active:scale-100"
        >
          <p className="text-lg font-bold text-white">Get Started</p>
        </button>
      </div>
      <div>
        <img src={Robot} alt="Robot" className="h-[400px]" />
      </div>
    </div>
  );
};

export default Header;
