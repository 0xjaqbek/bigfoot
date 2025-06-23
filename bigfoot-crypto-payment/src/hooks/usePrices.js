import { useState, useEffect, useCallback } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { fetchCryptoPrices, convertPlnToCrypto, convertPlnToUsd } from '../services/priceService';

export const usePrices = (autoUpdate = true) => {
  const { 
    prices,
    priceLoading,
    priceError,
    setPrices,
    setPriceLoading,
    setPriceError
  } = usePaymentStore();

  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch prices
  const fetchPrices = useCallback(async (useCache = true) => {
    setPriceLoading(true);
    setPriceError(null);

    try {
      const data = await fetchCryptoPrices(useCache);
      setPrices(data);
      setLastUpdate(Date.now());
      return data;
    } catch (error) {
      setPriceError(error.message);
      console.error('Price fetch error:', error);
      throw error;
    } finally {
      setPriceLoading(false);
    }
  }, [setPrices, setPriceLoading, setPriceError]);

  // Auto-update prices
  useEffect(() => {
    if (!autoUpdate) return;

    // Initial fetch
    fetchPrices(true);

    // Set up interval for updates
    const interval = setInterval(() => {
      fetchPrices(false); // Force fresh data
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchPrices, autoUpdate]);

  // Calculate crypto amount
  const calculateCrypto = useCallback((plnAmount, blockchain, currency) => {
    if (!prices || !plnAmount || !blockchain) return null;

    try {
      if (currency === 'stablecoin') {
        const usdAmount = convertPlnToUsd(plnAmount, prices);
        return {
          amount: usdAmount.toFixed(2),
          symbol: 'USDC',
          priceInPln: 4.2 // Approximate USDC price
        };
      } else {
        const result = convertPlnToCrypto(plnAmount, blockchain.symbol, prices);
        return {
          amount: result.amount.toFixed(6),
          symbol: blockchain.symbol,
          priceInPln: result.priceInPln,
          change24h: result.change24h
        };
      }
    } catch (error) {
      console.error('Crypto calculation error:', error);
      return null;
    }
  }, [prices]);

  return {
    // State
    prices,
    loading: priceLoading,
    error: priceError,
    lastUpdate,
    
    // Actions
    fetchPrices,
    calculateCrypto,
    
    // Utils
    isStale: lastUpdate && (Date.now() - lastUpdate) > 60000, // 1 minute
    hasData: !!prices && Object.keys(prices).length > 0
  };
};