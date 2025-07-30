import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getAllLaporan } from '../../services/api';
import PetugasLaporanCard from '../../components/Petugas/PetugasLaporanCard';

export default function PetugasDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-600">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  const filteredLaporan = getFilteredLaporan();

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-green-800">
                Dashboard Petugas
              </h1>
              <p className="text-green-600">Selamat datang, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/update')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2 text-green-800">
            🌿 Selamat Datang, {user?.name} - {user?.role}
          </h2>
          <p className="text-green-600 mb-6">Kelola laporan sampah dari warga untuk lingkungan yang lebih bersih:</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-xl shadow border border-green-200">
              <h3 className="text-sm font-semibold text-green-800 mb-1">📊 Total Laporan</h3>
              <p className="text-2xl font-bold text-green-900">{allLaporan.length}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-xl shadow border border-yellow-200">
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">⏳ Belum Diproses</h3>
              <p className="text-2xl font-bold text-yellow-900">{getStatusCount('Belum di proses')}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl shadow border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">Sedang Diproses</h3>
              <p className="text-2xl font-bold text-blue-900">{getStatusCount('Proses')}</p>
            </div>
            <div className="bg-emerald-100 p-4 rounded-xl shadow border border-emerald-200">
              <h3 className="text-sm font-semibold text-emerald-800 mb-1">✅ Selesai</h3>
              <p className="text-2xl font-bold text-emerald-900">{getStatusCount('Selesai')}</p>
            </div>
          </div>

          {/* Kategori Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="text-sm font-semibold text-green-800 mb-1">🍃 Organik</h3>
              <p className="text-xl font-bold text-green-900">{getKategoriCount('organik')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">♻️ Anorganik</h3>
              <p className="text-xl font-bold text-blue-900">{getKategoriCount('anorganik')}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <h3 className="text-sm font-semibold text-red-800 mb-1">⚠️ B3</h3>
              <p className="text-xl font-bold text-red-900">{getKategoriCount('b3')}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-green-800">🚀 Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/petugas/laporan-sampah')}
              className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors shadow-lg"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🗂️</div>
                <h4 className="font-semibold text-lg">Kelola Laporan Sampah</h4>
                <p className="text-sm opacity-90">Lihat dan edit semua laporan</p>
              </div>
            </button>
            <button
              onClick={() => navigate('/change-password')}
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🔐</div>
                <h4 className="font-semibold text-lg">Ganti Password</h4>
                <p className="text-sm opacity-90">Update password akun</p>
              </div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-green-800">Filter Laporan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Filter Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">Semua Status</option>
                <option value="Belum di proses">Belum di proses</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Filter Kategori
              </label>
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">Semua Kategori</option>
                <option value="organik">Organik</option>
                <option value="anorganik">Anorganik</option>
                <option value="b3">B3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Laporan */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-800"> Laporan Terbaru</h3>
            <button
              onClick={() => navigate('/petugas/laporan-sampah')}
              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
            >
              Lihat Semua <span className="ml-1">→</span>
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {filteredLaporan.length === 0 ? (
            <div className="text-center py-8 text-green-600">
              <div className="text-4xl mb-2">🌱</div>
              <p>Tidak ada laporan yang ditemukan</p>
              <p className="text-sm mt-2">Coba ubah filter atau tunggu laporan baru</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLaporan.slice(0, 6).map((laporan) => (
                <PetugasLaporanCard 
                  key={laporan.id} 
                  laporan={laporan} 
                  onUpdate={fetchAllLaporan}
                />
              ))}
            </div>
          )}

          {filteredLaporan.length > 6 && (
            <div className="text-center mt-4">
              <p className="text-sm text-green-600">
                Menampilkan 6 dari {filteredLaporan.length} laporan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}