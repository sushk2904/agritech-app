import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('agritech_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (farmerId) => {
    // Mock login
    const mockUser = { id: farmerId, name: 'Ramesh Rao', location: 'Anantapur' };
    setUser(mockUser);
    localStorage.setItem('agritech_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agritech_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
