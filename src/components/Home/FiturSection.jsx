import React from 'react';

const features = [
  { title: 'Input Data Sampah', description: 'Petugas bisa mencatat volume dan jenis sampah di lapangan secara real-time.' },
  { title: 'Dashboard Analitik', description: 'Pengelola melihat data teragregasi dalam bentuk grafik dan statistik.' },
  { title: 'Laporan Bulanan', description: 'Laporan otomatis terbuat setiap akhir bulan dan bisa diunduh.' },
  { title: 'Peta Tempat Pembuangan Sementara', description: 'Pemetaan lokasi pengangkutan untuk evaluasi dan tindak lanjut.' },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <h2 className="text-2xl font-bold text-center mb-10">Fitur Utama</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-green-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
