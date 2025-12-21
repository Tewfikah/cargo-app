import React from 'react'
import hero from '../assets/hero-trucks.jpg'
const Hero = () => {
  return (
   <section className='relative h-[70vh] bg-cover bg-center' >
   <img src={hero} alt="Hero Image" className="absolute inset-0 w-full h-full object-cover object-center" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-blue-800/30"></div>
 {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            Optimize Your Logistics. <br />
            <span className="text-blue-200">Empowering Ethiopia’s Transport</span>
          </h1>
    {/* Button */}
     <div className='mt-8 flex flex-col items-center sm:flex-row gap-4'>
<button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md font-semibold transition shadow-md w-fit">
              Request a Demo
            </button>
            <button className="border border-white text-white px-5 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md w-fit hover:bg-white hover:text-blue-900 transition">
              Learn More
            </button>
     </div>
          </div>
      </div>
   </section>
  )
}

export default Hero
