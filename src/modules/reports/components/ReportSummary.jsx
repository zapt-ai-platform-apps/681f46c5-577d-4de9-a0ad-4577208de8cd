import React from 'react';
import { 
  eggsToKg, 
  kgToEggs, 
  cratesToEggs, 
  kgToCrates, 
  eggsToCrates,
  formatNumber 
} from '@/modules/core/utils/conversions';
import { formatDateDisplay } from '@/modules/core/utils/dateUtils';

export default function ReportSummary({ 
  productionData, 
  distributionData,
  startDate,
  endDate
}) {
  // Calculate summary data
  const totalEggsProduced = productionData.reduce((sum, item) => sum + item.eggs, 0);
  
  const totalEggsDistributed = distributionData.reduce((sum, item) => {
    const eggsFromKg = kgToEggs(item.kg || 0);
    const eggsFromCrates = cratesToEggs(item.crates || 0);
    return sum + eggsFromKg + eggsFromCrates;
  }, 0);
  
  const totalKgDistributed = distributionData.reduce((sum, item) => sum + (item.kg || 0), 0);
  const totalCratesDistributed = distributionData.reduce((sum, item) => sum + (item.crates || 0), 0);
  
  // Calculate conversion values
  const productionInKg = eggsToKg(totalEggsProduced);
  const productionInCrates = eggsToCrates(totalEggsProduced);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Ringkasan Periode</h3>
        <p className="text-gray-600">
          {formatDateDisplay(startDate)} - {formatDateDisplay(endDate)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="text-green-800 font-medium">Total Produksi</h4>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {formatNumber(totalEggsProduced)} <span className="text-sm font-normal">butir</span>
          </p>
          <div className="text-sm text-green-600 mt-1">
            <p>≈ {formatNumber(productionInKg.toFixed(1))} kg</p>
            <p>≈ {formatNumber(productionInCrates.toFixed(2))} peti</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-blue-800 font-medium">Total Distribusi</h4>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            {formatNumber(totalEggsDistributed)} <span className="text-sm font-normal">butir</span>
          </p>
          <div className="text-sm text-blue-600 mt-1">
            <p>{formatNumber(totalKgDistributed.toFixed(1))} kg</p>
            <p>{formatNumber(totalCratesDistributed.toFixed(2))} peti</p>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h4 className="text-amber-800 font-medium">Selisih</h4>
          <p className="text-2xl font-bold text-amber-700 mt-2">
            {formatNumber(totalEggsProduced - totalEggsDistributed)} <span className="text-sm font-normal">butir</span>
          </p>
          <div className="text-sm text-amber-600 mt-1">
            <p>≈ {formatNumber(eggsToKg(totalEggsProduced - totalEggsDistributed).toFixed(1))} kg</p>
            <p>≈ {formatNumber(eggsToCrates(totalEggsProduced - totalEggsDistributed).toFixed(2))} peti</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Produksi Terakhir</h3>
          {productionData.length === 0 ? (
            <p className="text-gray-500">Tidak ada data produksi dalam periode ini.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-gray-500">Tanggal</th>
                    <th className="text-right py-2 font-medium text-gray-500">Butir</th>
                  </tr>
                </thead>
                <tbody>
                  {[...productionData]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map(item => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2">{formatDateDisplay(item.date)}</td>
                        <td className="text-right py-2">{formatNumber(item.eggs)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Distribusi Terakhir</h3>
          {distributionData.length === 0 ? (
            <p className="text-gray-500">Tidak ada data distribusi dalam periode ini.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-gray-500">Tanggal</th>
                    <th className="text-right py-2 font-medium text-gray-500">Kg</th>
                    <th className="text-right py-2 font-medium text-gray-500">Peti</th>
                  </tr>
                </thead>
                <tbody>
                  {[...distributionData]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map(item => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2">{formatDateDisplay(item.date)}</td>
                        <td className="text-right py-2">{formatNumber(item.kg || 0)}</td>
                        <td className="text-right py-2">{formatNumber(item.crates || 0)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}