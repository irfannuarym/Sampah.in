import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validRoles = ['pengelola', 'petugas', 'warga'];
    if (!validRoles.includes(role)) {
      toast.error('Role tidak valid!');
      return;
    }

    if (!username || !email || !password) {
      toast.error('Semua field harus diisi!');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Format email tidak valid!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password minimal 6 karakter!');
      return;
    }

    try {
      setLoading(true);
      await registerUser({ username, email, password, role });
      toast.success('Registrasi berhasil!');
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('user');
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Registrasi gagal!';
      toast.error(msg);
    } finally {
      setLoading(false);
    }

    // const users = JSON.parse(localStorage.getItem('users')) || [];

    // if (users.some(user => user.email === email)) {
    //   toast.error('Email sudah terdaftar!');
    //   return;
    // }

    // if (users.some(user => user.username === username)) {
    //   toast.error('Username sudah digunakan!');
    //   return;
    // }

    // const newUser = { username, email, password, role, createdAt: new Date().toISOString() };
    // users.push(newUser);
    // localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Registrasi Sampah.in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-green-700">Username</label>
            <input
              type="text"
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700">Email</label>
            <input
              type="email"
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-green-700">Role</label>
            <select
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Pilih Role --</option>
              <option value="pengelola">Pengelola</option>
              <option value="petugas">Petugas</option>
              <option value="warga">Warga</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-500 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
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
                Mendaftar...
              </div>
            ) : (
              'Daftar'
            )}
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
