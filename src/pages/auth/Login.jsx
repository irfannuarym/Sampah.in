import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');

  const { setLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Username dan password harus diisi!');
      return;
    }

    if (!role) {
      toast.error('Role harus dipilih!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password && user.role === role
    );

    if (!matchedUser) {
      toast.error('Username, password, atau role salah!');
      return;
    }

    setLogin(matchedUser);
    toast.success('Login berhasil!');
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    navigate(`/dashboard/${matchedUser.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Login Sampah.in
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
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-500 transition"
          >
            Login
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