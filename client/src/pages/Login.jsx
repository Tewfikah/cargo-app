import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Mail, Lock, User } from "lucide-react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white p-10 rounded-2xl shadow-md w-96">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="logo" className="h-24" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* Form */}
        <form className="space-y-6">

          {/* Name Input (Sign Up only) */}
          {isSignup && (
            <div className="relative">
              <User className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ሙሉ ስም"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <Mail className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="ኢሜይል"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="የሚስጥር ቁልፍ"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-6 text-base">
          {!isSignup ? (
            <>
              <p className="mb-2">
                አካውንት የለዎትም?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-blue-600 hover:underline"
                >
                  ይመዝገቡ
                </button>
              </p>
              <a href="#" className="text-blue-600 hover:underline">
                የሚስጥር ቁልፍ ረሱ?
              </a>
            </>
          ) : (
            <p>
              አካውንት አለዎት?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-blue-600 hover:underline"
              >
                ግባ
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
