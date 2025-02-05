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

const RiskAssessment = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [riskAssessmentData, setRiskAssessmentData] = useState(null);
  const [isRiskAssessing, setIsRiskAssessing] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/policies/customers/");
        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setSelectedVehicle(null); // Reset selected vehicle when customer changes
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleAssessRisk = async () => {
    if (!selectedCustomer || !selectedVehicle) {
      alert("Please select both a customer and a vehicle.");
      return;
    }

    setIsRiskAssessing(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/risk/assess/", {
        customerId: selectedCustomer.id,
        vehicleId: selectedVehicle.id,
      });
      setRiskAssessmentData(response.data);
    } catch (error) {
      console.error("Error assessing risk", error);
    } finally {
      setIsRiskAssessing(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col text-black">
      <UserNavbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto ml-64">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Risk Assessment</h2>

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">Select Customer</h2>
            <div className="space-y-2">
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => handleCustomerSelect(customer)}
                  className={`w-full py-2 px-4 rounded mb-2 ${
                    selectedCustomer?.id === customer.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {customer.name} - {customer.email}
                </button>
              ))}
            </div>
          </div>

          {selectedCustomer && (
            <div className="bg-white p-6 mt-4 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-black">Select Vehicle</h2>
              <div className="space-y-2">
                {selectedCustomer.vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleVehicleSelect(vehicle)}
                    className={`w-full py-2 px-4 rounded mb-2 ${
                      selectedVehicle?.id === vehicle.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {vehicle.make} {vehicle.model} - {vehicle.plate_number}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-6 mt-4 rounded shadow-md">
            <button
              onClick={handleAssessRisk}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isRiskAssessing}
            >
              {isRiskAssessing ? "Assessing..." : "Assess Risk"}
            </button>

            {riskAssessmentData && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">Risk Assessment Result</h3>
                <p><strong>Risk Score:</strong> {riskAssessmentData.risk_score}</p>
                <p><strong>Risk Level:</strong> {riskAssessmentData.risk_level}</p>
                <p><strong>Suggested Actions:</strong> {riskAssessmentData.suggested_actions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RiskAssessment;

