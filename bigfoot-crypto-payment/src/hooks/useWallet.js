import { useState, useCallback } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { connectWallet, sendTransaction, detectAvailableWallets } from '../services/walletService';

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    connectedWallet,
    setWallet,
    setConnecting,
    setError: setStoreError
  } = usePaymentStore();

  // Connect to wallet
  const connect = useCallback(async (walletName, blockchainType) => {
    setIsConnecting(true);
    setError(null);
    setConnecting(true);
    setStoreError(null);

    try {
      const walletInfo = await connectWallet(walletName, blockchainType);
      setWallet(walletInfo);
      return walletInfo;
    } catch (err) {
      const errorMessage = err.message;
      setError(errorMessage);
      setStoreError(errorMessage);
      throw err;
    } finally {
      setIsConnecting(false);
      setConnecting(false);
    }
  }, [setWallet, setConnecting, setStoreError]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setWallet(null);
    setError(null);
    setStoreError(null);
  }, [setWallet, setStoreError]);

  // Send transaction
  const sendTx = useCallback(async (toAddress, amount) => {
    if (!connectedWallet) {
      throw new Error('Brak połączonego portfela');
    }

    try {
      const txHash = await sendTransaction(connectedWallet, toAddress, amount);
      return txHash;
    } catch (err) {
      const errorMessage = err.message;
      setError(errorMessage);
      setStoreError(errorMessage);
      throw err;
    }
  }, [connectedWallet, setStoreError]);

  // Detect available wallets
  const detectWallets = useCallback(() => {
    return detectAvailableWallets();
  }, []);

  return {
    // State
    connectedWallet,
    isConnecting,
    error,
    
    // Actions
    connect,
    disconnect, 
    sendTx,
    detectWallets,
    
    // Utils
    isConnected: !!connectedWallet
  };
};