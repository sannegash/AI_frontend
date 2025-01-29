import React, { useState, useEffect } from "react";
import Axios from "axios"; // Axios for API calls
import Footer from "../components/Footer"; // Footer component
import UserNavbar from "../components/Usernavbar"; // Navbar component

const FileClaim = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Selected vehicle
  const [vehicles, setVehicles] = useState([]); // Vehicles fetched from the API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch vehicles data from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await Axios.get("http://127.0.0.1:8000/vehicle/api/vehicle/"); // Replace with actual API endpoint
        setVehicles(response.data?.data || []); // Adjust based on API structure
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to load vehicles. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVehicles();
  }, []);

  // Handle vehicle selection
  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
            File a Claim
          </h1>

          {/* Vehicle Selection */}
          {loading ? (
            <p>Loading vehicles...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : vehicles.length > 0 ? (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Select a Vehicle</h2>
              <ul className="space-y-4">
                {vehicles.map((vehicle) => (
                  <li
                    key={vehicle.id}
                    className="bg-gray-200 rounded-md p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      {/* Render vehicle logo */}
                      {vehicle.logo && (
                        <img
                          src={vehicle.logo}
                          alt={`${vehicle.name} logo`}
                          className="w-12 h-12 object-cover rounded-full mr-4"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                        <p className="text-sm text-gray-600">{vehicle.description}</p>
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      onClick={() => handleSelectVehicle(vehicle)}
                    >
                      Select Vehicle
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No vehicles available.</p>
          )}

          {/* Display Selected Vehicle Information */}
          {selectedVehicle && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700">Selected Vehicle</h3>
              <p><strong>Name:</strong> {selectedVehicle.name}</p>
              <p><strong>Description:</strong> {selectedVehicle.description}</p>
              <p><strong>License Number:</strong> {selectedVehicle.license_number}</p>
              <p><strong>Driver:</strong> {selectedVehicle.driver_name}</p>
              {/* Add more details as needed */}
              <button
                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => alert("Proceed to file the claim")}
              >
                File Claim on this Vehicle
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FileClaim;
