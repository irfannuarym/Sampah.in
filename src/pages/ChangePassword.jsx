import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok.');
      return;
    }

    try {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const token = loggedInUser?.token;

      const response = await fetch('http://localhost:5000/api/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Password berhasil diubah!');
        setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        // Redirect ke dashboard sesuai role
        navigate(`/dashboard/${loggedInUser.role}`);
      } else {
        toast.error(data.error || 'Gagal mengubah password.');
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
          Ganti Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Password Lama</label>
            <div className="relative">
              <input
                type={showPassword.old ? 'text' : 'password'}
                name="oldPassword"
                placeholder="Password lama"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full border border-green-300 px-3 py-2 rounded pr-10"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-600"
                onClick={() =>
                  setShowPassword({ ...showPassword, old: !showPassword.old })
                }
              >
                {showPassword.old ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Password Baru</label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                name="newPassword"
                placeholder="Password baru"
                onChange={handleChange}
                value={form.newPassword}
                className="w-full border border-green-300 px-3 py-2 rounded pr-10"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-600"
                onClick={() =>
                  setShowPassword({ ...showPassword, new: !showPassword.new })
                }
              >
                {showPassword.new ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Konfirmasi Password Baru</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Ulangi password baru"
                onChange={handleChange}
                value={form.confirmPassword}
                className="w-full border border-green-300 px-3 py-2 rounded pr-10"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-600"
                onClick={() =>
                  setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
                }
              >
                {showPassword.confirm ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </span>
            </div>
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
