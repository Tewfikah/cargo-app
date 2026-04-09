import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === "Admin";

  if (location.pathname.startsWith("/dashboard")) return null;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleGoDashboard = () => {
    setMenuOpen(false);
    navigate("/dashboard");
  };

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
                aria-label="Light theme"
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
                aria-label="Dark theme"
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
                aria-label="System theme"
              >
                <Monitor size={18} />
              </button>
            </div>

            {/* Auth Area */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Welcome chip */}
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-slate-500 dark:text-slate-300">
                    Welcome
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {user?.name || "User"}
                  </span>

                  {isAdmin && (
                    <span className="ml-1 rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                      Admin
                    </span>
                  )}
                </div>

                {/* Admin Dashboard Button */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={handleGoDashboard}
                    className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                  >
                    Dashboard
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                {t("navbar.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 text-2xl text-gray-800 dark:text-white md:hidden"
            aria-label="Open menu"
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
              aria-label="Light theme"
            >
              <Sun size={18} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="rounded-xl p-2 text-slate-700 dark:text-white"
              aria-label="Dark theme"
            >
              <Moon size={18} />
            </button>
            <button
              onClick={() => setTheme("system")}
              className="rounded-xl p-2 text-slate-700 dark:text-white"
              aria-label="System theme"
            >
              <Monitor size={18} />
            </button>
          </div>

          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <p className="text-base text-slate-500 dark:text-slate-300">
                  Welcome
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {user?.name || "User"}
                </p>

                {isAdmin && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    Admin
                  </p>
                )}
              </div>

              {/* Admin Dashboard Button (Mobile) */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleGoDashboard}
                  className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700"
                >
                  Dashboard
                </button>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-slate-900 px-6 py-3 text-lg text-white dark:bg-blue-600"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white"
              onClick={() => setMenuOpen(false)}
            >
              {t("navbar.login")}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;