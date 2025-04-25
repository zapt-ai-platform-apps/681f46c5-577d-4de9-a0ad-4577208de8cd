import React, { useState, useEffect } from 'react';
import { getAllItems } from '@/modules/core/db/dbOperations';
import { STORES } from '@/modules/core/db/dbConfig';
import { getFirstDayOfMonth, getLastDayOfMonth, getLast7Days, formatDateDisplay } from '@/modules/core/utils/dateUtils';
import * as Sentry from '@sentry/browser';
import DateRangeSelector from './DateRangeSelector';
import ReportSummary from './ReportSummary';
import ProductionReport from './ProductionReport';
import DistributionReport from './DistributionReport';

export default function Reports() {
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());
  const [dateRangeType, setDateRangeType] = useState('month'); // 'month', 'week', 'custom'
  
  const [productionData, setProductionData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeReport, setActiveReport] = useState('summary'); // 'summary', 'production', 'distribution'

  // Update date range based on selection type
  useEffect(() => {
    if (dateRangeType === 'month') {
      setStartDate(getFirstDayOfMonth());
      setEndDate(getLastDayOfMonth());
    } else if (dateRangeType === 'week') {
      const { startDate: weekStart, endDate: weekEnd } = getLast7Days();
      setStartDate(weekStart);
      setEndDate(weekEnd);
    }
    // For 'custom', we don't automatically change the dates
  }, [dateRangeType]);

  // Load data whenever date range changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Convert to ISO string for IndexedDB comparison
        const startISO = startDate.toISOString();
        const endISO = endDate.toISOString();
        
        // Fetch all data and filter by date range
        const productionItems = await getAllItems(STORES.PRODUCTION);
        const filteredProduction = productionItems.filter(item => {
          const itemDate = item.date;
          return itemDate >= startISO && itemDate <= endISO;
        });
        
        const distributionItems = await getAllItems(STORES.DISTRIBUTION);
        const filteredDistribution = distributionItems.filter(item => {
          const itemDate = item.date;
          return itemDate >= startISO && itemDate <= endISO;
        });
        
        setProductionData(filteredProduction);
        setDistributionData(filteredDistribution);
        setError(null);
      } catch (err) {
        console.error('Error fetching report data:', err);
        setError('Gagal memuat data laporan. Silakan coba lagi.');
        Sentry.captureException(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  // Handler for custom date range changes
  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setDateRangeType('custom');
  };

  // Handler for predefined date range type changes
  const handleDateRangeTypeChange = (type) => {
    setDateRangeType(type);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Laporan</h2>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="card">
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={handleDateRangeChange}
          dateRangeType={dateRangeType}
          onDateRangeTypeChange={handleDateRangeTypeChange}
        />
        
        <div className="mt-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              className={activeReport === 'summary' ? 'tab-active' : 'tab-inactive'}
              onClick={() => setActiveReport('summary')}
            >
              Ringkasan
            </button>
            <button
              className={activeReport === 'production' ? 'tab-active' : 'tab-inactive'}
              onClick={() => setActiveReport('production')}
            >
              Produksi
            </button>
            <button
              className={activeReport === 'distribution' ? 'tab-active' : 'tab-inactive'}
              onClick={() => setActiveReport('distribution')}
            >
              Distribusi
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          {loading ? (
            <div className="text-center py-8">Memuat data...</div>
          ) : (
            <>
              {activeReport === 'summary' && (
                <ReportSummary 
                  productionData={productionData} 
                  distributionData={distributionData}
                  startDate={startDate}
                  endDate={endDate}
                />
              )}
              
              {activeReport === 'production' && (
                <ProductionReport 
                  productionData={productionData}
                  startDate={startDate}
                  endDate={endDate}
                />
              )}
              
              {activeReport === 'distribution' && (
                <DistributionReport 
                  distributionData={distributionData}
                  startDate={startDate}
                  endDate={endDate}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}