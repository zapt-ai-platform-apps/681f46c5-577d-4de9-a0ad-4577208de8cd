import React from 'react';

export default function StatCard({ title, value, icon, bgColor = 'bg-blue-100', textColor = 'text-blue-800' }) {
  return (
    <div className={`card ${bgColor} border-0`}>
      <div className="flex items-center">
        <div className={`text-3xl mr-3 ${textColor}`}>{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className={`text-xl font-semibold ${textColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}