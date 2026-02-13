import React from "react";
import { Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";

const icons = {
  Pending: Clock,
  "In Transit": Truck,
  Delivered: CheckCircle,
  Delayed: AlertCircle,
};

// `StatCard` can derive values from a `shipments` array when provided.
export const StatCard = ({ label = "Status", value = "0", type = "Pending", color = "#6366f1", shipments = [] }) => {
  const Icon = icons[type] || Truck;

  const total = Array.isArray(shipments) ? shipments.length : 0;

  let numericValue = 0;
  if (Array.isArray(shipments) && shipments.length > 0) {
    if (type === "Total" || label.toLowerCase().includes("total")) {
      numericValue = total;
    } else {
      numericValue = shipments.filter((s) => s.status === type).length;
    }
  } else {
    numericValue = parseFloat(String(value).replace(/,/g, "")) || 0;
  }

  const safeTotal = total || Math.max(numericValue, 1);
  const percentage = Math.round((numericValue / safeTotal) * 100);

  return (
    <div
      className="group relative bg-white p-6 rounded-2xl shadow-lg border border-slate-200 transition-transform duration-300 overflow-hidden"
      style={{ borderLeft: `4px solid ${color}33` }}
    >

      <div
        className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.08] transition-transform duration-500 group-hover:scale-125"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
          <h3 className="text-3xl font-extrabold text-slate-800">{numericValue.toLocaleString()}</h3>
        </div>

        <div
          className="p-3 rounded-xl shadow-md transition-transform duration-300 group-hover:rotate-6"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-slate-400 font-medium">Activity</span>
          <span className="font-bold" style={{ color }}>{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{
              backgroundColor: color,
              width: `${percentage}%`,
              boxShadow: `0 6px 18px ${color}22`
            }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
