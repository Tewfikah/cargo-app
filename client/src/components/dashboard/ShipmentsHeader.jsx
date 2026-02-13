import React, { useState } from "react";
import { Upload, Plus, Truck, PackageCheck, Clock, AlertTriangle, ChevronDown } from "lucide-react";
import KPICard from "./KpiCard";

const ShipmentsHeader = ({ onCreate = () => {}, onBulkUpload = () => {}, onRangeChange = () => {} }) => {
  const [range, setRange] = useState("7d");

  return (
    <div className="space-y-6">

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-slate-50 to-white shadow-sm">
            <PackageCheck className="w-6 h-6 text-slate-700" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shipments & Orders</h1>
            <p className="text-sm text-slate-500">Monitor shipments, track issues and manage orders.</p>
          </div>
        </div>

          <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm">
            <select value={range} onChange={(e) => { setRange(e.target.value); onRangeChange(e.target.value); }} className="appearance-none bg-transparent pr-6">
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          <button onClick={onBulkUpload} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>

          <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" />
            Create Shipment
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Pending Shipments"
          value="8"
          icon={Clock}
          iconColor="bg-amber-500"
          type="progress"
          progress={40}
          badgeLabel="+5%"
        />

        <KPICard
          title="In Transit"
          value="16"
          icon={Truck}
          iconColor="bg-blue-500"
          type="progress"
          progress={65}
          badgeLabel="+12%"
        />

        <KPICard
          title="Delivered"
          value="42"
          icon={PackageCheck}
          iconColor="bg-green-500"
          type="progress"
          progress={90}
          badgeLabel="+4%"
        />

        <KPICard
          title="Delayed"
          value="3"
          icon={AlertTriangle}
          iconColor="bg-red-500"
          type="progress"
          progress={20}
          badgeLabel="-2%"
        />
      </div>
    </div>
  );
};

export default ShipmentsHeader;
