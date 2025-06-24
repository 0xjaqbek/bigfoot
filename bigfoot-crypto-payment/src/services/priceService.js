import axios from 'axios';
import { COIN_IDS } from '../utils/constants';

// CoinGecko API Configuration
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const CACHE_DURATION = 30000; // 30 seconds
let priceCache = null;
let lastFetch = 0;

// Fetch current crypto prices in PLN and USD
export const fetchCryptoPrices = async (useCache = true) => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (useCache && priceCache && (now - lastFetch) < CACHE_DURATION) {
    return priceCache;
  }

  try {
    const coinIds = Object.values(COIN_IDS).join(',');
    const response = await axios.get(
      `${COINGECKO_API}/simple/price`,
      {
        params: {
          ids: coinIds,
          vs_currencies: 'usd,pln',
          include_24hr_change: true,
          include_last_updated_at: true
        },
        timeout: 10000 // 10 second timeout
      }
    );

    const prices = response.data;
    
    // Validate response
    if (!prices || Object.keys(prices).length === 0) {
      throw new Error('Brak danych cenowych z API');
    }

    // Cache the results
    priceCache = prices;
    lastFetch = now;
    
    return prices;
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    
    // Return cached data if available, even if stale
    if (priceCache) {
      console.warn('Using stale price cache due to API error');
      return priceCache;
    }
    
    // Fallback prices for testing (remove in production)
    return getFallbackPrices();
  }
};

// Convert PLN to crypto amount
export const convertPlnToCrypto = (plnAmount, cryptoSymbol, prices) => {
  try {
    const coinId = COIN_IDS[cryptoSymbol];
    if (!coinId) {
      throw new Error(`Nieznana waluta: ${cryptoSymbol}`);
    }

    const coinData = prices[coinId];
    if (!coinData || !coinData.pln) {
      throw new Error(`Brak ceny dla: ${cryptoSymbol}`);
    }

    const priceInPln = coinData.pln;
    const cryptoAmount = plnAmount / priceInPln;
    
    return {
      amount: cryptoAmount,
      priceInPln,
      lastUpdated: coinData.last_updated_at || Date.now() / 1000,
      change24h: coinData.pln_24h_change || 0
    };
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error(`Błąd konwersji ${cryptoSymbol}: ${error.message}`);
  }
};

// Convert PLN to USD (for stablecoins)
export const convertPlnToUsd = (plnAmount, prices) => {
  try {
    // Use USDC price as reference for USD/PLN rate
    const usdcData = prices[COIN_IDS.USDC];
    if (!usdcData || !usdcData.pln) {
      // Fallback to approximate rate
      return plnAmount / 4.2;
    }
    
    const usdPlnRate = usdcData.pln;
    return plnAmount / usdPlnRate;
  } catch (error) {
    console.error('USD conversion error:', error);
    // Fallback to approximate rate
    return plnAmount / 4.2;
  }
};

// Get price change indicator
export const getPriceChangeIndicator = (change24h) => {
  if (!change24h) return { color: 'gray', symbol: '●' };
  
  if (change24h > 0) {
    return { color: 'green', symbol: '▲', text: `+${change24h.toFixed(2)}%` };
  } else {
    return { color: 'red', symbol: '▼', text: `${change24h.toFixed(2)}%` };
  }
};

// Format price with Polish locale
export const formatPrice = (price, currency = 'PLN') => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: currency === 'PLN' ? 2 : 6
  }).format(price);
};

// Fallback prices for development/testing
const getFallbackPrices = () => {
  console.warn('Using fallback prices - remove in production');
  return {
    bitcoin: { pln: 280000, usd: 67000, pln_24h_change: 2.5 },
    ethereum: { pln: 12600, usd: 3000, pln_24h_change: -1.2 },
    solana: { pln: 840, usd: 200, pln_24h_change: 5.8 },
    'the-open-network': { pln: 21, usd: 5, pln_24h_change: -0.5 },
    'matic-network': { pln: 4.2, usd: 1, pln_24h_change: 1.1 },
    arbitrum: { pln: 6.3, usd: 1.5, pln_24h_change: 0.8 },
    optimism: { pln: 10.5, usd: 2.5, pln_24h_change: -2.1 },
    'usd-coin': { pln: 4.2, usd: 1, pln_24h_change: 0.0 }
  };
};

// Get foundation wallet address for blockchain
export const getFoundationAddress = (blockchainType, blockchain) => {
  // These will come from environment variables
  const addresses = {
    bitcoin: import.meta.env.VITE_BTC_ADDRESS || 'bc1q...mock_btc_address',
    ethereum: import.meta.env.VITE_ETH_ADDRESS || '0x...mock_eth_address',
    polygon: import.meta.env.VITE_ETH_ADDRESS || '0x...mock_eth_address', // Same as ETH
    arbitrum: import.meta.env.VITE_ETH_ADDRESS || '0x...mock_eth_address', // Same as ETH
    optimism: import.meta.env.VITE_ETH_ADDRESS || '0x...mock_eth_address', // Same as ETH
    solana: import.meta.env.VITE_SOL_ADDRESS || 'mock_sol_address...',
    ton: import.meta.env.VITE_TON_ADDRESS || 'mock_ton_address...'
  };

  const key = blockchain?.name?.toLowerCase() || blockchainType;
  return addresses[key] || addresses[blockchainType];
};