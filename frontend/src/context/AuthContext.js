import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();
// Create Prodivder component
export const AuthProvider = ({ children }) => {
    // Initialize token from localStorage if available
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
  // Sync token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }, [token]);

  // Include user information if needed
  const [user, setUser] = useState(null);

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};