import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestUnderwriter = () => {
  const [formData, setFormData] = useState({
    age: '',
    driving_experience: '',
    education: '',
    income: '',
    married: false,
    children: '',
    traffic_violations: '',
    number_of_accidents: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/requestunderwriter/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Handle successful response
      navigate('/success'); // Redirect to a success page or dashboard after submission
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Request Underwriter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Years of Driving Experience</label>
            <input
              type="number"
              name="driving_experience"
              value={formData.driving_experience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Education Level</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Income</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Marital Status</label>
            <input
              type="checkbox"
              name="married"
              checked={formData.married}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Number of Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Traffic Violations (Last Year)</label>
            <input
              type="number"
              name="traffic_violations"
              value={formData.traffic_violations}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Number of Accidents</label>
            <input
              type="number"
              name="number_of_accidents"
              value={formData.number_of_accidents}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestUnderwriter;
; 