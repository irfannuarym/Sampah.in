import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import DashboardPengelola from '../../components/Pengelola/DashboardPengelola';
import ManajemenPetugas from '../../components/Pengelola/ManajemenPetugas';
import JadwalPengangkutan from '../../components/Pengelola/JadwalPengangkutan';
import LaporanSampah from '../../components/Pengelola/LaporanSampah';

export default function PengelolaDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation();
  const [activeAnchor, setActiveAnchor] = useState('');
  const isActive = (path, anchor = '') => {
    if (anchor && activeAnchor === anchor) return true;
    if (!anchor && location.pathname === path && !activeAnchor) return true;
    return false;
  };
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    setActiveAnchor(hash || '');
  }, [location]);
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#user-menu')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-500 shadow-md sticky top-0 z-10">
        <nav aria-label="Global" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Sampah.in</span>
              <img
                alt="Logo Sampah.in"
                src={Logo}
                className="h-20 w-auto bg-white rounded-2xl"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-6">
            <Link
              to="/dashboard/admin"
              onClick={() => setActiveAnchor('')}
              className={`flex items-center text-lg font-semibold transition px-3 py-1
                ${isActive('/dashboard/admin', '') ? 'border-b-2 border-white text-white' : 'text-white hover:bg-white hover:text-green-500 hover:rounded-md'}`}
            >
              Dashboard
            </Link>
            <div className="border-l border-white/60 h-6 self-center" />
            <Link
              to="#manajemen-petugas"
              onClick={() => setActiveAnchor('manajemen-petugas')}
              className={`flex items-center text-lg font-semibold transition px-3 py-1
                ${isActive('/dashboard/admin', 'manajemen-petugas') ? 'border-b-2 border-white text-white' : 'text-white hover:bg-white hover:text-green-500 hover:rounded-md'}`}
            >
              Manajemen Petugas
            </Link>
            <div className="border-l border-white/60 h-6 self-center" />
            <Link
              to="#jadwal-pengangkutan"
              onClick={() => setActiveAnchor('jadwal-pengangkutan')}
              className={`flex items-center text-lg font-semibold transition px-3 py-1
                ${isActive('/dashboard/admin', 'jadwal-pengangkutan') ? 'border-b-2 border-white text-white' : 'text-white hover:bg-white hover:text-green-500 hover:rounded-md'}`}
            >
              Jadwal Pengangkutan
            </Link>
            <div className="border-l border-white/60 h-6 self-center" />
            <Link
              to="#laporan-sampah"
              onClick={() => setActiveAnchor('laporan-sampah')}
              className={`flex items-center text-lg font-semibold transition px-3 py-1
                ${isActive('/dashboard/admin', 'laporan-sampah') ? 'border-b-2 border-white text-white' : 'text-white hover:bg-white hover:text-green-500 hover:rounded-md'}`}
            >
              Laporan Sampah
            </Link>
            <div className="relative" id="user-menu">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center text-lg font-semibold text-white hover:bg-white hover:text-green-500 hover:rounded-md transition px-3 py-1"
              >
                {user?.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    to="/update"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                  >
                    Update Profil
                  </Link>
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                  >
                    Ganti Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </PopoverGroup>

        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-green-500">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Sampah.in</span>
                <img
                  alt="Logo Sampah.in"
                  src={Logo}
                  className="h-20 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-green-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-green-500">
                <div className="space-y-2 py-6">
                  <Link
                    to="/dashboard/admin"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-green-500 hover:bg-green-500 hover:text-white hover:rounded-md transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="#manajemen-petugas"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-green-500 hover:bg-green-500 hover:text-white hover:rounded-md transition"
                  >
                    Manajemen Petugas
                  </Link>
                  <Link
                    to="#jadwal-pengangkutan"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-green-500 hover:bg-green-500 hover:text-white hover:rounded-md transition"
                  >
                    Jadwal Pengangkutan
                  </Link>
                  <Link
                    to="#laporan-sampah"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-green-500 hover:bg-green-500 hover:text-white hover:rounded-md transition"
                  >
                    Laporan Sampah
                  </Link>
                </div>
                <div className="flex gap-x-4 ml-6">
                  <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-green-500 hover:bg-green-500 hover:text-white hover:rounded-md transition">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-green-500 hover:bg-green-500 hover:text-white hover:rounded-md transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="flex-grow">
        {activeAnchor === '' && (
          <div>
            <DashboardPengelola />
          </div>
        )}
        {activeAnchor === 'manajemen-petugas' && (
          <div>
            <ManajemenPetugas />
          </div>
        )}
        {activeAnchor === 'jadwal-pengangkutan' && (
          <div>
            <JadwalPengangkutan />
          </div>
        )}
        {activeAnchor === 'laporan-sampah' && (
          <div>
            <LaporanSampah />
          </div>
        )}
      </main>
      <footer className="bg-green-500 text-white py-6 w-full">
        <div className="text-center px-4">
          <p className="text-sm">© {new Date().getFullYear()} Sampah.in. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
