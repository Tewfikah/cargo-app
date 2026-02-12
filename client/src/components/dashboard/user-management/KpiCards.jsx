import React from "react";
import { Plus } from "lucide-react";
import { ROLE_CONFIG } from "../constants";

export const KPICards = ({ onAddUser }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {Object.entries(ROLE_CONFIG).map(([role, config]) => (
        <div
          key={role}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-800">
                {config.total}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {role}s
              </span>
            </div>

            <div className={`p-2 rounded-lg ${config.iconBg}`}>
              {config.icon}
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <span className="text-3xl font-extrabold text-slate-900 leading-none">
              {role === "Dispatcher"
                ? "8"
                : role === "Driver"
                ? "16"
                : role === "Customer"
                ? "163"
                : "2"}
            </span>

            <div className="mt-2">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${config.badgeColor}`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Add User Card */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
        <button
          onClick={onAddUser}
          className="w-full h-full min-h-[140px] flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all transform active:scale-95 font-semibold shadow-lg shadow-blue-200"
        >
          <div className="p-2 bg-white/20 rounded-full">
            <Plus className="w-6 h-6" />
          </div>
          <span>Add User</span>
        </button>
      </div>
    </div>
  );
};
export default KPICards;