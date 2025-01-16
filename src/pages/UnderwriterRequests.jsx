import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnderwriterRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch underwriting requests when the page loads
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/underwriter/requests/');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching underwriting requests', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleApprove = (id) => {
    // Handle approving a request (you may need to implement an approval action in the backend)
    alert(`Approved request for customer ID: ${id}`);
  };

  const handleReject = (id) => {
    // Handle rejecting a request (you may need to implement a rejection action in the backend)
    alert(`Rejected request for customer ID: ${id}`);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Underwriter Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl cursor-pointer"
            onClick={() => handleRequestClick(request)}
          >
            <h3 className="text-xl font-semibold">{request.customer_name}</h3>
            <p className="text-gray-600">Age: {request.age}</p>
            <p className="text-gray-600">Education: {request.education}</p>
            <p className="text-gray-600">Income: ${request.income}</p>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold">Customer Details</h3>
          <p><strong>Name:</strong> {selectedRequest.customer_name}</p>
          <p><strong>Age:</strong> {selectedRequest.age}</p>
          <p><strong>Driving Experience:</strong> {selectedRequest.driving_experience} years</p>
          <p><strong>Education:</strong> {selectedRequest.education}</p>
          <p><strong>Income:</strong> ${selectedRequest.income}</p>
          <p><strong>Married:</strong> {selectedRequest.married ? 'Yes' : 'No'}</p>
          <p><strong>Children:</strong> {selectedRequest.children}</p>
          <p><strong>Traffic Violations:</strong> {selectedRequest.traffic_violations}</p>
          <p><strong>Accidents:</strong> {selectedRequest.number_of_accidents}</p>

          <div className="mt-4">
            <button
              onClick={() => handleApprove(selectedRequest.id)}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(selectedRequest.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnderwriterRequests;
