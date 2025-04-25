import React from 'react';
import { 
  kgToEggs, 
  cratesToEggs, 
  formatNumber 
} from '@/modules/core/utils/conversions';
import { formatDateDisplay } from '@/modules/core/utils/dateUtils';

export default function DistributionReport({ distributionData, startDate, endDate }) {
  // Sort data by date (newest first)
  const sortedData = [...distributionData].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Calculate totals
  const totalKg = distributionData.reduce((sum, item) => sum + (item.kg || 0), 0);
  const totalCrates = distributionData.reduce((sum, item) => sum + (item.crates || 0), 0);
  
  // Calculate total eggs based on the kg and crates
  const totalEggsFromKg = kgToEggs(totalKg);
  const totalEggsFromCrates = cratesToEggs(totalCrates);
  const totalEggs = totalEggsFromKg + totalEggsFromCrates;

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Laporan Distribusi</h3>
        <p className="text-gray-600">
          Periode: {formatDateDisplay(startDate)} - {formatDateDisplay(endDate)}
        </p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Kg</h4>
            <p className="text-xl font-bold">{formatNumber(totalKg.toFixed(1))} kg</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Peti</h4>
            <p className="text-xl font-bold">{formatNumber(totalCrates.toFixed(2))} peti</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Butir</h4>
            <p className="text-xl font-bold">{formatNumber(totalEggs)} butir</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Rincian Butir</h4>
            <p className="text-sm">Dari kg: {formatNumber(totalEggsFromKg)}</p>
            <p className="text-sm">Dari peti: {formatNumber(totalEggsFromCrates)}</p>
          </div>
        </div>
      </div>
      
      {distributionData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Tidak ada data distribusi dalam periode ini.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-3 font-medium text-gray-500">Tanggal</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Kg</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Peti</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Total Butir</th>
                <th className="text-left py-2 px-3 font-medium text-gray-500">Tujuan</th>
                <th className="text-left py-2 px-3 font-medium text-gray-500">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(item => {
                const eggsFromKg = kgToEggs(item.kg || 0);
                const eggsFromCrates = cratesToEggs(item.crates || 0);
                const totalItemEggs = eggsFromKg + eggsFromCrates;
                
                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-3">{formatDateDisplay(item.date)}</td>
                    <td className="text-right py-3 px-3">{formatNumber(item.kg || 0)}</td>
                    <td className="text-right py-3 px-3">{formatNumber(item.crates || 0)}</td>
                    <td className="text-right py-3 px-3">{formatNumber(totalItemEggs)}</td>
                    <td className="py-3 px-3">{item.destination || '-'}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{item.notes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="py-3 px-3">Total</td>
                <td className="text-right py-3 px-3">{formatNumber(totalKg.toFixed(1))}</td>
                <td className="text-right py-3 px-3">{formatNumber(totalCrates.toFixed(2))}</td>
                <td className="text-right py-3 px-3">{formatNumber(totalEggs)}</td>
                <td className="py-3 px-3"></td>
                <td className="py-3 px-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}