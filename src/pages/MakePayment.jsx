import React, { useState, useEffect } from "react";
import axios from "axios";

const MakePayment = () => {
  const [paymentHtml, setPaymentHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const getAccessToken = () => {
    return localStorage.getItem('access'); // Get access token from local storage
  };

  useEffect(() => {
    const fetchPaymentHtml = async () => {
      try {
        const accessToken = getAccessToken(); // Get access token from local storage
        const response = await axios.get(
          "http://127.0.0.1:8000/payment/", // Your Django endpoint
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`, // Use Bearer token for authorization
            },
          }
        );
        setPaymentHtml(response.data); // Assuming the API response is raw HTML for the payment button
        setStatus("Payment button loaded successfully!");
      } catch (error) {
        setStatus("Failed to load payment button: " + (error.response?.data || error.message));
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPaymentHtml();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Make Payment</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-6 rounded shadow-md">
            {paymentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: paymentHtml }} />
            ) : (
              <p>No payment button found.</p>
            )}
            {status && <p className="mt-4 text-gray-700">{status}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MakePayment;
