"use client";

import React, { useState, useEffect } from "react";
import { fetchCryptoPrices } from "@/lib/api";
import { CryptoCoin } from "@/types/crypto";
import CryptoCard from "@/components/CryptoCard";
import { RefreshCw, AlertCircle, Clock, Loader2 } from "lucide-react";

export default function LivePrices() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoPrices();
      setCoins(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err?.message || "Failed to fetch live prices. Please check your network or try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrices();
    // Auto-refresh every 60 seconds
    const interval = setInterval(getPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Live Crypto Prices
            </h1>
            <p className="mt-2 text-slate-400">
              Real-time USD valuation and 24-hour indicators for core decentralized network assets.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {lastUpdated && (
              <div className="flex items-center text-xs text-slate-500 space-x-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  Last updated:{" "}
                  <strong className="text-slate-400">
                    {lastUpdated.toLocaleTimeString()}
                  </strong>
                </span>
              </div>
            )}

            <button
              onClick={getPrices}
              disabled={loading}
              className="uiverse-refresh-btn disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {loading && coins.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center rounded-2xl border border-slate-900 bg-slate-950 p-12">
            <Loader2 className="h-10 w-10 animate-spin text-cyan-500 mb-4" />
            <h3 className="text-slate-200 font-semibold mb-1">Fetching Live Markets</h3>
            <p className="text-xs text-slate-500">Querying CoinGecko api endpoints...</p>
          </div>
        ) : error ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-950/10 p-12 text-center">
            <AlertCircle className="h-12 w-12 text-rose-500 mb-4" />
            <h3 className="text-slate-200 font-semibold mb-2">Market Query Failed</h3>
            <p className="text-sm text-slate-400 max-w-md mb-6">{error}</p>
            <button
              onClick={getPrices}
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-rose-500 hover:bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* If background loading, overlay a small indicator */}
            {loading && (
              <div className="absolute top-2 right-2 flex items-center space-x-1.5 rounded-full bg-slate-900/90 border border-slate-800 px-3 py-1 text-xs text-slate-400 backdrop-blur-sm shadow-md">
                <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                <span>Syncing...</span>
              </div>
            )}
            
            {/* Grid of Coins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coins.map((coin) => (
                <CryptoCard key={coin.id} coin={coin} />
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer card */}
        <div className="mt-12 rounded-2xl border border-slate-900 bg-slate-900/10 p-5 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          Market prices are queried from CoinGecko's public rest API. Rate limits may apply. 
          Auto-refresh checks for updates every 60 seconds.
        </div>
      </div>
    </div>
  );
}
