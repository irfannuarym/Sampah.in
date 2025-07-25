import React from 'react';
import NavbarWarga from '../../components/Navbar/NavbarWarga';
import LaporanSampah from '../../components/Warga/LaporanSampah';

export default function WargaDashboard() {
  return (
    <>
      <NavbarWarga />
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Halo, Irfan 👋</h1>
        <p className="text-gray-600 mb-6">Terima kasih telah berkontribusi menjaga lingkungan!</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button className="bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700 transition">➕ Laporkan Sampah</button>
          <button className="bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition">📄 Riwayat Laporan</button>
          <button className="bg-yellow-500 text-white py-3 rounded-xl shadow-md hover:bg-yellow-600 transition">🔔 Notifikasi</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-sm text-gray-500">Total Laporan</h3>
            <p className="text-2xl font-semibold text-green-700">5</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-sm text-gray-500">Ditangani</h3>
            <p className="text-2xl font-semibold text-blue-700">4</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-sm text-gray-500">Menunggu</h3>
            <p className="text-2xl font-semibold text-yellow-600">1</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Laporan Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="border p-3">Judul</th>
                <th className="border p-3">Tanggal</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="border p-3">Sampah di jalan pasar</td>
                <td className="border p-3">24 Jul 2025</td>
                <td className="border p-3 text-green-600 font-medium">Ditangani</td>
              </tr>
              <tr>
                <td className="border p-3">TPS penuh</td>
                <td className="border p-3">20 Jul 2025</td>
                <td className="border p-3 text-yellow-600 font-medium">Menunggu</td>
              </tr>
              <tr>
                <td className="border p-3">Sampah liar</td>
                <td className="border p-3">18 Jul 2025</td>
                <td className="border p-3 text-red-500 font-medium">Ditolak</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <LaporanSampah />
    </>
  );
}
