import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/Usernavbar";
import Footer from "../components/Footer";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/underwriterrequests")}
      >
       Underwriter Request
      </button>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/ClaimRequests")}
      >
        Claim Requests 
      </button>
      <button 
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/riskassessment")} 
      >
        Risk Assessment
      </button>
    </div>
  );
};

const UnderwriterRequests = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/newcustomer/");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching underwriting requests", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerClick = async (customer) => {
    try {
      const vehicleResponse = await axios.get(
        `http://127.0.0.1:8000/vehicle/api/vehicle/?customer_id=${customer.id}`
      );
      setSelectedCustomer({ ...customer, vehicles: vehicleResponse.data });
    } catch (error) {
      console.error("Error fetching vehicle data", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <div className="flex flex-1">
        <div className="w-64 h-full bg-gray-100 shadow-md">
          <Sidebar />
        </div>
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Underwriter Requests</h2>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">List of Customers</h2>
            {customers.length === 0 ? (
              <p className="text-black">No customers found.</p>
            ) : (
              <ul className="space-y-2">
                {customers.map((customer) => (
                  <li
                    key={customer.id}
                    className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCustomerClick(customer)}
                  >
                    <span className="flex-1 text-black">
                      {customer.customer_name} - {customer.age} years old
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedCustomer && (
            <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold">Customer Details</h3>
              <p><strong>Name:</strong> {selectedCustomer.customer_name}</p>
              <p><strong>Age:</strong> {selectedCustomer.age}</p>
              <p><strong>Driving Experience:</strong> {selectedCustomer.driving_experience} years</p>
              <p><strong>Education:</strong> {selectedCustomer.education}</p>
              <p><strong>Income:</strong> ${selectedCustomer.income}</p>
              <p><strong>Married:</strong> {selectedCustomer.married ? "Yes" : "No"}</p>
              <p><strong>Children:</strong> {selectedCustomer.children}</p>
              <p><strong>Traffic Violations:</strong> {selectedCustomer.traffic_violations}</p>
              <p><strong>Accidents:</strong> {selectedCustomer.number_of_accidents}</p>
              <section className="mt-6">
                <h2 className="text-xl mb-4">List of Vehicles</h2>
                {selectedCustomer.vehicles.length === 0 ? (
                  <p>No vehicles found.</p>
                ) : (
                  <ul className="space-y-2">
                    {selectedCustomer.vehicles.map((vehicle) => (
                      <li
                        key={vehicle.chassis_number}
                        className="flex justify-between items-center border p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="flex-1">
                          {vehicle.vehicle_make} {vehicle.vehicle_model} – {vehicle.registration_number}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UnderwriterRequests;