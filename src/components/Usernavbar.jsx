import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate(); // For navigation after sign-out

  useEffect(() => {
    // Fetch role, username, and tokens from sessionStorage
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");  // Fetch the role (e.g., "customer", "underwriter", etc.)
    const accessToken = sessionStorage.getItem("access");
    const refreshToken = sessionStorage.getItem("refresh");

    // Check if any of the tokens are available
    if (username && role && (accessToken || refreshToken)) {
      setLoggedInUser({ username, role }); // Set the logged-in user with username and role
    } else {
      console.log("No username, role, or token found in sessionStorage.");
    }

    // Check for dark mode preference from localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    // Save the dark mode preference in localStorage
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
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
    sessionStorage.clear(); // Remove everything from sessionStorage
    navigate("/logged-out"); // Redirect to logged-out page
  };

  // Check if we are on the sign-in or sign-up page
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  // Determine if the user is logged in and render the appropriate link
  const homeLink = loggedInUser ? (
    // Redirect to the appropriate home page based on the user role
    <Link
      to={
        loggedInUser.role === "newcustomer"
          ? "/customerhome"
          : loggedInUser.role === "underwriter"
          ? "/underwriterhome"
          : loggedInUser.role === "claimofficer"
          ? "/claimofficerhome"
          : "/"
      }
      className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
    >
      Awash Insurance
    </Link>
  ) : (
    // If the user is not logged in, show the homepage link
    <Link
      to="/"
      className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
    >
      Awash Insurance
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md fixed top-0 w-full z-10">
      {/* Navbar Container */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo Text - Conditionally Rendered */}
        {homeLink}

        {/* Right-side buttons (Logged-in user profile and dark mode) */}
        {loggedInUser ? (
          <div className="flex items-center space-x-4 md:order-3">
            {/* Dark Mode Button */}
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

            {/* User Profile with Avatar and Dropdown */}
            <div className="relative flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
                {/* Avatar (initials of the username) */}
                <span className="text-lg">{loggedInUser.username[0]}</span>
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {loggedInUser.username}
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute mt-2 right-0 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 z-20">
                  <Link
                    to="/accountmanagement"
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
          </div>
        ) : (
          <div>Loading...</div> // Show a loading message if the user is not yet loaded
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
