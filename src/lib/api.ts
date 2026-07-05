import { CoinGeckoResponse, CryptoCoin } from "@/types/crypto";

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,arbitrum,solana&vs_currencies=usd&include_24hr_change=true";

/**
 * Fetches current prices for BTC, ETH, ARB, and SOL.
 * Maps raw API output into structured CryptoCoin objects.
 */
export async function fetchCryptoPrices(): Promise<CryptoCoin[]> {
  try {
    const res = await fetch(COINGECKO_API_URL);

    if (!res.ok) {
      console.warn(`Failed to fetch prices: ${res.statusText}. Using fallback data.`);
      return getFallbackData();
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
    console.warn("Error fetching crypto prices, using fallback data:", error);
    return getFallbackData();
  }
}

function getFallbackData(): CryptoCoin[] {
  // Realistic fallback data in case CoinGecko API is rate-limited or blocked
  return [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 64230.5,
      change24h: 2.34,
      logo: "BTC",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3450.2,
      change24h: -1.12,
      logo: "ETH",
    },
    {
      id: "arbitrum",
      name: "Arbitrum",
      symbol: "ARB",
      price: 1.12,
      change24h: 5.67,
      logo: "ARB",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: 145.8,
      change24h: 8.45,
      logo: "SOL",
    },
  ];
}
