import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import VpbankLogo from "../../../assets/VPBank_logo.png";
import friends from "../../../assets/friends.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-1/5-screen flex justify-between items-center pl-18 pr-24 py-4 border-b-1 border-gray-200 shadow bg-white relative z-50">
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(0);
        }}
      >
        <img src={VpbankLogo} alt="Logo Vpbank" className="h-10" />
      </div>

      <div className="flex justify-center items-center space-x-12">
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-2 rounded-xl border-[1px] border-[#38a44a] hover:bg-[#38a44a] hover:text-white cursor-pointer"
        >
          <p className="text-medium font-semibold">Search Mode</p>
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            className="h-12 w-12 rounded-full flex justify-center items-center border border-[#38a44a] cursor-pointer"
            onClick={handleAvatarClick}
          >
            <div className="h-10 w-10 rounded-full bg-blue-200 flex justify-center items-center">
              <img src={friends} alt="Avatar" className="h-[25px]" />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={() => navigate("/settings")}
                className="block w-full text-left px-4 py-2 text-md hover:rounded-t-lg hover:bg-gray-100 cursor-pointer "
              >
                Setting
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-md hover:rounded-b-lg hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
