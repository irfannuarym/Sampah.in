import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error('Semua field wajib diisi!');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Format email tidak valid!');
      return;
    }

    const newUser = { username, email, password, role };
    localStorage.setItem('user', JSON.stringify(newUser));

    toast.success('Registrasi berhasil!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrasi Sampah.in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Pengelola</option>
              <option value="petugas">Petugas</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Daftar
          </button>
          <p className="text-sm text-center mt-2">
            Sudah punya akun?{' '}
            <button
              type="button"
              className="text-green-600 hover:underline"
              onClick={() => navigate('/login')}
            >
              Login di sini
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
