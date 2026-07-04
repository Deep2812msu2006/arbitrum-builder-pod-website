import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatusBadgeProps {
  change: number;
}

export default function StatusBadge({ change }: StatusBadgeProps) {
  const isPositive = change >= 0;

  return (
    <span
      className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-1 text-xs font-semibold border ${
        isPositive
          ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/20"
          : "bg-rose-950/30 text-rose-400 border-rose-500/20"
      }`}
    >
      {isPositive ? (
        <>
          <TrendingUp className="h-3 w-3" />
          <span>{change.toFixed(2)}%</span>
        </>
      ) : (
        <>
          <TrendingDown className="h-3 w-3" />
          <span>{change.toFixed(2)}%</span>
        </>
      )}
    </span>
  );
}
