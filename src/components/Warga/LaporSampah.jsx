import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLaporan } from '../../services/api';

export default function LaporSampah() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const id_user = loggedInUser?.id;

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData({ ...formData, photo: file });
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

    if (!id_user) {
      alert('User belum login!');
      return;
    }

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
      await new Promise(resolve => setTimeout(resolve, 2000));

      const data = new FormData();
      data.append('id_user', id_user);
      data.append('title', formData.title.trim());
      data.append('description', formData.description.trim());
      data.append('tanggal', formData.tanggal);
      data.append('status', formData.status);
      data.append('lokasi', formData.lokasi.trim() || '');
      data.append('kategori', formData.kategori);

      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      const response = await createLaporan(data);

      if (response.success) {
        alert('Laporan berhasil dikirim!');
        navigate('/dashboard');
      } else {
        alert(`Gagal: ${response.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Gagal mengirim laporan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Form Lapor Sampah</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Laporan *
              </label>
              <input
                type="text"
                name="title"
                placeholder="Judul Laporan"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={50}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                name="description"
                placeholder="Deskripsi"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={255}
                rows={4}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Sampah (Opsional)
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
              
              {previewImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
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
                placeholder="Lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
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
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="organik">Organik</option>
                <option value="anorganik">Anorganik</option>
                <option value="b3">B3</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 rounded-lg font-medium flex justify-center items-center ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Mengirim...
                  </div>
                ) : (
                  'Kirim Laporan'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400"
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