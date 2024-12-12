import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const Home = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gradient-to-br from-blue-500 to-indigo-700 min-h-screen text-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to FuturisticApp
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your ultimate solution for managing your insurance needs with advanced technology and seamless experience.
        </p>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Risk Assessment AI</h3>
          <p className="text-sm">
            Harness the power of AI to assess risks and make informed decisions.
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-2">File Claims Instantly</h3>
          <p className="text-sm">
            File your claims effortlessly and track their status in real time.
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Account Management</h3>
          <p className="text-sm">
            Manage your policies and account details with ease and efficiency.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="mt-10">
        <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow hover:bg-gray-200 transition">
          Get Started
        </button>
      </footer>
    </div>
    <Footer />
  </>
  );
};

export default Home;
