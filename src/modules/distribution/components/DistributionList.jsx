import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formatDateDisplay } from '@/modules/core/utils/dateUtils';
import { kgToEggs, cratesToEggs, formatNumber } from '@/modules/core/utils/conversions';

export default function DistributionList({ data, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="card p-6 text-center">Memuat data...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500">Belum ada data distribusi. Tambahkan distribusi pertama Anda.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Riwayat Distribusi</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-medium text-gray-500">Tanggal</th>
              <th className="text-right py-2 font-medium text-gray-500">Kg</th>
              <th className="text-right py-2 font-medium text-gray-500">Peti</th>
              <th className="text-right py-2 font-medium text-gray-500">Total Butir</th>
              <th className="text-left py-2 font-medium text-gray-500">Tujuan</th>
              <th className="text-center py-2 font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              const eggsFromKg = kgToEggs(item.kg || 0);
              const eggsFromCrates = cratesToEggs(item.crates || 0);
              const totalEggs = eggsFromKg + eggsFromCrates;
              
              return (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2">{formatDateDisplay(item.date)}</td>
                  <td className="text-right py-2">{formatNumber(item.kg || 0)}</td>
                  <td className="text-right py-2">{formatNumber(item.crates || 0)}</td>
                  <td className="text-right py-2">{formatNumber(totalEggs)}</td>
                  <td className="py-2 text-sm">{item.destination || '-'}</td>
                  <td className="py-2">
                    <div className="flex justify-center space-x-2">
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => onEdit(item)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => onDelete(item.id)}
                        title="Hapus"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}