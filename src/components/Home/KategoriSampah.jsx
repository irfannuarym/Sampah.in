import React from 'react';

const kategori = [
  {
    title: 'Organik',
    desc: 'Sampah yang berasal dari makhluk hidup dan mudah terurai oleh alam. Dapat dikelola menjadi kompos atau pakan ternak.',
    example: ['Sisa makanan', 'Daun kering', 'Kulit buah', 'Ampas kopi'],
    color: 'bg-green-100',
  },
  {
    title: 'Anorganik',
    desc: 'Sampah yang sulit terurai dan berasal dari bahan buatan manusia. Bisa didaur ulang atau disetor ke bank sampah.',
    example: ['Plastik', 'Kaca', 'Logam', 'Styrofoam', 'Tekstil'],
    color: 'bg-blue-100',
  },
  {
    title: 'B3 (Bahan Berbahaya & Beracun)',
    desc: 'Sampah yang mengandung zat berbahaya dan butuh penanganan khusus. Harus dibuang ke TPS B3 atau layanan e-waste.',
    example: ['Baterai', 'Obat kedaluwarsa', 'Lampu neon', 'Oli', 'Elektronik rusak'],
    color: 'bg-red-100',
  },
];

export default function KategoriSampah() {
  return (
    <section className="py-12 px-4 md:px-8" id="kategori">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-14 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
        Kategori Sampah
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {kategori.map((item) => (
          <div
            key={item.title}
            className={`p-6 rounded-xl border border-transparent hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${item.color}`}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">{item.title}</h3>
            <p className="text-justify mb-3">{item.desc}</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {item.example.map((example, i) => (
                <li key={i}>{example}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
