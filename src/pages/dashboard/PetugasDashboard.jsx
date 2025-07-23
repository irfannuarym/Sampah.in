import React from 'react';
import NavbarPetugas from '../../components/Navbar/NavbarPetugas';
import TugasList from '../../components/Petugas/TugasList';

const dummyTugas = [
  { id: 1, lokasi: 'Jl. Melati No. 10', status: 'Belum Diambil', waktu: '2025-07-19 08:00' },
  { id: 2, lokasi: 'Jl. Mawar No. 5', status: 'Sedang Diproses', waktu: '2025-07-19 09:00' },
];

const PetugasDashboard = () => {
  return (
    <div>
      <NavbarPetugas />
      <main className="p-4">
        <h1 className="text-xl font-semibold mb-4">Daftar Tugas Sampah</h1>
        <TugasList tugas={dummyTugas} />
      </main>
    </div>
  );
};

export default PetugasDashboard;
