import React from "react";

const laporanDummy = [
  {
    id: 1,
    userId: 101,
    title: "Sampah plastik di selokan",
    desc: "Banyak sampah plastik menumpuk di saluran air depan rumah.",
    photo: "https://via.placeholder.com/150",
    tanggal: "2025-07-24",
    status: "PROSES",
    lokasi: "Jl. Merdeka No. 10, Jakarta",
    kategori: "anorganik",
  },
  {
    id: 2,
    userId: 102,
    title: "Sampah daun berserakan",
    desc: "Tumpukan daun dan ranting kering belum diangkut.",
    photo: "https://via.placeholder.com/150",
    tanggal: "2025-07-22",
    status: "DONE",
    lokasi: "Jl. Kenanga RT 02 RW 03",
    kategori: "organik",
  },
  {
    id: 3,
    userId: 101,
    title: "Limbah cat dibuang sembarangan",
    desc: "Ada limbah cat dan kaleng bekas dibuang dekat TPS.",
    photo: "https://via.placeholder.com/150",
    tanggal: "2025-07-20",
    status: "NOT DONE",
    lokasi: "Dekat TPS Pasar Lama",
    kategori: "b3",
  },
];

const statusStyle = {
  "NOT DONE": "bg-red-100 text-red-700",
  PROSES: "bg-yellow-100 text-yellow-700",
  DONE: "bg-green-100 text-green-700",
};

export default function LaporanSampah() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Daftar Laporan Sampah</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {laporanDummy.map((laporan) => (
          <div
            key={laporan.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border"
          >
            <img
              src={laporan.photo}
              alt={laporan.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{laporan.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{laporan.desc}</p>

              <div className="text-sm text-gray-500 mb-1">
                📍 <strong>Lokasi:</strong> {laporan.lokasi}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                🗓️ <strong>Tanggal:</strong> {laporan.tanggal}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                🧾 <strong>Kategori:</strong> {laporan.kategori}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${statusStyle[laporan.status]}`}>
                {laporan.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
