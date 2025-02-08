import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const Policy = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null); // New state to store selected policy
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const POLICY_API_ENDPOINT = "http://127.0.0.1:8000/policies/api/policies/";

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigate("/login");
    else fetchPolicies(token);
  }, [navigate]);

  const fetchPolicies = async (token) => {
    try {
      const response = await axios.get(POLICY_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length > 0) {
        setPolicies(response.data);
      } else {
        setError("No policies found.");
      }
    } catch (err) {
      setError("Failed to fetch policy data.");
    }
  };

  // Function to handle policy click
  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };

  // Function to handle "Accept and Sign" button click
  const handleAcceptAndSign = () => {
    // Add the logic for accepting and signing the policy here.
    alert(`Policy ${selectedPolicy.policy_number} accepted and signed.`);
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Your Policies</h1>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}

        {policies.length === 0 ? (
          <p className="text-black">No policies available.</p>
        ) : (
          <section className="mb-8">
            <h2 className="text-2xl mb-4 text-black">Your Policies</h2>
            <ul className="space-y-2">
              {policies.map((policy) => (
                <li
                  key={policy.policy_number}
                  className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePolicyClick(policy)} // Set selected policy on click
                >
                  <span className="flex-1 text-black">
                    {policy.policy_number} - {policy.vehicle} ({policy.status})
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Conditional rendering of policy details */}
        {selectedPolicy && (
          <section className="mt-6 p-4 border-t-2  text-black border-gray-300">
            <h3 className="text-xl font-semibold text-black">Policy Details</h3>
            <p><strong>Policy Number:</strong> {selectedPolicy.policy_number}</p>
            <p><strong>Vehicle ID:</strong> {selectedPolicy.vehicle}</p>
            <p><strong>Policy Type:</strong> {selectedPolicy.policy_type}</p>
            <p><strong>Coverage Start Date:</strong> {selectedPolicy.coverage_start_date}</p>
            <p><strong>Coverage End Date:</strong> {selectedPolicy.coverage_end_date}</p>
            <p><strong>Premium Amount:</strong> ${selectedPolicy.premium_amount}</p>
            <p><strong>Insured Value:</strong> ${selectedPolicy.insured_value}</p>
            <p><strong>Status:</strong> {selectedPolicy.status}</p>

            {/* Accept and Sign button */}
            <button
              onClick={handleAcceptAndSign}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Accept and Sign
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Policy;
