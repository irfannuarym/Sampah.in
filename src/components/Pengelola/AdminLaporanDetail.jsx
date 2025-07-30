import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLaporanDetail, deleteLaporan, updateLaporanStatus } from '../../services/api';

export default function AdminLaporanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchLaporanDetail();
  }, [id]);

  const fetchLaporanDetail = async () => {
    try {
      setLoading(true);
      const response = await getLaporanDetail(id);
      setLaporan(response.data);
    } catch (error) {
      console.error('Error fetching laporan detail:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdatingStatus(true);
      await updateLaporanStatus(id, newStatus);
      setLaporan(prev => ({ ...prev, status: newStatus }));
      alert('Status berhasil diupdate!');
    } catch (error) {
      alert(`Gagal mengupdate status: ${error.message}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLaporan(id);
      alert('Laporan berhasil dihapus!');
      navigate('/pengelola-dashboard');
    } catch (error) {
      alert(`Gagal menghapus laporan: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Belum di proses':
        return 'bg-yellow-100 text-yellow-800';
      case 'Proses':
        return 'bg-blue-100 text-blue-800';
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case 'organik':
        return 'bg-green-100 text-green-800';
      case 'anorganik':
        return 'bg-blue-100 text-blue-800';
      case 'b3':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail laporan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/pengelola-dashboard')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!laporan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Laporan tidak ditemukan</p>
          <button
            onClick={() => navigate('/pengelola-dashboard')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {laporan.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Dibuat: {formatDate(laporan.createdAt)}</span>
                <span>Diupdate: {formatDate(laporan.updatedAt)}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/edit-laporan/${id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(laporan.status)}`}>
              {laporan.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKategoriColor(laporan.kategori)}`}>
              {laporan.kategori}
            </span>
          </div>

          {/* Status Update Section */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-lg font-semibold mb-3">Update Status</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => handleStatusChange('Belum di proses')}
                disabled={isUpdatingStatus || laporan.status === 'Belum di proses'}
                className={`px-4 py-2 rounded font-medium ${
                  laporan.status === 'Belum di proses'
                    ? 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                Belum Diproses
              </button>
              <button
                onClick={() => handleStatusChange('Proses')}
                disabled={isUpdatingStatus || laporan.status === 'Proses'}
                className={`px-4 py-2 rounded font-medium ${
                  laporan.status === 'Proses'
                    ? 'bg-blue-200 text-blue-800 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                Proses
              </button>
              <button
                onClick={() => handleStatusChange('Selesai')}
                disabled={isUpdatingStatus || laporan.status === 'Selesai'}
                className={`px-4 py-2 rounded font-medium ${
                  laporan.status === 'Selesai'
                    ? 'bg-green-200 text-green-800 cursor-not-allowed'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
            <p className="text-gray-700 leading-relaxed">
              {laporan.description}
            </p>
          </div>

          {/* Photo */}
          {laporan.photo && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Foto</h2>
              <img
                src={laporan.photo}
                alt="Foto sampah"
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Lokasi</h3>
              <p className="text-gray-600">
                {laporan.lokasi || 'Tidak ada lokasi'}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Tanggal Laporan</h3>
              <p className="text-gray-600">
                {formatDate(laporan.tanggal)}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/dashboard/admin')}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Hapus
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}