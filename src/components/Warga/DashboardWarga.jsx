import React, { useEffect, useState } from 'react';
import { getUserLaporan } from '../../services/api';
import LaporanCard from './LaporanCard';

export default function DashboardWarga() {
  const [user, setUser] = useState({ name: '', role: '', id: '' });
  const [userLaporan, setUserLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser);
      fetchUserLaporan(storedUser.id);
    }
  }, []);

  const fetchUserLaporan = async (userId) => {
    try {
      setLoading(true);
      const response = await getUserLaporan(userId);
      setUserLaporan(response.data || []);
    } catch (error) {
      console.error('Error fetching user laporan:', error);
      setError('Gagal mengambil data laporan');
    } finally {
      setLoading(false);
    }
  };

  const getStatusCount = (status) => {
    return userLaporan.filter(laporan => laporan.status === status).length;
  };

  const getKategoriCount = (kategori) => {
    return userLaporan.filter(laporan => laporan.kategori === kategori).length;
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2">
          Selamat Datang, {user.name} - {user.role}
        </h2>
        <p className="text-gray-600 mb-4">Berikut ringkasan aktivitas laporan Anda:</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Total Laporan</h3>
            <p className="text-2xl font-bold text-blue-900">{userLaporan.length}</p>
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

      {/* Laporan Cards */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-4">Laporan Terbaru</h3>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {userLaporan.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Belum ada laporan yang dibuat</p>
            <p className="text-sm mt-2">Mulai dengan membuat laporan sampah baru</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userLaporan.slice(0, 6).map((laporan) => (
              <LaporanCard key={laporan.id} laporan={laporan} />
            ))}
          </div>
        )}

        {userLaporan.length > 6 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Menampilkan 6 dari {userLaporan.length} laporan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}