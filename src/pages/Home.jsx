import React, { useState, useEffect } from "react";
import "../index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has reached the bottom
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
      ) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main wrapper - spans entire page */}
      <div className="w-screen flex flex-col min-h-screen bg-gray-100 dark:text-gray-200">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with full screen effect */}
        <div id="hero"className="bg-gradient-to-br from-blue-500 to-indigo-700 flex-grow text-white flex items-center justify-center w-full min-h-screen">
          {/* Hero Content */}
          <header className="text-center w-full px-4 md:px-20">
            <h1 className="text-5xl font-bold mb-4">Welcome to Awash Insurance</h1>
            <p className="text-lg max-w-3xl mx-auto leading-tight">
              Your ultimate solution for managing your insurance needs with advanced technology and seamless experience.
            </p>
          </header>
        </div>

        {/* About Section */}
        <div id="about" className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">About Awash Insurance</h2>
            <p className="text-lg leading-relaxed">
              Awash Insurance is leveraging cutting-edge AI technology to transform the way car insurance is priced. Using advanced predictive AI models, we analyze driver behavior, vehicle risk factors, and other data points to dynamically adjust customer car insurance rates.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Our goal is simple: to reward safe driving behaviors with lower insurance rates. With our AI claim prediction tools, we aim to make insurance affordable, personalized, and stress-free for all our customers.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service 1 */}
              <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">AI Claim Prediction</h3>
                <p className="text-sm leading-tight">
                  Using advanced machine learning, we predict claim likelihood based on individual behaviors and historical data.
                </p>
              </div>
              {/* Service 2 */}
              <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Dynamic Pricing Options</h3>
                <p className="text-sm leading-tight">
                  Our AI adapts pricing models based on customer driving patterns, providing fair and affordable insurance costs.
                </p>
              </div>
              {/* Service 3 */}
              <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Risk Analysis Tools</h3>
                <p className="text-sm leading-tight">
                  Analyze driving habits, risk scores, and other data points to adjust insurance rates intelligently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-blue-50 dark:bg-blue-900 text-black dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-sm leading-tight">
                  Predict driving risks, analyze data, and optimize claim predictions to save costs for customers.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-blue-50 dark:bg-blue-900 text-black dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Custom Pricing Models</h3>
                <p className="text-sm leading-tight">
                  Personalized insurance pricing based on behavior patterns, risk scores, and driving habits.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-blue-50 dark:bg-blue-900 text-black dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Seamless Claim Filing</h3>
                <p className="text-sm leading-tight">
                  File claims quickly and efficiently with AI assistance that prioritizes simplicity and accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div id="contact" className="w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <form className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full">
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="border w-full px-3 py-2 rounded-md focus:outline-none" />
              </div>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                <input type="email" id="email" className="border w-full px-3 py-2 rounded-md focus:outline-none" />
              </div>
              {/* Message Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="message">Your Message</label>
                <textarea id="message" className="border w-full px-3 py-2 rounded-md focus:outline-none" rows={4}></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default Home;
