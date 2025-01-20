// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context to store authentication state
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide the authentication context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "your-auth-token"); // Replace with actual token
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
