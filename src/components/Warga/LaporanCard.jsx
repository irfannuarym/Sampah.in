import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LaporanCard({ laporan }) {
  const navigate = useNavigate();

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

  return (
    <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
      {/* Image Preview */}
      {laporan.photo && (
        <div className="mb-3">
          <img
            src={laporan.photo}
            alt="Foto sampah"
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            onClick={() => navigate(`/laporan/${laporan.id}`)}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <h3 
          className="font-semibold text-lg text-gray-900 truncate cursor-pointer hover:text-green-600"
          onClick={() => navigate(`/laporan/${laporan.id}`)}
        >
          {laporan.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(laporan.status)}`}>
          {laporan.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {laporan.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>{formatDate(laporan.tanggal)}</span>
        <span className={`px-2 py-1 rounded-full ${getKategoriColor(laporan.kategori)}`}>
          {laporan.kategori}
        </span>
      </div>
      
      {laporan.lokasi && (
        <div className="text-xs text-gray-500 mb-3">
          📍 {laporan.lokasi}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => navigate(`/laporan/${laporan.id}`)}
          className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
        >
          Detail
        </button>
        <button
          onClick={() => navigate(`/edit-laporan/${laporan.id}`)}
          className="flex-1 bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700"
        >
          Edit
        </button>
      </div>
    </div>
  );
}