import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const DriverData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    driver_firstname: "",
    driver_lastname: "",
    licence_number: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";
  const DRIVER_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/driver/";

  const initialFormState = {
    driver_firstname: "",
    driver_lastname: "",
    licence_number: "",
  };

  // Fetch vehicles list
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    // Fetch and populate form data based on selected vehicle's driver data
    setFormData({
      driver_firstname: vehicle.driver_firstname || "",
      driver_lastname: vehicle.driver_lastname || "",
      licence_number: vehicle.licence_number || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      if (selectedVehicle && selectedVehicle.driver) {
        // Update driver information for selected vehicle
        await axios.put(
          `${DRIVER_API_ENDPOINT}${selectedVehicle.driver.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Add new driver for selected vehicle
        await axios.post(DRIVER_API_ENDPOINT, { ...formData, vehicle: selectedVehicle.id }, {
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
      console.error("Error submitting driver data:", err.response?.data || err.message);
      setError("An error occurred while submitting driver data.");
    }
  };

  const handleRemoveDriver = async (vehicleId) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${DRIVER_API_ENDPOINT}${vehicleId}/`, {
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
      console.error("Error deleting driver data:", err.response?.data || err.message);
      setError("Failed to remove driver data.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Driver Data</h1>
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
                    {vehicle.vehicle_make} {vehicle.vehicle_model} – {vehicle.registration_number}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveDriver(vehicle.id);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Remove Driver
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Driver Form */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-black">
            {selectedVehicle ? "Edit Driver" : "Add Driver"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Driver First Name */}
            <div>
              <label htmlFor="driver_firstname" className="block text-sm font-medium text-black">
                Driver First Name
              </label>
              <input
                type="text"
                id="driver_firstname"
                name="driver_firstname"
                value={formData.driver_firstname}
                onChange={handleChange}
                className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
              />
            </div>

            {/* Driver Last Name */}
            <div>
              <label htmlFor="driver_lastname" className="block text-sm font-medium text-black">
                Driver Last Name
              </label>
              <input
                type="text"
                id="driver_lastname"
                name="driver_lastname"
                value={formData.driver_lastname}
                onChange={handleChange}
                className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
              />
            </div>

            {/* License Number */}
            <div>
              <label htmlFor="licence_number" className="block text-sm font-medium text-black">
                License Number
              </label>
              <input
                type="text"
                id="licence_number"
                name="licence_number"
                value={formData.licence_number}
                onChange={handleChange}
                className="mt-1 border w-full px-4 py-2 rounded-md bg-black text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              {selectedVehicle ? "Update Driver" : "Add Driver"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DriverData;
