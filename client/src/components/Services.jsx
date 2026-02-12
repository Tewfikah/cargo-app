import React from 'react'
import { services } from '../assets/data/servicesData'

const Services = () => {
  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section Header */}
        <div className='text-center mb-14'>
          <span className="text-blue-500 font-semibold uppercase text-2xl">
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            የተለያዩ የሎጂስቲክስ አገልግሎቶች
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            SmartCargo የመጓጓዣ ስርዓቶችን እና የጭነት አስተዳደርን ለማሻሻል የተነደፉ
            ዘመናዊ ዲጂታል የሎጂስቲክስ መፍትሄዎችን ከመጀመሪያ እስከ መጨረሻ ይሰጣል።
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
