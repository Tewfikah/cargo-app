import React from 'react';
import StatsCard from '../components/StatsCard';

const About = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Decor */}
    
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Visual Collage */}
          <div className="lg:col-span-7 relative">
            <div className="relative z-10 grid grid-cols-2 gap-6">
              
              {/* Floating Stat Card */}
              <div className="absolute -top-12 right-12 z-20 hidden md:block animate-bounce-slow">
                <StatsCard />
              </div>

              {/* Main Image 1 */}
              <div className="mt-12">
                <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-purple-200/50 aspect-[4/5] bg-blue-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                    alt="ዘመናዊ መጋዘን"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Main Image 2 */}
              <div className="relative">
                <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-purple-200/50 aspect-[4/5] bg-blue-200 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=800" 
                    alt="ዲጂታል ሎጂስቲክስ"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay Brand Name */}
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="text-2xl font-bold opacity-30 tracking-widest uppercase">
                    Smart.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="space-y-6">
              <span className="text-blue-500 font-bold tracking-[0.25em] text-sm uppercase">
                አንዳንድ
              </span>
              
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight uppercase">
                About As
              </h2>

              <div className="w-20 h-1.5 bg-blue-500 rounded-full"></div>

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                Smart Cargo ዓለም አቀፍ የአቅርቦት ሰንሰለትን በዘመናዊ አውቶሜሽን
                እና በቀጥታ የመረጃ ትንታኔ በመጠቀም እየቀየረ ይገኛል።
                ከመጓጓዣ እስከ ሙሉ አቅርቦት ድረስ ያለውን ሂደት
                በትክክል በመቆጣጠር እያንዳንዱ ጭነት፣ ፓኬጅ
                እና ንብረት በከፍተኛ ትክክለኛነት እንዲደርስ ያደርጋል።
              </p>

              <div className="pt-8">
                <button className="relative group overflow-hidden">
                  <div className="bg-blue-400 text-white font-bold py-5 px-12 text-sm tracking-widest uppercase rounded-lg shadow-xl shadow-purple-200 transition-all group-hover:bg-blue-600 group-hover:scale-105 group-active:scale-95 flex items-center">
                    ተጨማሪ ይመልከቱ
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Tailwind custom animation */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
