import Footer from "../components/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/NewCustomerData")}
      >
        Request Underwriter
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/FileClaim")}
      >
        FileClaim 
      </button>
      <button 
        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={()=> navigate ("/makepayment")} 
      >
        Pay premium 
      </button>
    </div>
  );
};

const CustomerHome = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <UserNavbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 h-full bg-gray-100 shadow-md">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Welcome to Awash Insurance</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Become a New Customer</h2>
            <p className="text-gray-700 mb-4">
              Awash Insurance is dedicated to providing you with reliable insurance solutions. As a new customer, you’ll begin by signing up and providing the necessary details.
            </p>
            <h3 className="text-xl font-semibold mb-2">The Process</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Fill out the application form to provide your details.</li>
              <li>Our underwriters will assess your application and perform a risk evaluation.</li>
              <li>Once approved, you will become an insured customer with full access to our services.</li>
            </ul>
            <p className="text-gray-700">
              Join us today and enjoy the peace of mind that comes with being insured by Awash Insurance.
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerHome;
