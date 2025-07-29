import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

export default function NavbarWarga() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="Sampah.in Logo" className="h-8" />
          <span className="font-bold text-green-700 text-xl">Sampah.in</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/user" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
          <Link to="/tentang-kami" className="text-gray-700 hover:text-green-600 font-medium">Tentang Kami</Link>
          <button className="text-red-500 hover:underline font-medium">Keluar</button>
        </div>
      </div>
    </nav>
  );
}
