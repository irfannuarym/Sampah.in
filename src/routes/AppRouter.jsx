import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import CaraKerja from '../pages/CaraKerja';
import TentangKami from '../pages/TentangKami';
import Contact from '../pages/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UpdateProfile from '../pages/UpdateProfile';
import ChangePassword from '../pages/ChangePassword';
import PengelolaDashboard from '../pages/dashboard/PengelolaDashboard';
import PetugasDashboard from '../pages/dashboard/PetugasDashboard';
import WargaDashboard from '../pages/dashboard/WargaDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuthStore } from '../store/authStore';

export default function AppRouter() {
  const { isLoggedIn, user } = useAuthStore();

  if (isLoggedIn && (!user || !user.role)) {
    return <div className="text-center py-10 text-green-500">Memuat data pengguna...</div>;
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cara-kerja" element={<CaraKerja />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cara-kerja" element={<CaraKerja />} />
      <Route path="/tentang-kami" element={<TentangKami />} />
      <Route path="/contact" element={<Contact />} />
      {user?.role === 'admin' && (
        <Route path="/dashboard/admin" element={<PengelolaDashboard />} />
      )}
      {user?.role === 'petugas' && (
        <Route path="/dashboard/petugas" element={<PetugasDashboard />} />
      )}
      {user?.role === 'user' && (
        <Route path="/dashboard/user" element={<WargaDashboard />} />
      )}
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      {/* <Route path="/delete" element={<DeleteAccount />} /> */}
      <Route
        path="/dashboard"
        element={
          user?.role ? (
            <Navigate to={`/dashboard/${user?.role}`} replace/>
          ) : (
            <p>Mohon tunggu...</p>
          )
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
