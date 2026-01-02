import React from "react";
import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import OverviewPanel from "../../components/dashboard/OverviewPanel";
import QuickAnalytics from "../../components/dashboard/QuickAnalytics";
import LiveMap from "../../components/dashboard/LiveMap";
import ShipmentsTable from "../../components/dashboard/ShipmentsTable";
import ShipmentsHeader from "../../components/dashboard/ShipmentsHeader";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

     
        <main className="p-6 space-y-8 overflow-y-auto">
          {/* <OverviewPanel/> */}
          <ShipmentsHeader/>
          {/* Grid Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <LiveMap />
            <ShipmentsTable />
          </div>
          <QuickAnalytics />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
