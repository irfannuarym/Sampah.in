import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import PetugasDashboard from '../pages/dashboard/PetugasDashboard';
import { useAuthStore } from '../store/authStore';

export default function AppRouter() {
  const { isLoggedIn, role } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {role === 'admin' && (
        <Route path="/dashboard" element={<AdminDashboard />} />
      )}
      {role === 'petugas' && (
        <Route path="/dashboard" element={<PetugasDashboard />} />
      )}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
