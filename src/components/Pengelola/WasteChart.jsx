import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WasteChart = () => {
  const data = {
    labels: ['Petugas A', 'Petugas B', 'Petugas C'],
    datasets: [
      {
        label: 'Sampah Selesai',
        data: [12, 9, 7],
        backgroundColor: '#16a34a',
      },
      {
        label: 'Sampah Pending',
        data: [3, 4, 6],
        backgroundColor: '#facc15',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4">Statistik Pengangkutan Sampah</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WasteChart;
