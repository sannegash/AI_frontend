import React from "react";
import { Link } from "react-router-dom";

const LoggedOutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        You have successfully logged out.
      </h1>
      <Link
        to="/signin"
        className="mt-4 text-blue-500 dark:text-blue-300 hover:underline"
      >
        Click here to sign in again.
      </Link>
    </div>
  );
};

export default LoggedOutPage;
