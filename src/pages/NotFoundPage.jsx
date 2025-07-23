import React from 'react';

function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="text-center px-6 py-12 bg-white shadow-xl rounded-2xl max-w-md">
        <h2 className="text-6xl font-extrabold text-green-400 mb-4">404</h2>
        <p className="text-xl font-semibold text-gray-800 mb-2">Halaman tidak ditemukan</p>
        <p className="text-gray-600 mb-6">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <a
          href="/"
          className="w-full bg-green-400 text-white px-3 py-2 rounded hover:bg-green-500 transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </section>
  );
}

export default NotFoundPage;
