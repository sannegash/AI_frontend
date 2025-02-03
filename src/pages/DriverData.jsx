import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const DriverData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [driver, setDriver] = useState(null); // Store the driver object
  const [formData, setFormData] = useState({
    driver_firstname: "",
    driver_lastname: "",
    licence_number: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";
  const DRIVER_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/driver/";

  // Fetch vehicles on initial load
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigate("/login");
    else fetchVehicles();
  }, [navigate]);

  // Fetch vehicle data
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(VEHICLE_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (err) {
      setError("Failed to fetch vehicle data.");
    }
  };

  // Fetch driver data for the selected vehicle
  const fetchDriver = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(DRIVER_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("api reponse:", response.data);
      if (response.data) {
        setDriver(response.data);
        // If a driver exists, populate the form with their data
        setFormData({
          driver_firstname: response.data.driver_firstname || "",
          driver_lastname: response.data.driver_lastname || "",
          licence_number: response.data.licence_number || "",
        });
      } else {
        // If no driver exists, reset the form to add a new driver
        setFormData({
          driver_firstname: "",
          driver_lastname: "",
          licence_number: "",
        });
      }
    } catch (err) {
      setError("Failed to fetch driver data.");
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle vehicle selection and fetch associated driver data
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    fetchDriver(vehicle.id); // Fetch driver based on the selected vehicle
  };

  // Handle form submission for adding/updating driver data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (driver) {
        // Update existing driver information
        await axios.put(
          `${DRIVER_API_ENDPOINT}${driver.id}/`,
          formData,
          config
        );
      } else {
        // Add new driver
        await axios.post(
          DRIVER_API_ENDPOINT,
          { ...formData, vehicle: selectedVehicle.id },
          config
        );
      }
      fetchVehicles(); // Re-fetch vehicles to refresh the list
      setFormData({
        driver_firstname: "",
        driver_lastname: "",
        licence_number: "",
      });
      setSelectedVehicle(null); // Clear the selected vehicle after submit
    } catch (err) {
      setError("Error submitting driver data.");
    }
  };

  // Handle removing driver data
  const handleRemoveDriver = async () => {
    if (driver) {
      try {
        const token = localStorage.getItem("access");
        await axios.delete(`${DRIVER_API_ENDPOINT}${driver.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchVehicles();
        setSelectedVehicle(null);
        setFormData({
          driver_firstname: "",
          driver_lastname: "",
          licence_number: "",
        });
        setDriver(null); // Clear the driver after removal
      } catch (err) {
        setError("Failed to remove driver data.");
      }
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
                  key={vehicle.chassis_number}
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
