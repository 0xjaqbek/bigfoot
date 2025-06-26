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

// Utility function to safely parse numbers
const safeParseFloat = (value, fallback = 0) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
};

// Utility function to validate and calculate PLN amount
const calculatePlnFee = (gweiAmount, gasLimit, ethPricePln) => {
  const gwei = safeParseFloat(gweiAmount, 30); // fallback to 30 gwei
  const limit = safeParseFloat(gasLimit, 21000);
  const price = safeParseFloat(ethPricePln, 12600);
  
  // Convert gwei to PLN: gwei * gasLimit * ethPrice / 1e9
  const plnAmount = (gwei * limit * price) / 1000000000;
  return Math.round(plnAmount * 100) / 100; // Round to 2 decimals
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
        satPerByte: safeParseFloat(fees.hourFee, 10),
        pln: Math.round(safeParseFloat(fees.hourFee, 10) * txSize * satoshiToPln * 100) / 100,
        time: '60+ min'
      },
      standard: {
        satPerByte: safeParseFloat(fees.halfHourFee, 15),
        pln: Math.round(safeParseFloat(fees.halfHourFee, 15) * txSize * satoshiToPln * 100) / 100,
        time: '30 min'
      },
      fast: {
        satPerByte: safeParseFloat(fees.fastestFee, 25),
        pln: Math.round(safeParseFloat(fees.fastestFee, 25) * txSize * satoshiToPln * 100) / 100,
        time: '10 min'
      }
    };
  });
};

// Ethereum Gas Fee Estimation - FIXED
export const getEthereumGas = async () => {
  return getCachedOrFetch('ethereum', async () => {
    // Try multiple API sources
    const ethPricePln = 12600; // Should come from price service
    const gasLimit = 21000; // Standard transfer
    
    // Try Etherscan API first (requires API key for better reliability)
    try {
      const etherscanUrl = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle';
      const response = await axios.get(etherscanUrl, { timeout: 5000 });
      
      if (response.data?.status === '1' && response.data?.result) {
        const gas = response.data.result;
        
        // Validate all required fields exist and are numbers
        const safeGas = safeParseFloat(gas.SafeGasPrice, 0);
        const standardGas = safeParseFloat(gas.StandardGasPrice, 0);
        const fastGas = safeParseFloat(gas.FastGasPrice, 0);
        
        // Only use API data if all values are valid
        if (safeGas > 0 && standardGas > 0 && fastGas > 0) {
          return {
            slow: {
              gwei: safeGas,
              pln: calculatePlnFee(safeGas, gasLimit, ethPricePln),
              time: '5+ min'
            },
            standard: {
              gwei: standardGas,
              pln: calculatePlnFee(standardGas, gasLimit, ethPricePln),
              time: '2 min'
            },
            fast: {
              gwei: fastGas,
              pln: calculatePlnFee(fastGas, gasLimit, ethPricePln),
              time: '1 min'
            }
          };
        }
      }
    } catch (etherscanError) {
      console.warn('Etherscan API failed:', etherscanError.message);
    }
    
    // Try alternative API - ETH Gas Station (if available)
    try {
      const gasStationResponse = await axios.get('https://ethgasstation.info/api/ethgasAPI.json', { timeout: 5000 });
      if (gasStationResponse.data) {
        const data = gasStationResponse.data;
        return {
          slow: {
            gwei: safeParseFloat(data.safeLow / 10, 20),
            pln: calculatePlnFee(data.safeLow / 10, gasLimit, ethPricePln),
            time: '5+ min'
          },
          standard: {
            gwei: safeParseFloat(data.standard / 10, 30),
            pln: calculatePlnFee(data.standard / 10, gasLimit, ethPricePln),
            time: '2 min'
          },
          fast: {
            gwei: safeParseFloat(data.fast / 10, 50),
            pln: calculatePlnFee(data.fast / 10, gasLimit, ethPricePln),
            time: '1 min'
          }
        };
      }
    } catch (gasStationError) {
      console.warn('ETH Gas Station API failed:', gasStationError.message);
    }
    
    // Fallback to realistic current values (updated for 2025)
    console.warn('Using Ethereum fallback gas prices');
    return {
      slow: { 
        gwei: 12, 
        pln: calculatePlnFee(12, gasLimit, ethPricePln), 
        time: '5+ min' 
      },
      standard: { 
        gwei: 20, 
        pln: calculatePlnFee(20, gasLimit, ethPricePln), 
        time: '2 min' 
      },
      fast: { 
        gwei: 35, 
        pln: calculatePlnFee(35, gasLimit, ethPricePln), 
        time: '1 min' 
      }
    };
  });
};

