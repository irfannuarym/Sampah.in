import React, { useState } from 'react';

const UpdateStatusForm = ({ onSubmit }) => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status) {
      onSubmit(status);
      setStatus('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">-- Pilih Status --</option>
        <option value="Belum Diambil">Belum Diambil</option>
        <option value="Sedang Diproses">Sedang Diproses</option>
        <option value="Selesai">Selesai</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        Simpan
      </button>
    </form>
  );
};

export default UpdateStatusForm;
