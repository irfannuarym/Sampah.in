import React from 'react';

const ProgresPetugas = ({ progress }) => {
  if (progress.length === 0) {
    return <p className="text-gray-500">Belum ada data petugas.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4">Progres Petugas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progress.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-md hover:shadow-md transition"
          >
            <h3 className="text-base font-medium mb-2">{item.nama}</h3>
            <p className="text-sm text-green-600">Selesai: {item.selesai}</p>
            <p className="text-sm text-yellow-600">Pending: {item.pending}</p>
            <div className="mt-2 bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{
                  width: `${
                    item.selesai + item.pending > 0
                      ? (item.selesai / (item.selesai + item.pending)) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgresPetugas;
