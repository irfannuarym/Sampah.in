import React, { useEffect, useState } from 'react';
import { getAllLaporan, updateLaporanStatus, deleteLaporan } from '../../services/api';
import PetugasLaporanCard from './PetugasLaporanCard';

export default function PetugasLaporanSampah() {
  const [allLaporan, setAllLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterKategori, setFilterKategori] = useState('all');

  useEffect(() => {
    fetchAllLaporan();
  }, []);

  const fetchAllLaporan = async () => {
    try {
      setLoading(true);
      const response = await getAllLaporan();
      setAllLaporan(response.data || []);
    } catch (error) {
      console.error('Error fetching all laporan:', error);
      setError('Gagal mengambil data laporan');
    } finally {
      setLoading(false);
    }
  };

  const getStatusCount = (status) => {
    return allLaporan.filter(laporan => laporan.status === status).length;
  };

  const getKategoriCount = (kategori) => {
    return allLaporan.filter(laporan => laporan.kategori === kategori).length;
  };

  const getFilteredLaporan = () => {
    let filtered = allLaporan;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(laporan => laporan.status === filterStatus);
    }

    if (filterKategori !== 'all') {
      filtered = filtered.filter(laporan => laporan.kategori === filterKategori);
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  const filteredLaporan = getFilteredLaporan();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Kelola Laporan Sampah</h1>
        <p className="text-gray-600 mb-6">Kelola semua laporan sampah dari warga</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Total Laporan</h3>
            <p className="text-2xl font-bold text-blue-900">{allLaporan.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold text-yellow-800 mb-1">Belum Diproses</h3>
            <p className="text-2xl font-bold text-yellow-900">{getStatusCount('Belum di proses')}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Sedang Diproses</h3>
            <p className="text-2xl font-bold text-blue-900">{getStatusCount('Proses')}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold text-green-800 mb-1">Selesai</h3>
            <p className="text-2xl font-bold text-green-900">{getStatusCount('Selesai')}</p>
          </div>
        </div>

        {/* Kategori Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <h3 className="text-sm font-semibold text-green-800 mb-1">Organik</h3>
            <p className="text-xl font-bold text-green-900">{getKategoriCount('organik')}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Anorganik</h3>
            <p className="text-xl font-bold text-blue-900">{getKategoriCount('anorganik')}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <h3 className="text-sm font-semibold text-red-800 mb-1">B3</h3>
            <p className="text-xl font-bold text-red-900">{getKategoriCount('b3')}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Laporan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="Belum di proses">Belum di proses</option>
              <option value="Proses">Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Kategori
            </label>
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Semua Kategori</option>
              <option value="organik">Organik</option>
              <option value="anorganik">Anorganik</option>
              <option value="b3">B3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Laporan Cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Daftar Laporan</h3>
          <span className="text-sm text-gray-500">
            {filteredLaporan.length} dari {allLaporan.length} laporan
          </span>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {filteredLaporan.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Tidak ada laporan yang ditemukan</p>
            <p className="text-sm mt-2">Coba ubah filter atau tunggu laporan baru</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLaporan.map((laporan) => (
              <PetugasLaporanCard 
                key={laporan.id} 
                laporan={laporan} 
                onUpdate={fetchAllLaporan}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}