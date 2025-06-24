import { useState, useEffect } from 'react';
import { getNetworkFees, formatFee, getRecommendedFee } from '../services/feeEstimation';

export const useFees = (blockchain, autoUpdate = true) => {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedSpeed, setSelectedSpeed] = useState('standard');

  // Fetch fees
  const fetchFees = async (showLoading = true) => {
    if (!blockchain) return;

    if (showLoading) setLoading(true);
    setError(null);

    try {
      const feeData = await getNetworkFees(blockchain);
      setFees(feeData);
      setLastUpdate(Date.now());
    } catch (feeError) {
      setError(feeError.message);
      console.error('Fee estimation error:', feeError);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Auto-update fees
  useEffect(() => {
    if (!blockchain || !autoUpdate) return;

    // Initial fetch
    fetchFees();

    // Set up interval for updates (every 2 minutes)
    const interval = setInterval(() => {
      fetchFees(false); // Background update without loading state
    }, 120000);

    return () => clearInterval(interval);
  }, [blockchain?.name, autoUpdate]);

  // Get current recommended fee
  const recommendedFee = getRecommendedFee(fees, selectedSpeed);

  // Format current fee for display
  const formattedFee = fees ? formatFee(fees, selectedSpeed) : null;

  // Check if data is stale (older than 5 minutes)
  const isStale = lastUpdate && (Date.now() - lastUpdate) > 300000;

  return {
    // Data
    fees,
    recommendedFee,
    formattedFee,
    selectedSpeed,
    
    // State
    loading,
    error,
    lastUpdate,
    isStale,
    
    // Actions
    fetchFees: () => fetchFees(true),
    setSelectedSpeed,
    
    // Utils
    hasData: !!fees,
    speeds: fees ? Object.keys(fees) : []
  };
};