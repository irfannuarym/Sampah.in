import React from 'react';

const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const kategoriRW = [
  { kategori: 'Sampah Organik', rw: 'RW 01 - RW 03' },
  { kategori: 'Sampah Anorganik', rw: 'RW 04 - RW 06' },
  { kategori: 'Sampah B3', rw: 'RW 07 - RW 09' },
];

function acakKategoriRW() {
  const shuffled = [...kategoriRW].sort(() => Math.random() - 0.5);
  return shuffled.map(item => `${item.rw} (${item.kategori})`).join(' | ');
}

const jadwal = hariList.map((hari, index) => {
  const tanggal = new Date();
  tanggal.setDate(tanggal.getDate() + index);
  
  const tanggalStr = tanggal.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return {
    id: index + 1,
    hari,
    tanggal: tanggalStr,
    lokasi: acakKategoriRW(),
    waktu: '07:00 - 11:00',
  };
});

export default function JadwalPengangkutan() {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Jadwal Pengangkutan Sampah</h2>
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Hari</th>
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Lokasi</th>
            <th className="px-4 py-2">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {jadwal.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.hari}</td>
              <td className="px-4 py-2">{item.tanggal}</td>
              <td className="px-4 py-2">{item.lokasi}</td>
              <td className="px-4 py-2">{item.waktu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
