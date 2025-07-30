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
  return (
    <div className="pr-30 py-4 flex items-center justify-between pl-15">
      <div className="flex items-center space-x-6">
        <button className="px-2 py-4 hover:cursor-pointer">
          <a href="#solutions" className="text-lg">
            Solutions
          </a>
        </button>
        <button className="px-2 py-4 hover:cursor-pointer">
          <a href="#userGuide" className="text-lg">
            User Guide
          </a>
        </button>
        <button className="px-2 py-4 hover:cursor-pointer">
          <a href="#aboutUs" className="text-lg">
            About Us
          </a>
        </button>
      </div>
      <div className="flex justify-center items-center">
        <img src={VpbankLogo} alt="Logo VPBANK" className="h-12" />
      </div>
      <div className="flex items-center space-x-8">
        <button
          onClick={() => {
            setIsSignIn(true);
          }}
          className="px-6 py-2 border-[1.5px] border-[#00b550] rounded-xl hover:cursor-pointer"
        >
          <p className="text-lg">Sign in</p>
        </button>
        <button
          onClick={() => {
            setIsSignUp(true);
          }}
          className="px-6 py-2 rounded-xl bg-[#00b550]
              shadow-[0_0_6px_1px_rgba(0,190,80,0.6),0_0_40px_8px_rgba(0,190,80,0.4)] 
              text-white
              transition-all duration-300 ease-out
              hover:scale-105 hover:brightness-110 hover:cursor-pointer 
              active:scale-100"
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
        <SignUp
          show={isSignUp}
          onClose={() => {
            setIsSignUp(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
