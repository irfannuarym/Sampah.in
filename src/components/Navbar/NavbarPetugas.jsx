import React from 'react';
import { Link } from 'react-router-dom';

const NavbarPetugas = () => {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow flex justify-between items-center">
      <h1 className="text-lg font-bold">Sampah.in - Petugas</h1>
      <div className="space-x-4">
        <Link to="/petugas" className="hover:underline">Beranda</Link>
        <button
          onClick={() => {
            alert('Logout berhasil!');
          }}
          className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarPetugas;
