import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle responsiveness: Desktop vs Mobile
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 768);
    if (window.innerWidth >= 768) setDropdownOpen(false); // Close dropdown if resizing back to desktop
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md fixed top-0 w-full z-10">
      {/* Navbar Container */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer hover:text-blue-500 dark:hover:text-blue-300 md:flex md:order-1 md:justify-start">
          Awash Insurance
        </div>

        {/* Hamburger Icon (Always Responsive) */}
        <button
          className="md:hidden px-2 py-1 text-gray-600 hover:text-blue-500"
          onClick={toggleDropdown}
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Links Section - Always visible on Desktop */}
        <ul className={`hidden md:flex md:space-x-6 font-medium`}>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">About</li>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Features</li>
          <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Contact</li>
        </ul>

        {/* Buttons Section - Styled Properly */}
        <div className="hidden md:flex items-center space-x-4 md:order-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? (
              <span role="img" aria-label="Light mode">☀️</span>
            ) : (
              <span role="img" aria-label="Dark mode">🌙</span>
            )}
          </button>
          <Link to="/signin" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">Sign In</Link>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">Sign Up</button>
        </div>
      </div>

      {/* Dropdown Menu Section for both Desktop and Mobile */}
      {dropdownOpen && (
        <div className={`absolute top-14 left-0 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 px-4`}>
          <ul className="flex flex-col space-y-2 text-center md:space-y-0 md:flex-row md:space-x-6">
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">About</li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Features</li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

