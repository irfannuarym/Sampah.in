import React from 'react';
import {
  MapPinIcon,
  TrashIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';

const stats = [
  { label: 'Titik Sampah', value: 35, icon: MapPinIcon },
  { label: 'Volume Sampah Bulan Ini', value: '4.2 Ton', icon: TrashIcon },
  { label: 'Petugas Aktif', value: 12, icon: UserGroupIcon },
  { label: 'Laporan Masuk', value: 87, icon: DocumentTextIcon },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
              <Icon className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-green-700">{item.value}</div>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
