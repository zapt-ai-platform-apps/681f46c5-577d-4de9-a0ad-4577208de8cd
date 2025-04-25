import React from 'react';
import { 
  eggsToKg, 
  eggsToCrates, 
  formatNumber 
} from '@/modules/core/utils/conversions';
import { formatDateDisplay } from '@/modules/core/utils/dateUtils';

export default function ProductionSummary({ data }) {
  // Get the 5 most recent production entries
  const recentProduction = [...data]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Produksi Terbaru</h3>
      
      {recentProduction.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Belum ada data produksi</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-gray-500">Tanggal</th>
                <th className="text-right py-2 font-medium text-gray-500">Butir</th>
                <th className="text-right py-2 font-medium text-gray-500">Konversi</th>
              </tr>
            </thead>
            <tbody>
              {recentProduction.map(item => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2">{formatDateDisplay(item.date)}</td>
                  <td className="text-right py-2">{formatNumber(item.eggs)}</td>
                  <td className="text-right py-2">
                    {formatNumber(eggsToKg(item.eggs).toFixed(1))} kg / {formatNumber(eggsToCrates(item.eggs).toFixed(2))} peti
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}