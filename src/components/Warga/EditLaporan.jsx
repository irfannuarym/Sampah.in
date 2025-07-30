import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLaporanDetail, updateLaporan } from '../../services/api';

export default function EditLaporan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: null,
    tanggal: new Date().toISOString(),
    status: 'Belum di proses',
    lokasi: '',
    kategori: 'organik',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetchLaporanDetail();
  }, [id]);

  const fetchLaporanDetail = async () => {
    try {
      setLoading(true);
      const response = await getLaporanDetail(id);
      const laporanData = response.data;
      
      setLaporan(laporanData);
      setFormData({
        title: laporanData.title,
        description: laporanData.description,
        photo: null,
        tanggal: new Date(laporanData.tanggal).toISOString(),
        status: laporanData.status,
        lokasi: laporanData.lokasi || '',
        kategori: laporanData.kategori,
      });
      
      if (laporanData.photo) {
        setCurrentImage(laporanData.photo);
      }
    } catch (error) {
      console.error('Error fetching laporan detail:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim()) {
      alert('Judul laporan harus diisi!');
      return;
    }

    if (!formData.description.trim()) {
      alert('Deskripsi harus diisi!');
      return;
    }

    if (formData.title.length > 50) {
      alert('Judul laporan terlalu panjang (maksimal 50 karakter)!');
      return;
    }

    if (formData.description.length > 255) {
      alert('Deskripsi terlalu panjang (maksimal 255 karakter)!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('title', formData.title.trim());
      data.append('description', formData.description.trim());
      data.append('tanggal', formData.tanggal);
      data.append('status', formData.status);
      data.append('lokasi', formData.lokasi.trim() || '');
      data.append('kategori', formData.kategori);
      
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      await updateLaporan(id, data);
      alert('Laporan berhasil diupdate!');
      navigate(`/laporan/${id}`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Gagal mengupdate laporan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
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
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Laporan</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Laporan *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={50}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={255}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto (Opsional)
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              
              {/* Current Image */}
              {currentImage && !previewImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Foto saat ini:</p>
                  <img
                    src={currentImage}
                    alt="Current photo"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
              
              {/* Preview New Image */}
              {previewImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Preview foto baru:</p>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="organik">Organik</option>
                <option value="anorganik">Anorganik</option>
                <option value="b3">B3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Belum di proses">Belum di proses</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/laporan/${id}`)}
                className="flex-1 px-6 py-3 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}