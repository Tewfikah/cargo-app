import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import {
  STATUS_LABELS_EN,
  STATUS_STYLES,
  SHIPMENT_STATUS,
} from "../../utils/shipmentStatus.js";

const API_BASE = "http://localhost:5000"; // keep simple for now

const kpiCardBase =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800";

const KpiCard = ({ label, value, hint }) => (
  <div className={kpiCardBase}>
    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
      {label}
    </p>
    <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
      {value}
    </p>
    {hint && (
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">{hint}</p>
    )}
  </div>
);

const StatusPill = ({ status }) => {
  const cls =
    STATUS_STYLES[status] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
  const label = STATUS_LABELS_EN[status] || status || "—";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
      {label}
    </span>
  );
};

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Load real shipments from backend
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("auth_token");
        if (!token) {
          setShipments([]);
          setError("Missing token. Please login again.");
          return;
        }

        const res = await fetch(`${API_BASE}/api/user/shipments?limit=50`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        if (!res.ok || !json.ok) {
          throw new Error(json.message || "Failed to load shipments");
        }

        setShipments(Array.isArray(json.data) ? json.data : []);
      } catch (e) {
        setShipments([]);
        setError(e?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  // show 6 recent shipments
  const myShipments = useMemo(() => {
    return (shipments || []).slice(0, 6);
  }, [shipments]);

  // KPI stats from real shipments
  const stats = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter(
      (s) => s.status === SHIPMENT_STATUS.IN_TRANSIT
    ).length;
    const delivered = shipments.filter(
      (s) => s.status === SHIPMENT_STATUS.DELIVERED
    ).length;
    const pending = shipments.filter(
      (s) => s.status === SHIPMENT_STATUS.PENDING
    ).length;
    const delayed = shipments.filter(
      (s) => s.status === SHIPMENT_STATUS.DELAYED
    ).length;

    return { total, inTransit, delivered, pending, delayed };
  }, [shipments]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          User Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Welcome, <b>{user?.name || "User"}</b>. Here is your shipment overview.
        </p>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Loading your shipments...
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          label="Total Shipments"
          value={stats.total}
          hint="All your shipments"
        />
        <KpiCard
          label="In Transit"
          value={stats.inTransit}
          hint="Currently moving"
        />
        <KpiCard
          label="Delivered"
          value={stats.delivered}
          hint="Completed deliveries"
        />
        <KpiCard label="Pending" value={stats.pending} hint="Waiting to start" />
        <KpiCard label="Delayed" value={stats.delayed} hint="Need attention" />
      </div>

      {/* Recent Shipments */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Shipments
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              Latest shipments and status updates.
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            onClick={() => navigate("/my-shipments")}
          >
            View All
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 dark:bg-slate-700/40 dark:text-slate-300">
              <tr>
                <th className="px-6 py-4">Shipment</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">ETA</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {!loading && myShipments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-slate-500 dark:text-slate-300"
                  >
                    No shipments yet.
                  </td>
                </tr>
              ) : (
                myShipments.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {s.shipmentNo || s.id}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {s.origin} → {s.destination}
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill status={s.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {s.driverName || "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {s.eta || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;