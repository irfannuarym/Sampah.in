import React, { useEffect, useState } from 'react';

export default function DashboardPengelola() {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-green-700">Jumlah Petugas</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-yellow-700">Laporan Masuk</h3>
          <p className="text-3xl font-bold">14</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-blue-700">Jadwal Minggu Ini</h3>
          <p className="text-3xl font-bold">7</p>
        </div>
      </div>
    </div>
  );
}
