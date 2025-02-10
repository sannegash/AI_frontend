import React, { useState } from "react";
import axios from "axios";
import UserNavbar from "../components/Usernavbar"; // Assuming you have a navbar for the user
import Footer from "../components/Footer";

const MakePayment = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETB");
  const [reference, setReference] = useState(""); 
  const [callbackUrl, setCallbackUrl] = useState("");
  const [returnUrl, setReturnUrl] = useState("");
  const [title, setTitle] = useState("Payment for subscription");
  const [description, setDescription] = useState("Payment for monthly subscription");
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
      amount: amount,
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      callback_url: callbackUrl,
      return_url: returnUrl,
      title: title,
      description: description,
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
      setStatus("Payment Successful: " + response.data.message); // Assuming the response contains a 'message'
    } catch (error) {
      setStatus("Payment Failed: " + (error.response?.data || error.message));
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
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              <label className="block text-gray-700">Callback URL:</label>
              <input
                type="url"
                value={callbackUrl}
                onChange={(e) => setCallbackUrl(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Return URL:</label>
              <input
                type="url"
                value={returnUrl}
                onChange={(e) => setReturnUrl(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
