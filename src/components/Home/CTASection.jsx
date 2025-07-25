import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="text-center bg-green-700 text-white py-16 px-6">
      <h2 className="text-2xl font-bold mb-4">Siap untuk Membuat Pengelolaan Sampah Lebih Efisien?</h2>
      <p className="mb-6">Gabung bersama kami dalam upaya lingkungan yang lebih bersih dan terdata.</p>
      <Link to="/contact" className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold shadow">
        Hubungi Kami
      </Link>
    </section>
  );
}
