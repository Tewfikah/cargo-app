import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            Smart Transport
          </Link>
          {/* Navigation Links */}
          <div className='hidden md:flex items-center space-x-6'>
       <Link to="/" className='text-gray-700 hover:text-blue-600'>
          Home
       </Link>
      </div>
    </div>
   </div>
    </nav>
  )
}

export default Navbar
