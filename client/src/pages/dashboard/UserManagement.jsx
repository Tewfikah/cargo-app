import React, { useState } from "react";
import KPICards from "../../components/dashboard/user-management/KpiCards";
import { UserTable } from "../../components/dashboard/user-management/UserTable";
import PermissionsSidebar from "../../components/dashboard/user-management/PermissionsSidebar";
import ActivityLogsModal from "../../components/dashboard/user-management/ActivityLogsModal";
import UserModal from "../../components/dashboard/user-management/UserModal";

const UserManagement = () => {
  const initialUsers = [
    { id: "u1", name: "Alice Johnson", role: "Dispatcher", status: "Active", email: "alice@example.com", avatar: null },
    { id: "u2", name: "Bob Smith", role: "Driver", status: "Inactive", email: "bob@example.com", avatar: null },
    { id: "u3", name: "Carol Lee", role: "Customer", status: "Active", email: "carol@example.com", avatar: null },
    { id: "u4", name: "Daniel Green", role: "Admin", status: "Active", email: "daniel@example.com", avatar: null },
    { id: "u5", name: "Eve Turner", role: "Driver", status: "Active", email: "eve@example.com", avatar: null },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [permissions, setPermissions] = useState([
    { role: "Dispatcher", permissions: { manageShipments: true, trackVehicles: false } },
    { role: "Driver", permissions: { manageShipments: false, trackVehicles: true } },
    { role: "Customer", permissions: { manageShipments: false, trackVehicles: false } },
    { role: "Admin", permissions: { manageShipments: true, trackVehicles: true } },
  ]);

  const [logs, setLogs] = useState([
    { id: "l1", userName: "Alice Johnson", userAvatar: null, action: "edited user profile", timestamp: "2 hours ago" },
    { id: "l2", userName: "Bob Smith", userAvatar: null, action: "reset password", timestamp: "Yesterday" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const handleAddUser = () => setShowAddModal(true);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSaveUser = (u) => {
    const exists = users.find((p) => p.id === u.id);
    setUsers((prev) => {
      if (exists) return prev.map((p) => (p.id === u.id ? u : p));
      return [u, ...prev];
    });
    // add simple activity log
    setLogs((prev) => [
      { id: `log_${Date.now()}`, userName: u.name, userAvatar: u.avatar, action: exists ? "updated user" : "added user", timestamp: "Just now" },
      ...prev,
    ]);
  };

  const handlePermissionChange = (role, key) => {
    setPermissions((prev) => prev.map((p) => {
      if (p.role !== role) return p;
      return { ...p, permissions: { ...p.permissions, [key]: !p.permissions[key] } };
    }));
  };

  const handleViewAllLogs = () => setShowLogsModal(true);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <KPICards users={users} onAddUser={handleAddUser} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserTable users={users} onAddUser={handleAddUser} onEditUser={handleEditUser} />
        </div>

        <div className="lg:col-span-1">
          <PermissionsSidebar
            permissions={permissions}
            logs={logs}
            onPermissionChange={handlePermissionChange}
            onViewAllLogs={handleViewAllLogs}
          />
        </div>
      </div>

      <UserModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleSaveUser} />
      <UserModal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setEditingUser(null); }} user={editingUser} onSave={handleSaveUser} />
      <ActivityLogsModal isOpen={showLogsModal} onClose={() => setShowLogsModal(false)} logs={logs} />
    </>
  );
};

export default UserManagement;
