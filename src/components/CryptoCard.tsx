import React from "react";
import { CryptoCoin } from "@/types/crypto";
import StatusBadge from "./StatusBadge";
import { X } from "lucide-react";

interface CryptoCardProps {
  coin: CryptoCoin;
  onDelete?: (id: string) => void;
}

export default function CryptoCard({ coin, onDelete }: CryptoCardProps) {
  const isPositive = coin.change24h >= 0;

  // Custom premium SVG tokens for logos
  const renderLogo = () => {
    if (coin.imageUrl) {
      return (
        <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center p-0.5">
          <img src={coin.imageUrl} alt={coin.name} className="h-full w-full object-contain rounded-full" />
        </div>
      );
    }

    switch (coin.symbol) {
      case "BTC":
        return (
          <svg className="h-10 w-10 text-amber-500" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="16" cy="16" r="16" fill="#F7931A" />
            <path
              d="M22.5 14.5c.3-2.1-1.3-3.2-3.5-4l.7-2.9-1.8-.4-.7 2.8c-.5-.1-1-.2-1.5-.3l.7-2.9-1.8-.4-.7 2.9c-.4-.1-.8-.1-1.2-.2l.01-.04-2.5-.6-.5 2 1.3.3c.7.2.9.6.9 1.2l-.9 3.6c.1 0 .2.1.3.1l.9 3.6c.1.5-.1.9-.8.7l-1.3-.3-.9 3.7 2.5.6c.5.1.9.2 1.4.3l-.7 3 1.8.4.7-2.9c.5.1 1 .2 1.5.2l-.7 2.9 1.8.4.7-2.9c3.1.6 5.4.4 6.4-2.5.8-2.3-.1-3.6-1.7-4.4 1.2-.3 2.1-1.1 2.3-2.9zm-4.1 6.3c-.6 2.3-4.4 1-5.6.8l1-4c1.2.3 5.2.9 4.6 3.2zm.6-6.4c-.5 2.1-3.7 1-4.7.8l.9-3.7c1 .2 4.3.7 3.8 2.9z"
              fill="white"
            />
          </svg>
        );
      case "ETH":
        return (
          <svg className="h-10 w-10 text-indigo-400" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#627EEA" />
            <path d="M16 4.5v9.88L22.99 11 16 4.5z" fill="white" fillOpacity="0.75" />
            <path d="M16 4.5L9 11l6.99 3.38V4.5z" fill="white" />
            <path d="M16 23.36l6.99-4.11L16 16.03v7.33z" fill="white" fillOpacity="0.75" />
            <path d="M16 23.36V16.03L9 19.25l7 4.11z" fill="white" />
            <path d="M16 15.17l6.99-3.29L16 11v4.17z" fill="white" fillOpacity="0.5" />
            <path d="M16 15.17V11L9 11.88l7 3.29z" fill="white" fillOpacity="0.75" />
          </svg>
        );
      case "ARB":
        return (
          <svg className="h-10 w-10 text-cyan-400" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#28A0F0" />
            <path
              d="M16 6.5L8.5 15.5l3.5 1.5L16 13.5l4 3.5 3.5-1.5L16 6.5z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M16 13.5l-4 3.5 4 4.5 4-4.5-4-3.5z"
              fill="white"
              fillOpacity="0.6"
            />
            <path
              d="M16 21.5l-7.5-3.5L16 25.5l7.5-7.5-7.5 3.5z"
              fill="white"
              fillOpacity="0.8"
            />
          </svg>
        );
      case "SOL":
        return (
          <svg className="h-10 w-10" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#141414" />
            <defs>
              <linearGradient id="solGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9945FF" />
                <stop offset="100%" stopColor="#14F195" />
              </linearGradient>
            </defs>
            <path
              d="M7.8 8.6h16.4l-2.4 2.4H5.4l2.4-2.4zm0 6.4h16.4l-2.4 2.4H5.4l2.4-2.4zm11 6.4H2.4l2.4-2.4h16.4l-2.4 2.4z"
              fill="url(#solGrad)"
            />
          </svg>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs">
            {coin.symbol}
          </div>
        );
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-cyan-500/5">
      {/* Decorative hover light */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

      {/* Delete button (shows on hover) */}
      {onDelete && (
        <button
          onClick={() => onDelete(coin.id)}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-rose-400 hover:border-rose-500/30 transition-all duration-200 shadow-md"
          title="Remove crypto"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <div className="relative z-10 flex flex-col h-full mt-1">
        {/* Header: Logo & Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {renderLogo()}
            <div className="pr-6">
              <h3 className="font-bold text-slate-100 truncate max-w-[120px]">{coin.name}</h3>
              <span className="text-xs font-semibold text-slate-500 uppercase">{coin.symbol}</span>
            </div>
          </div>

          {/* Up/Down direction badge specifically requested in requirements */}
          {isPositive ? (
            <span className="inline-flex items-center rounded-md bg-emerald-950/40 px-2 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              ↑ Positive
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-rose-950/40 px-2 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20">
              ↓ Negative
            </span>
          )}
        </div>

        {/* Price & Trend row */}
        <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
          <div className="text-2xl font-bold tracking-tight text-white">
            ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </div>
          <StatusBadge change={coin.change24h} />
        </div>
      </div>
    </div>
  );
}
