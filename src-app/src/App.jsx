import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadStep1 from './pages/UploadStep1';
import UploadStep2 from './pages/UploadStep2';
import VerificationSimulator from './pages/VerificationSimulator';
import ClaimTracker from './pages/ClaimTracker';
import ClaimDetails from './pages/ClaimDetails';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/claim/upload/1" element={<ProtectedRoute><UploadStep1 /></ProtectedRoute>} />
        <Route path="/claim/upload/2" element={<ProtectedRoute><UploadStep2 /></ProtectedRoute>} />
        <Route path="/claim/verify" element={<ProtectedRoute><VerificationSimulator /></ProtectedRoute>} />
        <Route path="/claims" element={<ProtectedRoute><ClaimTracker /></ProtectedRoute>} />
        <Route path="/claims/:id" element={<ProtectedRoute><ClaimDetails /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
