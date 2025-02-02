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

  // Authentication check function
  const isAuthenticated = () => {
    const token = localStorage.getItem("access");
    return token ? true : false;
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Fetch vehicles function
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("No access token found.");
        return;
      }

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

  // Fetch vehicles on component mount
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
    const token = localStorage.getItem("access");
    if (!token) {
      setError("No access token found.");
      return;
    }

    try {
      if (selectedVehicle) {
        // Update existing vehicle
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
        // Add new vehicle
        await axios.post(VEHICLE_API_ENDPOINT, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      fetchVehicles(); // Refresh vehicle list
      setFormData(initialFormState); // Clear form
      setSelectedVehicle(null); // Deselect vehicle
    } catch (err) {
      console.error("Error submitting vehicle data:", err.response?.data || err.message);
      setError(err.response?.data || "An error occurred while submitting vehicle data.");
    }
  };

  const handleRemoveVehicle = async (vehicleId) => {
    const token = localStorage.getItem("access");
    if (!token) {
      setError("No access token found.");
      return;
    }

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
                  key={vehicle.chassis_number} // Using chassis_number as the unique key
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
                      handleRemoveVehicle(vehicle.chassis_number); // Updated to use chassis_number
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
            {/* Form fields as shown in your code */}
            {/* */}
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
