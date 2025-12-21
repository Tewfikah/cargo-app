import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/logo.png';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-gray-800">
              Smart<span className="text-blue-600">Cargo</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link className="text-gray-600 hover:text-blue-600" to="#">
              Solutions
            </Link>
            <Link className="text-gray-600 hover:text-blue-600" to="#">
              About Us
            </Link>
            <Link className="text-gray-600 hover:text-blue-600" to="#">
              Contact
            </Link>

            <Link
              to="/login"
              className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl z-50"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-6 z-40">
          <Link
            className="text-2xl font-medium text-gray-800"
            to="#"
            onClick={() => setMenuOpen(false)}
          >
            Solutions
          </Link>
          <Link
            className="text-2xl font-medium text-gray-800"
            to="#"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            className="text-2xl font-medium text-gray-800"
            to="#"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
