import React from 'react';

const StatsCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-50 w-64 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-gray-900">120,000+</h3>
        <span className="text-green-500 flex items-center font-bold text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
          </svg>
        </span>
      </div>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-tight">
        Shipments in 2024 with 99.9% on-time delivery.
      </p>
      
      <div className="flex -space-x-2 pt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <img 
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-transparent" 
            src={`https://i.pravatar.cc/100?u=${i + 10}`} 
            alt="User" 
          />
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-[8px] font-bold text-blue-600">
          +4k
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
