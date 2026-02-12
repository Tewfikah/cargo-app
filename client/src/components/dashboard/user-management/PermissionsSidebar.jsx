import React from "react";
import { Shield, ChevronRight, Check } from "lucide-react";
import { ROLE_CONFIG } from "../constants";

export const PermissionsSidebar = ({
  permissions = [],
  onPermissionChange = () => {},
  logs = [],
  onViewAllLogs = () => {},
}) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Section 1: Role & Permissions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-blue-600" />
            Role & Permissions
          </h3>
        </div>

        <div className="space-y-4">
          {permissions.map((p) => {
            const config = ROLE_CONFIG[p.role] || {};
            return (
              <div key={p.role} className="flex items-center justify-between">
                <button
                  className={`flex-1 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    config.badgeColor || ""
                  } border border-transparent`}
                >
                  {config.icon}
                  <span>{p.role}</span>
                </button>

                <div className="flex items-center space-x-4 ml-4">
                  {/* Shipments */}
                  <div className="flex flex-col items-center">
                    <label className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                      Shipments
                    </label>
                    <button
                      onClick={() => onPermissionChange(p.role, "manageShipments")}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        p.permissions.manageShipments
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {p.permissions.manageShipments && <Check className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Vehicles */}
                  <div className="flex flex-col items-center">
                    <label className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                      Vehicles
                    </label>
                    <button
                      onClick={() => onPermissionChange(p.role, "trackVehicles")}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        p.permissions.trackVehicles
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {p.permissions.trackVehicles && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
            Save Changes
          </button>
        </div>
      </div>

      {/* Section 2: Activity Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800">Recent Activity</h3>
        </div>

        <div className="space-y-6">
          {logs.slice(0, 3).map((log) => (
            <div key={log.id} className="flex space-x-3">
              <img src={log.userAvatar} alt={log.userName} className="w-8 h-8 rounded-full shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-blue-600 hover:underline cursor-pointer">{log.userName}</span>{" "}
                  {log.action}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <button onClick={onViewAllLogs} className="text-blue-600 text-sm font-bold hover:underline flex items-center ml-auto">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsSidebar;
