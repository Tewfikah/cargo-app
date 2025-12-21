import React from "react";

import { howItWorksSteps } from "../assets/data/howItWorksData";

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            A simple and transparent process designed to move your cargo
            efficiently from start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-200"></div>

          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white text-2xl">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
