import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// PrivateRoute Component for protecting routes
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const username = sessionStorage.getItem("username"); // Check if the user is logged in

  // Redirect to the sign-in page if not logged in
  if (!username) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  // Render the protected content if logged in
  return children;
};

export default PrivateRoute;
