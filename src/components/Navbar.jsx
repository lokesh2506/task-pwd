import { useState } from "react";
import { logout } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow dark:bg-gray-900">
      <div className="text-xl font-bold">
        TaskPWA
      </div>
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full border rounded px-3 py-1"
        />
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleDarkMode} className="text-xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        {user && (
          <img src={user.photoURL || "https://i.pravatar.cc/40"} alt="profile" className="w-8 h-8 rounded-full"/>
        )}
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;