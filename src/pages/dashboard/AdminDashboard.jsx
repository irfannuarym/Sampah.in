import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import WasteChart from '../../components/charts/WasteChart';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Pengelola</h1>
      <WasteChart />
      {}
    </DashboardLayout>
  );
}
