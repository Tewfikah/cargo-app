import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { howItWorksSteps } from '../assets/data/howItWorksData.jsx';
import StepCard from './StepCard';

const HowItWorks = () => {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background blobs */}
      <motion.div
        className="absolute top-[-15%] right-[-5%] w-[400px] h-[400px] bg-dodgerblue-100/30 blur-[100px] rounded-full -z-10"
        animate={{ rotate: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-dodgerblue-50/50 blur-[120px] rounded-full -z-10"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-16"
        >
          <span className="text-sm font-bold tracking-wider text-dodgerblue-600 uppercase mb-2 inline-block">
            Workflow Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Shipping cargo with <span className="text-dodgerblue-500">zero friction</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto md:mx-0">
            Fast, secure, and transparent logistics solutions from pickup to delivery.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <StepCard step={step} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-20 p-8 md:p-12 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 bg-dodgerblue-500/10 blur-[60px] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Optimize Your Supply Chain
              </h3>
              <p className="text-base md:text-lg text-slate-300">
                Speak with a logistics specialist today for a customized plan.
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-dodgerblue-500 hover:bg-dodgerblue-400 font-bold rounded-2xl flex items-center gap-2 transition-all"
              >
                Book a Demo
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 font-bold rounded-2xl border border-white/20 transition-all"
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
