import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const VehicleData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
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
  const navigate = useNavigate();
  const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";

  const initialFormState = {
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
  };

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(VEHICLE_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles(response.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicle data.");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value, 10) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      chassis_number: vehicle.chassis_number || "",
      registration_number: vehicle.registration_number || "",
      owner_name: vehicle.owner_name || "",
      vehicle_make: vehicle.vehicle_make || "",
      vehicle_model: vehicle.vehicle_model || "",
      vehicle_year: vehicle.vehicle_year || "",
      fuel_type: vehicle.fuel_type || "",
      transmission_type: vehicle.transmission_type || "",
      engine_capacity: vehicle.engine_capacity || "",
      color: vehicle.color || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      if (selectedVehicle) {
        await axios.put(
          `${VEHICLE_API_ENDPOINT}${selectedVehicle.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(VEHICLE_API_ENDPOINT, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      fetchVehicles();
      setFormData(initialFormState);
      setSelectedVehicle(null);
    } catch (err) {
      console.error("Error submitting vehicle data:", err.response?.data || err.message);
      setError(err.response?.data || "An error occurred while submitting vehicle data.");
    }
  };

  const handleRemoveVehicle = async (vehicleId) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${VEHICLE_API_ENDPOINT}${vehicleId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVehicles();
      if (selectedVehicle && selectedVehicle.id === vehicleId) {
        setSelectedVehicle(null);
        setFormData(initialFormState);
      }
    } catch (err) {
      console.error("Error deleting vehicle:", err.response?.data || err.message);
      setError("Failed to delete the vehicle.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Vehicle Data</h1>
        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </div>
        )}
  
        {/* Vehicle List */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-black">List of Vehicles</h2>
          {vehicles.length === 0 ? (
            <p className="text-black">No vehicles found.</p>
          ) : (
            <ul className="space-y-2">
              {vehicles.map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <span
                    onClick={() => handleVehicleSelect(vehicle)}
                    className="flex-1 text-black"
                  >
                    {vehicle.vehicle_make} {vehicle.vehicle_model} –{" "}
                    {vehicle.registration_number}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveVehicle(vehicle.id);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
  
        {/* Vehicle Form */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-black">
            {selectedVehicle ? "Edit Vehicle" : "Add New Vehicle"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Chassis Number */}
            <div>
              <label
                htmlFor="chassis_number"
                className="block text-sm font-medium text-black"
              >
                Chassis Number
              </label>
              <input
                type="text"
                id="chassis_number"
                name="chassis_number"
                value={formData.chassis_number}
                onChange={handleChange}
                className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
              />
            </div>
  
            {/* Registration Number and Owner Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="registration_number"
                  className="block text-sm font-medium text-black"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registration_number"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="owner_name"
                  className="block text-sm font-medium text-black"
                >
                  Owner Name
                </label>
                <input
                  type="text"
                  id="owner_name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
            </div>
  
            {/* Vehicle Make and Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="vehicle_make"
                  className="block text-sm font-medium text-black"
                >
                  Vehicle Make
                </label>
                <input
                  type="text"
                  id="vehicle_make"
                  name="vehicle_make"
                  value={formData.vehicle_make}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicle_model"
                  className="block text-sm font-medium text-black"
                >
                  Vehicle Model
                </label>
                <input
                  type="text"
                  id="vehicle_model"
                  name="vehicle_model"
                  value={formData.vehicle_model}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
            </div>
  
            {/* Vehicle Year and Fuel Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="vehicle_year"
                  className="block text-sm font-medium text-black"
                >
                  Vehicle Year
                </label>
                <input
                  type="number"
                  id="vehicle_year"
                  name="vehicle_year"
                  value={formData.vehicle_year}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="fuel_type"
                  className="block text-sm font-medium text-black"
                >
                  Fuel Type
                </label>
                <input
                  type="text"
                  id="fuel_type"
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
            </div>
  
            {/* Transmission Type and Engine Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="transmission_type"
                  className="block text-sm font-medium text-black"
                >
                  Transmission Type
                </label>
                <input
                  type="text"
                  id="transmission_type"
                  name="transmission_type"
                  value={formData.transmission_type}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="engine_capacity"
                  className="block text-sm font-medium text-black"
                >
                  Engine Capacity
                </label>
                <input
                  type="text"
                  id="engine_capacity"
                  name="engine_capacity"
                  value={formData.engine_capacity}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
                />
              </div>
            </div>
  
            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-black"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              {selectedVehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
 }; 
  export default VehicleData;