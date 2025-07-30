import { useNavigate } from "react-router-dom";
import VpbankLogo from "../../assets/VPBank_logo.png";
import woman from "../../assets/woman.png";

const NavBar = ({ isHistory, setIsHistory }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-1/5-screen flex justify-between items-center pl-18 pr-24 py-4 border-b-1 border-gray-200 shadow">
      <div className="px-8 py-2 cursor-pointer border-[1px] rounded-2xl border-[#38a44a]">
        <p
          onClick={() => {
            setIsHistory((prev) => !prev);
          }}
          className="text-lg font-semibold"
        >
          History
        </p>
      </div>
      <div>
        <img src={VpbankLogo} alt="Logo Vpbank" className="h-10" />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <button
          onClick={() => {
            navigate("/home");
          }}
          className="px-6 py-2 rounded-xl border-[1px] border-[#38a44a] hover:bg-[#38a44a] hover:text-white cursor-pointer"
        >
          <p className="text-medium font-semibold ">Search Mode</p>
        </button>
        <div className="h-12 w-12 rounded-full bg-gray-300 flex justify-center items-center">
          <img src={woman} alt="Avatar" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
