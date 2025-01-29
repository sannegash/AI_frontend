import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // React Router v6
import UserNavbar from "../components/Usernavbar"; // Import UserNavbar

const DriverData = () => {
    const [formData, setFormData] = useState({
        driver_firstname: "",
        driver_lastname: "",
        licence_number: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  // Load from .env
    
    const handleSubmit = async (data) => {
        try {
            const token = localStorage.getItem("accessToken");  // Get token from storage
    
            const response = await axios.post(
                `${API_BASE_URL}/accounts/newcustomers/driver/`,  // Adjust the API endpoint as needed
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Attach token
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("Success:", response.data);
            navigate("/success");  // Redirect on success (optional)
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError(error.response?.data || "An error occurred");
        }
    };

    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col">
            {/* Include UserNavbar here */}
            <UserNavbar />

            <main className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-96">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Driver Data Submission</h1>
                    {error && (
                        <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
                    )}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(formData);
                    }} className="space-y-4">
                        {/* First field for Driver First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="driver_firstname">
                                Driver First Name
                            </label>
                            <input
                                type="text"
                                id="driver_firstname"
                                name="driver_firstname"
                                value={formData.driver_firstname}
                                onChange={handleChange}
                                required
                                className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Second field for Driver Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="driver_lastname">
                                Driver Last Name
                            </label>
                            <input
                                type="text"
                                id="driver_lastname"
                                name="driver_lastname"
                                value={formData.driver_lastname}
                                onChange={handleChange}
                                required
                                className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Third field for Licence Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="licence_number">
                                Licence Number
                            </label>
                            <input
                                type="text"
                                id="licence_number"
                                name="licence_number"
                                value={formData.licence_number}
                                onChange={handleChange}
                                required
                                className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
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

export default DriverData;
