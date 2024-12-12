import React, { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer hover:text-blue-500 dark:hover:text-blue-300">
          FuturisticApp
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">About</li>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Features</li>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Contact</li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? (
              <span role="img" aria-label="Light mode">
                ☀️
              </span>
            ) : (
              <span role="img" aria-label="Dark mode">
                🌙
              </span>
            )}
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
