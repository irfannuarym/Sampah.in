import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import CaraKerja from '../pages/CaraKerja';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PengelolaDashboard from '../pages/dashboard/PengelolaDashboard';
import PetugasDashboard from '../pages/dashboard/PetugasDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuthStore } from '../store/authStore';

export default function AppRouter() {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cara-kerja" element={<CaraKerja />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {user?.role === 'pengelola' && (
        <Route path="/dashboard/pengelola" element={<PengelolaDashboard />} />
      )}
      {user?.role === 'petugas' && (
        <Route path="/dashboard/petugas" element={<PetugasDashboard />} />
      )}
      <Route path="/dashboard" element={<Navigate to={`/dashboard/${user?.role}`} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
