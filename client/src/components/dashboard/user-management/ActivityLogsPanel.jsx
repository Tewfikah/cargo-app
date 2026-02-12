import React from "react";
import { X, History } from "lucide-react";

export const ActivityLogsPanel = ({ onClose, logs = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">Activity Logs</h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
            >
              <img
                src={log.userAvatar}
                alt={log.userName}
                className="w-10 h-10 rounded-full border border-slate-200"
              />

              <div className="flex-1">
                <p className="text-sm text-slate-700">
                  <span className="font-bold text-slate-900">{log.userName}</span>{" "}
                  {log.action}
                </p>
                <p className="text-xs text-slate-400 mt-1">{log.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-slate-400">No activity logs.</div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 text-center">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ActivityLogsPanel;
