import React from "react";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 py-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Branding & Course Name */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-slate-300">
              Arbitrum Builder Pods Assignment 2026
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Building the future of scaling, education, and decentralization.
            </p>
          </div>

          {/* Right: Author & GitHub Profile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 text-sm">
            <span className="text-slate-400">
              Developed by <strong className="text-slate-200 font-medium">Deep Jaiswal</strong>
            </span>
            <a
              href="https://github.com/deepjaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 transition-colors duration-150 group"
            >
              <svg className="h-4 w-4 text-cyan-400 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub Profile</span>
              <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Bottom border & copyright info */}
        <div className="mt-6 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Web3Academy. All rights reserved. Built with Next.js and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
