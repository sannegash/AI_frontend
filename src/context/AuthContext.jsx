import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context to store authentication state
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide the authentication context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token is already in localStorage and update the state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token); // Save the actual token here
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

