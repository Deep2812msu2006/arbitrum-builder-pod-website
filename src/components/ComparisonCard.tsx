import React from "react";

interface ComparisonCardProps {
  title: string;
  leftTitle: string;
  leftPoints: string[];
  rightTitle: string;
  rightPoints: string[];
  explanation: string;
  icon: React.ReactNode;
}

export default function ComparisonCard({
  title,
  leftTitle,
  leftPoints,
  rightTitle,
  rightPoints,
  explanation,
  icon,
}: ComparisonCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-500/40 opacity-50" />

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-950/40 border border-cyan-500/10 text-cyan-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-100 tracking-tight">{title}</h3>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 pb-5 border-b border-slate-800/80">
        {/* Left Side */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-900/60 relative">
          <div className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">{leftTitle}</div>
          <ul className="space-y-2">
            {leftPoints.map((point, idx) => (
              <li key={idx} className="text-xs text-slate-400 flex items-start space-x-2">
                <span className="text-cyan-500 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-900/20 relative">
          <div className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">{rightTitle}</div>
          <ul className="space-y-2">
            {rightPoints.map((point, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Explanation */}
      <div className="text-sm leading-relaxed text-slate-400">
        <span className="font-semibold text-slate-200">Summary: </span>
        {explanation}
      </div>
    </div>
  );
}
