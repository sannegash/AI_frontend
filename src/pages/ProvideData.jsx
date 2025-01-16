import React, { useState } from "react";
import axios from "axios";

const NewCustomerForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    driving_experience: "",
    education: "",
    income: "",
    married: false,
    children: 0,
    traffic_violations: 0,
    number_of_accidents: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.age || !formData.driving_experience || !formData.education || !formData.income) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");

    // Send the form data to the backend to create the new customer
    axios
      .post("http://127.0.0.1:8000/api/newcustomer/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess("Form submitted successfully! Waiting for approval.");
        setError("");
      })
      .catch((err) => {
        setError("Error submitting the form. Please try again.");
        console.error("Error:", err);
      });
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">New Customer Form</h1>

        {/* Success or Error Message */}
        {success && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Driving Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Driving Experience</label>
            <input
              type="number"
              name="driving_experience"
              value={formData.driving_experience}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Income ($)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Married</label>
            <input
              type="checkbox"
              name="married"
              checked={formData.married}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          {/* Number of Children */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Traffic Violations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Violations in Last Year</label>
            <input
              type="number"
              name="traffic_violations"
              value={formData.traffic_violations}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number of Accidents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Accidents</label>
            <input
              type="number"
              name="number_of_accidents"
              value={formData.number_of_accidents}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none transition"
          >
            Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCustomerForm;
