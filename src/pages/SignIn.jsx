import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    // Send login data to backend API using username and password
    axios
      .post("http://127.0.0.1:8000/core/login/", { username, password })
      .then((response) => {
        // Get token and user role from response
        const token = response.data.token;
        const role = response.data.role; // Assuming the backend sends the role in the response

        // Store token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);

        // Show success alert
        alert("Signed in successfully");

        // Redirect based on user role
        if (role === "cashier") {
          navigate("/cashier-dashboard");
        } else if (role === "underwriter") {
          navigate("/underwriter-dashboard");
        } else if (role === "claim_officer") {
          navigate("/claim-officer-dashboard");
        } else if (role === "customer") {
          navigate("/customer-dashboard");
        } else {
          navigate("/customerhome"); // A fallback dashboard for other roles
        }
      })
      .catch((err) => {
        setError("Invalid credentials, please try again.");
        console.error("Login error", err);
      });
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Sign In Form */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Sign In</h1>
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
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

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 border-t border-gray-300"></div>

          {/* Alternative Action */}
          <div className="text-sm text-center text-gray-600">
            <p>
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignIn;

