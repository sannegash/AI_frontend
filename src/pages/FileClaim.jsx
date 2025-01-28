import React, { useState, useEffect } from "react";
import Axios from "axios"; // Axios for API calls
import Footer from "../components/Footer"; // Footer component
import UserNavbar from "../components/Usernavbar"; // Navbar component

const FileClaim = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Selected vehicle
  const [formData, setFormData] = useState({
    description: "",
    accidentDate: "",
    location: "",
    policeReportNumber: "",
  }); // Form data
  const [vehicles, setVehicles] = useState([]); // Vehicles fetched from the API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch vehicles data from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await Axios.get("/api/vehicles"); // Replace with actual API endpoint
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
    setFormData({
      description: "",
      accidentDate: "",
      location: "",
      policeReportNumber: "",
    }); // Reset form data
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicle) {
      alert("Please select a vehicle before filing a claim.");
      return;
    }

    try {
      // Example payload
      const payload = {
        vehicleId: selectedVehicle.id,
        ...formData,
      };

      console.log("Submitting claim with payload:", payload);

      // Make API request to file the claim (Replace with actual endpoint)
      await Axios.post("/api/claims", payload);

      alert("Claim filed successfully!");
      // Reset state after submission
      setSelectedVehicle(null);
      setFormData({
        description: "",
        accidentDate: "",
        location: "",
        policeReportNumber: "",
      });
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Failed to file claim. Please try again.");
    }
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
              <ul className="space-y-2">
                {vehicles.map((vehicle) => (
                  <li key={vehicle.id}>
                    <button
                      className={`w-full py-2 px-4 rounded mb-2 ${
                        selectedVehicle?.id === vehicle.id
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                      onClick={() => handleSelectVehicle(vehicle)}
                    >
                      {vehicle.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No vehicles available.</p>
          )}

          {/* Claim Form */}
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
                  Police Report Number (Optional)
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
