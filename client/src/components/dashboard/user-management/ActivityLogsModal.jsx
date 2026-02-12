import React from "react";
import { X, History } from "lucide-react";

export const ActivityLogsModal = ({ isOpen, onClose, logs = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">All Activity Logs</h2>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
            >
              <img src={log.userAvatar} alt={log.userName} className="w-10 h-10 rounded-full border border-slate-200" />

              <div className="flex-1">
                <p className="text-sm text-slate-700">
                  <span className="font-bold text-slate-900">{log.userName}</span> {log.action}
                </p>
                <p className="text-xs text-slate-400 mt-1">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 text-center">
          <button onClick={onClose} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsModal;
