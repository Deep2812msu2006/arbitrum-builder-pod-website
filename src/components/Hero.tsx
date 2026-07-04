import React from "react";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center justify-center text-center">
      {/* Visual background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Decorative floating badges */}
      <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs sm:text-sm font-medium text-cyan-400 mb-6 backdrop-blur-sm animate-bounce duration-1000">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Arbitrum Builder Pods 2026</span>
      </div>

      <div className="max-w-4xl px-4 sm:px-6 relative z-10">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Scaling Ethereum{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            Together
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Ethereum's base layer is secure but congested. Layer 2 scaling protocols act as secondary execution environments, bundle transactions, reduce fees, and preserve Ethereum's ultimate security.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-cyan-500/35 active:scale-95 cursor-pointer"
          >
            <span>What is Arbitrum?</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <a
            href="/concepts"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
          >
            <span>Explore Concepts</span>
          </a>
        </div>
      </div>

      {/* Decorative Quick Stats Grid */}
      <div className="mt-16 max-w-5xl w-full px-4 sm:px-6 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 border-t border-slate-900 pt-12 relative z-10">
        <div className="flex flex-col items-center p-4 bg-slate-900/10 rounded-xl border border-slate-900/30">
          <span className="text-2xl sm:text-3xl font-bold text-cyan-400">10x - 100x</span>
          <span className="text-xs sm:text-sm text-slate-500 mt-1">Lower Gas Fees</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-slate-900/10 rounded-xl border border-slate-900/30">
          <span className="text-2xl sm:text-3xl font-bold text-blue-400">Sub-Second</span>
          <span className="text-xs sm:text-sm text-slate-500 mt-1">Tx Confirmation</span>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col items-center p-4 bg-slate-900/10 rounded-xl border border-slate-900/30">
          <span className="text-2xl sm:text-3xl font-bold text-teal-400">100% Secure</span>
          <span className="text-xs sm:text-sm text-slate-500 mt-1">Settled on Ethereum</span>
        </div>
      </div>
    </section>
  );
}
