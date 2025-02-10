import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";
import Footer from "../components/Footer";

const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";
const CLAIMS_API_ENDPOINT = "http://127.0.0.1:8000/claims/claims/list/";
const CLAIM_UPDATE_API = "http://127.0.0.1:8000/claims/claims/";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600" onClick={() => navigate("/underwriterrequests")}>
        Underwriter Request
      </button>
      <button className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600" onClick={() => navigate("/ClaimRequests")}>
        Claim Requests
      </button>
      <button className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600" onClick={() => navigate("/riskassessment")}>
        Risk Assessment
      </button>
    </div>
  );
};

const ClaimRequests = () => {
  const [claims, setClaims] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [offerData, setOfferData] = useState({ description: "", settlement_amount: "", estimated_damage_cost: "" });

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("Unauthorized: Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(CLAIMS_API_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClaims(response.data);
        fetchVehicles(response.data, token);
      } catch (err) {
        setError("Failed to fetch claims. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchVehicles = async (claims, token) => {
      try {
        const vehicleIds = [...new Set(claims.map((claim) => claim.vehicle))];
        const vehicleRequests = vehicleIds.map((id) =>
          axios.get(`${VEHICLE_API_ENDPOINT}${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const vehicleResponses = await Promise.all(vehicleRequests);
        const vehicleData = {};
        vehicleResponses.forEach((res) => {
          vehicleData[res.data.id] = res.data;
        });
        setVehicles(vehicleData);
      } catch (err) {
        console.error("Failed to fetch vehicle details:", err);
      }
    };

    fetchClaims();
  }, []);

  const handleOfferSubmit = async (claimId) => {
    const token = localStorage.getItem("access");
     console.log("offer data being sent:", offerData);
    try {
      const response = await axios.put(
        `${CLAIM_UPDATE_API}${claimId}/`,
        offerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Claim offer submitted successfully!");
      
      // Update claim list to reflect changes
      setClaims((prevClaims) =>
        prevClaims.map((claim) => (claim.id === claimId ? response.data : claim))
      );

      setSelectedClaim(null); // Close the form after submission
    } catch (err) {
      console.error("Error submitting claim offer:", err);
      alert("Failed to submit offer. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Claim Requests</h2>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">List of Claims</h2>
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : claims.length === 0 ? (
              <p className="text-black">No claims found.</p>
            ) : (
              <ul className="space-y-2">
                {claims.map((claim) => (
                  <li key={claim.id} className="border p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="flex-1 text-black">
                        {vehicles[claim.vehicle]
                          ? `${vehicles[claim.vehicle].vehicle_make} ${vehicles[claim.vehicle].vehicle_model} (${vehicles[claim.vehicle].chassis_number})`
                          : "Loading vehicle..."} - {claim.status}
                      </span>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => {
                          setSelectedClaim(claim.id);
                          setOfferData({
                            description: claim.description || "",
                            settlement_amount: claim.settlement_amount || "",
                            estimated_damage_cost: claim.estimated_damage_cost || "",
                          });
                        }}
                      >
                        Claim Offerings
                      </button>
                    </div>
                    {selectedClaim === claim.id && (
                      <div className="mt-2 p-3 bg-gray-200 rounded text-black">
                        <p><strong>Accident Location:</strong> {claim.accident_location}</p>
                        <p><strong>Accident Date:</strong> {claim.accident_date}</p>
                        <p><strong>Police Report Number:</strong> {claim.police_report_number}</p>
                        <div className="mt-3">
                          <label className="block mb-1">Description</label>
                          <textarea
                            className="w-full text-white p-2 border rounded"
                            value={offerData.description}
                            onChange={(e) => setOfferData({ ...offerData, description: e.target.value })}
                          />
                          <label className="block mt-2">Settlement Amount</label>
                          <input
                            type="number"
                            className="w-full text-white p-2 border rounded"
                            value={offerData.settlement_amount}
                            onChange={(e) => setOfferData({ ...offerData, settlement_amount: e.target.value })}
                          />
                          <label className="block mt-2">Estimated Damage Cost</label>
                          <input
                            type="number"
                            className="w-full text-white p-2 border rounded"
                            value={offerData.estimated_damage_cost}
                            onChange={(e) => setOfferData({ ...offerData, estimated_damage_cost: e.target.value })}
                          />
                          <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleOfferSubmit(claim.id)}>
                            Submit Offer
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClaimRequests;
