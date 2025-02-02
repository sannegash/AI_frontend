import Navbar from "../components/Usernavbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClaimOfficerHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [claimData, setClaimData] = useState(null);
  const navigate = useNavigate();

  // Fetch all vehicles on page load
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/vehicles/"); // Adjust API endpoint as needed
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // Fetch claim data when a vehicle is selected
  const handleVehicleClick = async (vehicleId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/claims/${vehicleId}/`); // Adjust API endpoint as needed
      setSelectedVehicle(vehicleId);
      setClaimData(response.data);
    } catch (error) {
      console.error("Error fetching claim data:", error);
    }
  };

  // Handle approve/deny action
  const handleClaimDecision = async (decision) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/claims/${selectedVehicle}/`, { status: decision }); // Adjust API endpoint as needed
      if (response.status === 200) {
        alert(`Claim has been ${decision}!`);
        setClaimData(null); // Clear the claim data after decision
        setSelectedVehicle(null); // Reset selected vehicle
      }
    } catch (error) {
      console.error("Error updating claim status:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 h-full bg-gray-100 shadow-md">
          {/* You can add sidebar content here if needed */}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Claim Officer Dashboard</h1>
          
          {/* Vehicle List */}
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Vehicles</h2>
            <ul className="list-disc list-inside text-gray-700">
              {vehicles.map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => handleVehicleClick(vehicle.id)}
                >
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle and Claim Data */}
          {selectedVehicle && claimData && (
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Vehicle & Claim Details</h2>
              
              {/* Vehicle Data */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Vehicle Information</h3>
                <p>Make: {claimData.vehicle.make}</p>
                <p>Model: {claimData.vehicle.model}</p>
                <p>Year: {claimData.vehicle.year}</p>
                <p>VIN: {claimData.vehicle.vin}</p>
              </div>
              
              {/* Claim Data */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Claim Information</h3>
                <p>Status: {claimData.status}</p>
                <p>Claim Amount: ${claimData.claim_amount}</p>
                <p>Description: {claimData.description}</p>
              </div>

              {/* Approve/Deny Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleClaimDecision("approved")}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleClaimDecision("denied")}
                >
                  Deny
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClaimOfficerHome;

