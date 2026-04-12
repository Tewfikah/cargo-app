import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QuickAnalyticsContainer from "../../components/dashboard/QuickAnalyticsContainer";
import LiveMap from "../../components/dashboard/LiveMap";
import ShipmentsTable from "../../components/dashboard/ShipmentsTable";
import MessagesCards from "../../components/dashboard/MessagesCards";
import { shipmentsMock } from "../../mocks/shipments.mock.js";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAssignDriver, setShowAssignDriver] = useState(false);
  const [showFleetOverview, setShowFleetOverview] = useState(false);

  const handleExport = () =>
    alert("Export started — implement CSV export when ready.");
  const handleCreate = () => navigate("/dashboard/shipments-orders");
  const handleBulkUpload = () => setShowBulkUpload(true);
  const handleAssignDriver = () => setShowAssignDriver(true);
  const handleFleetOverview = () => setShowFleetOverview(true);

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
        {/* Hero / Page header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {t("dashboard.title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              {t("dashboard.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {t("dashboard.export")}
            </button>

            <button
              onClick={handleCreate}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white shadow hover:shadow-lg hover:bg-blue-700"
            >
              {t("dashboard.newShipment")}
            </button>
          </div>
        </div>

        {/* Messages summary cards */}
        <MessagesCards />

        {/* Full-width Live Map + Analytics */}
        <div className="mt-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-50 to-white p-4 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-800">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {t("dashboard.liveMap")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {t("dashboard.liveMapDesc")}
              </p>
            </div>

            <div className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-100 dark:border-slate-700 md:h-[420px]">
              <LiveMap />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Quick Analytics
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Key metrics at a glance
              </p>
            </div>

            <QuickAnalyticsContainer />
          </div>
        </div>

        {/* Recent Shipments (ONE card only: ShipmentsTable renders the card UI) */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-3">
            <ShipmentsTable
              shipments={shipmentsMock}
              onViewAll={() => navigate("/dashboard/shipments-orders")}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBulkUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
              Bulk Upload
            </h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">
              Upload CSV to import shipments (demo).
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowBulkUpload(false)}
                className="rounded border px-4 py-2 dark:border-slate-600 dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
              Assign Driver
            </h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">
              Assign a driver to selected shipment (demo).
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAssignDriver(false)}
                className="rounded border px-4 py-2 dark:border-slate-600 dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showFleetOverview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
              Fleet Overview
            </h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">
              Open Fleet dashboard (demo).
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowFleetOverview(false)}
                className="rounded border px-4 py-2 dark:border-slate-600 dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;