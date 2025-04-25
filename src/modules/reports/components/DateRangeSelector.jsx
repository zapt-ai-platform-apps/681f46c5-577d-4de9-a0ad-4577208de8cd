import React from 'react';
import DatePicker from '@/modules/core/components/DatePicker';

export default function DateRangeSelector({ 
  startDate, 
  endDate, 
  onDateRangeChange,
  dateRangeType,
  onDateRangeTypeChange
}) {
  // Handler for start date change
  const handleStartDateChange = (date) => {
    // Ensure start date is not after end date
    if (date > endDate) {
      onDateRangeChange(date, date);
    } else {
      onDateRangeChange(date, endDate);
    }
  };

  // Handler for end date change
  const handleEndDateChange = (date) => {
    // Ensure end date is not before start date
    if (date < startDate) {
      onDateRangeChange(date, date);
    } else {
      onDateRangeChange(startDate, date);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold mr-4">Rentang Waktu:</h3>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${
              dateRangeType === 'month' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } cursor-pointer`}
            onClick={() => onDateRangeTypeChange('month')}
          >
            Bulan Ini
          </button>
          
          <button
            className={`px-3 py-1 rounded-md ${
              dateRangeType === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } cursor-pointer`}
            onClick={() => onDateRangeTypeChange('week')}
          >
            7 Hari Terakhir
          </button>
          
          <button
            className={`px-3 py-1 rounded-md ${
              dateRangeType === 'custom' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } cursor-pointer`}
            onClick={() => onDateRangeTypeChange('custom')}
          >
            Kustom
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DatePicker
          label="Tanggal Mulai"
          selected={startDate}
          onChange={handleStartDateChange}
        />
        
        <DatePicker
          label="Tanggal Akhir"
          selected={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
}