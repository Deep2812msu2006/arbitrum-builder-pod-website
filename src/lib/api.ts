import { CoinGeckoResponse, CryptoCoin, CoinGeckoSearchResult } from "@/types/crypto";

/**
 * Fetches current prices and metadata for a list of coin IDs.
 */
export async function fetchCryptoPrices(ids: string[] = ["bitcoin", "ethereum", "arbitrum", "solana"]): Promise<CryptoCoin[]> {
  if (ids.length === 0) return [];
  
  const COINGECKO_API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}`;

  try {
    const res = await fetch(COINGECKO_API_URL);

    if (!res.ok) {
      console.warn(`Failed to fetch prices: ${res.statusText}. Using fallback data.`);
      return getFallbackData().filter(c => ids.includes(c.id));
    }

    const data: any[] = await res.json();

    const coins: CryptoCoin[] = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price || 0,
      change24h: coin.price_change_percentage_24h || 0,
      logo: coin.symbol.toUpperCase(),
      imageUrl: coin.image,
    }));

    return coins;
  } catch (error) {
    console.warn("Error fetching crypto prices, using fallback data:", error);
    return getFallbackData().filter(c => ids.includes(c.id));
  }
}

/**
 * Searches CoinGecko for a specific cryptocurrency.
 */
export async function searchCrypto(query: string): Promise<CoinGeckoSearchResult[]> {
  if (!query || query.length < 2) return [];

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      console.warn(`Failed to search crypto: ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    return data.coins || [];
  } catch (error) {
    console.error("Error searching crypto:", error);
    return [];
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
    {
      id: "matic-network",
      name: "Polygon",
      symbol: "MATIC",
      price: 0.72,
      change24h: 1.2,
      logo: "MATIC",
      imageUrl: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    }
  ];
}
