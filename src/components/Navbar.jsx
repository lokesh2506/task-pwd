import { useState } from "react";
import { logout } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

import { FaMoon, FaSun } from "react-icons/fa";

import TaskifyLogo from "../../public/pwa-192.png"

const Navbar = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow dark:bg-gray-900">
      <div className="text-xl font-bold flex gap-2 items-center">
        <img src={TaskifyLogo} alt="" srcset="" className="rounded-full w-8" />
        <p className="dark:text-white">Taskify</p>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleDarkMode} className="text-xl">
          {darkMode ? <FaSun className="text-white"/> : <FaMoon />}
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