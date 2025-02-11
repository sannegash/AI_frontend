import React, { useState, useEffect } from "react";

const MakePayment = () => {
  const [transactionRef, setTransactionRef] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState(10); // Set a default amount

  // Function to generate a unique transaction reference (tx_ref)
  const generateTransactionRef = () => {
    const uniqueRef = "negade-tx-" + Math.random().toString(16).slice(2);
    setTransactionRef(uniqueRef);
  };

  // useEffect to handle the transaction reference generation on component load
  useEffect(() => {
    generateTransactionRef();
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can handle any additional validation if needed
    if (!email || !firstName || !lastName) {
      alert("Please fill out all required fields.");
      return;
    }

    // You can then send the data or submit the form to Chapa API
    document.getElementById("payment-form").submit(); // Submit the form programmatically
  };

  return (
    <div className="w-screen h-screen text-black bg-gray-100 flex flex-col">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Make Payment</h1>
        
        {/* Payment form */}
        <form
          id="payment-form"
          method="POST"
          action="https://api.chapa.co/v1/hosted/pay"
          onSubmit={handleSubmit}
        >
          {/* Hidden inputs for Chapa API */}
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

          {/* User input fields */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border text-white border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your last name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (ETB)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-1 p-2 w-full border text-white border-gray-300 rounded-lg"
              placeholder="Enter the amount"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded-lg w-full"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
