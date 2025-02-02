import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Sun, Moon, UserCircle, LogOut, Settings } from "lucide-react";

const UserNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(["Policy updated", "Claim approved", "Premium due"]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");
    const accessToken = sessionStorage.getItem("access");
    const refreshToken = sessionStorage.getItem("refresh");

    if (username && role && (accessToken || refreshToken)) {
      setLoggedInUser({ username, role });
    }

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
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  const handleSignOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/logged-out");
  };

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  const homeLink = loggedInUser ? (
    <Link
      to={
        loggedInUser.role === "new_customer"
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
    <Link
      to="/"
      className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
    >
      Awash Insurance
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg fixed top-0 w-full z-20">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Home Link */}
        {homeLink}

        {/* Right-side Buttons */}
        {loggedInUser && (
          <div className="flex items-center space-x-4">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute mt-2 right-0 w-64 bg-gray-800 shadow-lg rounded-lg py-2 z-20">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
                      >
                        {notification}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">No new notifications</div>
                  )}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
              >
                <UserCircle size={24} />
                <span className="text-sm font-medium">{loggedInUser.username}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute mt-2 right-0 w-48 bg-gray-800 shadow-lg rounded-lg py-2 z-20">
                  <Link
                    to="/accountmanagement"
                    className="block px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    <Settings size={16} className="inline-block mr-2" /> Account Management
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700"
                  >
                    <LogOut size={16} className="inline-block mr-2" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
