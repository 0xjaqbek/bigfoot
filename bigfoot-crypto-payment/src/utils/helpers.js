import { COIN_IDS } from './constants.js';

// Format currency values
export const formatCurrency = (amount, currency = 'PLN', decimals = 2) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
};

// Format crypto amounts
export const formatCrypto = (amount, symbol, decimals = 6) => {
  const formatted = parseFloat(amount).toFixed(decimals);
  return `${formatted} ${symbol}`;
};

// Convert PLN to crypto using prices
export const convertPlnToCrypto = (plnAmount, cryptoSymbol, prices) => {
  const coinId = COIN_IDS[cryptoSymbol];
  if (!coinId || !prices[coinId]?.pln) {
    throw new Error(`Price not found for ${cryptoSymbol}`);
  }
  
  const priceInPln = prices[coinId].pln;
  return plnAmount / priceInPln;
};

// Convert PLN to USD (for stablecoins)
export const convertPlnToUsd = (plnAmount, usdPlnRate = 4.2) => {
  return plnAmount / usdPlnRate;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate amount
export const isValidAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

// Generate transaction hash (mock)
export const generateMockTxHash = () => {
  return '0x' + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

// Format timestamp
export const formatTimestamp = (timestamp = Date.now()) => {
  return new Date(timestamp).toLocaleString('pl-PL');
};

// Get tier info by amount
export const getTierByAmount = (amount, tiers) => {
  return tiers.find(tier => tier.amount === amount) || {
    name: 'Custom',
    amount,
    icon: '💝',
    rewards: 'Niestandardowa kwota wsparcia'
  };
};