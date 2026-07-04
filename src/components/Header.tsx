"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Menu, X, Home, BookOpen, Activity, Cpu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Concepts", href: "/concepts", icon: BookOpen },
    { name: "Live Prices", href: "/live-prices", icon: Activity },
    { name: "Block Simulator", href: "/block-simulator", icon: Cpu },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Website Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* 3D Glowing Isometric Block SVG Logo */}
            <svg
              className="h-9 w-9 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6a00" />
                  <stop offset="100%" stopColor="#7000ff" />
                </linearGradient>
                <linearGradient id="logo-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffaa00" />
                  <stop offset="100%" stopColor="#ff6a00" />
                </linearGradient>
                <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Outer Hexagon outline with neon gradient */}
              <polygon
                points="50,6 90,29 90,71 50,94 10,71 10,29"
                stroke="url(#logo-grad-1)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#logo-glow)"
                opacity="0.9"
              />

              {/* Inner isometric block stack */}
              {/* Top Block (L2 Rollup) */}
              <path
                d="M50,22 L75,34 L50,46 L25,34 Z"
                fill="url(#logo-grad-2)"
                opacity="0.9"
              />
              
              {/* Left Bottom Block (L1 Base) */}
              <path
                d="M25,40 L47,51 L47,76 L25,65 Z"
                fill="url(#logo-grad-1)"
                opacity="0.8"
              />

              {/* Right Bottom Block (Rollup Proof) */}
              <path
                d="M53,51 L75,40 L75,65 L53,76 Z"
                fill="url(#logo-grad-1)"
                opacity="0.95"
              />

              {/* Core glowing node dot in the center */}
              <circle
                cx="50"
                cy="48"
                r="4.5"
                fill="#ffffff"
                filter="url(#logo-glow)"
              />
            </svg>
            <span className="text-xl font-bold tracking-wider font-display bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent transition-all duration-300">
              Web3Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`user-profile ${active ? "active" : ""}`}
                >
                  <div className="user-profile-inner">
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg transition-all duration-300">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all ${
                    active
                      ? "bg-slate-900 text-cyan-400 border-l-4 border-cyan-500"
                      : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
