import React from "react";
import { useAuth } from "../../AuthContext";

const DriverDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
        Driver Dashboard
      </h1>

      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Welcome, <b>{user?.name || "Driver"}</b>
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Driver assignments + history will be built here step-by-step.
        </p>
      </div>
    </div>
  );
};

export default DriverDashboard;