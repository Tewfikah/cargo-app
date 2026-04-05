import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { Mail, Lock, User } from "lucide-react";

const Login = () => {
  const { t } = useTranslation();
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl transition-colors duration-300 dark:bg-slate-800 dark:shadow-black/20">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="logo" className="h-24" />
        </div>

        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
          {isSignup ? t('login.signup') : t('login.login')}
        </h2>

        {/* Form */}
        <form className="space-y-6">
          {/* Name Input (Sign Up only) */}
          {isSignup && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
              <input
                type="text"
                placeholder={t('login.namePlaceholder')}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
            <input
              type="email"
              placeholder={t('login.emailPlaceholder')}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
            <input
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {isSignup ? t('login.register') : t('login.login')}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-base text-slate-600 dark:text-slate-300">
          {!isSignup ? (
            <>
              <p className="mb-2">
                {t('login.noAccount')}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t('login.register')}
                </button>
              </p>
              <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                {t('login.forgot')}
              </a>
            </>
          ) : (
            <p>
              {t('login.haveAccount')}{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {t('login.login')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;