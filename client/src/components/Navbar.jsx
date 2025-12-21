import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/image.png'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className='bg-white shadow-sm sticky top-0 z-50'>
     <div className='max-w-7x1 mx-auto px-6'>
      <div className='flex justify-between items-center h-16'>
   {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={image}
              alt="SmartCargo Logo"
              className="h-15 w-15"
            />
            <span className="font-bold text-lg text-gray-800">
              Smart<span className="text-blue-600">Cargo</span>
            </span>
          </Link>
          {/* desktop menu */}
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
   
   <button onClick={() => setMenuOpen(!menuOpen)} 
   className="md:hidden text-2xl">
     ☰
   </button>
            
      </div>
     </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py4 space-y-4 shadow-md">
          <Link className="block text-blue-600 hover:text-blue-700" to="#">
            Solutions
          </Link>
          <Link className='block text-blue-700' to="#">
            About Us
          </Link>
          <Link className='block text-blue-700' to="#">
            Contact
          </Link>
          <Link
            to="/login"
            className="block bg-gray-900 text-white px-5 py-2 rounded-full text-center hover:bg-gray-800 transition"
          >
            Log in
          </Link>
        </div>
      )}


    </nav>
  )
}

export default Navbar
