import React from 'react';

const LaporanTable = ({ laporan }) => {
  if (laporan.length === 0) {
    return <p className="text-gray-500">Tidak ada laporan tersedia.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b">Warga</th>
            <th className="px-4 py-2 border-b">Lokasi</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((item, index) => (
            <tr key={item.id} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{item.warga}</td>
              <td className="px-4 py-2 border-b">{item.lokasi}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    item.status === 'Selesai'
                      ? 'bg-green-600'
                      : item.status === 'Sedang Diproses'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanTable;
