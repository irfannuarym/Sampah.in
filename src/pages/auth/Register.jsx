import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/api';
import {
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default function Register() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !birthdate || !phone || !email || !password) {
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
      // Add artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set default role to 'user'
      const userData = { 
        name, 
        birthdate, 
        phone, 
        email, 
        password, 
        role: 'user' 
      };
      
      await registerUser(userData);
      toast.success('Registrasi berhasil!');
      setName('');
      setBirthdate('');
      setPhone('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      const msg = error.message || 'Registrasi gagal!';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Registrasi Sampah.in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-green-700">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700">Tanggal Lahir</label>
            <input
              type="date"
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="YYYY-MM-DD"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700">No. Telepon</label>
            <input
              type="tel"
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Masukkan nomor telepon"
              disabled={loading}
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
              disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
            >
              Login di sini
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}