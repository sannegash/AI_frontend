import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../components/Usernavbar";

const Policy = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";
  const POLICY_API_ENDPOINT = "http://127.0.0.1:8000/policies/api/";

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("access");
        const vehicleResponse = await axios.get(VEHICLE_API_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter vehicles that have policies
        const vehiclesWithPolicies = vehicleResponse.data.filter((vehicle) => vehicle.policies.length > 0);
        
        setVehicles(vehiclesWithPolicies);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles.");
      }
    };

    fetchVehicles();
  }, []);

  const handleVehicleSelect = async (vehicle) => {
    try {
      const token = localStorage.getItem("access");
      const policyResponse = await axios.get(`${POLICY_API_ENDPOINT}${vehicle.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedVehicle(vehicle);
      setPolicy(policyResponse.data);
      setIsPolicyVisible(true);
    } catch (error) {
      console.error("Error fetching policy:", error);
      setError("Failed to load policy.");
    }
  };

  const handleAgreeAndSign = async () => {
    if (!selectedVehicle || !policy) return;

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post(
        "http://127.0.0.1:8000/policies/agree-and-sign/",
        {
          vehicleId: selectedVehicle.id,
          policyId: policy.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("Policy successfully agreed and signed!");
      } else {
        alert("There was an issue agreeing to the policy.");
      }
    } catch (error) {
      console.error("Error marking as insured:", error);
      alert("Failed to mark the customer as insured.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Policy</h1>
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
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  <span className="flex-1 text-black">
                    {vehicle.vehicle_make} {vehicle.vehicle_model} – {vehicle.registration_number}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Display policy details */}
        {isPolicyVisible && selectedVehicle && policy && (
          <section className="mt-8">
            <h2 className="text-2xl mb-4 text-black">Policy Details</h2>
            <div className="border p-4 rounded bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">
                Policy for {selectedVehicle.vehicle_make} {selectedVehicle.vehicle_model}
              </h3>
              <p>
                <strong>Policy Number:</strong> {policy.policy_number}
              </p>
              <p>
                <strong>Start Date:</strong> {policy.coverage_start_date}
              </p>
              <p>
                <strong>End Date:</strong> {policy.coverage_end_date}
              </p>
              <p>
                <strong>Coverage:</strong> {policy.coverage}
              </p>
              <p>
                <strong>Status:</strong> {policy.status}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleAgreeAndSign}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Agree and Sign
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Policy;
