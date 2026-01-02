import React from "react";
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Truck, label: "Fleet Management", active: false },
  { icon: Package, label: "Shipments & Orders", active: false },
  { icon: Users, label: "User Management", active: false },
  { icon: Settings, label: "System Settings", active: false },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#1e3a8a] text-white flex flex-col
          transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo / Header */}
        <div className="p-6 flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-2">
            <Truck className="w-8 h-8 text-blue-300" />
            <span className="font-bold text-lg tracking-tight">
              <Link to="/">SmartCargo</Link>
            </span>
          </div>

          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  item.active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-blue-900/50">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-blue-100 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
