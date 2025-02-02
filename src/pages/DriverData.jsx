import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";
import { FaCar } from "react-icons/fa";

const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";
const DRIVER_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/driver/";

const DriverData = () => {
    const [formData, setFormData] = useState({
        driver_firstname: "",
        driver_lastname: "",
        licence_number: "",
    });
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(VEHICLE_API_ENDPOINT);
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleVehicleSelect = (vehicleId) => {
        setSelectedVehicle(vehicleId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                DRIVER_API_ENDPOINT,
                { ...formData, vehicle: selectedVehicle },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
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
                <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-96">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Driver Data Submission</h1>
                    {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Select a Vehicle</h2>
                        <div className="space-y-2">
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    onClick={() => handleVehicleSelect(vehicle.id)}
                                    className={`flex items-center p-2 border rounded-md cursor-pointer transition ${
                                        selectedVehicle === vehicle.id ? "bg-blue-200" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FaCar className="text-blue-500 mr-2" />
                                    <span>{vehicle.plate_number}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none transition"
                            disabled={!selectedVehicle}
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
