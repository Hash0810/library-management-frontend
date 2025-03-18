import React, { createContext, useContext,useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  role: null,
  setIsAuthenticated: () => {},
  setRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const value = { isAuthenticated, role, setIsAuthenticated, setRole };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };