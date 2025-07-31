import { useState, useEffect } from "react";
import VpbankLogo from "../../assets/VPBank_logo.png";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";

const Navbar = ({
  isSignIn,
  setIsSignIn,
  isSignUp,
  setIsSignUp,
  isGetStarted,
}) => {
  const [section, setSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const sections = [
        {
          id: "solutions",
          offset: document.getElementById("solutions")?.offsetTop,
        },
        {
          id: "userGuide",
          offset: document.getElementById("userGuide")?.offsetTop,
        },
        {
          id: "aboutUs",
          offset: document.getElementById("aboutUs")?.offsetTop,
        },
      ];

      const current = sections
        .filter((s) => s.offset !== undefined)
        .reverse()
        .find((s) => scrollY + 100 >= s.offset);

      if (current && current.id !== section) {
        setSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [section]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-lg pr-30 py-4 flex items-center justify-between pl-15">
      <div className="flex items-center space-x-2">
        {["solutions", "userGuide", "aboutUs"].map((sec) => (
          <button
            key={sec}
            onClick={() => {
              setSection(sec);
              const el = document.getElementById(sec);
              el && el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`${
              section === sec ? "bg-[#38a44a] text-white" : ""
            } px-4 py-2 hover:cursor-pointer rounded-3xl`}
          >
            <a href={`#${sec}`} className="text-lg capitalize">
              {sec === "userGuide"
                ? "User Guide"
                : sec === "aboutUs"
                ? "About Us"
                : "Solutions"}
            </a>
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <img
          src={VpbankLogo}
          alt="Logo VPBANK"
          className="h-10 pr-14 cursor-pointer"
          onClick={() => window.location.reload()}
        />
      </div>

      <div className="flex items-center space-x-8">
        <button
          onClick={() => setIsSignIn(true)}
          className="px-6 py-2 border-[1.5px] border-[#00b550] rounded-xl hover:cursor-pointer"
        >
          <p className="text-lg">Sign in</p>
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          className="px-6 py-2 rounded-xl bg-[#00b550]
            shadow-[0_0_6px_1px_rgba(0,190,80,0.6),0_0_40px_8px_rgba(0,190,80,0.4)]
            text-white transition-all duration-300 ease-out
            hover:scale-105 hover:brightness-110 hover:cursor-pointer active:scale-100"
        >
          <p className="text-lg font-semibold text-white">Sign up</p>
        </button>
      </div>

      {isSignIn && (
        <SignIn
          show={isSignIn}
          isGetStarted={isGetStarted}
          onClose={() => setIsSignIn(false)}
        />
      )}
      {isSignUp && (
        <SignUp show={isSignUp} onClose={() => setIsSignUp(false)} />
      )}
    </div>
  );
};

export default Navbar;
