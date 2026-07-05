"use client";

import React, { useState, useEffect } from "react";

const TARGET_HASH = "0000f38b2d6a71e8c9b0e2f5a4d1c3b2";
const HEX_CHARS = "0123456789abcdef";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Web3 node...");
  const [isMounted, setIsMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Staging screens: Portal Screen first, then Loading Screen
  const [showPortal, setShowPortal] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // Real-time scrambled string for unsolved part
  const [scrambleSeed, setScrambleSeed] = useState("");

  // Telemetry stats
  const [blockHeight, setBlockHeight] = useState(18492080);
  const [gasPrice, setGasPrice] = useState(12.4);

  // Scramble the unsolved part of the hash at high speed
  useEffect(() => {
    if (!showLoader) return;
    const scrambleInterval = setInterval(() => {
      let randStr = "";
      for (let i = 0; i < TARGET_HASH.length; i++) {
        randStr += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
      }
      setScrambleSeed(randStr);
    }, 40);

    return () => clearInterval(scrambleInterval);
  }, [showLoader]);

  useEffect(() => {
    // Check if the loader has already been displayed during this session
    const hasLoaded = sessionStorage.getItem("web3_academy_loaded");
    if (hasLoaded === "true") {
      setIsMounted(false);
      setShowPortal(false);
      setShowLoader(false);
      return;
    }

    // Disable body scroll while portal/loading is active
    document.body.style.overflow = "hidden";
  }, []);

  // Handle active loading progress when user explores ecosystem
  useEffect(() => {
    if (!showLoader) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        // Random incremental steps for natural loading feel
        const increment = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    // Randomize telemetry slightly
    const statsInterval = setInterval(() => {
      setBlockHeight((h) => h + (Math.random() > 0.7 ? 1 : 0));
      setGasPrice((g) => +(g + (Math.random() - 0.5) * 0.4).toFixed(1));
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statsInterval);
    };
  }, [showLoader]);

  // Update loading texts and trigger transition when 100% is reached
  useEffect(() => {
    if (!showLoader) return;

    if (progress < 25) {
      setLoadingText("Establishing secure Web3 gateway...");
    } else if (progress < 50) {
      setLoadingText("Syncing Arbitrum Rollup nodes...");
    } else if (progress < 75) {
      setLoadingText("Verifying transaction state trie...");
    } else if (progress < 95) {
      setLoadingText("Rebuilding blockchain state variables...");
    } else if (progress === 100) {
      setLoadingText("Decentralization initialized! Block sealed.");

      const fadeTimeout = setTimeout(() => {
        setFadeOut(true);

        const unmountTimeout = setTimeout(() => {
          setIsMounted(false);
          sessionStorage.setItem("web3_academy_loaded", "true");
          document.body.style.overflow = "";
        }, 600);

        return () => clearTimeout(unmountTimeout);
      }, 850);

      return () => clearTimeout(fadeTimeout);
    }
  }, [progress, showLoader]);

  // Trigger load page progression from portal
  const handleExplore = () => {
    setShowPortal(false);
    setShowLoader(true);
  };

  if (!isMounted) return null;

  // Render Portal Screen (Phase 1)
  if (showPortal) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-center select-none overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[130px] animate-pulse" />
          <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />
        </div>

        {/* Floating cyber particles */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="floating-particle w-1.5 h-1.5" style={{ left: "12%", animationDelay: "0s", animationDuration: "14s" }} />
          <div className="floating-particle w-2 h-2" style={{ left: "35%", animationDelay: "2s", animationDuration: "20s" }} />
          <div className="floating-particle w-1 h-1" style={{ left: "60%", animationDelay: "5s", animationDuration: "16s" }} />
          <div className="floating-particle w-2.5 h-2.5" style={{ left: "85%", animationDelay: "8s", animationDuration: "22s" }} />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl px-6">
          {/* Custom logo symbol from the second photo - slowly presenting */}
          <div className="mb-10 animate-present-logo">
            <svg
              className="h-36 w-36 drop-shadow-[0_0_45px_rgba(255,106,0,0.65)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="portal-logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6a00" />
                  <stop offset="100%" stopColor="#7000ff" />
                </linearGradient>
                <linearGradient id="portal-logo-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffaa00" />
                  <stop offset="100%" stopColor="#ff6a00" />
                </linearGradient>
                <filter id="portal-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Outer Hexagon outline with neon gradient */}
              <polygon
                points="50,6 90,29 90,71 50,94 10,71 10,29"
                stroke="url(#portal-logo-grad-1)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#portal-logo-glow)"
                opacity="0.95"
              />

              {/* Inner isometric block stack */}
              {/* Top Block (L2 Rollup) */}
              <path
                d="M50,22 L75,34 L50,46 L25,34 Z"
                fill="url(#portal-logo-grad-2)"
                opacity="0.9"
              />

              {/* Left Bottom Block (L1 Base) */}
              <path
                d="M25,40 L47,51 L47,76 L25,65 Z"
                fill="url(#portal-logo-grad-1)"
                opacity="0.8"
              />

              {/* Right Bottom Block (Rollup Proof) */}
              <path
                d="M53,51 L75,40 L75,65 L53,76 Z"
                fill="url(#portal-logo-grad-1)"
                opacity="0.95"
              />

              {/* Core glowing node dot in the center */}
              <circle
                cx="50"
                cy="48"
                r="4.5"
                fill="#ffffff"
                filter="url(#portal-logo-glow)"
              />
            </svg>
          </div>

          {/* Title styled matching first photo - slowly presenting after logo */}
          <h1 className="text-5xl sm:text-7xl md:text-8.5xl font-black uppercase bg-gradient-to-r from-[#ff9f00] via-[#ff6a00] to-[#ff3c00] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,106,0,0.65)] tracking-widest mb-16 font-display leading-none select-none animate-present-title">
            Web3Academy
          </h1>

          {/* Launch Academy Button matching Uiverse.io by MuhammadHasann - presenting last */}
          <div className="animate-present-button">
            <button
              onClick={handleExplore}
              className="launch-academy-btn"
            >
              <div className="dots_border"></div>

              {/* Sparkle SVG */}
              <svg
                className="sparkle"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="path"
                  d="M12 2L12.5 8L18 8.5L12.5 9L12 15L11.5 9L6 8.5L11.5 8L12 2Z"
                  fill="currentColor"
                />
                <path
                  className="path"
                  d="M4 14L4.2 16.5L6.7 16.7L4.2 16.9L4 19.4L3.8 16.9L1.3 16.7L3.8 16.5L4 14Z"
                  fill="currentColor"
                />
                <path
                  className="path"
                  d="M19 14L19.2 16.5L21.7 16.7L19.2 16.9L19 19.4L18.8 16.9L16.3 16.7L18.8 16.5L19 14Z"
                  fill="currentColor"
                />
              </svg>

              <span className="text_button">Launch Academy</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate solved/unsolved sections of the hash based on progress
  const solvedCount = Math.floor((progress / 100) * TARGET_HASH.length);
  const solvedPart = TARGET_HASH.slice(0, solvedCount);
  const unsolvedPart = scrambleSeed.slice(solvedCount);

  // Nodes metadata for the blockchain sync display
  const nodes = [
    { label: "GEN", threshold: 0 },
    { label: "L1", threshold: 25 },
    { label: "L2", threshold: 50 },
    { label: "MIP", threshold: 75 },
    { label: "OK", threshold: 100 },
  ];

  // Render preloader screen (Phase 2)
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-all duration-500 ease-in-out ${fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        }`}
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[130px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* Orbit Spinner */}
        <div className="loader-container mb-6">
          <div className="loader-ring ring-1"></div>
          <div className="loader-ring ring-2"></div>
          <div className="loader-ring ring-3"></div>
          <div className="loader-core"></div>
        </div>

        {/* Cryptographic Decrypting Block Hash display */}
        <div className="mb-4 bg-slate-950/80 border border-slate-900 rounded-xl px-5 py-4 shadow-xl backdrop-blur-sm max-w-md">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
            Mining Block Hash
          </div>
          <div className="hash-monospace text-xs md:text-sm break-all font-bold select-none leading-relaxed">
            <span className="text-slate-600">0x</span>
            <span className="hash-solved">{solvedPart}</span>
            <span className="hash-unsolved">{unsolvedPart}</span>
          </div>
        </div>

        {/* Loading Description */}
        <p className="text-cyan-400 text-sm font-semibold tracking-wide h-6 mb-6 transition-all duration-300">
          {loadingText}
        </p>

        {/* Blockchain Node Sync Chain */}
        <div className="sync-chain mb-8">
          {nodes.map((node, index) => {
            const isCompleted = progress > node.threshold || (progress === 100 && node.threshold === 100);
            const isActiveNode =
              !isCompleted &&
              (index === 0 || progress >= nodes[index - 1].threshold) &&
              progress <= node.threshold;

            const isConnectorCompleted =
              index < nodes.length - 1 && progress >= nodes[index + 1].threshold;
            const isConnectorActive =
              index < nodes.length - 1 && !isConnectorCompleted && progress >= node.threshold;

            return (
              <React.Fragment key={node.label}>
                <div
                  className={`sync-node ${isCompleted ? "completed" : ""} ${isActiveNode ? "active" : ""
                    }`}
                  title={node.label}
                >
                  {isActiveNode && <div className="node-ripple" />}
                  <span className="sync-node-inner" />
                  <span className="absolute -bottom-6 text-[9px] font-bold text-slate-600 uppercase">
                    {node.label}
                  </span>
                </div>
                {index < nodes.length - 1 && (
                  <div className={`sync-connector ${isConnectorCompleted ? "completed" : ""}`}>
                    {isConnectorActive && <div className="sync-connector-laser" />}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Telemetry Stats Panel */}
        <div className="grid grid-cols-3 gap-6 border-t border-slate-900 pt-5 mt-4 w-72 text-left">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">Height</span>
            <span className="text-[11px] font-semibold text-slate-300 tabular-nums">
              #{blockHeight.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">Gas Fee</span>
            <span className="text-[11px] font-semibold text-slate-300 tabular-nums">
              {gasPrice} Gwei
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">Network</span>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
