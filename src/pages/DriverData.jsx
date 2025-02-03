import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const DriverData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [driver, setDriver] = useState(null);
  const [formData, setFormData] = useState({
    driver_firstname: "",
    driver_lastname: "",
    licence_number: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://127.0.0.1:8000/vehicle/api/";

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigate("/login");
    else fetchVehicles();
  }, [navigate]);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(`${API_BASE}vehicle/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (err) {
      setError("Failed to fetch vehicle data.");
    }
  };

  const fetchDriver = async (vehicleId) => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(`${API_BASE}driver/?vehicle=${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.length > 0) {
        const driverData = response.data[0];
        setDriver(driverData);
        setFormData({
          driver_firstname: driverData.driver_firstname || "",
          driver_lastname: driverData.driver_lastname || "",
          licence_number: driverData.licence_number || "",
        });
      } else {
        setDriver(null);
        setFormData({ driver_firstname: "", driver_lastname: "", licence_number: "" });
      }
    } catch (err) {
      setError("Failed to fetch driver data.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    fetchDriver(vehicle.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicle) return;
    const token = localStorage.getItem("access");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (driver) {
        await axios.put(`${API_BASE}driver/${driver.id}/`, formData, config);
      } else {
        await axios.post(`${API_BASE}driver/`, { ...formData, vehicle: selectedVehicle.id }, config);
      }
      fetchVehicles();
      setSelectedVehicle(null);
      setFormData({ driver_firstname: "", driver_lastname: "", licence_number: "" });
    } catch (err) {
      setError("Error submitting driver data.");
    }
  };

  const handleRemoveDriver = async () => {
    if (!driver) return;
    try {
      const token = localStorage.getItem("access");
      await axios.delete(`${API_BASE}driver/${driver.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
      setSelectedVehicle(null);
      setDriver(null);
      setFormData({ driver_firstname: "", driver_lastname: "", licence_number: "" });
    } catch (err) {
      setError("Failed to remove driver data.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Driver Data</h1>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}

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
                  <span onClick={() => handleVehicleSelect(vehicle)} className="flex-1 text-black">
                    {vehicle.vehicle_make} {vehicle.vehicle_model} – {vehicle.registration_number}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveDriver();
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

        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-black">
            {selectedVehicle ? "Edit Driver" : "Add Driver"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="driver_firstname"
              value={formData.driver_firstname}
              onChange={handleChange}
              placeholder="Driver First Name"
              className="border w-full px-4 py-2 rounded-md bg-black text-white"
            />
            <input
              type="text"
              name="driver_lastname"
              value={formData.driver_lastname}
              onChange={handleChange}
              placeholder="Driver Last Name"
              className="border w-full px-4 py-2 rounded-md bg-black text-white"
            />
            <input
              type="text"
              name="licence_number"
              value={formData.licence_number}
              onChange={handleChange}
              placeholder="License Number"
              className="border w-full px-4 py-2 rounded-md bg-black text-white"
            />
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md">
              {selectedVehicle ? "Update Driver" : "Add Driver"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DriverData;