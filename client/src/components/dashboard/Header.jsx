import React from "react";
import { Menu, Bell, ChevronDown, Search } from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle (Mobile) */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-700 lg:hidden"
        >
          <Menu className="h-6 w-6 text-gray-700 dark:text-slate-200" />
        </button>

        {/* Search (Desktop) */}
        <div className="relative hidden w-80 md:flex">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="ጭነቶችን፣ ተሽከርካሪዎችን ይፈልጉ..."
            className="w-full rounded-xl border border-transparent bg-gray-100 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-700"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-slate-700">
          <Bell className="h-6 w-6 text-gray-600 dark:text-slate-200" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex cursor-pointer items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              ዮሃን አስተዳዳሪ
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-300">
              ሲስተም አስተዳዳሪ
            </p>
          </div>

          <img
            src="https://picsum.photos/100"
            alt="User"
            className="h-9 w-9 rounded-full border border-gray-200 dark:border-slate-600"
          />

          <ChevronDown className="hidden h-4 w-4 text-gray-400 dark:text-slate-400 sm:block" />
        </div>
      </div>
    </header>
  );
};

export default Header;