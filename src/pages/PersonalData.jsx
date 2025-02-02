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
  const [existingCustomer, setExistingCustomer] = useState(null);
  const navigate = useNavigate();

  const endpoint = `http://127.0.0.1:8000/accounts/api/newcustomers/`;

  // Fetch existing customer data when the component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          setError("Authentication token not found.");
          return;
        }
  
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("API Response Data:", response.data);
  
        if (response.data && response.data.length > 0) {
          const customerData = response.data[0]; // Assume there's only one object for the logged-in user
          setExistingCustomer(customerData);
  
          // Check if customer data contains valid values
          const isDataComplete = Object.keys(customerData).every(
            (key) => customerData[key] !== "" && customerData[key] !== null
          );
  
          if (isDataComplete) {
            // Data exists and is complete
            setFormData({
              age: customerData.age || "",
              driving_experience: customerData.driving_experience || "",
              education: customerData.education || "",
              income: customerData.income || "",
              owner_name: customerData.owner_name || "",
              phone_number: customerData.phone_number || "",
              postal_code: customerData.postal_code || "",
              city: customerData.city || "",
              state: customerData.state || "",
              married: customerData.married || false,
              children: customerData.children || 0,
              traffic_violations: customerData.traffic_violations || 0,
              number_of_accidents: customerData.number_of_accidents || 0,
            });
          } else {
            // Data exists but is incomplete, you may want to show a message here
            setError("Your personal data is incomplete. Please fill out the form to complete your profile.");
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError("Failed to load customer data.");
      }
    };
  
    fetchCustomerData();
  }, []); // Empty dependency array to run once when the component mounts
  

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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      const method = existingCustomer ? "put" : "post";
      const dataToSubmit = existingCustomer ? { ...formData } : formData; // If existing customer, send updated data

      const response = await axios({
        method,
        url: endpoint,
        data: dataToSubmit,
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
          {existingCustomer ? (
            <>
              <h2 className="text-lg font-semibold mb-4">Existing Data</h2>
              <p className="text-gray-700 mb-4">
                Your existing personal data is already saved. You can update
                your information below if needed.
              </p>
            </>
          ) : (
            <p className="text-gray-700 mb-4">
              You haven't filled out the form yet. Please provide your personal
              data below.
            </p>
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
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
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
