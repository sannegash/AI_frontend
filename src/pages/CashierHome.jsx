import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar"; // Import UserNavbar
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/requestunderwriter")}
      >
        Pay Customer  
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/newcustomer")}
      >
        Pay Institution  
      </button>
    </div>
  );
};

const CashierHome = () => {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  // Get the authorization token from local storage
  const authToken = localStorage.getItem("access");

  // Axios instance with the authorization token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${authToken}`, // Add token to Authorization header
    },
  });

  // Fetch approved claims on page load
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axiosInstance.get("http://127.0.0.1:8000/claims/claims/list/");
        const approvedClaims = response.data.filter(claim => claim.status === "Approved");
        setClaims(approvedClaims);
      } catch (error) {
        console.error("Error fetching claims:", error);
        if (error.response && error.response.status === 401) {
          // Redirect to login page if unauthorized
          alert("Session expired. Please log in again.");
          navigate("/login"); // Assuming you have a login route
        }
      }
    };

    fetchClaims();
  }, [navigate]);

  return (
    <div className="w-screen text-black h-screen bg-gray-100 flex flex-col">
      {/* User Navbar */}
      <UserNavbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Cashier Dashboard</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome, Cashier!</h2>
            <p className="text-gray-700 mb-4">
              As a cashier, you are responsible for processing customer payments and managing transaction records. Below is an overview of your tasks:
            </p>
            <h3 className="text-xl font-semibold mb-2">Your Tasks</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Process payments for existing insurance policies.</li>
              <li>Manage transaction history and receipts.</li>
              <li>Ensure all payment records are accurate and up-to-date.</li>
            </ul>
            <p className="text-gray-700">
              Please make sure to process all payments accurately and provide the customers with the correct payment confirmation.
            </p>
          </div>

          {/* Render the approved claims */}
          <div className="mt-6 text-black">
            <h3 className="text-2xl font-semibold mb-4">Approved Claims</h3>
            {claims.length > 0 ? (
              <ul className="space-y-4">
                {claims.map((claim) => (
                  <li key={claim.id} className="bg-white p-4 rounded shadow-md">
                    <p><strong>Claim ID:</strong> {claim.id}</p>
                    <p><strong>Status:</strong> {claim.status}</p>
                    <p><strong>Claim Date:</strong> {claim.claim_date}</p>
                    <p><strong>Accident Date:</strong> {claim.accident_date}</p>
                    <p><strong>Estimated Damage Cost:</strong> {claim.estimated_damage_cost}</p>
                    <p><strong>Description:</strong> {claim.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No approved claims found.</p>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CashierHome;
