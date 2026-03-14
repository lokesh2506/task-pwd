import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import CreateAccount from "../assets/images/create_account.png"

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch (error) {}
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl  mb-6 text-center font-semibold">Create Account</h2>
        <img src={CreateAccount} alt="" srcset="" />
        <form onSubmit={handleSignup} className="space-y-4">
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
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?
          <Link to="/" className="text-blue-600 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}