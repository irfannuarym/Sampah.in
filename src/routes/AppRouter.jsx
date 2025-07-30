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
import LaporanDetail from '../components/Warga/LaporanDetail';
import EditLaporan from '../components/Warga/EditLaporan';
import AdminLaporanDetail from '../components/Pengelola/AdminLaporanDetail';
import AdminEditLaporan from '../components/Pengelola/AdminEditLaporan';
import AdminLaporanSampah from '../components/Pengelola/LaporanSampah';
import ManajemenPetugas from '../components/Pengelola/ManajemenPetugas';
import PetugasLaporanSampah from '../components/Petugas/LaporanSampah';
import PetugasLaporanDetail from '../components/Petugas/LaporanDetail';
import PetugasEditLaporan from '../components/Petugas/EditLaporan';

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
      <Route
        path="/laporan/:id"
        element={
            <LaporanDetail />
        }
      />
      <Route
        path="/edit-laporan/:id"
        element={
            <EditLaporan />
        }
      />
      {/* Admin Routes */}
      <Route
        path="/admin/laporan/:id"
        element={
            <AdminLaporanDetail />
        }
      />
      <Route
        path="/admin/edit-laporan/:id"
        element={
            <AdminEditLaporan />
        }
      />
      <Route
        path="/admin/laporan-sampah"
        element={
            <AdminLaporanSampah />
        }
      />
      <Route
        path="/admin/manajemen-petugas"
        element={
            <ManajemenPetugas />
        }
      />
      {/* Petugas Routes */}
      <Route
        path="/petugas/laporan/:id"
        element={
            <PetugasLaporanDetail />
        }
      />
      <Route
        path="/petugas/edit-laporan/:id"
        element={
            <PetugasEditLaporan />
        }
      />
      <Route
        path="/petugas/laporan-sampah"
        element={
            <PetugasLaporanSampah />
        }
      />
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