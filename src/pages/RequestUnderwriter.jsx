import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust path as needed
import Footer from '../components/Footer'; // Adjust path as needed

const RequestUnderwriter = () => {
  const [formData, setFormData] = useState({
    age: '',
    driving_experience: '',
    education: '',
    income: '',
    married: false,
    children: '',
    traffic_violations: '',
    number_of_accidents: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.age || !formData.income) {
      setError('Age and Income are required fields.');
      return;
    }

    setError(''); // Clear previous errors
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/requestunderwriter/',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response.data);
      navigate('/success'); // Navigate to success page on submission
    } catch (error) {
      console.error('Error submitting form', error);
      setError('Submission failed. Please try again.');
    }
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
            Request Underwriter
          </h1>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Driving Experience */}
            <div>
              <label htmlFor="driving_experience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Driving Experience
              </label>
              <input
                type="number"
                id="driving_experience"
                name="driving_experience"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.driving_experience}
                onChange={handleChange}
                required
              />
            </div>

            {/* Education */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <input
                type="text"
                id="education"
                name="education"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </div>

            {/* Income */}
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                Income
              </label>
              <input
                type="number"
                id="income"
                name="income"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.income}
                onChange={handleChange}
                required
              />
            </div>

            {/* Marital Status */}
            <div>
              <label htmlFor="married" className="block text-sm font-medium text-gray-700 mb-1">
                Married
              </label>
              <input
                type="checkbox"
                id="married"
                name="married"
                className="h-4 w-4"
                checked={formData.married}
                onChange={handleChange}
              />
            </div>

            {/* Number of Children */}
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Children
              </label>
              <input
                type="number"
                id="children"
                name="children"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.children}
                onChange={handleChange}
              />
            </div>

            {/* Traffic Violations */}
            <div>
              <label htmlFor="traffic_violations" className="block text-sm font-medium text-gray-700 mb-1">
                Traffic Violations (Last Year)
              </label>
              <input
                type="number"
                id="traffic_violations"
                name="traffic_violations"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.traffic_violations}
                onChange={handleChange}
              />
            </div>

            {/* Number of Accidents */}
            <div>
              <label htmlFor="number_of_accidents" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Accidents
              </label>
              <input
                type="number"
                id="number_of_accidents"
                name="number_of_accidents"
                className="border w-full px-4 py-2 rounded-md"
                value={formData.number_of_accidents}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RequestUnderwriter;
