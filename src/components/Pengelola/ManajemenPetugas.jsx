import React from 'react';

const dummyPetugas = [
  {
    id: 1,
    nama: "Roberto Rudi",
    email: "rudi@example.com",
    telepon: "081244445555",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Zidane Dodi",
    email: "dodi@example.com",
    telepon: "085766669999",
    status: "Nonaktif",
  },
];

export default function ManajemenPetugas() {
  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-700">Manajemen Petugas</h2>
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
          + Tambah Petugas
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="text-left px-4 py-2">Nama</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Telepon</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-center px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyPetugas.map((petugas) => (
              <tr key={petugas.id} className="border-t">
                <td className="px-4 py-2">{petugas.nama}</td>
                <td className="px-4 py-2">{petugas.email}</td>
                <td className="px-4 py-2">{petugas.telepon}</td>
                <td className="px-4 py-2">
                  <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                    petugas.status === "Aktif"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {petugas.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit</button>
                  <button className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
