"use client";

import React, { useState, useEffect } from "react";
import Block from "@/components/Block";
import { calculateHash } from "@/lib/hash";
import { Link, AlertTriangle, CheckCircle, ShieldAlert, Cpu, Settings, Plus } from "lucide-react";
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
  const [isMining, setIsMining] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string>("00");

  const [blocks, setBlocks] = useState<BlockState[]>([
    {
      data: "Arbitrum Builder Pods Assignment 2",
      nonce: 87,
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: "",
      isValid: false,
    },
    {
      data: "Decentralized scaling with rollup chains",
      nonce: 135,
      previousHash: "",
      hash: "",
      isValid: false,
    },
    {
      data: "Layer 2 solutions reduce transaction costs",
      nonce: 42,
      previousHash: "",
      hash: "",
      isValid: false,
    }
  ]);

  const [telemetries, setTelemetries] = useState<TelemetryState[]>([{}, {}, {}]);

  // Recalculates validity based on hash value and current difficulty
  const isHashValid = (h: string, diff: string) => {
    return h.startsWith(diff);
  };

  const cascadeUpdate = async (currentBlocks: BlockState[], startIndex: number, diff: string) => {
    const newBlocks = [...currentBlocks];
    for (let i = startIndex; i < newBlocks.length; i++) {
      const prevHash = i === 0 ? "0000000000000000000000000000000000000000000000000000000000000000" : newBlocks[i - 1].hash;
      newBlocks[i].previousHash = prevHash;
      const h = await calculateHash(newBlocks[i].data + newBlocks[i].nonce + prevHash);
      newBlocks[i].hash = h;
      const isPrevValid = i === 0 ? true : newBlocks[i - 1].isValid;
      newBlocks[i].isValid = isHashValid(h, diff) && isPrevValid;
    }
    return newBlocks;
  };

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Run initial validation cascade ONCE on mount
  useEffect(() => {
    if (!mounted) return;
    
    const initHashes = async () => {
      const newBlocks = await cascadeUpdate(blocks, 0, difficulty);
      setBlocks(newBlocks);
      setInitialized(true);
    };
    initHashes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Handler for difficulty adjustments
  const handleDifficultyChange = async (newDiff: string) => {
    setDifficulty(newDiff);
    const newBlocks = await cascadeUpdate(blocks, 0, newDiff);
    setBlocks(newBlocks);
  };

  const handleDataChange = async (index: number, val: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].data = val;
    const cascadedBlocks = await cascadeUpdate(newBlocks, index, difficulty);
    setBlocks(cascadedBlocks);
  };

  const handleNonceChange = async (index: number, val: number) => {
    const newBlocks = [...blocks];
    newBlocks[index].nonce = val;
    const cascadedBlocks = await cascadeUpdate(newBlocks, index, difficulty);
    setBlocks(cascadedBlocks);
  };

  const addBlock = async () => {
    const newBlock: BlockState = {
      data: "New block data...",
      nonce: 0,
      previousHash: "",
      hash: "",
      isValid: false,
    };
    const newBlocks = [...blocks, newBlock];
    setTelemetries([...telemetries, {}]);
    const cascadedBlocks = await cascadeUpdate(newBlocks, newBlocks.length - 1, difficulty);
    setBlocks(cascadedBlocks);
    
    // Smooth scroll to the end of the container after state update
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Mining function
  const mineBlock = async (index: number) => {
    setIsMining(index);
    
    // Artificial small sleep for animation/UX feel
    await new Promise((resolve) => setTimeout(resolve, 300));

    const startTime = performance.now();
    let currentNonce = 0;
    let currentHash = "";
    const prevHash = index === 0 ? "0000000000000000000000000000000000000000000000000000000000000000" : blocks[index - 1].hash;
    const blockData = blocks[index].data;

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

    const newBlocks = [...blocks];
    newBlocks[index].nonce = currentNonce;
    
    const cascadedBlocks = await cascadeUpdate(newBlocks, index, difficulty);
    setBlocks(cascadedBlocks);

    const newTelemetries = [...telemetries];
    newTelemetries[index] = { attempts: currentNonce + 1, time: durationMs };
    setTelemetries(newTelemetries);
    
    setIsMining(null);
  };

  const isChainBroken = !blocks.every(b => b.isValid);

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

        {/* Dynamic Simulator Options Configuration (Difficulty Setting) & Add Block */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl border border-slate-800 bg-slate-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Settings className="h-4.5 w-4.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <h3 className="text-sm font-bold text-slate-200">Simulator Settings</h3>
              <p className="text-xs text-slate-500">Configure mining target difficulty prefix rules.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-end">
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

            <button
              onClick={addBlock}
              className="inline-flex items-center space-x-2 rounded-lg bg-cyan-600/20 px-4 py-2 text-sm font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 hover:border-cyan-500/50 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Block</span>
            </button>
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
                  A block's hash does not satisfy the difficulty constraint (must start with '{difficulty}') or the previous hash link is out of sync. Please mine the blocks sequentially to repair the chain!
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

        {/* Simulator layout */}
        <div 
          ref={scrollContainerRef}
          className="flex flex-col lg:flex-row gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        >
          {blocks.map((block, index) => (
            <div key={index} className="relative w-full md:w-[420px] lg:w-[460px] shrink-0 snap-center">
              {/* Connector line for desktop (horizontal) */}
              {index > 0 && (
                <div className="absolute top-1/2 left-0 -translate-x-full hidden lg:flex items-center justify-center z-0 w-8">
                  <div className={`h-1 w-full border-t-2 border-dashed ${isChainBroken ? "border-rose-800" : "border-emerald-800"}`} />
                </div>
              )}
              {/* Connector line for mobile (vertical) */}
              {index > 0 && (
                <div className="absolute top-0 left-1/2 -translate-y-full lg:hidden flex flex-col items-center justify-center z-0 h-8">
                  <div className={`h-full w-1 border-l-2 border-dashed ${isChainBroken ? "border-rose-800" : "border-emerald-800"}`} />
                </div>
              )}
              
              <Block
                id={index + 1}
                nonce={block.nonce}
                data={block.data}
                previousHash={block.previousHash}
                hash={block.hash}
                isValid={block.isValid}
                isMining={isMining === index}
                onDataChange={(val) => handleDataChange(index, val)}
                onNonceChange={(val) => handleNonceChange(index, val)}
                onMine={() => mineBlock(index)}
                miningAttempts={telemetries[index]?.attempts}
                miningTime={telemetries[index]?.time}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

