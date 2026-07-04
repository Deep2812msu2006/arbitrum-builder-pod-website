# Web3Academy: Educational Web3 Platform

A high-quality, production-ready educational Web3 application built using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and modern React development best practices. Developed as part of the **Arbitrum Builder Pods Assignment 2026**.

---

## 🚀 Project Overview

Web3Academy is a modern, fully-responsive frontend educational platform designed to teach essential blockchain fundamentals, scaling concepts, and cryptographic mechanics. It features rich visual aesthetics (dark mode, neon highlights, glassmorphic grids, custom vector icons) and includes real-time APIs and interactive cryptographic playgrounds.

---

## ✨ Features

### 1. **Scale Overview (Landing Page)**
*   **Hero Banner:** Clean and engaging layout introducing Ethereum scaling difficulties and the purpose of Layer 2 protocols.
*   **Arbitrum Spotlight:** High-fidelity overview of the Arbitrum ecosystem, detailing EVM compatibility, advanced interactive fraud proofs, and its underlying Arbitrum Nitro architecture.
*   **Visual Stack Flow:** Interactive diagrams mapping user transactions from L2 execution to L1 security settlements.

### 2. **Core Concepts Comparison**
*   **Grid Layouts:** Side-by-side technical breakdowns comparing key paradigms:
    1.  *Web2 vs. Web3* (centralized servers vs. decentralized ownership)
    2.  *Bitcoin vs. Ethereum* (UTXO digital gold vs. programmable world computer)
    3.  *Public Key vs. Private Key* (identifiable receiving addresses vs. secret signing keys)
    4.  *Blockchain Ledger vs. Traditional Database* (immutable decentralized state vs. high-performance CRUD admin databases)

### 3. **Live Prices Portal**
*   **API Integration:** Queries CoinGecko's REST API dynamically for real-time prices of **Bitcoin (BTC)**, **Ethereum (ETH)**, **Arbitrum (ARB)**, and **Solana (SOL)**.
*   **Dynamic Indicators:** Renders price change directions with green badge metrics (↑ Positive) or red badge metrics (↓ Negative).
*   **Resiliency Features:** Includes loading states, detailed error banners, a manual refresh control, and real-time "Last Updated" synchronization timestamps.

### 4. **Double-Block Simulator**
*   **Immutability Demonstration:** An interactive cryptographic block playground representing two chained blocks.
*   **Browser Web Crypto API:** Utilizes standard client-side `crypto.subtle` SHA-256 routines to generate live hashes from block data, nonces, and previous hashes.
*   **Real-time Cascade Invalidation:** Changing the data or nonce in Block 1 instantly propagates the hash update to Block 2, invalidating both blocks and displaying a prominent red "Chain Broken" alert.
*   **Proof of Work Mining:** Interactive "Mine" button that iterates nonces rapidly to find a hash starting with the difficulty constraint (`00`), updating state once found.

---

## 🛠️ Technology Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v4)
*   **Icons:** Lucide React & custom optimized SVGs
*   **Hashing Engine:** Web Crypto API (SHA-256)
*   **API Data source:** CoinGecko Simple Price API

---

## 📁 Folder Structure

```text
src/
├── app/
│   ├── block-simulator/
│   │   └── page.tsx         # Blockchain Block Simulator view
│   ├── concepts/
│   │   └── page.tsx         # Educational comparison view
│   ├── live-prices/
│   │   └── page.tsx         # Real-time coin tracker view
│   ├── globals.css          # Styling system parameters
│   ├── layout.tsx           # Global shell wrapper (attaches header/footer/glows)
│   └── page.tsx             # Scale landing view (Home page)
│
├── components/
│   ├── Header.tsx           # Logo and active page navigation
│   ├── Footer.tsx           # Student profile and course attribution
│   ├── Hero.tsx             # Interactive landing page banner
│   ├── FeatureCard.tsx      # Hover animated benefit/feature card
│   ├── ComparisonCard.tsx   # Side-by-side comparison tables
│   ├── CryptoCard.tsx       # Live currency detail card
│   ├── Block.tsx            # Cryptographic block component
│   └── StatusBadge.tsx      # Green/Red trend indicators
│
├── lib/
│   ├── api.ts               # CoinGecko data query client
│   └── hash.ts              # Cryptographic SHA-256 helper
│
└── types/
    ├── crypto.ts            # Currency pricing interfaces
    └── block.ts             # Blockchain block data interfaces
```

---

## 💻 Installation & Setup

Ensure you have [Node.js](https://nodejs.org) installed on your system.

1.  **Clone the workspace or navigate to the folder:**
    ```bash
    cd WEB-3WEBSITE
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the local development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📸 Screenshots (Placeholder)

*Screenshots of the dark-themed landing page, concepts portal, price dashboard, and block simulator will go here during submission.*

---

## 🔮 Future Improvements

1.  **Arbitrum Testnet Integrations:** Add wallet connections (e.g., WalletConnect / RainbowKit) allowing users to query their balance on Arbitrum Sepolia.
2.  **Multi-Round Fraud Proofs:** Interactive game demonstrating how binary search is used to find the exact execution step where execution diverged during an L2 dispute challenge.
3.  **Dynamic Difficulty Adjustments:** Allow users to adjust the mining difficulty (e.g., number of leading zeros from `0` up to `0000`) and benchmark mining speeds.
4.  **Transaction Mempool Simulator:** Visual queue showing pending transactions before they are compiled into a block.
