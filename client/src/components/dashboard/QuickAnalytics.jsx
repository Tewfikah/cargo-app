import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Package, Clock, Fuel, TrendingUp, TrendingDown } from "lucide-react";

import {
  DAILY_DELIVERIES,
  REVENUE_VS_COST,
  FUEL_CONSUMPTION,
} from "./constants";

const AnalyticsCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition ${className}`}>
      <h4 className="text-sm font-bold text-gray-800 mb-3">{title}</h4>
      <div className="h-24">{children}</div>
    </div>
  );
};

const StatMini = ({ label, value, delta, icon: Icon, trendUp }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-3 rounded-xl ${trendUp ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'} group-hover:scale-110 transition-transform duration-300`}>
        {Icon && <Icon size={22} strokeWidth={2} />}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trendUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
        {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {delta}
      </div>
    </div>
    <div>
      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
      <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
    </div>
  </div>
);

const QuickAnalytics = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-800">
          <p className="font-bold mb-2 opacity-70">{label || 'Data Point'}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span>
              <span className="font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatMini label="Today Deliveries" value="24" delta="+8%" icon={Package} trendUp={true} />
        <StatMini label="Avg. ETA" value="1h 22m" delta="-3%" icon={Clock} trendUp={true} />
        <StatMini label="Fuel Avg (L)" value="105" delta="+2%" icon={Fuel} trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsCard title="Daily Deliveries">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DAILY_DELIVERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" name="Deliveries" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        <AnalyticsCard title="Revenue vs Cost">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={REVENUE_VS_COST} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="cost" name="Cost" stroke="#f97316" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        <AnalyticsCard title="Fuel Consumption (L)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FUEL_CONSUMPTION} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" name="Fuel" fill="#60a5fa" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default QuickAnalytics;
