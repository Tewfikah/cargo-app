import React, { useState } from "react";
import KPICards from "../../components/dashboard/user-management/KpiCards";
import { UserTable } from "../../components/dashboard/user-management/UserTable";
import PermissionsSidebar from "../../components/dashboard/user-management/PermissionsSidebar";
import ActivityLogsModal from "../../components/dashboard/user-management/ActivityLogsModal";
import UserModal from "../../components/dashboard/user-management/UserModal";

import { usersMock } from "../../mocks/users.mock.js";
import { permissionsMock } from "../../mocks/userPermissions.mock.js";
import { userLogsMock } from "../../mocks/userLogs.mock.js";

import {
  USER_ROLE_LABELS,
  USER_STATUS,
  USER_STATUS_LABELS,
} from "../../components/dashboard/user-management/constants.js";

const UserManagement = () => {
  const [users, setUsers] = useState(usersMock);
  const [permissions, setPermissions] = useState(permissionsMock);
  const [logs, setLogs] = useState(userLogsMock);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const pushLog = (userName, action) => {
    setLogs((prev) => [
      {
        id: `log_${Date.now()}`,
        userName,
        userAvatar: null,
        action,
        timestamp: "Just now",
      },
      ...(prev || []),
    ]);
  };

  // --- UI actions (backend-ready stubs) ---
  // Later these become API calls:
  // await usersApi.updateRole(id, role), etc.

  const handleAddUser = () => setShowAddModal(true);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSaveUser = (u) => {
    const exists = users.find((p) => p.id === u.id);

    setUsers((prev) => {
      if (exists) return prev.map((p) => (p.id === u.id ? u : p));
      return [u, ...(prev || [])];
    });

    pushLog(u.name, exists ? "updated user" : "added user");
  };

  const handleChangeRole = (userId, role) => {
    setUsers((prev) =>
      (prev || []).map((u) => (u.id === userId ? { ...u, role } : u))
    );

    const u = users.find((x) => x.id === userId);
    pushLog(u?.name || "User", `changed role to ${USER_ROLE_LABELS[role] || role}`);
  };

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      (prev || []).map((u) => {
        if (u.id !== userId) return u;
        const next =
          u.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE;
        return { ...u, status: next };
      })
    );

    const u = users.find((x) => x.id === userId);
    const current = u?.status || USER_STATUS.ACTIVE;
    const next =
      current === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE;

    pushLog(u?.name || "User", `set status to ${USER_STATUS_LABELS[next] || next}`);
  };

  const handleDeleteUser = (userId) => {
    const u = users.find((x) => x.id === userId);
    const ok = window.confirm(`Delete ${u?.name || "this user"}? This cannot be undone.`);
    if (!ok) return;

    setUsers((prev) => (prev || []).filter((x) => x.id !== userId));
    pushLog(u?.name || "User", "deleted user");
  };

  const handlePermissionChange = (role, key) => {
    setPermissions((prev) =>
      (prev || []).map((p) => {
        if (p.role !== role) return p;
        return {
          ...p,
          permissions: { ...p.permissions, [key]: !p.permissions[key] },
        };
      })
    );
  };

  const handleViewAllLogs = () => setShowLogsModal(true);

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
        User Management
      </h1>

      <KPICards users={users} onAddUser={handleAddUser} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UserTable
            users={users}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onChangeRole={handleChangeRole}
            onToggleStatus={handleToggleStatus}
            onDeleteUser={handleDeleteUser}
          />
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

      <UserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveUser}
      />

      <UserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={handleSaveUser}
      />

      <ActivityLogsModal
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        logs={logs}
      />
    </div>
  );
};

export default UserManagement;