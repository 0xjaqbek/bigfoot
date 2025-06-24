import axios from 'axios';
import { Connection } from '@solana/web3.js';

// Fee estimation cache
const CACHE_DURATION = 60000; // 1 minute
const feeCache = new Map();

// Helper function for caching
const getCachedOrFetch = async (key, fetchFn, cacheDuration = CACHE_DURATION) => {
  const cached = feeCache.get(key);
  if (cached && (Date.now() - cached.timestamp) < cacheDuration) {
    return cached.data;
  }

  try {
    const data = await fetchFn();
    feeCache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch (fetchError) {
    // Return cached data if available, even if stale
    if (cached) {
      console.warn(`Using stale fee data for ${key}:`, fetchError);
      return cached.data;
    }
    throw fetchError;
  }
};

// Bitcoin Fee Estimation
export const getBitcoinFees = async () => {
  return getCachedOrFetch('bitcoin', async () => {
    const response = await axios.get('https://mempool.space/api/v1/fees/recommended');
    const fees = response.data;
    
    // Convert sat/vB to approximate PLN for standard transaction (250 bytes)
    const txSize = 250; // bytes
    const btcPricePln = 280000; // approximate, should come from price service
    const satoshiToPln = btcPricePln / 100000000;
    
    return {
      slow: {
        satPerByte: fees.hourFee,
        pln: Math.round(fees.hourFee * txSize * satoshiToPln * 100) / 100,
        time: '60+ min'
      },
      standard: {
        satPerByte: fees.halfHourFee,
        pln: Math.round(fees.halfHourFee * txSize * satoshiToPln * 100) / 100,
        time: '30 min'
      },
      fast: {
        satPerByte: fees.fastestFee,
        pln: Math.round(fees.fastestFee * txSize * satoshiToPln * 100) / 100,
        time: '10 min'
      }
    };
  });
};

// Ethereum Gas Fee Estimation
export const getEthereumGas = async () => {
  return getCachedOrFetch('ethereum', async () => {
    try {
      // Try Etherscan API first
      const response = await axios.get(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle'
      );
      
      if (response.data?.result) {
        const gas = response.data.result;
        const ethPricePln = 12600; // should come from price service
        const gasLimit = 21000; // standard transfer
        
        return {
          slow: {
            gwei: parseFloat(gas.SafeGasPrice),
            pln: Math.round(gas.SafeGasPrice * gasLimit * ethPricePln / 1000000000 * 100) / 100,
            time: '5+ min'
          },
          standard: {
            gwei: parseFloat(gas.StandardGasPrice),
            pln: Math.round(gas.StandardGasPrice * gasLimit * ethPricePln / 1000000000 * 100) / 100,
            time: '2 min'
          },
          fast: {
            gwei: parseFloat(gas.FastGasPrice),
            pln: Math.round(gas.FastGasPrice * gasLimit * ethPricePln / 1000000000 * 100) / 100,
            time: '1 min'
          }
        };
      }
    } catch (ethError) {
      console.warn('Etherscan API failed, using fallback:', ethError);
    }
    
    // Fallback values
    return {
      slow: { gwei: 20, pln: 25, time: '5+ min' },
      standard: { gwei: 30, pln: 38, time: '2 min' },
      fast: { gwei: 50, pln: 63, time: '1 min' }
    };
  });
};

// Polygon Gas Fee Estimation
export const getPolygonGas = async () => {
  return getCachedOrFetch('polygon', async () => {
    try {
      const response = await axios.get('https://gasstation.polygon.technology/v2');
      const fees = response.data;
      
      return {
        slow: {
          gwei: Math.round(fees.safeLow.maxFee),
          pln: 0.8,
          time: '3 min'
        },
        standard: {
          gwei: Math.round(fees.standard.maxFee),
          pln: 1.2,
          time: '2 min'
        },
        fast: {
          gwei: Math.round(fees.fast.maxFee),
          pln: 2.0,
          time: '1 min'
        }
      };
    } catch (polygonError) {
      console.warn('Polygon Gas Station failed:', polygonError);
      // Fallback for Polygon
      return {
        slow: { gwei: 30, pln: 0.8, time: '3 min' },
        standard: { gwei: 35, pln: 1.2, time: '2 min' },
        fast: { gwei: 40, pln: 2.0, time: '1 min' }
      };
    }
  });
};

// Arbitrum Fee Estimation
export const getArbitrumGas = async () => {
  return getCachedOrFetch('arbitrum', async () => {
    // Arbitrum has very low and stable fees
    return {
      slow: { gwei: 0.1, pln: 2, time: '2 min' },
      standard: { gwei: 0.1, pln: 3, time: '1 min' },
      fast: { gwei: 0.15, pln: 4, time: '30s' }
    };
  });
};

// Optimism Fee Estimation
export const getOptimismGas = async () => {
  return getCachedOrFetch('optimism', async () => {
    // Optimism has low and stable fees
    return {
      slow: { gwei: 0.001, pln: 2, time: '2 min' },
      standard: { gwei: 0.001, pln: 3, time: '1 min' },
      fast: { gwei: 0.002, pln: 4, time: '30s' }
    };
  });
};

// Solana Fee Estimation
export const getSolanaFees = async () => {
  return getCachedOrFetch('solana', async () => {
    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      
      // Get recent prioritization fees
      const recentFees = await connection.getRecentPrioritizationFees();
      
      if (recentFees.length > 0) {
        const fees = recentFees.map(f => f.prioritizationFee);
        const avgFee = fees.reduce((sum, fee) => sum + fee, 0) / fees.length;
        
        const baseFee = 5000; // lamports
        
        return {
          slow: {
            lamports: baseFee,
            pln: 0.01,
            time: '30s'
          },
          standard: {
            lamports: baseFee + Math.round(avgFee),
            pln: 0.02,
            time: '10s'
          },
          fast: {
            lamports: baseFee + Math.round(avgFee * 2),
            pln: 0.03,
            time: '5s'
          }
        };
      }
    } catch (solanaError) {
      console.warn('Solana fee estimation failed:', solanaError);
    }
    
    // Fallback for Solana
    return {
      slow: { lamports: 5000, pln: 0.01, time: '30s' },
      standard: { lamports: 10000, pln: 0.02, time: '10s' },
      fast: { lamports: 20000, pln: 0.03, time: '5s' }
    };
  });
};

