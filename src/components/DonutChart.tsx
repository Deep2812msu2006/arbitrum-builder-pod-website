"use client";

import React, { useState } from "react";

interface DonutChartProps {
  data: any[];
  category: string;
  value: string;
  variant?: "donut" | "pie";
  valueFormatter?: (value: number) => string;
  className?: string;
}

const defaultColors = [
  "#ff6a00", // Neon Orange (BTC / primary)
  "#a200ff", // Purple (ETH / secondary)
  "#ffaa00", // Amber Gold (ARB / accent)
  "#ffd000", // Yellow Gold (SOL)
  "#7000ff", // Deep Purple
  "#00f0ff", // Cyber Cyan
  "#ec4899", // Neon Pink
];

// Helper to calculate coordinates for SVG paths
const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
};

const getPieSlicePath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  if (endAngle - startAngle >= 360) {
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
  }
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
};

export const DonutChart = ({
  data,
  category,
  value,
  variant = "donut",
  valueFormatter = (val) => val.toString(),
  className = "",
}: DonutChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((acc, item) => acc + (Number(item[value]) || 0), 0);

  // Generate slice angles
  let accumulatedAngle = 0;
  const slices = data.map((item, index) => {
    const valAmount = Number(item[value]) || 0;
    const percentage = total > 0 ? valAmount / total : 0;
    const angleRange = percentage * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angleRange;
    accumulatedAngle = endAngle;

    return {
      item,
      startAngle,
      endAngle,
      percentage,
      color: defaultColors[index % defaultColors.length],
    };
  });

  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 10;
  const hoveredItem = hoveredIndex !== null ? slices[hoveredIndex] : null;

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-8 ${className}`}>
      {/* Chart SVG wrapper */}
      <div className="relative w-48 h-48 select-none shrink-0">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full transform -rotate-90"
        >
          {/* Mask for Donut Hole */}
          {variant === "donut" && (
            <defs>
              <mask id="donut-hole">
                <rect x="0" y="0" width={size} height={size} fill="white" />
                <circle cx={center} cy={center} r={radius - 24} fill="black" />
              </mask>
            </defs>
          )}

          {/* Slices group */}
          <g mask={variant === "donut" ? "url(#donut-hole)" : undefined}>
            {slices.map((slice, index) => {
              const isHovered = hoveredIndex === index;
              const pathD = getPieSlicePath(center, center, radius, slice.startAngle, slice.endAngle);

              return (
                <path
                  key={index}
                  d={pathD}
                  fill={slice.color}
                  className="transition-all duration-300 cursor-pointer origin-center"
                  style={{
                    opacity: hoveredIndex === null || isHovered ? 1 : 0.4,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </g>

          {/* Central Border Ring to make it look futuristic */}
          {variant === "donut" && (
            <circle
              cx={center}
              cy={center}
              r={radius - 24}
              fill="none"
              stroke="#1b1b1b"
              strokeWidth="1"
              className="opacity-60"
            />
          )}
        </svg>

        {/* Center Text Panel for Donut */}
        {variant === "donut" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">
              {hoveredItem ? hoveredItem.item[category] : "Total"}
            </span>
            <span className="text-sm font-black text-slate-100 font-display mt-0.5 tracking-tight break-all">
              {valueFormatter(hoveredItem ? Number(hoveredItem.item[value]) : total)}
            </span>
            {hoveredItem && (
              <span className="text-[9px] font-semibold text-cyan-400 mt-0.5">
                {(hoveredItem.percentage * 100).toFixed(1)}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Responsive Custom Legend Panel */}
      <div className="flex flex-col gap-3 min-w-[160px]">
        {slices.map((slice, index) => {
          const isHovered = hoveredIndex === index;
          const formattedVal = valueFormatter(Number(slice.item[value]));

          return (
            <div
              key={index}
              className={`flex items-center gap-3.5 px-3 py-2 rounded-xl border border-transparent transition-all duration-200 cursor-pointer ${
                isHovered
                  ? "bg-slate-900/60 border-slate-800 shadow-md scale-[1.02]"
                  : "hover:bg-slate-900/20"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Color Marker */}
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: slice.color,
                  boxShadow: `0 0 8px ${slice.color}`,
                }}
              />

              {/* Text metadata */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-200 truncate">
                  {slice.item[category]}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 font-mono mt-0.5">
                  {formattedVal} ({ (slice.percentage * 100).toFixed(1) }%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
