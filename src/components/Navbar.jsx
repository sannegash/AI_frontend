import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ loggedInUser }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

  // Handle Logo Click - Redirect to Home
  const handleLogoClick = () => {
    navigate("/");
  };

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
        >
          Awash Insurance
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

        {/* Right-Side Buttons */}
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

          {loggedInUser ? (
            <div className="relative flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
                <span className="text-lg">{loggedInUser.username[0]}</span>
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {loggedInUser.username}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2">
                  <Link
                    to="/accountmanagement"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Account Management
                  </Link>
                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/signin");
                    }}
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
    </nav>
  );
};

export default Navbar;

