import React from 'react';
import NavbarPengelola from '../../components/Navbar/NavbarPengelola';
import Sidebar from '../../components/Navbar/Sidebar';
import LaporanTable from '../../components/Pengelola/LaporanTable';
import ProgresPetugas from '../../components/Pengelola/ProgresPetugas';
import WasteChart from '../../components/Pengelola/WasteChart';
import SendJadwalForm from '../../components/Pengelola/SendJadwalForm';

const dummyLaporan = [
  { id: 1, warga: 'Andi', lokasi: 'Jl. Melati No.10', status: 'Selesai' },
  { id: 2, warga: 'Siti', lokasi: 'Jl. Mawar No.5', status: 'Belum Diambil' },
];

const dummyProgress = [
  { nama: 'Petugas A', selesai: 5, pending: 2 },
  { nama: 'Petugas B', selesai: 3, pending: 4 },
];

const PengelolaDashboard = () => {
  return (
    <div>
      <NavbarPengelola />
      <Sidebar />
      <main className="p-4 space-y-6">
        <h1 className="text-xl font-semibold">Dashboard Pengelola</h1>
        <LaporanTable laporan={dummyLaporan} />
        <ProgresPetugas progress={dummyProgress} />
        <WasteChart />
        <SendJadwalForm />
      </main>
    </div>
  );
};

export default PengelolaDashboard;
