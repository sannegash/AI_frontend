import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar"; // Import UserNavbar

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
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* User Navbar */}
      <UserNavbar /> {/* Add UserNavbar here */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 h-full bg-gray-100 shadow-md">
          <Sidebar />
        </div>
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
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};

export default CashierHome;

