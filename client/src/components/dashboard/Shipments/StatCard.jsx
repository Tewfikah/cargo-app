import React from "react";
import { Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";

const icons = {
  Pending: Clock,
  "In Transit": Truck,
  Delivered: CheckCircle,
  Delayed: AlertCircle,
};

export const StatCard = ({ label = "Status", value = "0", type = "Pending", color = "#6366f1" }) => {
  const Icon = icons[type] || Truck;
  const numericValue = parseFloat(value) || 0;
  const percentage = Math.min((numericValue / 50) * 100, 100);

  return (
    <div className="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Background Decoration */}
      <div 
        className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.08] transition-transform duration-500 group-hover:scale-125"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
          <h3 className="text-3xl font-extrabold text-slate-800">{value}</h3>
        </div>
        
        <div
          className="p-3 rounded-xl shadow-sm transition-transform duration-300 group-hover:rotate-6"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-slate-400 font-medium">Activity</span>
          <span className="font-bold" style={{ color }}>{Math.round(percentage)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{
              backgroundColor: color,
              width: `${percentage}%`,
              boxShadow: `0 0 12px ${color}60`
            }}
          >
             <div className="absolute inset-0 bg-white/20 w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
