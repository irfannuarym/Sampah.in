import React from 'react';

const steps = [
  'Warga melaporkan data sampah melalui aplikasi, lalu memilih untuk mengantar ke TPS atau menunggu petugas menjemput dari rumah.',
  'Petugas menerima laporan, mencatat data, dan mengambil sampah sesuai jadwal.',
  'Sistem menyimpan data dan menampilkannya di dashboard warga dan petugas.',
  'Laporan otomatis dibuat setiap bulan berdasarkan data yang masuk.',
  'Pengelola memantau laporan dan mengambil keputusan berbasis data.',
];

export default function AlurKerjaSection() {
  return (
    <section className="py-16 px-4 text-center bg-white">
      <h2 className="text-2xl font-bold mb-10">Bagaimana Sampah.in Bekerja?</h2>
      <ol className="space-y-4 max-w-3xl mx-auto text-left list-decimal list-outside pl-6 text-gray-700">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
