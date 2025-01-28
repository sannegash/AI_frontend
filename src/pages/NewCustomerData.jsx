import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  FileText,
  DollarSign,
  MapPin,
  Car,
  Phone,
  Shield,
  UserCog,
  Key,
} from "lucide-react";
import UserNavbar from "../components/Usernavbar";
import axios from "axios";

const FUEL_TYPE_CHOICES = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
];

const TRANSMISSION_TYPE_CHOICES = [
  { value: "Manual", label: "Manual" },
  { value: "Automatic", label: "Automatic" },
];

const NewCustomerData = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    drivingExperience: "",
    education: "",
    income: "",
    postalCode: "",
    city: "",
    state: "",
    phoneNumber: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    fuelType: "",
    transmissionType: "",
    engineCapacity: "",
    chassisNumber: "",
    driverFirstName: "",
    driverLastName: "",
    driversLicenseNumber: "",
  });

  const [currentSection, setCurrentSection] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/submit_customer_data/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/success");
    } catch (error) {
      console.error(
        "There was an error submitting the form:",
        error.response?.data || error.message
      );
    }
  };

  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          New Customer Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentSection === 1 && (
            <div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Owner Name"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="drivingExperience"
                  value={formData.drivingExperience}
                  onChange={handleChange}
                  placeholder="Driving Experience (Years)"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <UserCog className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Education"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  placeholder="Income"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  placeholder="Vehicle Make"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="Vehicle Model"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  placeholder="Vehicle Year"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Fuel Type</option>
                  {FUEL_TYPE_CHOICES.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <select
                  name="transmissionType"
                  value={formData.transmissionType}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Transmission Type</option>
                  {TRANSMISSION_TYPE_CHOICES.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSection === 4 && (
            <div>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                  placeholder="Engine Capacity (cc)"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={handleChange}
                  placeholder="Chassis Number"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="driversLicenseNumber"
                  value={formData.driversLicenseNumber}
                  onChange={handleChange}
                  placeholder="Driver's License Number"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCustomerData;
