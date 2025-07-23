import React from 'react';
import UpdateStatusForm from './UpdateStatusForm';

const TugasItem = ({ data }) => {
  const { lokasi, status, waktu } = data;

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{lokasi}</h2>
      <p className="text-sm text-gray-600">Dilaporkan pada: {waktu}</p>
      <p className="mt-2 font-medium">
        Status:{' '}
        <span
          className={`px-2 py-1 rounded text-white ${
            status === 'Belum Diambil'
              ? 'bg-red-500'
              : status === 'Sedang Diproses'
              ? 'bg-yellow-500'
              : 'bg-green-600'
          }`}
        >
          {status}
        </span>
      </p>
      <button
        className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        onClick={() => alert('Fitur update status belum diimplementasikan')}
      >
        Update Status
      </button>
      <UpdateStatusForm onSubmit={(newStatus) => alert(`Status diperbarui jadi: ${newStatus}`)} />
    </div>
  );
};

export default TugasItem;
