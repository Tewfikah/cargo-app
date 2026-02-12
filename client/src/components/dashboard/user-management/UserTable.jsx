import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Plus,
} from "lucide-react";
import { ROLE_CONFIG, USER_ROLES } from "../constants";

export const UserTable = (props) => {
  const {
    users = [],
    currentPage = 1,
    pageSize = 10,
    onPageChange = () => {},
    activeTab = "All",
    onTabChange = () => {},
    searchTerm = "",
    onSearchChange = () => {},
    onSortChange = () => {},
    onEditUser = () => {},
  } = props || {};
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { onAddUser = () => {} } = props || {};

  // legacy props `totalResults`, `currentPage`, `pageSize` kept for compatibility

  // Sample users (used when `users` prop is empty)
  const SAMPLE_USERS = [
    {
      id: "u1",
      name: "Alice Johnson",
      role: "Dispatcher",
      status: "Active",
      email: "alice@example.com",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256&fit=crop",
    },
    {
      id: "u2",
      name: "Bob Smith",
      role: "Driver",
      status: "Inactive",
      email: "bob@example.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
    },
    {
      id: "u3",
      name: "Carol Lee",
      role: "Customer",
      status: "Active",
      email: "carol@example.com",
      avatar:
        "https://images.unsplash.com/photo-1545996124-1b8d5b5b6f6d?w=256&h=256&fit=crop",
    },
    {
      id: "u4",
      name: "Daniel Green",
      role: "Admin",
      status: "Active",
      email: "daniel@example.com",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop",
    },
    {
      id: "u5",
      name: "Eve Turner",
      role: "Driver",
      status: "Active",
      email: "eve@example.com",
      avatar:
        "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=256&h=256&fit=crop",
    },
  ];

  // Local state for table features
  const [localUsers] = useState(users && users.length > 0 ? users : SAMPLE_USERS);
  const [query, setQuery] = useState(searchTerm || "");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(currentPage || 1);
  const effectivePageSize = pageSize || 5;

  // Note: initial state derived from props above; updates from parent will
  // be propagated via prop callbacks (onPageChange/onSearchChange) when used.

  // Handlers
  const handleSearch = (q) => {
    setQuery(q);
    onSearchChange && onSearchChange(q);
    setPage(1);
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else setSortDir("asc");
    setSortKey(key);
    onSortChange && onSortChange(key);
  };

  const handlePageChange = (p) => {
    setPage(p);
    onPageChange && onPageChange(p);
  };

  // Compute filtered + sorted users
  const filtered = useMemo(() => {
    const q = (query || "").toLowerCase().trim();
    let list = localUsers.slice();

    if (activeTab && activeTab !== "All") {
      list = list.filter((u) => u.role === activeTab);
    }

    if (q) {
      list = list.filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q) ||
          (u.role || "").toLowerCase().includes(q)
      );
    }

    if (sortKey) {
      list.sort((a, b) => {
        const va = (a[sortKey] || "").toString().toLowerCase();
        const vb = (b[sortKey] || "").toString().toLowerCase();
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [localUsers, query, sortKey, sortDir, activeTab]);

  const paged = useMemo(() => {
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / effectivePageSize));
    const current = Math.min(Math.max(1, page), pages);
    const start = (current - 1) * effectivePageSize;
    const end = start + effectivePageSize;
    return {
      total,
      pages,
      current,
      items: filtered.slice(start, end),
      startIndex: total > 0 ? start + 1 : 0,
      endIndex: Math.min(end, total),
    };
  }, [filtered, page, effectivePageSize]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Search users..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onAddUser()}
              className="inline-flex items-center px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Add User
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <ArrowUpDown className="w-4 h-4 text-slate-500" />
                <span>Sort By</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-20">
                  {["name", "role", "status"].map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        handleSort(key);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 capitalize"
                    >
                      {key}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-4 overflow-x-auto no-scrollbar">
          <div className="flex space-x-8">
            {USER_ROLES.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  onTabChange(tab);
                  setPage(1);
                }}
                className={`pb-3 px-1 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto min-h-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase">
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paged && paged.total > 0 ? (
              paged.items.map((user) => {
                const roleCfg = ROLE_CONFIG[user.role] || {
                  icon: null,
                  iconBg: "",
                  badgeColor: "",
                };

                return (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  {/* Role */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-md ${roleCfg.iconBg}`}>
                        {roleCfg.icon}
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                          roleCfg.badgeColor
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">
                      {user.email}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onEditUser(user)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Edit
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  </td>
                </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                  <Search className="w-10 h-10 mb-2 opacity-20 mx-auto" />
                  <p>No users found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>
          Showing {" "}
          <span className="font-semibold text-slate-700">
            {paged.total > 0 ? paged.startIndex : 0}
          </span>{" "}
          to {" "}
          <span className="font-semibold text-slate-700">{paged.endIndex}</span> of {" "}
          <span className="font-semibold text-slate-700">{paged.total}</span> results
        </p>

          <div className="flex items-center space-x-2">
            <button
              disabled={paged.current === 1}
              onClick={() => handlePageChange(paged.current - 1)}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: paged.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-8 h-8 rounded-lg ${
                  paged.current === p ? "bg-blue-600 text-white" : "hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={paged.current === paged.pages || paged.pages === 0}
              onClick={() => handlePageChange(paged.current + 1)}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
      </div>
    </div>
  );
};
