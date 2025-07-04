import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WasteChart() {
  const data = {
    labels: ['Organik', 'Anorganik', 'B3'],
    datasets: [
      {
        label: 'Sampah (kg)',
        data: [120, 90, 30],
        backgroundColor: ['#4ade80', '#60a5fa', '#f87171'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-medium mb-2">Statistik Sampah</h2>
      <Bar data={data} />
    </div>
  );
}
