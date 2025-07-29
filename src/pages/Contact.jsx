import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, UserIcon } from '@heroicons/react/24/outline';

const teamMembers = [
  {
    npm: 'B25B6R043',
    name: 'Nina Agustina',
    role: 'Frontend Developer',
  },
  {
    npm: 'B25B6R046',
    name: 'Wayan Christian Pradayana',
    role: 'Backend Developer',
  },
  {
    npm: 'B25B6R047',
    name: 'Irfan Nuary Muliawan',
    role: 'Frontend Developer',
  },
  {
    npm: 'B25B6R059',
    name: 'Muh Berlian Taqiyyuddin Fakhir',
    role: 'Backend Developer',
  },
];

function CardInfo({ children }) {
  return (
    <div className="p-4 rounded-xl bg-green-500 text-white border border-green-300 shadow-[0_6px_15px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300">
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-green-100 relative">
      <Link
        to="/"
        aria-label="Kembali ke Beranda"
        className="absolute top-4 left-4 flex items-center gap-1 text-xl font-bold text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="-translate-y-[1px]">Beranda</span>
      </Link>

      <div className="flex-grow max-w-3xl mx-auto p-6 space-y-6 pt-16">
        <h1 className="text-center text-3xl font-bold text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
          Hubungi Kami
        </h1>

        <CardInfo>
          <p className="text-center">
            Jika Anda memiliki pertanyaan, saran, atau keluhan terkait aplikasi Sampah.in, silakan hubungi tim pengembang kami di bawah ini.
          </p>
        </CardInfo>

        <div className="p-4 rounded-xl border border-transparent ring-1 ring-green-500 ring-offset-2 bg-white text-green-900 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-700">Tim Pengembang Website</h2>
          <ul className="space-y-4 list-decimal list-inside">
            {teamMembers.map((member, index) => (
              <li key={index} className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-green-500" />
                <span>
                  <span className="font-medium">{member.npm}</span> - {member.name} - <span className="italic text-gray-700">{member.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="bg-green-500 text-white py-6 w-full mt-8">
        <div className="text-center px-4">
          <p className="text-sm">© {new Date().getFullYear()} Sampah.in. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
