import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Mail, Lock, User } from "lucide-react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="logo" className="h-20" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* Form */}
        <form className="space-y-4">

          {/* Name Input (Only for Sign Up) */}
          {isSignup && (
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4 text-sm">
          {!isSignup ? (
            <>
              <p className="mb-2">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
