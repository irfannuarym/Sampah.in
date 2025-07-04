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
    <aside className="w-64 bg-green-700 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Sampah.in</h2>
      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded hover:bg-green-800 transition ${
              location.pathname === item.path ? 'bg-green-900 font-semibold' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
