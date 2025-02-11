import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CashierHome = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionRef, setTransactionRef] = useState(`tx-${Date.now()}`);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("access");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axiosInstance.get("http://127.0.0.1:8000/claims/claims/list/");
        const approvedClaims = response.data.filter(claim => claim.status === "Approved");
        setClaims(approvedClaims);
      } catch (error) {
        console.error("Error fetching claims:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
      }
    };
    fetchClaims();
  }, [navigate]);

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setAmount(claim.settlement_amount);
  };

  return (
    <div className="w-screen h-screen text-black bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Make Payment</h1>
        <form
          id="payment-form"
          method="POST"
          action="https://api.chapa.co/v1/hosted/pay"
        >
          <input type="hidden" name="public_key" value="CHAPUBK_TEST-uwf74g2tdYC7RMNF3F5RTcioNCtbOwKH" />
          <input type="hidden" id="tx_ref" name="tx_ref" value={transactionRef} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="currency" value="ETB" />
          <input type="hidden" name="title" value="Let us do this" />
          <input type="hidden" name="description" value="Paying with Confidence with Chapa" />
          <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
          <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
          <input type="hidden" name="return_url" value="https://example.com/returnurl" />
          <input type="hidden" name="meta[title]" value="test" />
          <button type="submit" className="bg-green-600 text-white p-3 rounded-lg w-full">Pay Now</button>
        </form>

        <h3 className="text-2xl font-semibold mt-6">Approved Claims</h3>
        {claims.length > 0 ? (
          <ul className="space-y-4">
            {claims.map((claim) => (
              <li key={claim.id} className="bg-white p-4 rounded shadow-md cursor-pointer" onClick={() => handleClaimClick(claim)}>
                <p><strong>Claim ID:</strong> {claim.id}</p>
                <p><strong>Status:</strong> {claim.status}</p>
                <p><strong>Claim Date:</strong> {claim.claim_date}</p>
                <p><strong>Accident Date:</strong> {claim.accident_date}</p>
                <p><strong>Settlement Amount:</strong> {claim.settlement_amount} ETB</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No approved claims found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CashierHome;
