import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ loggedInUser }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation(); // Get the current location (route)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) setDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Sign Out
  const handleSignOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("authToken");
    window.location.reload(); // Redirect to home or login page
  };

  // Check if we are on the sign-in or sign-up page
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md fixed top-0 w-full z-10">
      {/* Navbar Container */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo Text */}
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
          <Link to="/">Awash Insurance</Link>
        </div>

        {/* Desktop Menu Links */}
        {!isAuthPage && (
          <ul className="hidden md:flex md:space-x-6 font-medium">
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="/" className="text-gray-800 dark:text-gray-200">
                Home
              </Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="#about" className="text-gray-800 dark:text-gray-200">
                About
              </Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="#services" className="text-gray-800 dark:text-gray-200">
                Services
              </Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="#features" className="text-gray-800 dark:text-gray-200">
                Features
              </Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="#contact" className="text-gray-800 dark:text-gray-200">
                Contact
              </Link>
            </li>
          </ul>
        )}

        {/* Right-side buttons */}
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

          {/* If user is logged in, show username and avatar */}
          {loggedInUser ? (
            <div className="relative flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
                {/* Avatar emoji */}
                <span className="text-lg">{loggedInUser.username[0]}</span>
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {loggedInUser.username}
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2">
                  <Link
                    to="/account-management"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Account Management
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Dropdown Menu for Mobile Devices */}
      {dropdownOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 px-4 md:hidden">
          <ul className="flex flex-col space-y-2 text-center md:space-y-0 md:flex-row md:space-x-6">
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="/" className="text-gray-800 dark:text-gray-200">Home</Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="/about" className="text-gray-800 dark:text-gray-200">About</Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="/service" className="text-gray-800 dark:text-gray-200">Service</Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="/features" className="text-gray-800 dark:text-gray-200">Features</Link>
            </li>
            <li className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
              <Link to="/contact" className="text-gray-800 dark:text-gray-200">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
