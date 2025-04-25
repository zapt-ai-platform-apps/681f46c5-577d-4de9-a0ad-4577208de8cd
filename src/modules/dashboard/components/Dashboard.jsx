import React, { useState, useEffect } from 'react';
import { getAllItems } from '@/modules/core/db/dbOperations';
import { STORES } from '@/modules/core/db/dbConfig';
import { 
  eggsToKg, 
  kgToEggs, 
  kgToCrates, 
  formatNumber 
} from '@/modules/core/utils/conversions';
import { getFirstDayOfMonth, getLastDayOfMonth } from '@/modules/core/utils/dateUtils';
import StatCard from './StatCard';
import ProductionSummary from './ProductionSummary';
import DistributionSummary from './DistributionSummary';

export default function Dashboard() {
  const [productionData, setProductionData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats calculations
  const [stats, setStats] = useState({
    totalProduction: 0,
    totalDistribution: 0,
    currentStock: 0,
    stockInKg: 0,
    stockInCrates: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all production and distribution data
        const productions = await getAllItems(STORES.PRODUCTION);
        const distributions = await getAllItems(STORES.DISTRIBUTION);
        
        setProductionData(productions);
        setDistributionData(distributions);
        
        // Calculate summary statistics
        const totalEggsProduced = productions.reduce((sum, item) => sum + item.eggs, 0);
        const totalEggsDistributed = distributions.reduce((sum, item) => {
          return sum + kgToEggs(item.kg) + kgToEggs(item.crates * 10); // Convert crates to kg first
        }, 0);
        
        const currentStockEggs = totalEggsProduced - totalEggsDistributed;
        
        setStats({
          totalProduction: totalEggsProduced,
          totalDistribution: totalEggsDistributed,
          currentStock: currentStockEggs,
          stockInKg: eggsToKg(currentStockEggs),
          stockInCrates: kgToCrates(eggsToKg(currentStockEggs))
        });
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Produksi" 
          value={`${formatNumber(stats.totalProduction)} butir`}
          icon="🥚"
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <StatCard 
          title="Total Distribusi" 
          value={`${formatNumber(stats.totalDistribution)} butir`}
          icon="🚚"
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <StatCard 
          title="Stok Saat Ini" 
          value={`${formatNumber(stats.currentStock)} butir`}
          icon="📦"
          bgColor="bg-amber-100"
          textColor="text-amber-800"
        />
        <StatCard 
          title="Konversi Stok" 
          value={`${formatNumber(stats.stockInKg.toFixed(1))} kg / ${formatNumber(stats.stockInCrates.toFixed(1))} peti`}
          icon="⚖️"
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionSummary data={productionData} />
        <DistributionSummary data={distributionData} />
      </div>
    </div>
  );
}