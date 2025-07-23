import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Sidebar() {
  const { role } = useAuthStore();
  const location = useLocation();

  const adminMenu = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Data Petugas', path: '/pengelola/petugas' },
    { label: 'Data Sampah', path: '/pengelola/sampah' },
    { label: 'Notifikasi', path: '/pengelola/notifikasi' },
  ];

  const petugasMenu = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tugas Hari Ini', path: '/petugas/tugas' },
    { label: 'Riwayat', path: '/petugas/riwayat' },
  ];

  const menu = role === 'admin' ? adminMenu : petugasMenu;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-green-700 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Sampah.in</h1>

        <nav className="flex flex-col space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded transition ${
                location.pathname === item.path
                  ? 'bg-green-900'
                  : 'hover:bg-green-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold">Selamat Datang!</h2>
        <p className="mt-4">Ini adalah konten utama dashboard.</p>
      </main>
    </div>
  );
}
