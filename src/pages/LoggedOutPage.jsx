import React from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../components/Usernavbar"; // Add UserNavbar for consistent navigation

const LoggedOutPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      <UserNavbar />
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
            You have successfully logged out.
          </h1>
          <p className="text-sm text-center text-gray-500 mb-4">
            You have been logged out of your account.
          </p>
          <Link
            to="/signin"
            className="block text-center text-blue-500 hover:underline mb-4"
          >
            Click here to sign in again.
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LoggedOutPage;
