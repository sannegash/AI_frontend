import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // Check if user is authenticated
  if (!token) {
    // Redirect to the sign-in page if not logged in
    return <Navigate to="/signin" replace />;
  }

  // Check if user's role is allowed for the route
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to a generic dashboard or unauthorized page
    return <Navigate to="/" replace />;
  }

  // Render the child routes if the user is authenticated and has permission
  return <Outlet />;
};

export default ProtectedRoute;

