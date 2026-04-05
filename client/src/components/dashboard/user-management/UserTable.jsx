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

  const SAMPLE_USERS = [
    {
      id: "u1",
      name: "Alice Johnson",
      role: "Dispatcher",
      status: "Active",
      email: "alice@example.com",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256&fit=crop",
    },
    {
      id: "u2",
      name: "Bob Smith",
      role: "Driver",
      status: "Inactive",
      email: "bob@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
    },
    {
      id: "u3",
      name: "Carol Lee",
      role: "Customer",
      status: "Active",
      email: "carol@example.com",
      avatar: "https://images.unsplash.com/photo-1545996124-1b8d5b5b6f6d?w=256&h=256&fit=crop",
    },
    {
      id: "u4",
      name: "Daniel Green",
      role: "Admin",
      status: "Active",
      email: "daniel@example.com",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop",
    },
    {
      id: "u5",
      name: "Eve Turner",
      role: "Driver",
      status: "Active",
      email: "eve@example.com",
      avatar: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=256&h=256&fit=crop",
    },
  ];

  const localUsers = users && users.length > 0 ? users : SAMPLE_USERS;
  const [query, setQuery] = useState(searchTerm || "");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(currentPage || 1);
  const effectivePageSize = pageSize || 5;

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
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-100 p-4 dark:border-slate-700">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              className="block w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Search users..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onAddUser()}
              className="inline-flex items-center rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add User
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                <ArrowUpDown className="h-4 w-4 text-slate-500" />
                <span>Sort By</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-100 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  {["name", "role", "status"].map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        handleSort(key);
                        setIsSortOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm capitalize text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
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
        <div className="no-scrollbar flex items-center justify-between overflow-x-auto border-t border-slate-50 pt-4 dark:border-slate-700">
          <div className="flex space-x-8">
            {USER_ROLES.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  onTabChange(tab);
                  setPage(1);
                }}
                className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="min-h-100 flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-700/40 dark:text-slate-300">
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {paged && paged.total > 0 ? (
              paged.items.map((user) => {
                const roleCfg = ROLE_CONFIG[user.role] || {
                  icon: null,
                  iconBg: "",
                  badgeColor: "",
                };

                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                    {/* Role */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`rounded-md p-1.5 ${roleCfg.iconBg}`}>
                          {roleCfg.icon}
                        </div>
                        <span className={`rounded px-2.5 py-0.5 text-[11px] font-bold ${roleCfg.badgeColor}`}>
                          {user.role}
                        </span>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                          {roleCfg.icon}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                        }`}
                      >
                        <span
                          className={`mr-2 h-1.5 w-1.5 rounded-full ${
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
                      <span className="text-sm text-slate-500 dark:text-slate-300">
                        {user.email}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onEditUser(user)}
                        className="inline-flex items-center rounded bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                      >
                        Edit
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-slate-400 dark:text-slate-300">
                  <Search className="mx-auto mb-2 h-10 w-10 opacity-20" />
                  <p>No users found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300 sm:flex-row">
        <p>
          Showing{" "}
          <span className="font-semibold text-slate-700 dark:text-white">
            {paged.total > 0 ? paged.startIndex : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-700 dark:text-white">{paged.endIndex}</span> of{" "}
          <span className="font-semibold text-slate-700 dark:text-white">{paged.total}</span> results
        </p>

        <div className="flex items-center space-x-2">
          <button
            disabled={paged.current === 1}
            onClick={() => handlePageChange(paged.current - 1)}
            className="rounded-lg border p-2 disabled:opacity-30 dark:border-slate-600 dark:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: paged.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`h-8 w-8 rounded-lg ${
                paged.current === p
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={paged.current === paged.pages || paged.pages === 0}
            onClick={() => handlePageChange(paged.current + 1)}
            className="rounded-lg border p-2 disabled:opacity-30 dark:border-slate-600 dark:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};