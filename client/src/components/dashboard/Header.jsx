import React from "react";
import {
  Menu,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle (Mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Search (Desktop) */}
        <div className="hidden md:flex relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ጭነቶችን፣ ተሽከርካሪዎችን ይፈልጉ..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 focus:bg-white border border-transparent focus:border-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              ዮሃን አስተዳዳሪ
            </p>
            <p className="text-xs text-gray-500">
              ሲስተም አስተዳዳሪ
            </p>
          </div>

          <img
            src="https://picsum.photos/100"
            alt="User"
            className="w-9 h-9 rounded-full border border-gray-200"
          />

          <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default Header;
