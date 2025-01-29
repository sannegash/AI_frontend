import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Use useNavigate from React Router v6

const VehicleData = () => {
    const [formData, setFormData] = useState({
        chassis_number: "",
        registration_number: "",
        owner_name: "",
        vehicle_make: "",
        vehicle_model: "",
        vehicle_year: "",
        fuel_type: "",
        transmission_type: "",
        engine_capacity: "",
        color: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();  // Replace useHistory with useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Load from .env
    
    const handleSubmit = async (data) => {
        try {
            const token = localStorage.getItem("accessToken"); // Get token from storage
    
            const response = await axios.post(
                `${API_BASE_URL}/accounts/newcustomers/vehicle/`,  // Adjust the API endpoint as needed
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Attach token
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
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Vehicle Data Submission</h1>
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
            }} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Chassis Number</label>
                    <input
                        type="text"
                        name="chassis_number"
                        value={formData.chassis_number}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Registration Number</label>
                    <input
                        type="text"
                        name="registration_number"
                        value={formData.registration_number}
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
                    <label className="block text-gray-700 font-medium">Vehicle Make</label>
                    <input
                        type="text"
                        name="vehicle_make"
                        value={formData.vehicle_make}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Vehicle Model</label>
                    <input
                        type="text"
                        name="vehicle_model"
                        value={formData.vehicle_model}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Vehicle Year</label>
                    <input
                        type="number"
                        name="vehicle_year"
                        value={formData.vehicle_year}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Fuel Type</label>
                    <input
                        type="text"
                        name="fuel_type"
                        value={formData.fuel_type}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Transmission Type</label>
                    <input
                        type="text"
                        name="transmission_type"
                        value={formData.transmission_type}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Engine Capacity (L)</label>
                    <input
                        type="text"
                        name="engine_capacity"
                        value={formData.engine_capacity}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium">Color</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
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

export default VehicleData;
