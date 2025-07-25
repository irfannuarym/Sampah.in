import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="text-center bg-green-700 text-white py-16 px-6">
      <h1 className="text-4xl font-bold mb-4">
        Sampah.in
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Aplikasi yang membantu warga, petugas, dan pengelola dalam mencatat, melaporkan, dan menganalisis data sampah secara real-time.
      </p>
    </section>
  );
}
