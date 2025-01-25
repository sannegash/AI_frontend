import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // Check if user is authenticated (token is present)
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Check if role is missing or not allowed for the route
  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Render child routes
};

export default ProtectedRoute;
