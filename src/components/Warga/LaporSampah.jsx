import React, { useState } from 'react';

export default function LaporSampah() {
  const [formData, setFormData] = useState({
    id_user: '',
    title: '',
    description: '',
    photo: null,
    tanggal: new Date().toISOString(), // format ISO string
    status: 'Belum di proses',
    lokasi: '',
    kategori: 'organik',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/laporan', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Laporan berhasil dikirim!');
        setFormData({
          id_user: '',
          title: '',
          description: '',
          photo: null,
          tanggal: new Date().toISOString(),
          status: 'Belum di proses',
          lokasi: '',
          kategori: 'organik',
        });
      } else {
        console.error(result);
        alert(`Gagal: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim laporan');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold">Form Lapor Sampah</h2>

      <input
        type="text"
        name="id_user"
        placeholder="ID Pengguna"
        value={formData.id_user}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="title"
        placeholder="Judul Laporan"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Deskripsi"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="lokasi"
        placeholder="Lokasi"
        value={formData.lokasi}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select
        name="kategori"
        value={formData.kategori}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="organik">Organik</option>
        <option value="anorganik">Anorganik</option>
        <option value="B3">B3</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Kirim Laporan
      </button>
    </form>
  );
}
