import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';

const INITIAL_VEHICLES = [
  { id: 'TRK-1021', type: 'Box Truck', status: 'Available', driver: 'Mike D.', lastSeen: '5 mins ago' },
  { id: 'TRK-1008', type: 'Semi-Trailer', status: 'In Transit', driver: 'Sarah K.', lastSeen: '15 mins ago' },
  { id: 'TRK-1007', type: 'Box Truck', status: 'Available', driver: 'Unassigned', lastSeen: '25 mins ago' },
  { id: 'TRK-1003', type: 'Reefer Truck', status: 'Maintenance', driver: 'Unassigned', lastSeen: '20 mins ago', maintenanceNote: '5 Awaiting Parts' },
  { id: 'TRK-1015', type: 'Semi-Trailer', status: 'In Transit', driver: 'Unassigned', lastSeen: '40 mins ago' },
  { id: 'TRK-1012', type: 'Box Truck', status: 'Maintenance', driver: 'Unassigned', lastSeen: '50 mins ago' },
];

const PAGE_SIZE = 5;

const statusClasses = {
  Available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'In Transit': 'bg-blue-100 text-blue-700 border-blue-200',
  Maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
};

const VehicleTable = ({ onMaintenanceClick = () => {} }) => {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ id: '', type: 'Box Truck', driver: 'Unassigned' });

  const [sortConfig, setSortConfig] = useState({ key: 'id', order: 'asc' });
  const [page, setPage] = useState(1);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      return { key, order: 'asc' };
    });
  };

  const filteredAndSortedVehicles = useMemo(() => {
    let result = vehicles.filter((vehicle) => {
      const s = searchTerm.toLowerCase();
      const matchesSearch =
        vehicle.id.toLowerCase().includes(s) ||
        vehicle.type.toLowerCase().includes(s) ||
        vehicle.status.toLowerCase().includes(s) ||
        vehicle.driver.toLowerCase().includes(s);

      const matchesStatus = statusFilter === 'All' || vehicle.status === statusFilter;
      const matchesType = typeFilter === 'All' || vehicle.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    if (sortConfig) {
      result.sort((a, b) => {
        const va = (a[sortConfig.key] || '').toString();
        const vb = (b[sortConfig.key] || '').toString();
        if (va < vb) return sortConfig.order === 'asc' ? -1 : 1;
        if (va > vb) return sortConfig.order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [vehicles, searchTerm, statusFilter, typeFilter, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedVehicles.length / PAGE_SIZE));
  const paged = filteredAndSortedVehicles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) return <ChevronDown className="w-4 h-4 text-slate-300" />;
    return sortConfig.order === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.id) return;
    const vehicle = { ...newVehicle, status: 'Available', lastSeen: 'Just now' };
    setVehicles((prev) => [vehicle, ...prev]);
    setIsAddModalOpen(false);
    setNewVehicle({ id: '', type: 'Box Truck', driver: 'Unassigned' });
  };

  const types = ['All', ...Array.from(new Set(vehicles.map((v) => v.type)))];
  const statuses = ['All', 'Available', 'In Transit', 'Maintenance'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800">Fleet Vehicles</h3>

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              className="pl-10 pr-3 py-2 border rounded-lg text-sm w-64"
              placeholder="Search ID, type, driver..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <select className="border rounded-lg p-2 text-sm" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select className="border rounded-lg p-2 text-sm" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="text-xs text-slate-500 uppercase tracking-wide bg-slate-50">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('id')}>Vehicle ID <SortIcon column="id" /></th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('type')}>Type <SortIcon column="type" /></th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('status')}>Status <SortIcon column="status" /></th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('driver')}>Driver <SortIcon column="driver" /></th>
              <th className="px-4 py-3">Last Seen</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600">
            {paged.map((vehicle) => (
              <tr key={vehicle.id} className="border-b last:border-b-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{vehicle.id}</td>
                <td className="px-4 py-3">{vehicle.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${statusClasses[vehicle.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-4 py-3">{vehicle.driver}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{vehicle.lastSeen}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button title="Maintenance" onClick={() => onMaintenanceClick(vehicle.id)} className="p-2 rounded-md hover:bg-slate-100">
                      <Wrench className="w-4 h-4 text-amber-600" />
                    </button>
                    <button title="Assign" className="p-2 rounded-md hover:bg-slate-100">
                      <UserPlus className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button title="Unassign" className="p-2 rounded-md hover:bg-slate-100">
                      <UserMinus className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-slate-100">
                      <MoreHorizontal className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-sm text-slate-500">Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filteredAndSortedVehicles.length)} of {filteredAndSortedVehicles.length} vehicles</div>
        <div className="flex items-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-2 rounded-md border disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-md ${p === page ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
          <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="p-2 rounded-md border disabled:opacity-40">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold">Add Vehicle</h4>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-md hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Vehicle ID</label>
                <input required value={newVehicle.id} onChange={(e) => setNewVehicle((s) => ({ ...s, id: e.target.value }))} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Type</label>
                <select value={newVehicle.type} onChange={(e) => setNewVehicle((s) => ({ ...s, type: e.target.value }))} className="w-full mt-1 p-2 border rounded">
                  <option>Box Truck</option>
                  <option>Semi-Trailer</option>
                  <option>Reefer Truck</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Driver</label>
                <input value={newVehicle.driver} onChange={(e) => setNewVehicle((s) => ({ ...s, driver: e.target.value }))} className="w-full mt-1 p-2 border rounded" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
