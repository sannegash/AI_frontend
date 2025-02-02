import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const VehicleData = () => {
  // List of all vehicles fetched from the API
  const [vehicles, setVehicles] = useState([]);
  // The currently selected vehicle for editing (or null when adding a new one)
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  // Local form state for vehicle fields
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
  const navigate = useNavigate();

  // Updated API endpoint
  const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";

  // Helper: initial state for clearing the form after submission
  const initialFormState = {
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
  };

  // Fetch vehicles from the specified endpoint
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(VEHICLE_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assume response.data is an array of vehicle objects.
      setVehicles(response.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicle data.");
    }
  };

  // On component mount, load vehicle data.
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Convert numeric fields appropriately
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

  // When a vehicle from the list is clicked, load its data into the form.
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      vehicle_model: vehicle.vehicle_model || "",
      vehicle_make: vehicle.vehicle_make || "",
      year_of_manufacture: vehicle.year_of_manufacture || "",
      registration_number: vehicle.registration_number || "",
      vehicle_type: vehicle.vehicle_type || "",
      fuel_type: vehicle.fuel_type || "",
      mileage: vehicle.mileage || "",
      color: vehicle.color || "",
      owner_name: vehicle.owner_name || "",
      insurance_policy_number: vehicle.insurance_policy_number || "",
    });
  };

  // Submit form for adding or updating a vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      if (selectedVehicle) {
        // If editing an existing vehicle, update via PUT (or PATCH)
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
        // Otherwise, add a new vehicle
        await axios.post(VEHICLE_API_ENDPOINT, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      // Refresh the list and clear the form
      fetchVehicles();
      setFormData(initialFormState);
      setSelectedVehicle(null);
      // Optionally navigate to a success page:
      // navigate("/success");
    } catch (err) {
      console.error("Error submitting vehicle data:", err.response?.data || err.message);
      setError(err.response?.data || "An error occurred while submitting vehicle data.");
    }
  };

  // Remove a vehicle using its ID
  const handleRemoveVehicle = async (vehicleId) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${VEHICLE_API_ENDPOINT}${vehicleId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVehicles();
      // If the deleted vehicle was being edited, clear the form.
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
            {/* First row: vehicle model and make */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="vehicle_model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Model
                </label>
                <input
                  type="text"
                  id="vehicle_model"
                  name="vehicle_model"
                  value={formData.vehicle_model}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicle_make"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Make
                </label>
                <input
                  type="text"
                  id="vehicle_make"
                  name="vehicle_make"
                  value={formData.vehicle_make}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
            </div>

            {/* Second row: year of manufacture and registration number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="year_of_manufacture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year of Manufacture
                </label>
                <input
                  type="number"
                  id="year_of_manufacture"
                  name="year_of_manufacture"
                  value={formData.year_of_manufacture}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="registration_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registration_number"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
            </div>

            {/* Third row: vehicle type and fuel type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="vehicle_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Type
                </label>
                <input
                  type="text"
                  id="vehicle_type"
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="fuel_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel Type
                </label>
                <input
                  type="text"
                  id="fuel_type"
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
            </div>

            {/* Fourth row: mileage and color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="mileage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mileage
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
            </div>

            {/* Fifth row: owner name and insurance policy number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="owner_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Owner Name
                </label>
                <input
                  type="text"
                  id="owner_name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="insurance_policy_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Insurance Policy Number
                </label>
                <input
                  type="text"
                  id="insurance_policy_number"
                  name="insurance_policy_number"
                  value={formData.insurance_policy_number}
                  onChange={handleChange}
                  className="mt-1 border w-full px-4 py-2 rounded-md text-black"
                />
              </div>
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