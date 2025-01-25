import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      redirectBasedOnRole(role); // Redirect if already authenticated
    }
  }, []); // Empty dependency array ensures this only runs once after initial render

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "cashier":
        navigate("/cashierhome");
        break;
      case "underwriter":
        navigate("/underwriterhome");
        break;
      case "claim_officer":
        navigate("/claimofficerhome");
        break;
      case "new_customer":
        navigate("/customerhome");
        break;
      default:
        navigate("/signin"); // Default to sign-in page for invalid roles
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError(""); // Clear previous error

    try {
      const response = await axios.post("http://127.0.0.1:8000/core/signin/", {
        username,
        password,
      });

      const { access, refresh, user } = response.data;
      const userRole = user?.role;
      const returnedUsername = user?.username;

      // Log to debug
      console.log("Access Token:", access);
      console.log("Refresh Token:", refresh);
      console.log("Role:", userRole);
      console.log("Username:", returnedUsername);

      // Store data in sessionStorage
      sessionStorage.setItem("access", access);
      sessionStorage.setItem("refresh", refresh);
      sessionStorage.setItem("role", userRole);
      sessionStorage.setItem("username", returnedUsername);

      // Redirect based on role
      redirectBasedOnRole(userRole);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Sign In</h1>
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none transition"
            >
              Sign In
            </button>
          </form>
          <div className="my-4 border-t border-gray-300"></div>
          <div className="text-sm text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
