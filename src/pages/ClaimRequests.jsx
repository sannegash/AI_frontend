import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";
import Footer from "../components/Footer";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/underwriterrequests")}
      >
        Underwriter Request
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/ClaimRequests")}
      >
        Claim Requests
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/riskassessment")}
      >
        Risk Assessment
      </button>
    </div>
  );
};

const ClaimRequests = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("Unauthorized: Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/claims/claims/list/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClaims(response.data);
      } catch (err) {
        setError("Failed to fetch claims. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <div className="flex flex-1">
        <div className="w-64 h-full bg-gray-100 shadow-md">
          <Sidebar />
        </div>
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
                  <li
                    key={claim.id}
                    className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="flex-1 text-black">
                      {claim.claim_number} - {claim.status}
                    </span>
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
