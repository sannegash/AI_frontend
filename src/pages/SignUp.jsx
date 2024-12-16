import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

const SignupForm = () => {
  const [step, setStep] = useState(1); // Manage steps
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    gender: '',
    birthdate: '',
    postalCode: '',
    city: '',
    state: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContinue = () => {
    const { email, firstName, lastName, username, gender, birthdate } = formData;
    if (!email || !firstName || !lastName || !username || !gender || !birthdate) {
      setError("Please fill out all fields before continuing.");
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitted Data: ", formData);
      const response = await fetch("http://your-backend-url/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful!");
      } else {
        setError(result.error || "Failed to sign up");
      }
    } catch (error) {
      setError("Error occurred while submitting form.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Sign Up</h1>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">
              {error}
            </div>
          )}

          {/* Multi-Step Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
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

                {/* Birthdate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="birthdate">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    className="border w-full px-4 py-2 rounded-md"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                >
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="postalCode">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="border w-full px-4 py-2 rounded-md"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="border w-full px-4 py-2 rounded-md"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="border w-full px-4 py-2 rounded-md"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignupForm;

