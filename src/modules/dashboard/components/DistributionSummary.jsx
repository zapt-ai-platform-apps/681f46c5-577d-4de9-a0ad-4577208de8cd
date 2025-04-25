import React from 'react';
import { 
  kgToEggs, 
  cratesToEggs, 
  formatNumber 
} from '@/modules/core/utils/conversions';
import { formatDateDisplay } from '@/modules/core/utils/dateUtils';

export default function DistributionSummary({ data }) {
  // Get the 5 most recent distribution entries
  const recentDistribution = [...data]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Distribusi Terbaru</h3>
      
      {recentDistribution.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Belum ada data distribusi</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-gray-500">Tanggal</th>
                <th className="text-right py-2 font-medium text-gray-500">Kg</th>
                <th className="text-right py-2 font-medium text-gray-500">Peti</th>
                <th className="text-right py-2 font-medium text-gray-500">Total Butir</th>
              </tr>
            </thead>
            <tbody>
              {recentDistribution.map(item => {
                const eggsFromKg = kgToEggs(item.kg || 0);
                const eggsFromCrates = cratesToEggs(item.crates || 0);
                const totalEggs = eggsFromKg + eggsFromCrates;
                
                return (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-2">{formatDateDisplay(item.date)}</td>
                    <td className="text-right py-2">{formatNumber(item.kg || 0)}</td>
                    <td className="text-right py-2">{formatNumber(item.crates || 0)}</td>
                    <td className="text-right py-2">{formatNumber(totalEggs)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}