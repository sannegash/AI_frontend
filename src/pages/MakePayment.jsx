import React, { useState } from "react";
import axios from "axios";
import UserNavbar from "../components/Usernavbar"; // Assuming you have a navbar for the user
import Footer from "../components/Footer";

const MakePayment = () => {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETB");
  const [reference, setReference] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to show when the API call is in progress

  const getCSRFToken = () => {
    const csrfToken = document.cookie.split(';')
      .find(cookie => cookie.trim().startsWith('csrftoken='))
      ?.split('=')[1];

    return csrfToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const paymentData = {
      account_name: accountName,
      account_number: accountNumber,
      amount: amount,
      currency: currency,
      reference: reference,
      bank_code: bankCode,
    };

    try {
      const csrfToken = getCSRFToken(); // Get CSRF token from the browser's cookies
      const response = await axios.post(
        "http://localhost:8000/payment/makepayment", // Your Django endpoint
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Attach CSRF token to the header
          },
        }
      );
      setStatus("Transfer Successful: " + response.data.message); // Assuming the response contains a 'message'
    } catch (error) {
      setStatus("Transfer Failed: " + (error.response?.data || error.message));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <UserNavbar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Make Payment</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Initiate Payment Transfer</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Account Name:</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Account Number:</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Reference:</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bank Code:</label>
              <input
                type="text"
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Processing..." : "Initiate Transfer"}
            </button>
          </form>
          {status && <p className="mt-4 text-gray-700">{status}</p>}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MakePayment;
