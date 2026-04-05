import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { USER_ROLES } from "../constants";

export const UserModal = ({ isOpen, onClose, user = null, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Customer");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "Customer");
      setStatus(user.status || "Active");
    } else {
      setName("");
      setEmail("");
      setRole("Customer");
      setStatus("Active");
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSave = () => {
    const payload = {
      id: user?.id || `u_${Date.now()}`,
      name,
      email,
      role,
      status,
      avatar: null,
    };
    onSave && onSave(payload);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {user ? "Edit User" : "Add User"}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700">
            <X className="h-4 w-4 text-slate-400 dark:text-slate-300" />
          </button>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded border p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                {USER_ROLES.filter((r) => r !== "All").map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-40">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded border p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t bg-slate-50 p-4 text-right dark:border-slate-700 dark:bg-slate-700/40">
          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;