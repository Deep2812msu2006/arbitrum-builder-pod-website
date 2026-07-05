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
        {/* Cosmic Starfield and Aurora Nebula Background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-cosmic-radial">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />

          {/* Technic Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0" />
          
          {/* Animated Nebula Glows */}
          <div className="absolute -top-[20%] -left-[20%] h-[80%] w-[80%] rounded-full aurora-glow-1 blur-[120px] z-1 opacity-70" />
          <div className="absolute top-[30%] right-[-10%] h-[70%] w-[70%] rounded-full aurora-glow-2 blur-[120px] z-1 opacity-70" />
          <div className="absolute bottom-[-10%] left-[10%] h-[60%] w-[60%] rounded-full aurora-glow-3 blur-[120px] z-1 opacity-70" />
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
