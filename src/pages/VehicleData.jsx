import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate from React Router v6
import UserNavbar from "../components/Usernavbar";

const VehicleData = () => {
    const [formData, setFormData] = useState({
        vehicle_model: "",
        vehicle_make: "",
        year_of_manufacture: "",
        registration_number: "",
        vehicle_type: "",
        fuel_type: "",
        mileage: "",
        color: "",
        owner_name: "",
        insurance_policy_number: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "number") {
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
                `${API_BASE_URL}/accounts/newcustomers/vehicle-data/`, // Use dynamic API_BASE_URL for vehicle data
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
        <div className="w-screen h-screen bg-gray-100 flex flex-col">
            <UserNavbar />
            <main className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Vehicle Data Submission</h1>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vehicle_model">
                                    Vehicle Model
                                </label>
                                <input
                                    type="text"
                                    id="vehicle_model"
                                    name="vehicle_model"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.vehicle_model}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vehicle_make">
                                    Vehicle Make
                                </label>
                                <input
                                    type="text"
                                    id="vehicle_make"
                                    name="vehicle_make"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.vehicle_make}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Second row with two fields side by side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="year_of_manufacture">
                                    Year of Manufacture
                                </label>
                                <input
                                    type="number"
                                    id="year_of_manufacture"
                                    name="year_of_manufacture"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.year_of_manufacture}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="registration_number">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    id="registration_number"
                                    name="registration_number"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.registration_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Third row with two fields side by side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vehicle_type">
                                    Vehicle Type
                                </label>
                                <input
                                    type="text"
                                    id="vehicle_type"
                                    name="vehicle_type"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.vehicle_type}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fuel_type">
                                    Fuel Type
                                </label>
                                <input
                                    type="text"
                                    id="fuel_type"
                                    name="fuel_type"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.fuel_type}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Additional fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mileage">
                                    Mileage
                                </label>
                                <input
                                    type="number"
                                    id="mileage"
                                    name="mileage"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.mileage}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="color">
                                    Vehicle Color
                                </label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.color}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Owner and insurance details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="owner_name">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="insurance_policy_number">
                                    Insurance Policy Number
                                </label>
                                <input
                                    type="text"
                                    id="insurance_policy_number"
                                    name="insurance_policy_number"
                                    className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.insurance_policy_number}
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

export default VehicleData;