// TON Fee Estimation
export const getTonFees = async () => {
  return getCachedOrFetch('ton', async () => {
    // TON has very low and stable fees
    return {
      slow: { nanoton: 10000000, pln: 0.05, time: '30s' },
      standard: { nanoton: 15000000, pln: 0.08, time: '15s' },
      fast: { nanoton: 20000000, pln: 0.10, time: '10s' }
    };
  });
};

// Main fee estimation function
export const getNetworkFees = async (blockchain) => {
  const networkName = blockchain?.name?.toLowerCase();
  
  try {
    switch (networkName) {
      case 'bitcoin':
        return await getBitcoinFees();
      case 'ethereum':
        return await getEthereumGas();
      case 'polygon':
        return await getPolygonGas();
      case 'arbitrum':
        return await getArbitrumGas();
      case 'optimism':
        return await getOptimismGas();
      case 'solana':
        return await getSolanaFees();
      case 'ton':
        return await getTonFees();
      default:
        throw new Error(`Unsupported network: ${networkName}`);
    }
  } catch (networkError) {
    console.error(`Fee estimation failed for ${networkName}:`, networkError);
    
    // Return fallback fees
    return {
      slow: { pln: 5, time: '5 min' },
      standard: { pln: 10, time: '2 min' },
      fast: { pln: 20, time: '1 min' }
    };
  }
};

// Format fee for display
export const formatFee = (fee, speed = 'standard') => {
  if (!fee || !fee[speed]) return 'Nieznana';
  
  const feeData = fee[speed];
  return `~${feeData.pln} PLN (${feeData.time})`;
};

// Get recommended fee (standard by default)
export const getRecommendedFee = (fees, speed = 'standard') => {
  if (!fees || !fees[speed]) return null;
  return fees[speed];
};

// Clear fee cache (useful for manual refresh)
export const clearFeeCache = () => {
  feeCache.clear();
};