// Polygon Gas Fee Estimation - IMPROVED
export const getPolygonGas = async () => {
  return getCachedOrFetch('polygon', async () => {
    try {
      const response = await axios.get('https://gasstation.polygon.technology/v2', { timeout: 5000 });
      const fees = response.data;
      
      if (fees && fees.safeLow && fees.standard && fees.fast) {
        return {
          slow: {
            gwei: Math.round(safeParseFloat(fees.safeLow.maxFee, 30)),
            pln: 0.8,
            time: '3 min'
          },
          standard: {
            gwei: Math.round(safeParseFloat(fees.standard.maxFee, 35)),
            pln: 1.2,
            time: '2 min'
          },
          fast: {
            gwei: Math.round(safeParseFloat(fees.fast.maxFee, 40)),
            pln: 2.0,
            time: '1 min'
          }
        };
      }
    } catch (polygonError) {
      console.warn('Polygon Gas Station failed:', polygonError.message);
    }
    
    // Fallback for Polygon
    return {
      slow: { gwei: 30, pln: 0.8, time: '3 min' },
      standard: { gwei: 35, pln: 1.2, time: '2 min' },
      fast: { gwei: 40, pln: 2.0, time: '1 min' }
    };
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

// zkSync Era Fee Estimation - NEW: FIXED with ETH-based calculation
export const getZkSyncGas = async () => {
  return getCachedOrFetch('zksync', async () => {
    try {
      // zkSync Era has very low fees, paid in ETH
      const ethPricePln = 12600; // Should come from price service
      
      // zkSync Era typical gas costs in gwei (much lower than mainnet)
      const baseGwei = 0.001; // Very low base fee
      const gasLimit = 21000; // Standard transfer
      
      return {
        slow: { 
          gwei: baseGwei, 
          pln: calculatePlnFee(baseGwei, gasLimit, ethPricePln), 
          time: '2 min' 
        },
        standard: { 
          gwei: baseGwei * 1.5, 
          pln: calculatePlnFee(baseGwei * 1.5, gasLimit, ethPricePln), 
          time: '1 min' 
        },
        fast: { 
          gwei: baseGwei * 2, 
          pln: calculatePlnFee(baseGwei * 2, gasLimit, ethPricePln), 
          time: '30s' 
        }
      };
    } catch (error) {
      console.warn('zkSync Era fee estimation failed:', error.message);
      // Fallback fees for zkSync Era (very low, paid in ETH)
      return {
        slow: { gwei: 0.001, pln: 1, time: '2 min' },
        standard: { gwei: 0.0015, pln: 1.5, time: '1 min' },
        fast: { gwei: 0.002, pln: 2, time: '30s' }
      };
    }
  });
};

// Solana Fee Estimation - IMPROVED
export const getSolanaFees = async () => {
  return getCachedOrFetch('solana', async () => {
    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      
      // Get recent prioritization fees
      const recentFees = await connection.getRecentPrioritizationFees();
      
      if (recentFees && recentFees.length > 0) {
        const fees = recentFees.map(f => safeParseFloat(f.prioritizationFee, 0));
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
      console.warn('Solana fee estimation failed:', solanaError.message);
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

// Main fee estimation function - IMPROVED ERROR HANDLING with zkSync support
export const getNetworkFees = async (blockchain) => {
  const networkName = blockchain?.name?.toLowerCase();
  
  if (!networkName) {
    console.error('No blockchain name provided for fee estimation');
    return getFallbackFees();
  }
  
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
      case 'zksync': // ADDED: zkSync Era fee estimation
        return await getZkSyncGas();
      case 'solana':
        return await getSolanaFees();
      case 'ton':
        return await getTonFees();
      default:
        console.warn(`Unsupported network: ${networkName}`);
        return getFallbackFees();
    }
  } catch (networkError) {
    console.error(`Fee estimation failed for ${networkName}:`, networkError.message);
    return getFallbackFees();
  }
};

// Improved fallback fees
const getFallbackFees = () => {
  return {
    slow: { pln: 5, time: '5 min' },
    standard: { pln: 10, time: '2 min' },
    fast: { pln: 20, time: '1 min' }
  };
};

// Format fee for display
export const formatFee = (fee, speed = 'standard') => {
  if (!fee || !fee[speed]) return 'Nieznana';
  
  const feeData = fee[speed];
  const plnAmount = safeParseFloat(feeData.pln, 0);
  
  if (plnAmount <= 0) return 'Nieznana';
  
  return `~${plnAmount} PLN (${feeData.time})`;
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