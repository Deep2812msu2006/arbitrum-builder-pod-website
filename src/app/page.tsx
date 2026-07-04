"use client";

import React, { useRef, useState, useEffect } from "react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Coins, Zap, Layers, Shield, Cpu, Code, ArrowRight, Wallet, HelpCircle, Gift, Sparkles, Check, Hourglass, Activity, Link2 } from "lucide-react";
import { calculateHash } from "@/lib/hash";

interface MockNFT {
  id: number;
  name: string;
  txHash: string;
  timestamp: string;
}

interface TxRecord {
  id: number;
  action: string;
  gas: string;
  txHash: string;
  type: "L1" | "L2";
}

export default function Home() {
  const detailRef = useRef<HTMLDivElement>(null);

  // Hydration safety mount state
  const [mounted, setMounted] = useState(false);

  // Web3 Mock Wallet Simulator states
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [arbBalance, setArbBalance] = useState(0.0);
  const [ethBalance, setEthBalance] = useState(0.0);
  const [nfts, setNfts] = useState<MockNFT[]>([]);
  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [isFauceting, setIsFauceting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToDetail = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleConnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setArbBalance(5.0);
      setEthBalance(0.02);
      setTxHistory([
        {
          id: 1,
          action: "Simulated L1 Swap (Uniswap)",
          gas: "0.015 ETH (~$52.30)",
          txHash: "0xf8a2b53...918d",
          type: "L1",
        },
        {
          id: 2,
          action: "Simulated L2 Swap (Arbitrum)",
          gas: "0.00004 ETH (~$0.14)",
          txHash: "0x289ac12...fa59",
          type: "L2",
        },
      ]);
    }, 1000);
  };

  const handleRequestFaucet = () => {
    setIsFauceting(true);
    setTimeout(() => {
      setArbBalance((prev) => prev + 15.0);
      setEthBalance((prev) => prev + 0.05);
      setIsFauceting(false);
    }, 800);
  };

  const handleMintNFT = async () => {
    if (arbBalance < 2.0) {
      alert("Insufficient ARB balance to cover gas fees! Request faucet tokens first.");
      return;
    }
    setIsMinting(true);

    const rawTxPayload = `mint-nft-${nfts.length}-${Date.now()}`;
    const txHashHex = await calculateHash(rawTxPayload);
    const croppedHash = `0x${txHashHex.substring(0, 8)}...${txHashHex.substring(56)}`;

    setTimeout(() => {
      setArbBalance((prev) => Math.max(0, prev - 1.5));
      const newNft: MockNFT = {
        id: nfts.length + 1,
        name: `Arbitrum Pod NFT #${nfts.length + 101}`,
        txHash: `0x${txHashHex.substring(0, 16)}...`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setNfts((prev) => [newNft, ...prev]);

      const newTx: TxRecord = {
        id: txHistory.length + 1,
        action: `Minted NFT #${nfts.length + 101}`,
        gas: "0.0001 ETH (~$0.35)",
        txHash: croppedHash,
        type: "L2",
      };
      setTxHistory((prev) => [newTx, ...prev]);
      setIsMinting(false);
    }, 1200);
  };

  const features = [
    {
      title: "Ethereum Gas Fees",
      description:
        "Ethereum L1 handles transactions sequentially, causing network congestion. This results in bidding wars, spiking gas fees, and pricing out everyday users.",
      icon: <Coins className="h-6 w-6" />,
    },
    {
      title: "Layer 2 Scaling",
      description:
        "L2 execution environments sit on top of Ethereum, handling transactions off-chain. By batching thousands of transactions, they scale throughput dramatically.",
      icon: <Layers className="h-6 w-6" />,
    },
    {
      title: "Optimistic Rollups",
      description:
        "Optimistic Rollups assume transactions are valid by default. A challenge window allows validators to submit fraud proofs to dispute and revert bad updates.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Inherited Security",
      description:
        "Layer 2 protocols do not sacrifice security. By posting transaction data directly to Ethereum Layer 1, they inherit L1's robust consensus security.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Zero-Knowledge Rollups",
      description:
        "ZK-Rollups run execution off-chain and submit cryptographic validity proofs (ZK-SNARKs) to L1, offering instant finality and advanced privacy.",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "State Channels",
      description:
        "State Channels allow participants to execute infinite transactions off-chain instantly, only submitting the opening/closing balances to the mainnet.",
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: "EVM Compatibility",
      description:
        "EVM compatibility ensures developers can port existing Solidity smart contracts to Layer 2 setups seamlessly without altering their source code.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Sidechains & Bridges",
      description:
        "Sidechains run parallel to Ethereum. Safe bridge smart contracts lock assets on L1 to mint corresponding wrapped tokens on L2.",
      icon: <Link2 className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <Hero onCtaClick={scrollToDetail} />

      {/* Interactive Web3 Wallet Sandbox Faucet Simulator */}
      <section className="py-16 md:py-20 border-t border-slate-900 bg-slate-950/40 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400 mb-4">
              <Wallet className="h-3.5 w-3.5" />
              <span>Interactive Sandbox</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Web3 Wallet Sandbox
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Connect a mock wallet, request testnet faucet tokens, and mint a mock NFT to experience the speed and low cost of Layer 2 transactions.
            </p>
          </div>

          {!mounted ? (
            <div className="max-w-6xl mx-auto h-[400px] border border-slate-900 bg-slate-900/10 rounded-2xl flex items-center justify-center text-slate-500 text-sm">
              <Wallet className="h-5 w-5 animate-pulse mr-2" />
              <span>Loading Wallet Sandbox Environment...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
              {/* Left Box: Wallet panel */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-9 w-9 rounded-lg bg-cyan-950/30 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-200">Simulator Wallet</h3>
                        <p className="text-xs text-slate-500">
                          {isConnected ? "Address: 0x6b9d...f021" : "Wallet Disconnected"}
                        </p>
                      </div>
                    </div>

                    {!isConnected ? (
                      <button
                        onClick={handleConnectWallet}
                        disabled={isConnecting}
                        className="inline-flex items-center space-x-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-800 text-slate-950 px-4 py-2 text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        {isConnecting ? (
                          <>
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <span>Connect Wallet</span>
                        )}
                      </button>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                        <span>Connected</span>
                      </span>
                    )}
                  </div>

                  {/* Balances Display */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850/80">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        ARB Balance (L2)
                      </span>
                      <span className="text-2xl font-black text-cyan-400">
                        {arbBalance.toFixed(2)} <span className="text-xs font-normal text-slate-400">ARB</span>
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850/80">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        ETH Balance
                      </span>
                      <span className="text-2xl font-black text-blue-400">
                        {ethBalance.toFixed(4)} <span className="text-xs font-normal text-slate-400">ETH</span>
                      </span>
                    </div>
                  </div>

                  {/* Active Interactive Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRequestFaucet}
                      disabled={!isConnected || isFauceting}
                      className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-40 px-4 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-all disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Gift className="h-4.5 w-4.5 text-cyan-400" />
                      <span>{isFauceting ? "Claiming..." : "Claim Faucet (+15 ARB)"}</span>
                    </button>

                    <button
                      onClick={handleMintNFT}
                      disabled={!isConnected || isMinting}
                      className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-900 text-slate-950 disabled:text-slate-500 px-4 py-3 text-sm font-bold transition-all disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Sparkles className="h-4.5 w-4.5" />
                      <span>{isMinting ? "Minting..." : "Mint L2 NFT (Costs 1.5 ARB)"}</span>
                    </button>
                  </div>
                </div>

                {/* Sandbox Gas Fees comparison disclaimer */}
                <div className="mt-6 p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/20 text-xs text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-300 block mb-1">Scale Concept Highlight:</span>
                  Note the tiny L2 Gas fees! Minting on Arbitrum costs fraction of a cent. Under the hood, this simulates the sequencer bundling this transaction payload into an Optimistic Rollup batch.
                </div>
              </div>

              {/* Right Box: Tx Ledger & Collected NFTs */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Collected NFTs Panel */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md flex-1">
                  <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider flex items-center justify-between">
                    <span>Collected L2 NFTs</span>
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/30 border border-cyan-500/10 px-2 py-0.5 rounded-md">
                      {nfts.length} Minted
                    </span>
                  </h4>

                  {nfts.length === 0 ? (
                    <div className="h-[120px] rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-4">
                      <Hourglass className="h-6 w-6 text-slate-600 mb-1" />
                      <span className="text-xs text-slate-500 font-medium">No NFTs Minted Yet</span>
                      <span className="text-[10px] text-slate-600 mt-0.5">Connect wallet & click mint to write to simulated chain.</span>
                    </div>
                  ) : (
                    <div className="max-h-[140px] overflow-y-auto space-y-2.5 pr-1">
                      {nfts.map((nft) => (
                        <div
                          key={nft.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-850/80 hover:border-cyan-500/15 transition-all animate-fadeIn"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="h-9 w-9 rounded bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-md">
                              #{nft.id}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-200">{nft.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">Hash: {nft.txHash}</div>
                            </div>
                          </div>
                          <span className="text-[9px] text-slate-500">{nft.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Transactions Ledger Panel */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md flex-1">
                  <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
                    Transaction Ledger
                  </h4>

                  <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1 text-xs">
                    {txHistory.length === 0 ? (
                      <div className="text-center text-slate-600 py-6">
                        Connect wallet to sync transaction history.
                      </div>
                    ) : (
                      txHistory.map((tx) => (
                        <div
                          key={tx.id}
                          className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-850/80 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-slate-300">{tx.action}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tx.txHash}</div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                tx.type === "L2"
                                  ? "text-cyan-400 bg-cyan-950/20 border border-cyan-500/10"
                                  : "text-amber-500 bg-amber-950/20 border border-amber-500/10"
                              }`}
                            >
                              {tx.type} Gas: {tx.gas}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Core Feature Section */}
      <section ref={detailRef} className="py-16 md:py-24 border-t border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why do we need Layer 2 solutions?
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Layer 2 scaling isn't just an optimization—it is the foundation for global web3 adoption.
            </p>
          </div>

          <div className="marquee-container mt-6">
            <div className="marquee-content">
              {/* First copy */}
              {features.map((feature, i) => (
                <FeatureCard
                  key={`copy-1-${i}`}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  className="marquee-card"
                />
              ))}
              {/* Second copy for seamless looping */}
              {features.map((feature, i) => (
                <FeatureCard
                  key={`copy-2-${i}`}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  className="marquee-card"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Section: What is Arbitrum? */}
      <section className="py-16 md:py-24 border-t border-slate-900 bg-slate-900/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                L2 Spotlight
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What is Arbitrum?
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Arbitrum is a suite of Ethereum scaling solutions built by Offchain Labs. By utilizing
                <strong> Optimistic Rollup</strong> technology, Arbitrum Rollup allows developers and
                users to experience fast execution, extremely low transaction fees, and full EVM
                compatibility, all backed by Ethereum's institutional security.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Arbitrum compiles smart contracts into WebAssembly instructions, allowing interactive
                multi-round fraud proofs. This means dispute resolution is highly optimized, ensuring
                disputes are settled efficiently on the Ethereum base layer.
              </p>

              {/* Bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="rounded-lg bg-cyan-950/30 p-1.5 text-cyan-400 border border-cyan-500/10 mt-0.5">
                    <Code className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Full EVM Compatibility</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Deploy solidity contracts without code edits.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="rounded-lg bg-cyan-950/30 p-1.5 text-cyan-400 border border-cyan-500/10 mt-0.5">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Advanced Fraud Proofs</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Multi-round interactive protocol settles disputes cheaply.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual presentation box */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur group-hover:opacity-35 transition duration-500" />
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center justify-between">
                  <span>Arbitrum Architecture</span>
                  <span className="rounded-full bg-cyan-950 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                    Nitro
                  </span>
                </h3>

                <div className="space-y-3">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-cyan-500/20 transition-colors">
                    <div className="text-xs text-cyan-400 font-semibold mb-1">User Application Layer</div>
                    <div className="text-xs text-slate-400">Uniswap, Aave, and custom Web3 Smart Contracts</div>
                  </div>
                  
                  <div className="flex items-center justify-center py-0.5">
                    <ArrowRight className="h-4 w-4 text-slate-700 rotate-90" />
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-cyan-500/20 transition-colors">
                    <div className="text-xs text-cyan-400 font-semibold mb-1">Arbitrum Nitro (L2 OS)</div>
                    <div className="text-xs text-slate-400">Executes Geth-core transactions, generates WAVM fraud proofs</div>
                  </div>

                  <div className="flex items-center justify-center py-0.5">
                    <ArrowRight className="h-4 w-4 text-slate-700 rotate-90" />
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-cyan-500/20 transition-colors">
                    <div className="text-xs text-blue-400 font-semibold mb-1">Ethereum Consensus (L1)</div>
                    <div className="text-xs text-slate-400">Settles rollups, validates fraud proofs, secures assets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
