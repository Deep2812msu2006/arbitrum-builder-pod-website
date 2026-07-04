import React from "react";
import ComparisonCard from "@/components/ComparisonCard";
import { Globe, RefreshCw, Key, Database, BookOpen } from "lucide-react";

export default function Concepts() {
  const comparisons = [
    {
      title: "Web2 vs Web3",
      leftTitle: "Web2 (Read-Write)",
      leftPoints: [
        "Centralized hosting (AWS, Google Cloud)",
        "Corporate data ownership & monetization",
        "Identity managed by proprietary credentials",
        "Single points of failure and censorship risks",
      ],
      rightTitle: "Web3 (Read-Write-Own)",
      rightPoints: [
        "Decentralized nodes (IPFS, Ethereum)",
        "User-owned data & sovereign digital assets",
        "Wallet-based identity (public-key keys)",
        "Censorship-resistant and open-source logic",
      ],
      explanation:
        "Web3 introduces digital ownership and peer-to-peer interactions directly into the protocol layer, bypassing centralized intermediaries and placing identity/assets back in user control.",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Bitcoin vs Ethereum",
      leftTitle: "Bitcoin (Digital Gold)",
      leftPoints: [
        "Peer-to-peer store of value asset",
        "Proof of Work (PoW) consensus algorithm",
        "Simple, non-Turing complete scripting language",
        "UTXO model tracking individual coins",
      ],
      rightTitle: "Ethereum (World Computer)",
      rightPoints: [
        "Decentralized application & smart contract execution",
        "Proof of Stake (PoS) consensus algorithm",
        "Turing-complete Solidity/EVM engine",
        "Account-based model tracking global state",
      ],
      explanation:
        "Bitcoin serves as a highly secure, decentralized store of value, while Ethereum acts as a flexible, programmable framework that hosts decentralized finance, NFTs, and autonomous organizations.",
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      title: "Public Key vs Private Key",
      leftTitle: "Public Key (Your Address)",
      leftPoints: [
        "Derived mathematically from the private key",
        "Safe to share with anyone on the network",
        "Serves as your wallet address (like an IBAN)",
        "Used by others to send transactions or check balance",
      ],
      rightTitle: "Private Key (Your Password)",
      rightPoints: [
        "Secret number generated randomly during setup",
        "Must NEVER be shared with anyone",
        "Used to generate cryptographic transaction signatures",
        "Grants full ownership and control over the assets",
      ],
      explanation:
        "Public and private keys form an asymmetric cryptographic pair. The public key is your visible address, while the private key is your secret key to authorize transactions. Lose your private key, lose your funds.",
      icon: <Key className="h-5 w-5" />,
    },
    {
      title: "Blockchain vs Traditional DB",
      leftTitle: "Traditional Database",
      leftPoints: [
        "Centralized authority or administrator control",
        "Supports full CRUD (Create, Read, Update, Delete)",
        "Optimized for high-performance and low latency",
        "Data can be easily modified or backdated by admin",
      ],
      rightTitle: "Blockchain Ledger",
      rightPoints: [
        "Decentralized consensus across distributed nodes",
        "Append-only database structure (no updates/deletes)",
        "Optimized for trustlessness and data auditability",
        "Mathematically immutable using cryptographic blocks",
      ],
      explanation:
        "Traditional databases are fast and scalable for private systems where administrators are trusted. Blockchains sacrifice write speed and latency to build a trustless, transparent, and unalterable ledger.",
      icon: <Database className="h-5 w-5" />,
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Fundamentals</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Core Web3 Concepts
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Understanding these fundamental comparisons is key to grasping the power of decentralized technologies.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisons.map((item, index) => (
            <ComparisonCard
              key={index}
              title={item.title}
              leftTitle={item.leftTitle}
              leftPoints={item.leftPoints}
              rightTitle={item.rightTitle}
              rightPoints={item.rightPoints}
              explanation={item.explanation}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
