import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Changed from useHistory to useNavigate
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate instead of history

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, firstName, lastName, email, birthDate, gender, password, confirmPassword } = formData;
    
    // Simple validation before submitting
    if (!username || !firstName || !lastName || !email || !birthDate || !gender || !password || !confirmPassword) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/core/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          first_name: firstName,
          last_name: lastName,
          email,
          birth_date: birthDate,
          gender,
          password, // Send only the password field, not confirmPassword
          role: "new_customer", // default role as new_customer
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/signup"); // Redirect to login page after successful signup
      } else {
        setError(result.error || "Failed to sign up.");
      }
    } catch (error) {
      setError("Error occurred while submitting the form.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Sign Up</h1>

          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="birthDate">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupForm;

