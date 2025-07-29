import React from 'react';

const dummyLaporan = [
  {
    id: 1,
    userId: 10001,
    title: 'Sampah Menumpuk 2 Hari di Depan Rumah',
    desc: 'Sudah 3 hari belum diangkut dan mulai bau.',
    photo: 'https://via.placeholder.com/300x200',
    tanggal: '2025-07-25',
    status: 'Belum Diproses',
    lokasi: 'Jl. Pemuda No. 10',
    kategori: 'Organik',
  },
  {
    id: 2,
    userId: 10002,
    title: 'Sampah Dari Sore Hingga Pagi Belum Diangkut',
    desc: 'Mengganggu pemandangan dan bau tidak sedap.',
    photo: 'https://via.placeholder.com/300x200',
    tanggal: '2025-07-26',
    status: 'Sedang Diproses',
    lokasi: 'Jl. Matraman Raya No. 112',
    kategori: 'Anorganik',
  },
  {
    id: 3,
    userId: 10003,
    title: 'Tolong Angkut Sampah di Depan Rumah',
    desc: 'Bahan berbahaya seperti baterai dan elektronik.',
    photo: 'https://via.placeholder.com/300x200',
    tanggal: '2025-07-25',
    status: 'Sudah Diproses',
    lokasi: 'Jl. Gugus Depan No. 21',
    kategori: 'B3 (Bahan Berbahaya dan Beracun)',
  },
];

export default function LaporanSampah() {
  return (
    <section className="p-6">
      <h2 className="text-center text-2xl font-bold mb-4 text-green-700">Laporan Sampah Warga</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyLaporan.map((laporan) => (
          <div key={laporan.id} className="bg-white border rounded-xl shadow hover:shadow-lg transition">
            <img src={laporan.photo} alt={laporan.title} className="w-full h-40 object-cover rounded-t-xl" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-green-800">{laporan.title}</h3>
              <p className="text-sm text-gray-600">{laporan.desc}</p>
              <div className="text-sm text-gray-500">
                <p><strong>Tanggal:</strong> {laporan.tanggal}</p>
                <p><strong>Lokasi:</strong> {laporan.lokasi}</p>
                <p><strong>Kategori:</strong> {laporan.kategori}</p>
              </div>
              <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                laporan.status === 'Belum Diproses'
                  ? 'bg-red-100 text-red-700'
                  : laporan.status === 'Sedang Diproses'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {laporan.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
