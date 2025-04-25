import React from 'react';
import { FiHome, FiTrendingUp, FiTrendingDown, FiBarChart2 } from 'react-icons/fi';

export default function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'production', label: 'Produksi', icon: <FiTrendingUp /> },
    { id: 'distribution', label: 'Distribusi', icon: <FiTrendingDown /> },
    { id: 'reports', label: 'Laporan', icon: <FiBarChart2 /> }
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row">
          <div className="py-4">
            <h1 className="text-xl font-bold text-gray-800">Manajemen Telur</h1>
          </div>
          
          <nav className="flex overflow-x-auto sm:ml-auto py-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center mx-2 ${
                  activeTab === item.id ? 'tab-active' : 'tab-inactive'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}