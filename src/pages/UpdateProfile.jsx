import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateProfile() {
  const [form, setForm] = useState({ name: '', birthdate: '', phone: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Profil berhasil diperbarui!');
      } else {
        toast.error(data.error || 'Profil gagal diperbarui!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Update Profil
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Nama</label>
            <input
              name="name"
              placeholder="Nama Lengkap"
              onChange={handleChange}
              value={form.name}
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Tanggal Lahir</label>
            <input
              name="birthdate"
              type="date"
              onChange={handleChange}
              value={form.birthdate}
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Nomor Telepon</label>
            <input
              name="phone"
              placeholder="08xxxxxxxxxx"
              onChange={handleChange}
              value={form.phone}
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
