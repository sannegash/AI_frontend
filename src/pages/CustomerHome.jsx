import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from 'react';

const CustomerHome = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />
      {"hi there am sam" }
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerHome;