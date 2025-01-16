import React, { useState, useEffect } from "react";
import axios from "axios";

const ApproveNewCustomer = () => {
  // State for holding customer data and selected customer data
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);

  // Fetching new customer data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/customers/new") // Adjust the endpoint to your actual API
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((err) => {
        setError("Failed to load customer requests");
        console.error(err);
      });
  }, []);

  // Handle selecting a customer to view details
  const handleCustomerClick = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    setSelectedCustomer(customer);
  };

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">New Customer Requests</h1>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {/* Customer Requests List */}
      <div className="grid grid-cols-3 gap-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => handleCustomerClick(customer.id)}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200"
          >
            <h2 className="text-xl font-semibold">{customer.first_name} {customer.last_name}</h2>
            <p className="text-sm text-gray-500">Email: {customer.email}</p>
            <p className="text-sm text-gray-500">Status: {customer.status}</p>
          </div>
        ))}
      </div>

      {/* Customer Details */}
      {selectedCustomer && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
          <p><strong>First Name:</strong> {selectedCustomer.first_name}</p>
          <p><strong>Last Name:</strong> {selectedCustomer.last_name}</p>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>Gender:</strong> {selectedCustomer.gender}</p>
          <p><strong>Birth Date:</strong> {selectedCustomer.birth_date}</p>
          <p><strong>Role:</strong> {selectedCustomer.role}</p>
          <p><strong>Postal Code:</strong> {selectedCustomer.postal_code}</p>
          <p><strong>City:</strong> {selectedCustomer.city}</p>
          <p><strong>State:</strong> {selectedCustomer.state}</p>
          <p><strong>Status:</strong> {selectedCustomer.status}</p>
          {/* You can add more fields as necessary */}
        </div>
      )}
    </div>
  );
};

export default ApproveNewCustomer;
