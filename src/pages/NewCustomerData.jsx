import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, FileText, DollarSign, MapPin, Car, Phone, Shield, UserCog, Key } from "lucide-react"; // Icons
import UserNavbar from "../components/Usernavbar"; // Assuming the path

const NewCustomerData = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Personal Info
    ownerName: "",
    drivingExperience: "",
    education: "",
    income: "",
    postalCode: "",
    city: "",
    state: "",
    phoneNumber: "",

    // Vehicle Info
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    fuelType: "",
    transmissionType: "",
    engineCapacity: "",
    chassisNumber: "",

    // Driver Info
    driverFirstName: "",
    driverLastName: "",
    driversLicenseNumber: "",
  });

  const [currentSection, setCurrentSection] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Implement API call or navigation here
  };

  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Include UserNavbar */}
      <UserNavbar />

      {/* Centered form container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">New Customer Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Personal Info */}
          {currentSection === 1 && (
            <div>
              <div className="flex items-center gap-2">
                <UserCog className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner's Name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="drivingExperience"
                  placeholder="Years of Driving Experience"
                  value={formData.drivingExperience}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="education"
                  placeholder="Education Level"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="income"
                  placeholder="Income"
                  value={formData.income}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled
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

          {/* Section 2: Vehicle Info */}
          {currentSection === 2 && (
            <div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="vehicleMake"
                  placeholder="Vehicle Make"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="vehicleModel"
                  placeholder="Vehicle Model"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="number"
                  name="vehicleYear"
                  placeholder="Vehicle Year"
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="fuelType"
                  placeholder="Fuel Type"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="transmissionType"
                  placeholder="Transmission Type"
                  value={formData.transmissionType}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="engineCapacity"
                  placeholder="Engine Capacity"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="chassisNumber"
                  placeholder="Chassis Number"
                  value={formData.chassisNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Navigation buttons */}
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

          {/* Section 3: Driver Info */}
          {currentSection === 3 && (
            <div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="driverFirstName"
                  placeholder="Driver's First Name"
                  value={formData.driverFirstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="driverLastName"
                  placeholder="Driver's Last Name"
                  value={formData.driverLastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-500" />
                <input
                  type="text"
                  name="driversLicenseNumber"
                  placeholder="Driver's License Number"
                  value={formData.driversLicenseNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Submit Button */}
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
