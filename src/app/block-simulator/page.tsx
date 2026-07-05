"use client";

import React, { useState, useEffect } from "react";
import Block from "@/components/Block";
import { calculateHash } from "@/lib/hash";
import { Link, AlertTriangle, CheckCircle, ShieldAlert, Cpu, Settings } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

interface BlockState {
  data: string;
  nonce: number;
  previousHash: string;
  hash: string;
  isValid: boolean;
}

interface TelemetryState {
  attempts?: number;
  time?: number;
}

export default function BlockSimulator() {
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isMining, setIsMining] = useState<"block1" | "block2" | null>(null);
  const [difficulty, setDifficulty] = useState<string>("00");

  const [block1, setBlock1] = useState<BlockState>({
    data: "Arbitrum Builder Pods Assignment 2",
    nonce: 87,
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "",
    isValid: false,
  });

  const [block2, setBlock2] = useState<BlockState>({
    data: "Decentralized scaling with rollup chains",
    nonce: 135,
    previousHash: "",
    hash: "",
    isValid: false,
  });

  // Mining telemetry states
  const [telemetry1, setTelemetry1] = useState<TelemetryState>({});
  const [telemetry2, setTelemetry2] = useState<TelemetryState>({});

  // Recalculates validity based on hash value and current difficulty
  const isHashValid = (h: string, diff: string) => {
    return h.startsWith(diff);
  };

  // Mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Run initial validation cascade ONCE on mount
  useEffect(() => {
    if (!mounted) return;
    
    const initHashes = async () => {
      const b1Hash = await calculateHash(block1.data + block1.nonce + block1.previousHash);
      const b1Valid = isHashValid(b1Hash, difficulty);
      const b2Hash = await calculateHash(block2.data + block2.nonce + b1Hash);
      const b2Valid = isHashValid(b2Hash, difficulty) && b1Valid;

      setBlock1((prev) => ({ ...prev, hash: b1Hash, isValid: b1Valid }));
      setBlock2((prev) => ({ ...prev, previousHash: b1Hash, hash: b2Hash, isValid: b2Valid }));
      setInitialized(true);
    };
    initHashes();
  }, [mounted]);

  // Handler for difficulty adjustments (avoids state loops in useEffect)
  const handleDifficultyChange = async (newDiff: string) => {
    setDifficulty(newDiff);
    
    // Recalculate block validity under the new difficulty
    const b1Hash = await calculateHash(block1.data + block1.nonce + block1.previousHash);
    const b1Valid = isHashValid(b1Hash, newDiff);
    const b2Hash = await calculateHash(block2.data + block2.nonce + b1Hash);
    const b2Valid = isHashValid(b2Hash, newDiff) && b1Valid;

    setBlock1((prev) => ({ ...prev, hash: b1Hash, isValid: b1Valid }));
    setBlock2((prev) => ({ ...prev, previousHash: b1Hash, hash: b2Hash, isValid: b2Valid }));
  };

  // Block 1 state change handlers
  const handleBlock1DataChange = async (val: string) => {
    const newHash = await calculateHash(val + block1.nonce + block1.previousHash);
    const b1Valid = isHashValid(newHash, difficulty);
    setBlock1((prev) => ({ ...prev, data: val, hash: newHash, isValid: b1Valid }));

    // Propagate Block 1's new hash as Block 2's previousHash
    const b2Hash = await calculateHash(block2.data + block2.nonce + newHash);
    setBlock2((prev) => ({
      ...prev,
      previousHash: newHash,
      hash: b2Hash,
      isValid: isHashValid(b2Hash, difficulty) && b1Valid,
    }));
  };

  const handleBlock1NonceChange = async (val: number) => {
    const newHash = await calculateHash(block1.data + val + block1.previousHash);
    const b1Valid = isHashValid(newHash, difficulty);
    setBlock1((prev) => ({ ...prev, nonce: val, hash: newHash, isValid: b1Valid }));

    // Propagate Block 1's new hash as Block 2's previousHash
    const b2Hash = await calculateHash(block2.data + block2.nonce + newHash);
    setBlock2((prev) => ({
      ...prev,
      previousHash: newHash,
      hash: b2Hash,
      isValid: isHashValid(b2Hash, difficulty) && b1Valid,
    }));
  };

  // Block 2 state change handlers
  const handleBlock2DataChange = async (val: string) => {
    const newHash = await calculateHash(val + block2.nonce + block1.hash);
    setBlock2((prev) => ({
      ...prev,
      data: val,
      hash: newHash,
      isValid: isHashValid(newHash, difficulty) && block1.isValid,
    }));
  };

  const handleBlock2NonceChange = async (val: number) => {
    const newHash = await calculateHash(block2.data + val + block1.hash);
    setBlock2((prev) => ({
      ...prev,
      nonce: val,
      hash: newHash,
      isValid: isHashValid(newHash, difficulty) && block1.isValid,
    }));
  };

  // Mining function
  const mineBlock = async (blockId: 1 | 2) => {
    setIsMining(blockId === 1 ? "block1" : "block2");
    
    // Artificial small sleep for animation/UX feel
    await new Promise((resolve) => setTimeout(resolve, 300));

    const startTime = performance.now();
    let currentNonce = 0;
    let currentHash = "";
    const prevHash = blockId === 1 ? block1.previousHash : block1.hash;
    const blockData = blockId === 1 ? block1.data : block2.data;

    while (true) {
      currentHash = await calculateHash(blockData + currentNonce + prevHash);
      if (isHashValid(currentHash, difficulty)) {
        break;
      }
      currentNonce++;
      
      // Safety threshold to prevent browser crash
      if (currentNonce > 500000) {
        break;
      }
    }

    const endTime = performance.now();
    const durationMs = Math.round(endTime - startTime);

    if (blockId === 1) {
      const isB1Valid = isHashValid(currentHash, difficulty);
      setBlock1((prev) => ({
        ...prev,
        nonce: currentNonce,
        hash: currentHash,
        isValid: isB1Valid,
      }));
      setTelemetry1({ attempts: currentNonce + 1, time: durationMs });

      // Cascade recalculate Block 2 with Block 1's new hash
      const b2Hash = await calculateHash(block2.data + block2.nonce + currentHash);
      setBlock2((prev) => ({
        ...prev,
        previousHash: currentHash,
        hash: b2Hash,
        isValid: isHashValid(b2Hash, difficulty) && isB1Valid,
      }));
    } else {
      setBlock2((prev) => ({
        ...prev,
        nonce: currentNonce,
        hash: currentHash,
        isValid: isHashValid(currentHash, difficulty) && block1.isValid,
      }));
      setTelemetry2({ attempts: currentNonce + 1, time: durationMs });
    }
    
    setIsMining(null);
  };

  const isChainBroken = !block1.isValid || !block2.isValid;

  if (!mounted || !initialized) {
    return (
      <div className="py-24 text-center">
        <Cpu className="h-10 w-10 animate-spin text-cyan-500 mx-auto mb-4" />
        <span className="text-slate-400">Initializing Simulator State...</span>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400 mb-4">
            <Link className="h-3.5 w-3.5" />
            <span>Interactive Learning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white select-none leading-none mb-4">
            Blockchain <AuroraText>Immutability Simulator</AuroraText>
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Interact with blocks to see how SHA-256 links data together. Altering any block's content breaks the cryptographic link across all subsequent blocks.
          </p>
        </div>

        {/* Dynamic Simulator Options Configuration (Difficulty Setting) */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl border border-slate-800 bg-slate-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Settings className="h-4.5 w-4.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <h3 className="text-sm font-bold text-slate-200">Simulator Settings</h3>
              <p className="text-xs text-slate-500">Configure mining target difficulty prefix rules.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Prefix:</span>
            <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-1">
              {[
                { label: "Easy (0)", val: "0" },
                { label: "Medium (00)", val: "00" },
                { label: "Hard (000)", val: "000" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleDifficultyChange(opt.val)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    difficulty === opt.val
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Chain Status Alert Banner */}
        <div className="max-w-4xl mx-auto mb-10">
          {isChainBroken ? (
            <div className="flex items-center space-x-3 rounded-2xl border border-rose-500/20 bg-rose-950/10 p-4 text-rose-400 animate-pulse">
              <ShieldAlert className="h-6 w-6 shrink-0 text-rose-500" />
              <div>
                <h3 className="font-bold text-sm">Chain Broken</h3>
                <p className="text-xs text-rose-500/90 mt-0.5">
                  A block's hash does not satisfy the difficulty constraint (must start with '{difficulty}') or Block 2's previous hash link is out of sync. Please mine the blocks sequentially to repair the chain!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4 text-emerald-400">
              <CheckCircle className="h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="font-bold text-sm">Chain Secure</h3>
                <p className="text-xs text-emerald-500/90 mt-0.5">
                  All blocks are valid, and the cryptographic hashes are linked. The data is immutable and secure.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Double-Block Simulator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          {/* Connector line between blocks */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-0">
            <div className={`h-1 w-20 border-t-2 border-dashed ${isChainBroken ? "border-rose-800" : "border-emerald-800"}`} />
          </div>

          <Block
            id={1}
            nonce={block1.nonce}
            data={block1.data}
            previousHash={block1.previousHash}
            hash={block1.hash}
            isValid={block1.isValid}
            isMining={isMining === "block1"}
            onDataChange={handleBlock1DataChange}
            onNonceChange={handleBlock1NonceChange}
            onMine={() => mineBlock(1)}
            miningAttempts={telemetry1.attempts}
            miningTime={telemetry1.time}
          />

          <Block
            id={2}
            nonce={block2.nonce}
            data={block2.data}
            previousHash={block2.previousHash}
            hash={block2.hash}
            isValid={block2.isValid}
            isMining={isMining === "block2"}
            onDataChange={handleBlock2DataChange}
            onNonceChange={handleBlock2NonceChange}
            onMine={() => mineBlock(2)}
            miningAttempts={telemetry2.attempts}
            miningTime={telemetry2.time}
          />
        </div>
      </div>
    </div>
  );
}
