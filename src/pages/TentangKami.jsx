import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

function CardInfo({ children }) {
  return (
    <div className="p-4 rounded-xl bg-green-500 text-white border border-green-300 shadow-[0_6px_15px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300">
      {children}
    </div>
  );
}

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-green-100 relative">
      <Link
        to="/"
        aria-label="Kembali ke Beranda"
        className="absolute top-4 left-4 flex items-center gap-1 text-xl font-bold text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="-translate-y-[1px]">Beranda</span>
      </Link>

      <div className="max-w-4xl mx-auto p-6 space-y-6 pt-16">
        <h1 className="text-center text-3xl font-bold mb-10 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
          Tentang Sampah.in
        </h1>

        <CardInfo>
          <p lang="en">
            Sampah.in is a smart waste management platform that connects residents, cleaners, and coordinators to make trash collection transparent, accountable, and easy - one click at a time.
          </p>
        </CardInfo>
        <CardInfo>
          <p lang="id">
            Sampah.in adalah platform pengelolaan sampah cerdas yang menghubungkan warga, petugas kebersihan, dan koordinator untuk menjadikan pengumpulan sampah lebih transparan, akuntabel, dan mudah - cukup dengan sekali klik.
          </p>
        </CardInfo>

        <h2 className="text-center text-2xl font-bold mb-6 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
          Visi
        </h2>
        <CardInfo>
          <p>
            Mewujudkan ekosistem pengelolaan sampah yang bersih, transparan, dan berbasis digital di Indonesia.
          </p>
        </CardInfo>

        <h2 className="text-center text-2xl font-bold mb-6 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
          Misi
        </h2>
        <CardInfo>
          <ol className="space-y-4 list-decimal list-inside">
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 flex-shrink-0 mt-1" />
              <span>Meningkatkan partisipasi warga dalam pelaporan sampah sesuai kategorinya.</span>
            </li>
            <li className="flex items-start gap-2">
              <ClipboardDocumentIcon className="h-5 w-5 flex-shrink-0 mt-1" />
              <span>Mempermudah petugas dalam menerima laporan, mencatat data, dan mengambil sampah sesuai jadwal.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChartBarIcon className="h-5 w-5 flex-shrink-0 mt-1" />
              <span>Menyediakan dashboard analitik bagi pengelola untuk pengambilan keputusan.</span>
            </li>
          </ol>
        </CardInfo>

        <h2 className="text-center text-2xl font-bold text-green-500">Kenapa Sampah.in?</h2>
        <div className="relative p-4 rounded-xl border border-transparent ring-1 ring-green-500 ring-offset-2 ring-offset-transparent">
          <ul className="space-y-4 list-decimal list-inside">
            <li className="flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-green-500" />
              <span>Laporan warga</span>
            </li>
            <li className="flex items-start gap-2">
              <UserGroupIcon className="h-5 w-5 text-green-500" />
              <span>Aksi nyata petugas</span>
            </li>
          </ul>
        </div>

        <div className="border-l-4 border-green-500 bg-green-50 text-green-900 p-4 rounded-lg shadow-md">
          <p className="italic font-semibold">
            Sampah.in dikembangkan sebagai bagian dari proyek capstone untuk mendorong inovasi teknologi untuk lingkungan berkelanjutan.
          </p>
        </div>
      </div>
      <footer className="bg-green-500 text-white py-6 w-full">
        <div className="text-center px-4">
          <p className="text-sm">© {new Date().getFullYear()} Sampah.in. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
