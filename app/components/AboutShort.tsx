import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Mountain } from "lucide-react";

export default function AboutShort() {
  return (
    <section className="py-24 bg-white overflow-hidden relative" id="about">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#edf7f1] rounded-full opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#f0d49a]/20 rounded-full opacity-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl z-10">
              <Image 
                src="/images/og-image.png" 
                alt="Making bamboo salt"
                fill
                className="object-cover"
              />
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 bg-[#296B46]/10 flex items-center justify-center -z-10">
                <Mountain className="w-24 h-24 text-[#296B46]/20" />
              </div>
            </div>
            {/* Green accent badge */}
            <div className="absolute -bottom-8 -right-8 bg-[#296B46] text-white p-8 rounded-full hidden sm:flex flex-col items-center justify-center shadow-xl w-36 h-36 z-20 border-8 border-white hover:scale-105 transition-transform duration-300">
              <span className="text-3xl font-extrabold pb-1">100%</span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#c6ecd7]">Natural</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#296B46] uppercase mb-4 px-3 py-1 bg-[#edf7f1] rounded-full border border-[#c6ecd7]">
                <Leaf className="w-3.5 h-3.5" />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
                Tradition Meets <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#296B46] to-[#1b4a30]">
                  Himalayan Purity
                </span>
              </h2>
            </div>
            
            <p className="text-lg text-stone-600 leading-relaxed font-medium">
              At <strong className="text-stone-900">Nepal Bamboo Salt Pvt. Ltd.</strong>, we specialize in producing high-quality bamboo salt inspired by traditional Korean methods and adapted with Himalayan purity. 
            </p>
            <p className="text-stone-500 leading-relaxed">
              Our salt is roasted in bamboo at high temperatures, a meticulous process that enhances its mineral content and maximizing detoxifying properties for your ultimate wellness.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 pb-2">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-2xl bg-[#f0d49a]/30 flex items-center justify-center text-[#d4a853] mb-2">
                  <FlameIcon />
                </div>
                <h4 className="font-extrabold text-stone-900">High-Temp Roasting</h4>
                <p className="text-sm text-stone-500">Purifies and strips away impurities completely.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-2xl bg-[#edf7f1] flex items-center justify-center text-[#296B46] mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-stone-900">Mineral Rich</h4>
                <p className="text-sm text-stone-500">Imbued with natural minerals from pure bamboo.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-base font-bold text-[#296B46] hover:text-[#1b4a30] transition-colors group"
              >
                Learn more about our journey
                <div className="w-8 h-8 rounded-full bg-[#edf7f1] flex items-center justify-center group-hover:bg-[#c6ecd7] transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlameIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.25 21c-2.8 0-5.25-2.25-5.25-5.025 0-1.85 1.05-3.5 2.55-4.425.825-.5 1.725-.675 2.625-.75 2.175-.25 3.525-2.125 3.525-4.225 0-1.25-.55-2.425-1.425-3.2-.225-.2-.175-.525.1-.675 1.55-.8 3.5-.6 4.8 1.125 1.775 2.3 1.5 5.75-.6 7.775-.225.225-.375.55-.375.875 0 1.25.75 2.375 1.95 2.825.275.1.35.45.175.65-1.6 1.825-3.925 2.925-6.325 2.925h-.525a4.793 4.793 0 01-1.225 2.15z" />
    </svg>
  );
}
