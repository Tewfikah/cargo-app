import React, { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000";

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

const fmtDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
};

const StatusBadge = ({ status }) => {
  const map = {
    PENDING: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
    IN_TRANSIT: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
    DELIVERED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
    DELAYED: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
  };

  const cls =
    map[status] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
      {status || "—"}
    </span>
  );
};

const DriverDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // modal state (location)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [modalError, setModalError] = useState("");

  // status update state
  const [statusBusyId, setStatusBusyId] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const token = () => localStorage.getItem("auth_token");

  const loadMyShipments = async () => {
    try {
      setLoading(true);
      setError("");

      const t = token();
      if (!t) {
        setShipments([]);
        setError("Missing token. Please login again.");
        return;
      }

      const res = await fetch(`${API_BASE}/api/driver/shipments?limit=100`, {
        headers: { Authorization: `Bearer ${t}` },
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Failed to load assignments");

      setShipments(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      setShipments([]);
      setError(e?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyShipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter((s) => s.status === "IN_TRANSIT").length;
    const pending = shipments.filter((s) => s.status === "PENDING").length;
    const delivered = shipments.filter((s) => s.status === "DELIVERED").length;
    const delayed = shipments.filter((s) => s.status === "DELAYED").length;
    return { total, inTransit, pending, delivered, delayed };
  }, [shipments]);

  const openLocationModal = (s) => {
    setSelected(s);
    setMsg("");
    setModalError("");
    setLat(s?.currentLat ?? "");
    setLng(s?.currentLng ?? "");
    setOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setOpen(false);
    setSelected(null);
    setLat("");
    setLng("");
    setMsg("");
    setModalError("");
  };

  const useMyGps = () => {
    setMsg("");
    setModalError("");

    if (!navigator.geolocation) {
      setModalError("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setMsg("GPS location loaded. Now click Save.");
      },
      (err) => {
        setModalError(err.message || "Failed to get location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const saveLocation = async (e) => {
    e.preventDefault();
    setMsg("");
    setModalError("");

    try {
      setSaving(true);

      const t = token();
      if (!t) {
        setModalError("Missing token. Please login again.");
        return;
      }

      const shipmentId = selected?.id;
      if (!shipmentId) {
        setModalError("Missing shipment id.");
        return;
      }

      const latNum = Number(lat);
      const lngNum = Number(lng);
      if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
        setModalError("Lat/Lng must be valid numbers.");
        return;
      }

      const res = await fetch(
        `${API_BASE}/api/driver/shipments/${shipmentId}/location`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify({ lat: latNum, lng: lngNum }),
        }
      );

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Failed to save location");

      setMsg("Location sent successfully.");

      await loadMyShipments();
      closeModal();
    } catch (e2) {
      setModalError(e2?.message || "Server error");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Update status
  const updateStatus = async (shipmentId, status) => {
    try {
      setStatusBusyId(shipmentId);
      setStatusMsg("");

      const t = token();
      if (!t) {
        setStatusMsg("Missing token. Please login again.");
        return;
      }

      const res = await fetch(
        `${API_BASE}/api/driver/shipments/${shipmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Failed to update status");

      setStatusMsg(`Status updated to ${status}.`);
      await loadMyShipments();
    } catch (e) {
      setStatusMsg(e?.message || "Status update failed");
    } finally {
      setStatusBusyId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Driver Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Your assigned shipments. Update status and send location.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Total
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            In Transit
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.inTransit}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Pending
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.pending}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Delivered
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.delivered}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Delayed
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.delayed}
          </div>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Loading your assignments...
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      )}

      {statusMsg && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {statusMsg}
        </div>
      )}

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              My Shipments
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              Update status and send location to update customer.
            </p>
          </div>

          <button
            type="button"
            onClick={loadMyShipments}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 dark:bg-slate-700/40 dark:text-slate-300">
              <tr>
                <th className="px-6 py-4">Shipment</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Location</th>
                <th className="px-6 py-4">Send Location</th>
                <th className="px-6 py-4">Update Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {!loading && shipments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-slate-500 dark:text-slate-300">
                    No shipments assigned to you yet.
                  </td>
                </tr>
              ) : (
                shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {s.shipmentNo || s.id}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {s.origin} → {s.destination}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {fmtDateTime(s.lastLocationAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openLocationModal(s)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        Send Location
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {["PENDING", "IN_TRANSIT", "DELAYED", "DELIVERED"].map((st) => (
                          <button
                            key={st}
                            type="button"
                            disabled={statusBusyId === s.id}
                            onClick={() => updateStatus(s.id, st)}
                            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                              st === "DELIVERED"
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : st === "DELAYED"
                                ? "bg-rose-600 text-white hover:bg-rose-700"
                                : st === "IN_TRANSIT"
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                            } disabled:opacity-60`}
                          >
                            {statusBusyId === s.id ? "..." : st.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        title={`Send Location — ${selected?.shipmentNo || ""}`}
        onClose={closeModal}
      >
        {modalError && (
          <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200">
            {modalError}
          </div>
        )}
        {msg && (
          <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-900/20 dark:text-emerald-200">
            {msg}
          </div>
        )}

        <form onSubmit={saveLocation} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude (e.g. 52.52)"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Longitude (e.g. 13.405)"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />

          <div className="sm:col-span-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={useMyGps}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Use My GPS
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save Location"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DriverDashboard;