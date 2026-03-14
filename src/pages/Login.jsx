import { useState } from "react";
import { login, googleLogin } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import LoginTaskImage from "../assets/images/login_task.png"
import GroupStar from "../assets/images/group_star.png"


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isClicked) return;

    setIsClicked(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setIsClicked(false);
    }
  };


  const handleGoogleLogin = async () => {
    if (isClicked) return;

    setIsClicked(true);

    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (error) {
      setIsClicked(false);
    }
  };

  const handleTitleChange = (e) => {
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(e.target.value)) {
      setTitle(e.target.value);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white px-8 py-5 rounded-lg shadow-md w-96 flex flex-col gap-2 justify-center">
        <img src={LoginTaskImage} alt="" className="max-w-[280px] max-h-[280px]" />
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center gap-2"><img src={GroupStar} alt="" srcset="" className="" /> <h2 className="text-[1.5rem]">Welcome!</h2></div>
          <p>Plan your day with Taskify. Organize tasks, set goals, and stay on track</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <button
            type="submit" disabled={isClicked} className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            Login
          </button>
        </form>
        <button onClick={handleGoogleLogin} disabled={isClicked} className={`w-full  py-2 rounded flex items-center justify-center gap-2 
          ${isClicked 
            ? "bg-blue-600 text-white border-none" 
            : "bg-white border border-gray-300 text-black"}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z"/>
          </svg>
          Continue With Email
        </button>

        <p className="text-center mt-1">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 ml-1">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}