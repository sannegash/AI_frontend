import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/PersonalData")}
      >
        Personal Data
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/VehicleData")}
      >
        Vehicle Data
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/DriverData")}
      >
        Driver Data
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/Policy")}
      >
        Policy
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/FileClaim")}
      >
        File Claim
      </button>
      <button
        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => navigate("/makepayment")}
      >
        Pay Premium
      </button>
    </div>
  );
};

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
  const CUSTOMER_API_ENDPOINT = "http://127.0.0.1:8000/accounts/api/newcustomers/";

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigate("/login");
    else fetchVehicles();
  }, [navigate]);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("access");
      const vehicleResponse = await axios.get(VEHICLE_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch customer data and add status to vehicles
      const vehiclesWithStatus = await Promise.all(
        vehicleResponse.data.map(async (vehicle) => {
          const customerResponse = await axios.get(
            `${CUSTOMER_API_ENDPOINT}?username=${vehicle.owner_name}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const status = customerResponse.data.length > 0 ? customerResponse.data[0].status : "Unknown";
          return { ...vehicle, status };
        })
      );

      setVehicles(vehiclesWithStatus);
    } catch (err) {
      setError("Failed to fetch vehicle data.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      chassis_number: vehicle.chassis_number,
      registration_number: vehicle.registration_number,
      owner_name: vehicle.owner_name,
      vehicle_make: vehicle.vehicle_make,
      vehicle_model: vehicle.vehicle_model,
      vehicle_year: vehicle.vehicle_year,
      fuel_type: vehicle.fuel_type,
      transmission_type: vehicle.transmission_type,
      engine_capacity: vehicle.engine_capacity,
      color: vehicle.color,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      selectedVehicle
        ? await axios.put(`${VEHICLE_API_ENDPOINT}${selectedVehicle.id}/`, formData, config)
        : await axios.post(VEHICLE_API_ENDPOINT, formData, config);
      fetchVehicles();
      setFormData({});
      setSelectedVehicle(null);
    } catch (err) {
      setError("Error submitting vehicle data.");
    }
  };

  const handleRemoveVehicle = async (id) => {
    try {
      const token = localStorage.getItem("access");
      await axios.delete(`${VEHICLE_API_ENDPOINT}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
      setSelectedVehicle(null);
      setFormData({});
    } catch (err) {
      setError("Failed to delete the vehicle.");
    }
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setFormData({
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
  };
  // Utility function to map the status to a color
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-yellow-500"; // Yellow for New
      case "Insured":
        return "bg-green-500"; // Green for Insured
      case "Rejected":
        return "bg-red-500"; // Red for Rejected
      default:
        return "bg-gray-500"; // Gray for unknown
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Vehicle Data</h1>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <button
          className="w-full py-2 px-4 bg-green-500 text-white rounded mb-4 hover:bg-green-600"
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </button>

        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-black">List of Vehicles</h2>
          {vehicles.length === 0 ? (
            <p className="text-black">No vehicles found. Add a new vehicle below.</p>
          ) : (
            <ul className="space-y-2">
              {vehicles.map((vehicle) => (
                <li
                  key={vehicle.chassis_number}
                  className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  <span className="flex-1 text-black">
                    {vehicle.vehicle_make} {vehicle.vehicle_model} – {vehicle.registration_number}
                  </span>
                  <span
                    className={`text-white px-2 py-1 rounded ${getStatusColor(vehicle.status)}`}
                  >
                    {vehicle.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveVehicle(vehicle.chassis_number);
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

        {selectedVehicle && (
          <section className="mb-8">
            <h2 className="text-2xl mb-4 text-black">
              Edit Vehicle: {selectedVehicle.vehicle_make} {selectedVehicle.vehicle_model}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="chassis_number"
                value={formData.chassis_number || ""}
                onChange={handleChange}
                placeholder="Chassis Number"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="registration_number"
                value={formData.registration_number || ""}
                onChange={handleChange}
                placeholder="Registration Number"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="owner_name"
                value={formData.owner_name || ""}
                onChange={handleChange}
                placeholder="Owner Name"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="vehicle_make"
                value={formData.vehicle_make || ""}
                onChange={handleChange}
                placeholder="Vehicle Make"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="vehicle_model"
                value={formData.vehicle_model || ""}
                onChange={handleChange}
                placeholder="Vehicle Model"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="vehicle_year"
                value={formData.vehicle_year || ""}
                onChange={handleChange}
                placeholder="Vehicle Year"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="fuel_type"
                value={formData.fuel_type || ""}
                onChange={handleChange}
                placeholder="Fuel Type"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="transmission_type"
                value={formData.transmission_type || ""}
                onChange={handleChange}
                placeholder="Transmission Type"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="engine_capacity"
                value={formData.engine_capacity || ""}
                onChange={handleChange}
                placeholder="Engine Capacity"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                name="color"
                value={formData.color || ""}
                onChange={handleChange}
                placeholder="Color"
                required
                className="block w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                Update Vehicle
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default VehicleData;
