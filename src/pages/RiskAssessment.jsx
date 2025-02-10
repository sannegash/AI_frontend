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
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch customers and their vehicles
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/policies/customers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Error fetching customers", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchCustomers();
  }, [navigate]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setRiskAssessmentData(null);
    setSelectedVehicle(null); // Reset selected vehicle
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRiskAssessmentData(null); // Reset risk assessment data on vehicle change
    setErrorMessage(null); // Reset error message
  };

  // Fetch risk assessment data for the selected vehicle
  const fetchRiskAssessment = async (vehicleId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/risk/api/risk/${vehicleId}/retrieve_risk_assessment/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      // Check if the response contains risk assessment data
      if (response.data && response.data.risk_factor) {
        setRiskAssessmentData(response.data);
      } else {
        setRiskAssessmentData(null); // No risk assessment data
        setErrorMessage("No risk assessment available for this vehicle.");
      }
    } catch (error) {
      console.error("Error fetching risk assessment", error);
      setErrorMessage("No Risk Assement data.");
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  // Perform risk assessment for selected customer and vehicle
  const handleAssessRisk = async () => {
    if (!selectedCustomer || !selectedVehicle) {
      alert("Please select a customer and a vehicle.");
      return;
    }

    setIsRiskAssessing(true);

    // Get the authentication token from localStorage
    const token = localStorage.getItem("access");

    if (!token) {
      alert("You are not logged in.");
      setIsRiskAssessing(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/risk/api/risk/${selectedVehicle.id}/ai_prediction/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRiskAssessmentData(response.data);
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      console.error("Error assessing risk", error);
      setErrorMessage("Error performing risk assessment.");
    } finally {
      setIsRiskAssessing(false);
    }
  };

  useEffect(() => {
    if (selectedVehicle) {
      fetchRiskAssessment(selectedVehicle.id);
    }
  }, [selectedVehicle]);

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
                  key={customer.username}
                  onClick={() => handleCustomerSelect(customer)}
                  className={`w-full py-2 px-4 rounded mb-2 ${
                    selectedCustomer?.username === customer.username
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
            <div className="flex gap-6 mt-4">
              <div className="w-1/2 bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-black">Customer Details</h2>
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone number:</strong> {selectedCustomer.phone_number}</p>
                <p><strong>City:</strong> {selectedCustomer.city}</p>
                <p><strong>State:</strong> {selectedCustomer.state}</p>
                <p><strong>Age:</strong> {selectedCustomer.age}</p>
                <p><strong>Driving Experience:</strong> {selectedCustomer.driving_experience}</p>
                <p><strong>Married:</strong> {selectedCustomer.married ? "Yes" : "No"}</p>
                <p><strong>Accidents:</strong> {selectedCustomer.number_of_accidents}</p>

                <h3 className="text-xl font-semibold mt-4 mb-2">Select Vehicle</h3>
                {selectedCustomer.vehicles?.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleVehicleSelect(vehicle)}
                    className={`w-full py-2 px-4 rounded mb-2 ${
                      selectedVehicle?.id === vehicle.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {vehicle.model} - {vehicle.model} ({vehicle.year})
                  </button>
                ))}
              </div>

              <div className="w-1/2 bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-black">Risk Assessment</h2>

                {riskAssessmentData ? (
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4">Risk Assessment Result</h3>
                    <p><strong>Risk Factor:</strong> {riskAssessmentData.risk_factor}</p>
                    <p><strong>Claim Likelihood:</strong> {(riskAssessmentData.claim_likelihood * 100).toFixed(2)}%</p>
                  </div>
                ) : (
                  <div className="mt-6">
                    {errorMessage ? (
                      <p className="text-red-500">{errorMessage}</p>
                    ) : (
                      <p className="text-gray-500">No risk assessment available for this vehicle.</p>
                    )}
                    <button
                      onClick={handleAssessRisk}
                      className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                      disabled={isRiskAssessing}
                    >
                      {isRiskAssessing ? "Assessing..." : "Assess Risk"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
