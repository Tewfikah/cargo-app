import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  STATUS_LABELS_EN,
  STATUS_STYLES,
} from "../../utils/shipmentStatus.js";

const API_BASE = "http://localhost:5000";

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

const fmtDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
};

const Field = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
      {label}
    </div>
    <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
      {value ?? "—"}
    </div>
  </div>
);

const ShipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // comes from URL /my-shipments/:id

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("auth_token");
        if (!token) {
          setShipment(null);
          setError("Missing token. Please login again.");
          return;
        }

        const res = await fetch(`${API_BASE}/api/user/shipments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();

        if (!res.ok || !json.ok) {
          throw new Error(json.message || "Failed to load shipment");
        }

        setShipment(json.data);
      } catch (e) {
        setShipment(null);
        setError(e?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    if (id) run();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Shipment Details
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Full information for one shipment.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/my-shipments")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Back to My Shipments
          </button>

          <button
            type="button"
            onClick={() => navigate("/user-dashboard")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Loading shipment...
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && shipment && (
        <>
          {/* Top summary card */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                  Shipment
                </div>
                <div className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
                  {shipment.shipmentNo || shipment.id}
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {shipment.origin} → {shipment.destination}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusPill status={shipment.status} />
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Client" value={shipment.client} />
            <Field label="Origin" value={shipment.origin} />
            <Field label="Destination" value={shipment.destination} />
            <Field label="ETA" value={shipment.eta || "—"} />
            <Field label="Driver" value={shipment.driverName || "—"} />
            <Field label="Created At" value={fmtDateTime(shipment.createdAt)} />
            <Field label="Updated At" value={fmtDateTime(shipment.updatedAt)} />
            <Field label="Shipment ID" value={shipment.id} />
          </div>

          {/* Next feature placeholder */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Next (later)
            </div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              We can add a timeline here (Created → In Transit → Delivered) and map preview.
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShipmentDetails;