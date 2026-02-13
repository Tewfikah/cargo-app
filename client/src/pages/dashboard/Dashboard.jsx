import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickAnalytics from "../../components/dashboard/QuickAnalytics";
import LiveMap from "../../components/dashboard/LiveMap";
import ShipmentsTable from "../../components/dashboard/ShipmentsTable";
import ShipmentsHeader from "../../components/dashboard/ShipmentsHeader";


const Dashboard = () => {
  const navigate = useNavigate();
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAssignDriver, setShowAssignDriver] = useState(false);
  const [showFleetOverview, setShowFleetOverview] = useState(false);

  const handleExport = () => alert("Export started — implement CSV export when ready.");
  const handleCreate = () => navigate('/dashboard/shipments-orders');
  const handleBulkUpload = () => setShowBulkUpload(true);
  const handleAssignDriver = () => setShowAssignDriver(true);
  const handleFleetOverview = () => setShowFleetOverview(true);

  return (
    <>
      <div className="p-6 bg-slate-50 min-h-screen">
      {/* Hero / Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of shipments, fleet and key metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="text-sm px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow">Export</button>
          <button onClick={handleCreate} className="text-sm px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-lg">New Shipment</button>
        </div>
      </div>

      <ShipmentsHeader onCreate={handleCreate} onBulkUpload={handleBulkUpload} onRangeChange={(r) => console.log('range', r)} />

      {/* Full-width Live Map + Analytics */}
      <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-sky-50 to-white rounded-3xl shadow-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-800">Live Map</h3>
            <p className="text-sm text-slate-500">Real-time vehicle locations</p>
          </div>
          <div className="h-[520px] md:h-[420px] w-full rounded-xl overflow-hidden border border-slate-100">
            <LiveMap />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Quick Analytics</h3>
            <p className="text-sm text-slate-500">Key metrics at a glance</p>
          </div>
          <QuickAnalytics />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Recent Shipments</h3>
                <p className="text-xs text-slate-500">Latest shipments and status</p>
              </div>
            </div>
            <div className="overflow-auto">
              <ShipmentsTable />
            </div>
          </div>
        </div>
        
      </div>
    </div>

    {/* Modals (simple demos) */}

    {showBulkUpload && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
          <h3 className="text-lg font-bold mb-3">Bulk Upload</h3>
          <p className="text-sm text-slate-500 mb-4">Upload CSV to import shipments (demo).</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowBulkUpload(false)} className="px-4 py-2 rounded border">Close</button>
          </div>
        </div>
      </div>
    )}

    {showAssignDriver && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <h3 className="text-lg font-bold mb-3">Assign Driver</h3>
          <p className="text-sm text-slate-500 mb-4">Assign a driver to selected shipment (demo).</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAssignDriver(false)} className="px-4 py-2 rounded border">Close</button>
          </div>
        </div>
      </div>
    )}

    {showFleetOverview && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <h3 className="text-lg font-bold mb-3">Fleet Overview</h3>
          <p className="text-sm text-slate-500 mb-4">Open Fleet dashboard (demo).</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowFleetOverview(false)} className="px-4 py-2 rounded border">Close</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Dashboard;
