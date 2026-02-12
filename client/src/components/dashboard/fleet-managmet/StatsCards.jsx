import React from 'react';
import { Truck, CheckCircle, Wrench, Users, Plus } from 'lucide-react';

const StatsCards = ({ total = 0, available = 0, maintenance = 0, drivers = 0 }) => {
  const safeTotal = total || 1;
  const availPct = Math.round((available / safeTotal) * 100);
  const driversPct = Math.round((drivers / safeTotal) * 100);

  const cardBase = "bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Vehicles */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Truck size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Total Vehicles</div>
              <div className="text-2xl font-bold text-slate-800">{total}</div>
            </div>
          </div>
          <button className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100">
            <Plus size={16} />
          </button>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `100%` }} />
          </div>
          <div className="text-[11px] text-slate-400 mt-2">All registered fleet vehicles</div>
        </div>
      </div>

      {/* Available Vehicles */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Available</div>
              <div className="text-2xl font-bold text-slate-800">{available}</div>
            </div>
          </div>
          <div className="text-sm font-semibold text-emerald-600">{availPct}%</div>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${availPct}%` }} />
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Ready for dispatch</div>
        </div>
      </div>

      {/* Maintenance */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Wrench size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">In Maintenance</div>
              <div className="text-2xl font-bold text-slate-800">{maintenance}</div>
            </div>
          </div>
          <div className="text-xs text-amber-700 font-medium">{maintenance > 0 ? `${Math.round((maintenance / safeTotal) * 100)}%` : "0%"}</div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-amber-50 rounded-md p-2 text-amber-800">Repair Active</div>
          <div className="bg-amber-50 rounded-md p-2 text-amber-800">Awaiting Info</div>
        </div>
      </div>

      {/* Active Drivers */}
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Active Drivers</div>
              <div className="text-2xl font-bold text-slate-800">{drivers}</div>
            </div>
          </div>
          <div className="text-sm font-semibold text-indigo-600">{driversPct}%</div>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600" style={{ width: `${driversPct}%` }} />
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Drivers currently on shift</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;