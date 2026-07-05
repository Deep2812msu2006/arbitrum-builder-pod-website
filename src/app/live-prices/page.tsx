"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchCryptoPrices, searchCrypto } from "@/lib/api";
import { CryptoCoin, CoinGeckoSearchResult } from "@/types/crypto";
import CryptoCard from "@/components/CryptoCard";
import { RefreshCw, AlertCircle, Clock, Loader2, Search, Plus, X } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DonutChart } from "@/components/DonutChart";

export default function LivePrices() {
  // Core State
  const [trackedIds, setTrackedIds] = useState<string[]>(["bitcoin", "ethereum", "arbitrum", "solana"]);
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CoinGeckoSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPrices = useCallback(async (idsToFetch = trackedIds) => {
    if (idsToFetch.length === 0) {
      setCoins([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoPrices(idsToFetch);
      setCoins(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err?.message || "Failed to fetch live prices. Please check your network or try again.");
    } finally {
      setLoading(false);
    }
  }, [trackedIds]);

  useEffect(() => {
    getPrices();
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => getPrices(), 60000);
    return () => clearInterval(interval);
  }, [getPrices]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(true);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchCrypto(query);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleAddCrypto = (id: string) => {
    if (!trackedIds.includes(id)) {
      const newIds = [...trackedIds, id];
      setTrackedIds(newIds);
      getPrices(newIds);
    }
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleDeleteCrypto = (id: string) => {
    const newIds = trackedIds.filter(tId => tId !== id);
    setTrackedIds(newIds);
    setCoins(coins.filter(c => c.id !== id));
  };

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/15 px-3 py-1 text-[11px] font-bold text-cyan-400 mb-3 tracking-widest uppercase select-none w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Live Market Feed
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white select-none leading-none">
              Live <AuroraText>Crypto Prices</AuroraText>
            </h1>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
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
              onClick={() => getPrices()}
              disabled={loading}
              className="uiverse-refresh-btn disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="mb-10 max-w-xl" ref={searchContainerRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
              placeholder="Search to add cryptocurrency (e.g. Polygon, Chainlink)..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
              </div>
            )}
            
            {/* Search Dropdown */}
            {showDropdown && searchQuery.length >= 2 && (
              <div className="absolute z-50 mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto hide-scrollbar">
                {searchResults.length > 0 ? (
                  <ul className="py-1 text-sm text-slate-300">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <button
                          className="w-full px-4 py-3 hover:bg-slate-800 flex items-center justify-between group transition-colors"
                          onClick={() => handleAddCrypto(result.id)}
                          disabled={trackedIds.includes(result.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <img src={result.thumb} alt={result.name} className="w-6 h-6 rounded-full bg-slate-800" />
                            <div className="flex flex-col items-start">
                              <span className="font-semibold text-slate-200">{result.name}</span>
                              <span className="text-xs text-slate-500 uppercase">{result.symbol}</span>
                            </div>
                          </div>
                          {trackedIds.includes(result.id) ? (
                            <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-1 rounded">Added</span>
                          ) : (
                            <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus className="w-4 h-4" />
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : !isSearching ? (
                  <div className="px-4 py-4 text-sm text-slate-500 text-center">
                    No cryptocurrencies found for "{searchQuery}"
                  </div>
                ) : null}
              </div>
            )}
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
              onClick={() => getPrices()}
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
              <div className="absolute -top-12 right-2 flex items-center space-x-1.5 rounded-full bg-slate-900/90 border border-slate-800 px-3 py-1 text-xs text-slate-400 backdrop-blur-sm shadow-md z-10">
                <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                <span>Syncing...</span>
              </div>
            )}
            
            {coins.length > 0 ? (
              <>
                {/* Charts Section */}
                <div className="flex justify-center mb-12">
                  <div className="uiverse-card w-full max-w-3xl">
                    <div className="uiverse-card-inner flex flex-col items-center justify-center p-8">
                      <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest select-none">
                        Asset Price Share
                      </h3>
                      <DonutChart
                        data={coins}
                        category="name"
                        value="price"
                        valueFormatter={(val) =>
                          `$${Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(val)}`
                        }
                      />
                    </div>
                  </div>
                </div>
                
                {/* Grid of Coins */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coins.map((coin) => (
                    <CryptoCard key={coin.id} coin={coin} onDelete={handleDeleteCrypto} />
                  ))}
                </div>
              </>
            ) : (
              <div className="min-h-[200px] flex flex-col items-center justify-center rounded-2xl border border-slate-900 border-dashed bg-slate-900/10 p-12 text-center">
                <Search className="h-8 w-8 text-slate-600 mb-4" />
                <h3 className="text-slate-300 font-semibold mb-2">No Cryptocurrencies Tracked</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  Use the search bar above to add your favorite coins to the live tracker.
                </p>
              </div>
            )}
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
