import React, { useEffect, useState } from 'react';

export default function DashboardWarga() {
  const [user, setUser] = useState({ name: '', role: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">
        Selamat Datang, {user.name} - {user.role}
      </h2>
      <p className="text-gray-600">Berikut ringkasan aktivitas sistem:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Laporan Anda</h3>
          <p className="text-3xl font-bold text-yellow-900">14</p>
        </div>
        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Jadwal Pengangkutan</h3>
          <p className="text-3xl font-bold text-blue-900">7</p>
        </div>
      </div>
    </div>
  );
}
