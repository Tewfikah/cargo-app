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

const AnalyticsCard = ({ title, children, className = "" }) => {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-base font-bold text-slate-800 dark:text-white">{title}</h4>
      </div>
      <div className="h-72 w-full flex-1">{children}</div>
    </div>
  );
};

const StatMini = ({ label, value, delta, icon: Icon, trendUp }) => (
  <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
    <div className="mb-3 flex items-start justify-between">
      <div
        className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${
          trendUp
            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
            : "bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        }`}
      >
        {Icon && <Icon size={22} strokeWidth={2} />}
      </div>

      <div
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
          trendUp
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
            : "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
        }`}
      >
        {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {delta}
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {value}
      </h3>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">
        {label}
      </p>
    </div>
  </div>
);

const QuickAnalytics = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-xs text-white shadow-xl">
          <p className="mb-2 font-bold opacity-70">{label || "Data Point"}</p>
          {payload.map((entry, index) => (
            <div key={index} className="mb-1 flex items-center gap-2 last:mb-0">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatMini label="Today Deliveries" value="24" delta="+8%" icon={Package} trendUp />
        <StatMini label="Avg. ETA" value="1h 22m" delta="-3%" icon={Clock} trendUp />
        <StatMini label="Fuel Avg (L)" value="105" delta="+2%" icon={Fuel} trendUp={false} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AnalyticsCard title="Daily Deliveries">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DAILY_DELIVERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="value" name="Deliveries" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        <AnalyticsCard title="Revenue vs Cost">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={REVENUE_VS_COST} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="cost" name="Cost" stroke="#f97316" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </AnalyticsCard>

        <AnalyticsCard title="Fuel Consumption (L)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FUEL_CONSUMPTION} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="value" name="Fuel" fill="#60a5fa" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default QuickAnalytics;