import Navbar from "../components/Usernavbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClaimOfficerHome = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const navigate = useNavigate();

  // Get the authorization token from local storage
  const authToken = localStorage.getItem("access"); // Replace 'access' with your token key if it's different

  // Axios instance with the authorization token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${authToken}`, // Add token to Authorization header
    },
  });

  // Fetch all claims on page load
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axiosInstance.get("http://127.0.0.1:8000/claims/claims/list/");
        setClaims(response.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  // Fetch claim data when a claim is clicked
  const handleClaimClick = async (claimId) => {
    try {
      const response = await axiosInstance.get(`http://127.0.0.1:8000/claims/claims/${claimId}/`);
      setSelectedClaim(response.data);
    } catch (error) {
      console.error("Error fetching claim data:", error);
    }
  };

  // Handle approve/deny action
  const handleClaimDecision = async (decision) => {
    try {
      const updatedClaim = {
        ...selectedClaim,
        status: decision, // Set status to either "approved" or "rejected"
      };
      console.log("Sending updated claim:", updatedClaim) 
      const response = await axiosInstance.put(`http://127.0.0.1:8000/claims/claims/${selectedClaim.id}/`, updatedClaim);
      if (response.status === 200) {
        alert(`Claim has been ${decision}!`);
        setSelectedClaim(null); // Clear the claim data after decision
        setClaims((prevClaims) =>
          prevClaims.map((claim) =>
            claim.id === selectedClaim.id ? { ...claim, status: decision } : claim
          )
        ); // Update claims list locally to reflect status change
      }
    } catch (error) {
      console.error("Error updating claim status:", error);
    }
  };

  return (
    <div className="w-screen text-black h-screen bg-gray-100 flex flex-col">
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

          {/* Claims List */}
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Claims</h2>
            <ul className="list-disc list-inside text-gray-700">
              {claims.map((claim) => (
                <li
                  key={claim.id}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => handleClaimClick(claim.id)}
                >
                  Claim #{claim.id} - Vehicle: {claim.vehicle.make} {claim.vehicle.model} ({claim.vehicle.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Claim Details */}
          {selectedClaim && (
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Claim Details</h2>
              
              {/* Vehicle Data */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Vehicle Information</h3>
                <p>Make: {selectedClaim.vehicle.make}</p>
                <p>Model: {selectedClaim.vehicle.model}</p>
                <p>Year: {selectedClaim.vehicle.year}</p>
                <p>VIN: {selectedClaim.vehicle.vin}</p>
              </div>
              
              {/* Claim Data */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Claim Information</h3>
                <p>Status: {selectedClaim.status}</p>
                <p>Settlement Amount: ${selectedClaim.settlement_amount}</p>
                <p>Description: {selectedClaim.description}</p>
                <p>Estimated Damage Cost: {selectedClaim.estimated_damage_cost}</p>
                <p>Accident Location: {selectedClaim.accident_location}</p>
                <p>Police Report Number {selectedClaim.police_report_number}</p>
              </div>

              {/* Approve/Deny Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleClaimDecision("Approved")}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleClaimDecision("Rejected")}
                >
                  Reject
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
