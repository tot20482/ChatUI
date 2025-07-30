import { useNavigate } from "react-router-dom";
import signin from "../../assets/signin.png";

const SignIn = ({ show, onClose }) => {
  const navigate = useNavigate();
  if (!show) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email && password) {
      onClose();
      navigate("/home");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        background: "linear-gradient(to right, #094993, #38a44a)",
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-md h-[55%] rounded-xl shadow-lg p-8 relative border-[1px] border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[25%] aspect-square flex justify-center items-center rounded-full bg-[#38a44a] absolute top-[-20%] left-1/2 transform -translate-x-1/2">
          <img src={signin} alt="Sign in" className="h-[50%]" />
        </div>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-400 rounded-md focus:outline-none focus:border-[1px] focus:border-[#38a44a]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-400 rounded-md focus:outline-none focus:border-[1px] focus:border-[#38a44a]"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-medium text-white hover:cursor-pointer hover:underline text-right">
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#38a44a] text-white rounded-md hover:brightness-110 mt-2 hover:cursor-pointer hover:scale-105 transition-all duration-300 active:scale-100"
          >
            <p className="text-lg">Login</p>
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white hover:cursor-pointer text-3xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignIn;
