export interface CoinGeckoPriceData {
  usd: number;
  usd_24h_change: number;
}

export interface CoinGeckoResponse {
  bitcoin: CoinGeckoPriceData;
  ethereum: CoinGeckoPriceData;
  arbitrum: CoinGeckoPriceData;
  solana: CoinGeckoPriceData;
}

export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logo: string;
  imageUrl?: string;
}

export interface CoinGeckoSearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  large: string;
}
