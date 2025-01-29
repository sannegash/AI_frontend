import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate from React Router v6
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
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle boolean (checkbox) fields
        if (type === "checkbox") {
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else if (type === "number") {
            setFormData((prevState) => ({
                ...prevState,
                [name]: parseInt(value, 10) || 0, // Ensure it's a valid number
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Load from .env

    const handleSubmit = async (data) => {
        try {
            const token = localStorage.getItem("accessToken"); // Get token from storage

            const response = await axios.post(
                `${API_BASE_URL}/accounts/newcustomers/`, // Use dynamic API_BASE_URL
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Attach token
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Success:", response.data);
            navigate("/success"); // Navigate to success page
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError(error.response?.data || "An error occurred");
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
            <UserNavbar />
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Personal Data Submission</h1>
            {error && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                </div>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData);
                }}
                className="space-y-4"
            >
                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Driving Experience (in years)</label>
                    <input
                        type="number"
                        name="driving_experience"
                        value={formData.driving_experience}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Education</label>
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Income</label>
                    <input
                        type="number"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Owner Name</label>
                    <input
                        type="text"
                        name="owner_name"
                        value={formData.owner_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Postal Code</label>
                    <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group flex items-center">
                    <input
                        type="checkbox"
                        name="married"
                        checked={formData.married}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-gray-700">Married</label>
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Children</label>
                    <input
                        type="number"
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Traffic Violations</label>
                    <input
                        type="number"
                        name="traffic_violations"
                        value={formData.traffic_violations}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Number of Accidents</label>
                    <input
                        type="number"
                        name="number_of_accidents"
                        value={formData.number_of_accidents}
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

export default PersonalData;
