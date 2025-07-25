import React from 'react';
import { Link } from 'react-router-dom';
import CaraKerjaCard from '../components/CaraKerja/CaraKerjaCard';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    step: 1,
    title: "Daftar & Login",
    description: "Buat akun baru atau masuk dengan akun yang sudah ada agar kamu bisa mulai menggunakan layanan Sampah.in.",
  },
  {
    step: 2,
    title: "Cek Jadwal",
    description: "Setelah login, langsung cek jadwal penjemputan sampah di daerahmu. Jadwal ini bisa berbeda-beda tergantung wilayah.",
  },
  {
    step: 3,
    title: "Pilah Sampah",
    description: "Sebelum petugas datang, pisahkan dulu sampah organik, anorganik, dan B3 (bahan berbahaya dan beracun) supaya mudah dikelola.",
  },
  {
    step: 4,
    title: "Antar atau Tunggu Petugas",
    description: "Kalau jadwalnya tiba, kamu bisa antar ke TPS (Tempat Pembuangan Sementara) atau tunggu petugas yang akan menjemput langsung dari rumahmu.",
  },
  {
    step: 5,
    title: "Cek Status",
    description: "Setelah proses selesai, kamu bisa cek status penjemputan dan riwayatnya di dashboard. Jadi, semua tercatat dan transparan.",
  },
];

export default function CaraKerja() {
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

      <div className="max-w-4xl mx-auto p-6 space-y-4 pt-16">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-14 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
          Cara Kerja Sampah.in
        </h1>

        {steps.map((item) => (
          <CaraKerjaCard key={`${item.step}-${item.title}`} {...item} />
        ))}
      </div>
    </div>
  );
}
