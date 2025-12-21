import React from 'react'

const stats = [
  { value: "50k+", label: "Successful Transportations" },
  { value: "256", label: "Land Freight Routes" },
  { value: "25+", label: "Regions of Operation" },
  { value: "125", label: "Fleet Vehicles" },
];

const Stats = () => {
  return (
  <section className='bg-gradient-to-r from-blue-900 to-blue-800 py-12'>
  <div className='max-w-7xl mx-auto px-6'>
  <div className='grid grid-col-2 md:grid-cols-4 gap-8 text-center'>
 {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl py-6 text-white"
            >
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="mt-2 text-sm text-gray-200">{stat.label}</p>
            </div>
          ))}
  </div>
  </div>
  </section>
  )
}

export default Stats
