import { CoinGeckoResponse, CryptoCoin } from "@/types/crypto";

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,arbitrum,solana&vs_currencies=usd&include_24hr_change=true";

/**
 * Fetches current prices for BTC, ETH, ARB, and SOL.
 * Maps raw API output into structured CryptoCoin objects.
 */
export async function fetchCryptoPrices(): Promise<CryptoCoin[]> {
  try {
    const res = await fetch(COINGECKO_API_URL, {
      next: { revalidate: 60 }, // Cache for 60 seconds (Next.js Cache option)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch prices: ${res.statusText}`);
    }

    const data: CoinGeckoResponse = await res.json();

    const coins: CryptoCoin[] = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
        logo: "BTC",
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
        logo: "ETH",
      },
      {
        id: "arbitrum",
        name: "Arbitrum",
        symbol: "ARB",
        price: data.arbitrum?.usd || 0,
        change24h: data.arbitrum?.usd_24h_change || 0,
        logo: "ARB",
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        price: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
        logo: "SOL",
      },
    ];

    return coins;
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    throw error;
  }
}
