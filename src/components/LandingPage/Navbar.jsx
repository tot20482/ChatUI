import logo from "../../assets/logouit.svg";
import VpbankLogo from "../../assets/VPBank_logo.png";

const Navbar = ({ handleGetStarted }) => {
  return (
    <div className="px-30 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <img src={logo} alt="Logo UIT" className="w-18 h-18" />
        <img src={VpbankLogo} alt="Logo VPBANK" className="h-12" />
      </div>
      <div className="flex items-center space-x-14">
        <div className="flex items-center space-x-4">
          <button className="px-4 py-4 rounded-md hover:cursor-pointer">
            <p className="text-md font-medium uppercase text-[#298761]">
              About Us
            </p>
          </button>
          <button className="px-4 py-4 rounded-md hover:cursor-pointer">
            <p className="text-md font-medium uppercase text-[#298761]">
              Contact
            </p>
          </button>
        </div>
        <div>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 rounded-4xl bg-[#00b550]
              shadow-[0_0_6px_1px_rgba(0,190,80,0.6),0_0_40px_8px_rgba(0,190,80,0.4)] 
              text-white
              transition-all duration-300 ease-out
              hover:scale-105 hover:brightness-110 hover:cursor-pointer 
              active:scale-100"
          >
            <p className="text-md font-bold text-white">Get Started</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
