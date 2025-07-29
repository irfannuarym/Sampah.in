import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const tpsIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const tpsData = [
  { id: 1, lat: -6.1975, lng: 106.8577778, nama: 'TPS Rw 10 Palmeriam' },
  { id: 2, lat: -6.201944444, lng: 106.8544444, nama: 'Transit/Pool Gerobak Padel RW 01' },
  { id: 3, lat: -6.195457, lng: 106.861986, nama: 'TPS Rw 001 Utan Kayu Utara' },
  { id: 4, lat: -6.198333333, lng: 106.8686111, nama: 'Dipo Utan Kayu Selatan' },
  { id: 5, lat: -6.201666667, lng: 106.8716667, nama: 'RW 04/05 Asem Gede' },
];

export default function MapSection() {
  return (
    <section className="py-12 px-4 bg-white shadow-md rounded-xl max-w-5xl mx-auto mt-6">
      <h2 className="text-center text-xl md:text-2xl font-bold mb-4 text-green-500 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
        Peta Tempat Pembuangan Sementara
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Temukan lokasi TPS (Tempat Pembuangan Sementara) terdekat melalui peta di bawah ini.
      </p>
      <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-green-400">
        <MapContainer center={[-6.198, 106.864]} zoom={15} className="w-full h-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {tpsData.map((tps) => (
            <Marker key={tps.id} position={[tps.lat, tps.lng]} icon={tpsIcon}>
              <Popup>{tps.nama}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
