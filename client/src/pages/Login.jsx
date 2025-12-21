import React from "react";
import logo from '../assets/logo.png';
import { Mail, Lock} from "lucide-react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        {/* logo */}
        <div className="text-2xl font-bond  mb-6">
         <img src={logo} alt="" />
        </div>
        {/* Login Form */}
        <form className="space-y-4">
          <div className="relative">
         {/* Email Input */}
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
            {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          </form>
             {/* Forgot Password */}
        <div className="text-center mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
  </div>
    </div>
  );
};

export default Login;
