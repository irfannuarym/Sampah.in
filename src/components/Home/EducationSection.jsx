import React from 'react';

const educationList = [
  {
    title: 'Mengelola Sampah Organik & Anorganik',
    desc: 'Sampah rumah tangga secara umum terbagi menjadi dua jenis: organik dan anorganik. Sampah organik berasal dari sisa makhluk hidup seperti sisa makanan, sayur, dan daun, yang mudah terurai dan bisa dijadikan kompos. Sedangkan sampah anorganik seperti plastik dan kaleng sulit terurai dan perlu dikelola secara khusus. Dengan memilah sejak awal, kita membantu proses daur ulang dan menjaga lingkungan lebih bersih.',
  },
  {
    title: '3R: Reduce, Reuse, Recycle',
    desc: 'Konsep 3R adalah langkah bijak untuk mengurangi sampah. Reduce berarti mengurangi konsumsi barang sekali pakai, Reuse adalah menggunakan kembali barang yang masih bisa dipakai, dan Recycle berarti mendaur ulang barang agar tidak menjadi limbah. Prinsip ini dapat diterapkan dalam keseharian seperti membawa botol minum sendiri, menggunakan tas belanja kain, dan memilah sampah daur ulang.',
  },
  {
    title: 'Bahaya Sampah Plastik',
    desc: 'Sampah plastik merupakan ancaman serius bagi lingkungan. Ia butuh ratusan tahun untuk terurai dan sering mencemari laut serta membahayakan hewan. Bahkan, mikroplastik bisa masuk ke tubuh manusia melalui makanan. Untuk itu, kurangi penggunaan plastik sekali pakai dan pilihlah alternatif ramah lingkungan seperti wadah kaca atau kantong kain.',
  },
];

export default function EducationSection() {
  return (
    <section className="py-12 px-4 bg-green-50 rounded-xl max-w-5xl mx-auto mt-6">
      <h2 className="text-center text-xl md:text-2xl font-bold mb-8 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
        Edukasi Lingkungan
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {educationList.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-green-200 shadow hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="text-center font-semibold text-green-600 mb-4">{item.title}</h3>
            <p className="text-justify text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
