import React from 'react';
import TugasItem from './TugasItem';

const TugasList = ({ tugas }) => {
  if (tugas.length === 0) {
    return <p className="text-gray-500">Belum ada tugas yang masuk.</p>;
  }

  return (
    <div className="grid gap-4">
      {tugas.map((item) => (
        <TugasItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default TugasList;
