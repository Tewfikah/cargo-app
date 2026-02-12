import React from 'react';
import { X, Wrench, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const mockLogs = [
  { id: '1', date: '2024-04-20', description: 'Oil change and brake inspection', status: 'Completed' },
  { id: '2', date: '2024-03-15', description: 'Replaced windshield and air filters', status: 'Awaiting Parts' },
  { id: '3', date: '2024-02-28', description: 'Engine diagnostics due to check engine light', status: 'In Progress' },
];

const mockActivities = [
  { id: 'a1', description: 'Brakes replaced, tires rotated', date: '01/09/2024' },
  { id: 'a2', description: 'Routine inspection completed', date: '11/10/2023' },
  { id: 'a3', description: 'Fuel filter replaced', date: '09/10/2023' },
];

const MaintenanceModal = ({ vehicleId, onClose = () => {}, inline = false }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Awaiting Parts':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // If rendered inline (as a side panel), don't include the backdrop or fixed wrapper
  if (inline) {
    return (
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200 w-full">
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Wrench className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Maintenance</h3>
              <p className="text-xs text-slate-500 uppercase">{vehicleId || 'Select a vehicle'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          {vehicleId ? (
            <>
              <div className="text-sm text-slate-600">Showing maintenance log for <span className="font-medium text-slate-800">{vehicleId}</span></div>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Date</th>
                      <th className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Description</th>
                      <th className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="px-3 py-2 text-slate-500 text-sm">{log.date}</td>
                        <td className="px-3 py-2 text-slate-700 text-sm">{log.description}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${getStatusBadge(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-800">Next service in 1,200 miles</div>
              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 px-3 py-2 rounded-md border">Close</button>
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md">Complete Log</button>
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-500">Select a vehicle from the table to view maintenance details here.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (no blur, subtle dim) */}
      <div
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
      />

      {/* Modal (centered, smaller) */}
      <div className="relative w-full max-w-xl max-h-[80vh] bg-white shadow-2xl flex flex-col rounded-2xl overflow-hidden border border-slate-200 animate-in fade-in duration-200">

        {/* Header */}
        <header className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Wrench className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Maintenance Log</h2>
              <p className="text-xs text-slate-500 uppercase">{vehicleId}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">

          {/* Logs Table */}
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500 text-sm">{log.date}</td>
                    <td className="px-4 py-3 text-slate-700 text-sm">{log.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${getStatusBadge(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activities */}
          <section>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Recent Activities
            </h3>
            <ul className="space-y-3">
              {mockActivities.map((activity) => (
                <li key={activity.id} className="flex justify-between text-sm text-slate-600">
                  <span>{activity.description}</span>
                  <span className="text-xs text-slate-400">{activity.date}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Upcoming Service</p>
              <p className="text-blue-700 text-sm">
                Next scheduled maintenance is in 1,200 miles or on June 15, 2024.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2 rounded-md border">Close</button>
            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Complete Log
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default MaintenanceModal;
