import { connectMetaMask, connectWalletConnect, connectCoinbaseWallet, sendEvmTransaction } from './evmWalletService';
import { connectUnisat, connectTrustWallet, sendBitcoinTransaction } from './bitcoinWalletService';
import { connectPhantom, connectSolflare, sendSolanaTransaction } from './solanaWalletService';
import { connectTonkeeper, connectTonWallet as connectTonWalletDirect, connectTonUniversal, sendTonTransaction } from './tonWalletService';

// Unified wallet connection
export const connectWallet = async (walletName, blockchainType) => {
  try {
    let result;

    switch (blockchainType) {
      case 'evm':
        result = await connectEvmWallet(walletName);
        break;
      case 'bitcoin':
        result = await connectBitcoinWallet(walletName);
        break;
      case 'solana':
        result = await connectSolanaWallet(walletName);
        break;
      case 'ton':
        result = await connectTonWalletHelper(walletName);
        break;
      default:
        throw new Error('Nieobsługiwany typ blockchain');
    }

    return {
      ...result,
      walletName,
      blockchainType,
      connected: true,
      connectedAt: Date.now()
    };
  } catch (error) {
    throw new Error(`Błąd połączenia ${walletName}: ${error.message}`);
  }
};

// EVM Wallets
const connectEvmWallet = async (walletName) => {
  switch (walletName) {
    case 'MetaMask':
      return await connectMetaMask();
    case 'WalletConnect':
      return await connectWalletConnect();
    case 'Coinbase Wallet':
      return await connectCoinbaseWallet();
    case 'Rainbow':
      return await connectMetaMask(); // Same API
    default:
      throw new Error('Nieznany EVM wallet');
  }
};

// Bitcoin Wallets
const connectBitcoinWallet = async (walletName) => {
  switch (walletName) {
    case 'Unisat':
      return await connectUnisat();
    case 'Trust Wallet':
      return await connectTrustWallet();
    case 'Coinbase Wallet':
      throw new Error('Coinbase Wallet Bitcoin support w trakcie implementacji');
    case 'Electrum':
      throw new Error('Electrum integration w trakcie implementacji');
    default:
      throw new Error('Nieznany Bitcoin wallet');
  }
};

// Solana Wallets  
const connectSolanaWallet = async (walletName) => {
  switch (walletName) {
    case 'Phantom':
      return await connectPhantom();
    case 'Solflare':
      return await connectSolflare();
    default:
      throw new Error('Nieznany Solana wallet');
  }
};

// TON Wallets - FIXED
const connectTonWalletHelper = async (walletName) => {
  // ✅ IMPROVED: Use universal connection for better UX
  // This will show a modal with all available TON wallets
  try {
    return await connectTonUniversal();
  } catch {
    // Fallback to specific wallet connections if universal fails
    switch (walletName) {
      case 'Tonkeeper':
        return await connectTonkeeper();
      case 'TON Wallet':
        return await connectTonWalletDirect();
      default:
        throw new Error('Nieznany TON wallet');
    }
  }
};

// Unified transaction sending
export const sendTransaction = async (wallet, toAddress, amount) => {
  try {
    let txHash;

    switch (wallet.blockchainType) {
      case 'evm':
        txHash = await sendEvmTransaction(toAddress, amount, wallet.provider);
        break;
      case 'bitcoin':
        txHash = await sendBitcoinTransaction(toAddress, amount);
        break;
      case 'solana':
        txHash = await sendSolanaTransaction(toAddress, amount, wallet);
        break;
      case 'ton':
        txHash = await sendTonTransaction(toAddress, amount);
        break;
      default:
        throw new Error('Nieobsługiwany typ blockchain dla transakcji');
    }

    return txHash;
  } catch (error) {
    throw new Error(`Błąd wysyłania transakcji: ${error.message}`);
  }
};

// Wallet detection
export const detectAvailableWallets = () => {
  const available = {
    evm: [],
    bitcoin: [],
    solana: [],
    ton: []
  };

  // EVM wallets
  if (typeof window.ethereum !== 'undefined') {
    if (window.ethereum.isMetaMask) available.evm.push('MetaMask');
    if (window.ethereum.isCoinbaseWallet) available.evm.push('Coinbase Wallet');
  }

  // Bitcoin wallets
  if (typeof window.unisat !== 'undefined') available.bitcoin.push('Unisat');

  // Solana wallets
  if (window.solana?.isPhantom) available.solana.push('Phantom');
  if (window.solflare?.isSolflare) available.solana.push('Solflare');

  // TON wallets - Always available via bridge
  available.ton.push('Tonkeeper', 'TON Wallet');

  return available;
};