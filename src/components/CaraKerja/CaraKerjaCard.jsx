import React from 'react';

export default function CaraKerjaCard({ step, title, description }) {
  return (
    <div className="p-4 rounded-xl bg-green-500 text-white border border-green-300 shadow-[0_6px_15px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2">
        {step}. {title}
      </h3>
      <p className="text-white">{description}</p>
    </div>
  );
}
