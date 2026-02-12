import React from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Truck,
  MoreVertical,
  MapPin,
} from "lucide-react";

const tabs = ["All", "Pending", "In Transit", "Delivered", "Delayed"];

export const ShipmentTable = ({
  data = [],
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onUpdateStatus,
  onAssignDriver,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startResult =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endResult = Math.min(currentPage * itemsPerPage, totalItems);

  const getStatusStyles = (status) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Delayed":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 lg:px-6 lg:py-4 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex overflow-x-auto no-scrollbar gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${
                activeFilter === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            type="text"
            placeholder="Search table..."
            className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 rounded-lg py-1.5 pl-9 pr-4 text-xs outline-none transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase border-b border-slate-100">
              <th className="px-6 py-4 w-32">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status & Driver</th>
              <th className="px-6 py-4">ETA</th>
              <th className="px-6 py-4 text-right">Operations</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-6 py-5 font-bold text-slate-800">
                    {row.id}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {row.customer}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold border rounded ${getStatusStyles(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        — {row.driver}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 italic text-slate-500">
                    {row.eta}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onAssignDriver(row.id)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded hover:bg-slate-200"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => onUpdateStatus(row.id)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100 hover:bg-blue-600 hover:text-white"
                      >
                        Status
                      </button>
                      <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center text-slate-400">
                    <Truck size={40} className="mb-4 opacity-20" />
                    <p>No shipments found</p>
                    <button
                      onClick={() => {
                        onFilterChange("All");
                        onSearchChange("");
                      }}
                      className="mt-2 text-blue-600 text-xs font-bold"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 bg-white border-t border-slate-100 flex justify-between text-xs font-semibold text-slate-500">
        <span>
          Showing {startResult} to {endResult} of {totalItems}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1.5 border rounded disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded text-[11px] font-bold ${
                p === currentPage
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() =>
              onPageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 border rounded disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};