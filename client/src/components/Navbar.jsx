import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/image.png'
const Navbar = () => {
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
      </div>
     </div>
    </nav>
  )
}

export default Navbar
