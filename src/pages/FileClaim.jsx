import React, { useState, useEffect } from "react";
import Axios from "axios"; // Import Axios for API calls
import Navbar from "../components/Navbar"; // Update the import path if needed
import Footer from "../components/Footer"; // Update the import path if needed

const FileClaim = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    accidentDate: "",
    location: "",
    policeReportNumber: "",
  });
  const [vehicles, setVehicles] = useState([]); // Vehicles data from the backend
  const [loading, setLoading] = useState(true); // Loading state for fetching vehicles

  // Fetch vehicles data from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await Axios.get("/api/vehicles"); // Replace with your actual API endpoint
        setVehicles(response.data); // Set the vehicles data
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchVehicles();
  }, []);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      description: "",
      accidentDate: "",
      location: "",
      policeReportNumber: "",
    }); // Reset the form when a new vehicle is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the claim submission logic here
    console.log({
      selectedVehicle,
      ...formData,
    });
    alert("Claim filed successfully!");
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
            File a Claim
          </h1>

          {/* Vehicle Selection List */}
          {loading ? (
            <p>Loading vehicles...</p>
          ) : (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Select a Vehicle</h2>
              <ul className="space-y-2">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <li key={vehicle.id}>
                      <button
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-2 hover:bg-blue-600"
                        onClick={() => handleSelectVehicle(vehicle)}
                      >
                        {vehicle.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No vehicles available</li>
                )}
              </ul>
            </div>
          )}

          {/* Claim Form (visible after vehicle selection) */}
          {selectedVehicle && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Short Description of Accident
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border w-full px-4 py-2 rounded-md"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Accident Date */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="accidentDate"
                >
                  Accident Date
                </label>
                <input
                  type="date"
                  id="accidentDate"
                  name="accidentDate"
                  className="border w-full px-4 py-2 rounded-md"
                  value={formData.accidentDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="location"
                >
                  Location of Accident
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border w-full px-4 py-2 rounded-md"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Police Report Number */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="policeReportNumber"
                >
                  Police Report Number
                </label>
                <input
                  type="text"
                  id="policeReportNumber"
                  name="policeReportNumber"
                  className="border w-full px-4 py-2 rounded-md"
                  value={formData.policeReportNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
              >
                File Claim
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FileClaim;
