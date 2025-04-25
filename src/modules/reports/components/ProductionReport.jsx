import React from 'react';
import { 
  eggsToKg, 
  eggsToCrates, 
  formatNumber 
} from '@/modules/core/utils/conversions';
import { formatDateDisplay } from '@/modules/core/utils/dateUtils';

export default function ProductionReport({ productionData, startDate, endDate }) {
  // Sort data by date (newest first)
  const sortedData = [...productionData].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Calculate totals
  const totalEggs = productionData.reduce((sum, item) => sum + item.eggs, 0);
  const totalKg = eggsToKg(totalEggs);
  const totalCrates = eggsToCrates(totalEggs);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Laporan Produksi</h3>
        <p className="text-gray-600">
          Periode: {formatDateDisplay(startDate)} - {formatDateDisplay(endDate)}
        </p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Produksi</h4>
            <p className="text-xl font-bold">{formatNumber(totalEggs)} butir</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Konversi ke Kg</h4>
            <p className="text-xl font-bold">{formatNumber(totalKg.toFixed(1))} kg</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Konversi ke Peti</h4>
            <p className="text-xl font-bold">{formatNumber(totalCrates.toFixed(2))} peti</p>
          </div>
        </div>
      </div>
      
      {productionData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Tidak ada data produksi dalam periode ini.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-3 font-medium text-gray-500">Tanggal</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Butir</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Kg</th>
                <th className="text-right py-2 px-3 font-medium text-gray-500">Peti</th>
                <th className="text-left py-2 px-3 font-medium text-gray-500">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-3">{formatDateDisplay(item.date)}</td>
                  <td className="text-right py-3 px-3">{formatNumber(item.eggs)}</td>
                  <td className="text-right py-3 px-3">{formatNumber(eggsToKg(item.eggs).toFixed(2))}</td>
                  <td className="text-right py-3 px-3">{formatNumber(eggsToCrates(item.eggs).toFixed(3))}</td>
                  <td className="py-3 px-3 text-sm text-gray-600">{item.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="py-3 px-3">Total</td>
                <td className="text-right py-3 px-3">{formatNumber(totalEggs)}</td>
                <td className="text-right py-3 px-3">{formatNumber(totalKg.toFixed(2))}</td>
                <td className="text-right py-3 px-3">{formatNumber(totalCrates.toFixed(3))}</td>
                <td className="py-3 px-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}