import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Web3Academy | Scaling Ethereum & Blockchain Simulator",
  description: "An educational Web3 assignment website featuring Ethereum scaling concepts, live crypto prices, and an interactive block simulator demonstrating immutability.",
  keywords: ["Web3", "Ethereum", "Arbitrum", "Layer 2", "Blockchain Simulator", "Optimistic Rollups", "Crypto Prices"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <LoadingScreen />
        {/* Enhanced attractive Web3 background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950">
          {/* Technic Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.85] z-0" />
          
          {/* Animated Aurora Glows */}
          <div className="absolute -top-[20%] -left-[20%] h-[80%] w-[80%] rounded-full aurora-glow-1 blur-[120px] z-1" />
          <div className="absolute top-[30%] right-[-10%] h-[70%] w-[70%] rounded-full aurora-glow-2 blur-[120px] z-1" />
          <div className="absolute bottom-[-10%] left-[10%] h-[60%] w-[60%] rounded-full aurora-glow-3 blur-[120px] z-1" />

          {/* Floating cyber particles */}
          <div className="floating-particle w-12 h-12" style={{ left: "15%", animationDelay: "0s", animationDuration: "18s" }} />
          <div className="floating-particle w-16 h-16" style={{ left: "45%", animationDelay: "3s", animationDuration: "25s" }} />
          <div className="floating-particle w-8 h-8" style={{ left: "75%", animationDelay: "7s", animationDuration: "15s" }} />
          <div className="floating-particle w-14 h-14" style={{ left: "90%", animationDelay: "11s", animationDuration: "22s" }} />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
