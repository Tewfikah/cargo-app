import React from "react";
import { Upload, Plus, Truck, PackageCheck, Clock, AlertTriangle } from "lucide-react";
import KPICard from "./KpiCard";

const ShipmentsHeader = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Shipments & Orders
        </h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
        />

        <KPICard
          title="In Transit"
          value="16"
          icon={Truck}
          iconColor="bg-blue-500"
          type="progress"
          progress={65}
        />

        <KPICard
          title="Delivered"
          value="42"
          icon={PackageCheck}
          iconColor="bg-green-500"
          type="progress"
          progress={90}
        />

        <KPICard
          title="Delayed"
          value="3"
          icon={AlertTriangle}
          iconColor="bg-red-500"
          type="progress"
          progress={20}
        />
      </div>
    </div>
  );
};

export default ShipmentsHeader;
