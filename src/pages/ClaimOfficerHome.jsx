import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/claims")}
      >
        Claims
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/newcustomer")}
      >
        New Customer
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

const ClaimOfficerHome = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 h-full bg-gray-100 shadow-md">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Claim Officer Dashboard</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome, Claim Officer!</h2>
            <p className="text-gray-700 mb-4">
              As a claim officer, you are responsible for reviewing and processing insurance claims. Below is an overview of your tasks:
            </p>
            <h3 className="text-xl font-semibold mb-2">Your Tasks</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Review incoming insurance claims from insured customers.</li>
              <li>Evaluate the validity of each claim based on submitted details.</li>
              <li>Approve or reject claims based on assessments.</li>
            </ul>
            <p className="text-gray-700">
              Please ensure that all claims are processed fairly and in accordance with the company's policies.
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClaimOfficerHome;
