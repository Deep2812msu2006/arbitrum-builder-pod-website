import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export default function FeatureCard({ title, description, icon, className = "" }: FeatureCardProps) {
  return (
    <div className={`uiverse-card ${className}`}>
      <div className="uiverse-card-inner group">
        {/* Icon wrapper */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-900 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/20 group-hover:bg-cyan-950/20 transition-all duration-300 mb-5">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors duration-300 mb-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-400 flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
}
