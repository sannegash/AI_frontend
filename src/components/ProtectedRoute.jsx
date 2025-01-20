// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, redirect them to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
