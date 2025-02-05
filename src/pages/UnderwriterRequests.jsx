import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";
import Footer from "../components/Footer";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md fixed top-0 left-0 p-4">
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

const UnderwriterRequests = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isPolicyFormVisible, setIsPolicyFormVisible] = useState(false);
  const [policyData, setPolicyData] = useState({
    policy_type: "",
    coverage_start_date: "",
    coverage_end_date: "",
    premium_amount: "",
    insured_value: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/policies/create-policy/");
        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Error fetching underwriting requests", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleMarkAsInsured = async () => {
    if (!selectedCustomer || !selectedVehicle) return;
    try {
      // Only show the policy form when a vehicle is selected
      setIsPolicyFormVisible(true);
    } catch (error) {
      console.error("Error marking as insured", error);
    }
  };

  const handleCustomerClick = (customer) => {
    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(null); // Collapse if the same customer is clicked
    } else {
      setSelectedCustomer(customer);
      setSelectedVehicle(null); // Reset selected vehicle when a new customer is chosen
    }
  };

  const handleVehicleClick = (vehicle) => {
    if (selectedVehicle?.id === vehicle.id) {
      setSelectedVehicle(null); // Collapse if the same vehicle is clicked
    } else {
      setSelectedVehicle(vehicle);
    }
  };

  const handlePolicySubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedVehicle) return;
    try {
      const response = await axios.post("http://127.0.0.1:8000/policies/create-policy/", {
        vehicleId: selectedVehicle.id,
        policy_type: policyData.policy_type,
        coverage_start_date: policyData.coverage_start_date,
        coverage_end_date: policyData.coverage_end_date,
        premium_amount: policyData.premium_amount,
        insured_value: policyData.insured_value,
        policy_holder: selectedCustomer.id,
      });
      alert("Policy created successfully!");
      setIsPolicyFormVisible(false); // Hide the policy form after submission
    } catch (error) {
      console.error("Error creating policy", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPolicyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col text-black">
      <UserNavbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto ml-64">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Underwriter Requests</h2>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">Customer List</h2>
            <div className="h-80 overflow-y-scroll">
              <ul>
                {customers.map((customer) => (
                  <li
                    key={customer.id}
                    className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCustomerClick(customer)}
                  >
                    {customer.name} - {customer.email}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedCustomer && (
            <div className="bg-white p-6 mt-4 rounded shadow-md">
              <h3 className="text-2xl font-semibold">Customer Details</h3>
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone number:</strong> {selectedCustomer.phone_number}</p>
              <p><strong>Postal code :</strong> {selectedCustomer.postal_code}</p>
              <p><strong>City:</strong> {selectedCustomer.city}</p>
              <p><strong>State:</strong> {selectedCustomer.state}</p>
              <p><strong>Age:</strong> {selectedCustomer.age}</p>
              <p><strong>Driving Experience:</strong> {selectedCustomer.driving_experience}</p>
              <p><strong>Education:</strong> {selectedCustomer.education}</p>
              <p><strong>Income:</strong> {selectedCustomer.income}</p>
              <p><strong>Married:</strong> {selectedCustomer.married ? "Yes" : "No"}</p>
              <p><strong>Children:</strong> {selectedCustomer.children}</p>
              <p><strong>Traffic Violations:</strong> {selectedCustomer.traffic_violations}</p>
              <p><strong>Accidents:</strong> {selectedCustomer.number_of_accidents}</p>
              <p>
                <strong>Status:</strong> 
                <span 
                  className={`px-3 py-1 rounded text-white ${
                    selectedCustomer.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {selectedCustomer.status}
                </span>
              </p>
              <h3 className="text-xl font-semibold mt-4">Vehicles</h3>
              <div className="h-48 overflow-y-scroll">
                <ul>
                  {selectedCustomer.vehicles.map((vehicle) => (
                    <li
                      key={vehicle.id}
                      className="p-2 border-b cursor-pointer hover:bg-gray-100"
                      onClick={() => handleVehicleClick(vehicle)}
                    >
                      {vehicle.make} {vehicle.model} - {vehicle.plate_number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedVehicle && (
            <div className="bg-white p-6 mt-4 rounded shadow-md">
              <h3 className="text-2xl font-semibold">Vehicle Details</h3>
              <p><strong>Make:</strong> {selectedVehicle.make}</p>
              <p><strong>Model:</strong> {selectedVehicle.model}</p>
              <p><strong>Year:</strong> {selectedVehicle.year}</p>
              <p><strong>Owner:</strong> {selectedVehicle.owner_name}</p>
              <p><strong>Registration Number:</strong> {selectedVehicle.registration_number}</p>
              <p><strong>Fuel:</strong> {selectedVehicle.fuel_type}</p>
              <p><strong>Transmission:</strong> {selectedVehicle.transmission_type}</p>
              <p><strong>Engine Capacity:</strong> {selectedVehicle.engine_capacity}</p>
              <p><strong>Chassis Number:</strong> {selectedVehicle.chassis_number}</p>
              <button
                className="w-full mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleMarkAsInsured}
              >
                Write policy
              </button>
            </div>
          )}

          {isPolicyFormVisible && (
            <div className="bg-white p-6 mt-4 rounded shadow-md">
              <h3 className="text-2xl font-semibold text-black">Create Policy</h3>
              <form onSubmit={handlePolicySubmit}>
                <div className="mb-4">
                  <label htmlFor="policy_type" className="block font-semibold mb-2 text-black">Policy Type</label>
                  <input
                    type="text"
                    name="policy_type"
                    value={policyData.policy_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="coverage_start_date" className="block font-semibold mb-2 text-black">Coverage Start Date</label>
                  <input
                    type="date"
                    name="coverage_start_date"
                    value={policyData.coverage_start_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="coverage_end_date" className="block font-semibold mb-2 text-black">Coverage End Date</label>
                  <input
                    type="date"
                    name="coverage_end_date"
                    value={policyData.coverage_end_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="premium_amount" className="block font-semibold mb-2 text-black">Premium Amount</label>
                  <input
                    type="number"
                    name="premium_amount"
                    value={policyData.premium_amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="insured_value" className="block font-semibold mb-2 text-black">Insured Value</label>
                  <input
                    type="number"
                    name="insured_value"
                    value={policyData.insured_value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit Policy
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UnderwriterRequests;
