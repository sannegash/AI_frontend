import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETB");
  const [reference, setReference] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      account_name: accountName,
      account_number: accountNumber,
      amount: amount,
      currency: currency,
      reference: reference,
      bank_code: bankCode,
    };

    try {
      const response = await axios.post(
        "https://api.chapa.co/v1/transfers",
        paymentData,
        {
          headers: {
            Authorization: `Bearer CHASECK-xxxxxxxxxxxxxxxx`, // Your Chapa secret key
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("Transfer Successful: " + response.data);
    } catch (error) {
      setStatus("Transfer Failed: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="payment-form">
      <h2>Initiate Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Name:</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reference:</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bank Code:</label>
          <input
            type="text"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Initiate Transfer</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PaymentForm;
