import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // React Router v6

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
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Driver Data Submission</h1>
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
            }} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Driver First Name</label>
                    <input
                        type="text"
                        name="driver_firstname"
                        value={formData.driver_firstname}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Driver Last Name</label>
                    <input
                        type="text"
                        name="driver_lastname"
                        value={formData.driver_lastname}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Licence Number</label>
                    <input
                        type="text"
                        name="licence_number"
                        value={formData.licence_number}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DriverData;
