import React, { useState } from 'react';
import Navigation from './modules/core/components/Navigation';
import Dashboard from './modules/dashboard/components/Dashboard';
import Production from './modules/production/components/Production';
import Distribution from './modules/distribution/components/Distribution';
import Reports from './modules/reports/components/Reports';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'production':
        return <Production />;
      case 'distribution':
        return <Distribution />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-full min-h-screen bg-gray-50 flex flex-col">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-4 md:p-6 container mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}