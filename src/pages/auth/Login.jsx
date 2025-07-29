import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/api';
import {
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const { setLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validRoles = ['admin', 'petugas', 'user'];
    if (!validRoles.includes(role)) {
      toast.error('Role tidak valid!');
      return;
    }

    if (!email || !password) {
      toast.error('Email dan password harus diisi!');
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ email, password, role });

      setLogin({
        token: response.token,
        role: response.role,
        name: response.name,
      });
      toast.success('Login berhasil!');
      localStorage.setItem('loggedInUser', JSON.stringify({
        token: response.token,
        role: response.role,
        name: response.name,
      }));
      navigate(`/dashboard/${response.role}`);
    } catch (error) {
      toast.error(error.message || 'Login gagal');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Login Sampah.in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-green-700">Email</label>
            <input
              type="text"
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
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
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
              <option value="admin">Pengelola</option>
              <option value="petugas">Petugas</option>
              <option value="user">Warga</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-500 transition"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
          <p className="text-sm text-center mt-4">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-green-600 hover:underline"
            >
              Daftar di sini
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}