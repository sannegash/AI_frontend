import React, { useState, useEffect } from "react";
import axios from "axios";

const InsuredCustomerIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [error, setError] = useState(null);

  // Fetching insured customer incidents
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/insured/incidents") // Adjust to your actual endpoint
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((err) => {
        setError("Failed to load incidents");
        console.error(err);
      });
  }, []);

  // Handle selecting an incident to view details
  const handleIncidentClick = (incidentId) => {
    const incident = incidents.find((incident) => incident.id === incidentId);
    setSelectedIncident(incident);
  };

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Incidents and Claims</h1>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {/* Incidents List */}
      <div className="grid grid-cols-3 gap-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => handleIncidentClick(incident.id)}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200"
          >
            <h2 className="text-xl font-semibold">{incident.customer.first_name} {incident.customer.last_name}</h2>
            <p className="text-sm text-gray-500">Incident Date: {incident.date}</p>
            <p className="text-sm text-gray-500">Status: {incident.status}</p>
          </div>
        ))}
      </div>

      {/* Incident Details */}
      {selectedIncident && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Incident Details</h2>
          <p><strong>Customer:</strong> {selectedIncident.customer.first_name} {selectedIncident.customer.last_name}</p>
          <p><strong>Vehicle Model:</strong> {selectedIncident.vehicle_model}</p>
          <p><strong>Incident Description:</strong> {selectedIncident.description}</p>
          <p><strong>Status:</strong> {selectedIncident.status}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default InsuredCustomerIncidents;
