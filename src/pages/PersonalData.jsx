import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const PersonalData = () => {
  const [formData, setFormData] = useState({
    age: "",
    driving_experience: "",
    education: "",
    income: "",
    owner_name: "",
    phone_number: "",
    postal_code: "",
    city: "",
    state: "",
    married: false,
    children: 0,
    traffic_violations: 0,
    number_of_accidents: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use your provided endpoint directly
  const endpoint = "http://127.0.0.1:8000/accounts/api/newcustomers/";

  // Fetch existing customer data when the component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // If the API returns an array, we assume you want the first customer.
        const customer = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        // Update the form state with the existing data.
        setFormData({
          age: customer.age || "",
          driving_experience: customer.driving_experience || "",
          education: customer.education || "",
          income: customer.income || "",
          owner_name: customer.owner_name || "",
          phone_number: customer.phone_number || "",
          postal_code: customer.postal_code || "",
          city: customer.city || "",
          state: customer.state || "",
          married: customer.married || false,
          children: customer.children || 0,
          traffic_violations: customer.traffic_violations || 0,
          number_of_accidents: customer.number_of_accidents || 0,
        });
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError("Failed to load customer data.");
      }
    };

    fetchCustomerData();
  }, [endpoint]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: parseInt(value, 10) || 0,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      // Adjust the HTTP method if needed (POST, PUT, or PATCH)
      const response = await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", response.data);
      navigate("/success");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
            Personal Data Submission
          </h1>
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}
            className="space-y-6"
          >
            {/* First row with two fields side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="driving_experience"
                >
                  Driving Experience (in years)
                </label>
                <input
                  type="number"
                  id="driving_experience"
                  name="driving_experience"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.driving_experience}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Second row with two fields side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="education"
                >
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="income"
                >
                  Income
                </label>
                <input
                  type="number"
                  id="income"
                  name="income"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.income}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Third row with two fields side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="owner_name"
                >
                  Owner Name
                </label>
                <input
                  type="text"
                  id="owner_name"
                  name="owner_name"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.owner_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="phone_number"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="postal_code"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.postal_code}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              {/* Married Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="married"
                  name="married"
                  checked={formData.married}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700" htmlFor="married">
                  Married
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="children"
                >
                  Children
                </label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.children}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="traffic_violations"
                >
                  Traffic Violations
                </label>
                <input
                  type="number"
                  id="traffic_violations"
                  name="traffic_violations"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.traffic_violations}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="number_of_accidents"
                >
                  Number of Accidents
                </label>
                <input
                  type="number"
                  id="number_of_accidents"
                  name="number_of_accidents"
                  className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.number_of_accidents}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PersonalData;
