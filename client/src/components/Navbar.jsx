import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../ThemeContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-transparent bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-12 w-12" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Smart<span className="text-blue-600">Cargo</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              className="text-gray-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              to="/about"
            >
              {t("navbar.about")}
            </Link>

            <Link
              className="text-gray-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              to="/contact"
            >
              {t("navbar.contact")}
            </Link>

            {/* Theme Toggle */}
            <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={() => setTheme("light")}
                className={`rounded-xl p-2 transition ${
                  theme === "light"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <Sun size={18} />
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`rounded-xl p-2 transition ${
                  theme === "dark"
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <Moon size={18} />
              </button>

              <button
                onClick={() => setTheme("system")}
                className={`rounded-xl p-2 transition ${
                  theme === "system"
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <Monitor size={18} />
              </button>
            </div>

            <Link
              to="/login"
              className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              {t("navbar.login")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 text-2xl text-gray-800 dark:text-white md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 bg-white/95 dark:bg-slate-900/95 md:hidden">
          <Link
            className="text-2xl font-medium text-gray-800 dark:text-white"
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.about")}
          </Link>

          <Link
            className="text-2xl font-medium text-gray-800 dark:text-white"
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.contact")}
          </Link>

          <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={() => setTheme("light")}
              className="rounded-xl p-2 text-slate-700 dark:text-white"
            >
              <Sun size={18} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="rounded-xl p-2 text-slate-700 dark:text-white"
            >
              <Moon size={18} />
            </button>
            <button
              onClick={() => setTheme("system")}
              className="rounded-xl p-2 text-slate-700 dark:text-white"
            >
              <Monitor size={18} />
            </button>
          </div>

          <Link
            to="/login"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white"
            onClick={() => setMenuOpen(false)}
          >
            {t("navbar.login")}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;