import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <>
      {/* Main wrapper - spans entire page */}
      <div className="w-screen flex flex-col min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with full screen effect */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-700 flex-grow text-white flex flex-col items-center justify-center w-screen">
          {/* Hero Content */}
          <header className="text-center mb-10 w-screen px-4 md:px-20">
            <h1 className="text-5xl font-bold mb-4">Welcome to Awash Insurance</h1>
            <p className="text-lg max-w-3xl mx-auto leading-tight">
              Your ultimate solution for managing your insurance needs with advanced technology and seamless experience.
            </p>
          </header>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl w-screen px-4 md:px-20">
            {/* Feature 1 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Risk Assessment AI</h3>
              <p className="text-sm leading-tight">
                Harness the power of AI to assess risks and make informed decisions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">File Claims Instantly</h3>
              <p className="text-sm leading-tight">
                File your claims effortlessly and track their status in real time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Account Management</h3>
              <p className="text-sm leading-tight">
                Manage your policies and account details with ease and efficiency.
              </p>
            </div>
          </section>

          {/* Call to Action Section */}
          <footer className="mt-10 flex justify-center w-screen px-4 md:px-20">
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow hover:bg-gray-200 transition">
              Get Started
            </button>
          </footer>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
