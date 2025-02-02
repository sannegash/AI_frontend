import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../components/Usernavbar";

const Policy = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [policy, setPolicy] = useState(null); // For storing the selected vehicle's policy

  const endpoint = "http://127.0.0.1:8000/vehicles/api/"; // Replace with your actual API endpoint

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(endpoint);
        if (response.data) {
          setVehicles(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles.");
      }
    };

    fetchVehicles();
  }, []);

  const handleVehicleSelect = async (vehicle) => {
    try {
      // Fetch the policy for the selected vehicle (replace this with the correct endpoint)
      const response = await axios.get(`http://127.0.0.1:8000/policies/api/${vehicle.id}`);
      if (response.data) {
        setSelectedVehicle(vehicle);
        setPolicy(response.data); // Set the policy data
      }
    } catch (error) {
      console.error("Error fetching policy:", error);
      setError("Failed to load policy.");
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
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Display policy details */}
        {selectedVehicle && policy && (
          <section className="mt-8">
            <h2 className="text-2xl mb-4 text-black">Policy Details</h2>
            <div className="border p-4 rounded bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">Policy for {selectedVehicle.vehicle_make} {selectedVehicle.vehicle_model}</h3>
              <p><strong>Policy Number:</strong> {policy.policy_number}</p>
              <p><strong>Start Date:</strong> {policy.start_date}</p>
              <p><strong>End Date:</strong> {policy.end_date}</p>
              <p><strong>Coverage:</strong> {policy.coverage}</p>
              <p><strong>Status:</strong> {policy.status}</p>
              {/* Add more policy details as needed */}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Policy;
