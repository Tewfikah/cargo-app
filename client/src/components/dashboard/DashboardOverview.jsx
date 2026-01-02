import React from "react";
import KpiCard from "./KpiCard";
import {
  Truck,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";


const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      
      <KPICard
        title="Total Shipments"
        value="1,245"
        icon={Package}
        iconColor="bg-blue-500"
        badgeLabel="↑ 7.5% this week"
        type="badge"
      />

      <KPICard
        title="In Transit"
        value="312"
        icon={Truck}
        iconColor="bg-indigo-500"
        type="sparkline"
        chartData={[
          { y: 10 },
          { y: 20 },
          { y: 15 },
          { y: 30 },
          { y: 25 },
        ]}
      />

      <KPICard
        title="Pending Requests"
        value="18"
        icon={Clock}
        iconColor="bg-amber-500"
        type="progress"
        progress={64}
      />

      <KPICard
        title="Delivered Today"
        value="98"
        icon={CheckCircle}
        iconColor="bg-green-500"
        type="donut"
        progress={85}
      />

    </div>
  );
};

export default DashboardOverview;
