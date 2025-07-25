import React from 'react';

export default function TentangKami() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Tentang Sampah.in</h1>
      <p className="mb-6 text-gray-700">
        Sampah.in a smart waste management platform that connects residents, cleaners, and coordinators to make trash collection transparent, accountable, and easy—one click at a time.
        Sampah.in sebuah platform pengelolaan sampah cerdas yang menghubungkan warga, petugas kebersihan, dan koordinator untuk menjadikan pengumpulan sampah lebih transparan, akuntabel, dan mudah—cukup dengan sekali klik.
      </p>

      <h2 className="text-2xl font-semibold text-green-600 mb-2">Visi</h2>
      <p className="mb-4 text-gray-700">
        Mewujudkan ekosistem pengelolaan sampah yang bersih, transparan, dan berbasis digital di Indonesia.
      </p>

      <h2 className="text-2xl font-semibold text-green-600 mb-2">Misi</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Meningkatkan partisipasi warga dalam pelaporan sampah sesuai kategorinya.</li>
        <li>Mempermudah petugas dalam menerima laporan, mencatat data, dan mengambil sampah sesuai jadwal.</li>
        <li>Menyediakan dashboard analitik bagi pengelola untuk pengambilan keputusan.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-600 mb-2">Kenapa Sampah.in?</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>📊 Data Transparan</li>
        <li>🚛 Aksi Nyata</li>
      </ul>

      <p className="text-gray-700 italic">
        Sampah.in dikembangkan sebagai bagian dari proyek capstone untuk mendorong inovasi teknologi untuk lingkungan berkelanjutan.
      </p>
    </div>
  );
}
