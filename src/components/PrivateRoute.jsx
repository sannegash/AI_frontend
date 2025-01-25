import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// This component will be used to protect pages
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  
  // If there's no username (meaning the user is not logged in), redirect to the sign-in page
  if (!username) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If logged in, render the requested page
  return children;
};

export default PrivateRoute;