import React from "react";
import QuickAnalytics from "../../components/dashboard/QuickAnalytics";
import LiveMap from "../../components/dashboard/LiveMap";
import ShipmentsTable from "../../components/dashboard/ShipmentsTable";
import ShipmentsHeader from "../../components/dashboard/ShipmentsHeader";


const Dashboard = () => {
  return (
    <>
      <ShipmentsHeader />
      {/* Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LiveMap />
        <ShipmentsTable />
      </div>
      <QuickAnalytics />
    </>
  );
};

export default Dashboard;
