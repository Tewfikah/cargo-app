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
      avatar: user?.avatar || "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop",
    };
    onSave && onSave(payload);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="text-lg font-bold">{user ? "Edit User" : "Add User"}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-sm font-medium">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-1 p-2 border rounded">
                {USER_ROLES.filter(r => r !== "All").map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="w-40">
              <label className="text-sm font-medium">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mt-1 p-2 border rounded">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-slate-50 text-right">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
