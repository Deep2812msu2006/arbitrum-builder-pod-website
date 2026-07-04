"use client";

import React from "react";
import { Cpu, Lock, Unlock, Hash, Key, BarChart3, Clock } from "lucide-react";

interface BlockProps {
  id: number;
  nonce: number;
  data: string;
  previousHash: string;
  hash: string;
  isValid: boolean;
  isMining: boolean;
  onDataChange: (val: string) => void;
  onNonceChange: (val: number) => void;
  onMine: () => void;
  miningTime?: number;
  miningAttempts?: number;
}

export default function Block({
  id,
  nonce,
  data,
  previousHash,
  hash,
  isValid,
  isMining,
  onDataChange,
  onNonceChange,
  onMine,
  miningTime,
  miningAttempts,
}: BlockProps) {
  return (
    <div
      className={`relative rounded-2xl border bg-slate-900/30 p-6 backdrop-blur-md transition-all duration-500 ${
        isValid
          ? "border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          : "border-rose-500/20 hover:border-rose-500/40 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
      }`}
    >
      {/* Visual background glows for block states */}
      <div
        className={`absolute -inset-px rounded-2xl opacity-10 pointer-events-none transition-opacity duration-300 ${
          isValid
            ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10"
            : "bg-gradient-to-r from-rose-500/10 to-orange-500/10"
        }`}
      />

      <div className="relative z-10 space-y-5">
        {/* Block Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold transition-all duration-300 ${
                isValid
                  ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-400"
                  : "bg-rose-950/40 border-rose-500/25 text-rose-400"
              }`}
            >
              #{id}
            </div>
            <h3 className="font-bold text-slate-100">Block #{id}</h3>
          </div>

          {/* Status Indicators */}
          <div>
            {isValid ? (
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 animate-pulse">
                <Lock className="h-3 w-3" />
                <span>Valid</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-rose-950/50 border border-rose-500/20 px-2.5 py-0.5 text-xs font-semibold text-rose-400">
                <Unlock className="h-3 w-3" />
                <span>Invalid</span>
              </span>
            )}
          </div>
        </div>

        {/* Inputs Group */}
        <div className="space-y-4">
          {/* Data input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Block Data
            </label>
            <textarea
              value={data}
              onChange={(e) => onDataChange(e.target.value)}
              placeholder="Enter transactions or records..."
              disabled={isMining}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-200 placeholder-slate-700 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/10 min-h-[90px] resize-none transition-all"
            />
          </div>

          {/* Nonce input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Nonce
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={nonce}
                onChange={(e) => onNonceChange(parseInt(e.target.value) || 0)}
                disabled={isMining}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm font-mono text-slate-200 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/10"
              />
              <button
                onClick={onMine}
                disabled={isMining}
                className="flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-900 text-slate-950 disabled:text-slate-500 px-4 py-2.5 text-sm font-bold transition-all shadow-md shadow-cyan-500/5 hover:shadow-cyan-500/20 disabled:shadow-none cursor-pointer"
              >
                <Cpu className={`h-4 w-4 ${isMining ? "animate-spin" : ""}`} />
                <span>{isMining ? "Mining..." : "Mine"}</span>
              </button>
            </div>
          </div>

          {/* Previous Hash Display */}
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <Key className="h-3.5 w-3.5 text-slate-500" />
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Previous Hash
              </label>
            </div>
            <div className="w-full rounded-xl border border-slate-800/80 bg-slate-950/40 px-3 py-2 text-xs font-mono text-slate-500 break-all select-all">
              {previousHash || "0000000000000000000000000000000000000000000000000000000000000000"}
            </div>
          </div>

          {/* Current Hash Display */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <Hash className="h-3.5 w-3.5 text-slate-500" />
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Block Hash
                </label>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded transition-colors ${
                  isValid
                    ? "text-emerald-400 bg-emerald-950/20"
                    : "text-rose-400 bg-rose-950/20"
                }`}
              >
                {isValid ? "Hash Valid" : "Hash Invalid"}
              </span>
            </div>
            <div
              className={`w-full rounded-xl border px-3 py-2.5 text-xs font-mono break-all transition-all select-all ${
                isValid
                  ? "bg-emerald-950/15 border-emerald-500/20 text-emerald-400"
                  : "bg-rose-950/10 border-rose-500/10 text-rose-400"
              }`}
            >
              {hash || "Calculating hash..."}
            </div>
          </div>

          {/* Mining Telemetry (New) */}
          {(miningTime !== undefined || miningAttempts !== undefined) && (
            <div className="flex items-center space-x-4 pt-2 text-xs text-slate-500 border-t border-slate-900/60">
              {miningAttempts !== undefined && (
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Attempts: <strong className="text-slate-300 font-medium">{miningAttempts}</strong></span>
                </div>
              )}
              {miningTime !== undefined && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Time: <strong className="text-slate-300 font-medium">{miningTime}ms</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
