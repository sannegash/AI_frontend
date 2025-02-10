import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/Usernavbar";

const FileClaim = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    accident_date: "",
    accident_location: "",
    police_report_number: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const VEHICLE_API_ENDPOINT = "http://127.0.0.1:8000/vehicle/api/vehicle/";
  const CLAIM_API_ENDPOINT = "http://127.0.0.1:8000/claims/api/claim/";

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigate("/login");
    else fetchVehicles();
  }, [navigate]);

  // Fetch available vehicles for the logged-in user
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(VEHICLE_API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      setError("Failed to fetch vehicle data.");
    }
  };

  const handleVehicleSelect = (chassis_number) => {
    const vehicle = vehicles.find((v) => v.chassis_number === chassis_number);
    setSelectedVehicle(vehicle);
    console.log("Selected Vehicle:", vehicle); // Log the selected vehicle
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVehicle) {
      setError("Please select a vehicle first.");
      return;
    }

    // Prepare claim data
    const claimData = {
      vehicle: selectedVehicle.chassis_number, // Use chassis_number for identification
      accident_date: formData.accident_date,
      accident_location: formData.accident_location,
      police_report_number: formData.police_report_number,
    };

    console.log("Claim Data being sent to the backend:", claimData); // Log claim data before sending

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post(CLAIM_API_ENDPOINT, claimData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Backend Response:", response); // Log response from backend

      // Reset form data and selected vehicle after successful submission
      setFormData({
        accident_date: "",
        accident_location: "",
        police_report_number: "",
      });
      setSelectedVehicle(null);
    } catch (err) {
      console.error("Error submitting claim:", err);
      setError("Failed to submit claim.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <UserNavbar />
      <main className="flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">File a Claim</h1>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-black">Select a Vehicle</h2>
          {vehicles.length === 0 ? (
            <p className="text-black">No vehicles available.</p>
          ) : (
            <ul className="space-y-2">
              {vehicles.map((vehicle) => (
                <li
                  key={vehicle.chassis_number} // Use chassis_number as the unique key
                  className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleVehicleSelect(vehicle.chassis_number)} // Pass chassis_number to handleVehicleSelect
                >
                  <span className="text-black">
                    {vehicle.vehicle_make} {vehicle.vehicle_model} – {vehicle.registration_number} (Chassis: {vehicle.chassis_number})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {selectedVehicle && (
          <section className="mb-8">
            <h2 className="text-2xl mb-4 text-black">
              File Claim for {selectedVehicle.vehicle_make} {selectedVehicle.vehicle_model} (Chassis: {selectedVehicle.chassis_number})
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="date"
                name="accident_date"
                value={formData.accident_date}
                onChange={handleChange}
                placeholder="Accident Date"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                name="accident_location"
                value={formData.accident_location}
                onChange={handleChange}
                placeholder="Accident Location"
                required
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                name="police_report_number"
                value={formData.police_report_number}
                onChange={handleChange}
                placeholder="Police Report Number"
                required
                className="block w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                Submit Claim
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default FileClaim;
