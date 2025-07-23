import React, { useState } from 'react';

const SendJadwalForm = () => {
  const [tanggal, setTanggal] = useState('');
  const [pesan, setPesan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Jadwal dikirim: ${tanggal}\nPesan: ${pesan}`);
    setTanggal('');
    setPesan('');
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Kirim Jadwal Pengangkutan</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="border px-3 py-1 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Pesan</label>
          <textarea
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            className="border px-3 py-1 w-full rounded"
            rows="3"
            placeholder="Contoh: Jadwal pengangkutan sampah akan dilakukan pada hari Senin pukul 07.00 WIB."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Kirim Jadwal
        </button>
      </form>
    </div>
  );
};

export default SendJadwalForm;
