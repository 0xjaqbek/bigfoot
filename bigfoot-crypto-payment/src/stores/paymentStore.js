import { create } from 'zustand';

export const usePaymentStore = create((set, get) => ({
  // Payment State
  currentStep: 1,
  selectedAmount: null,
  customAmount: '',
  selectedBlockchain: null,
  selectedCurrency: null,
  connectedWallet: null,
  cryptoAmount: null,
  
  // UI State
  isConnecting: false,
  showMobileInfo: null,
  isLoading: false,
  error: null,
  
  // Price Data
  prices: {},
  lastPriceUpdate: null,

  // Actions - Step Navigation
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),

  // Actions - Payment Data
  setAmount: (amount) => set({ selectedAmount: amount }),
  setCustomAmount: (amount) => set({ customAmount: amount }),
  setBlockchain: (blockchain) => set({ selectedBlockchain: blockchain }),
  setCurrency: (currency) => set({ selectedCurrency: currency }),
  setCryptoAmount: (amount) => set({ cryptoAmount: amount }),

  // Actions - Wallet
  setWallet: (wallet) => set({ connectedWallet: wallet }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),

  // Actions - UI
  setMobileInfo: (info) => set({ showMobileInfo: info }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Actions - Prices  
  setPrices: (prices) => set({ 
    prices, 
    lastPriceUpdate: Date.now() 
  }),

  // Reset Payment Flow
  resetPayment: () => set({
    currentStep: 1,
    selectedAmount: null,
    customAmount: '',
    selectedBlockchain: null,
    selectedCurrency: null,
    connectedWallet: null,
    cryptoAmount: null,
    isConnecting: false,
    showMobileInfo: null,
    error: null
  }),

  // Helper - Check if can proceed to next step
  canProceed: () => {
    const state = get();
    switch (state.currentStep) {
      case 1: return !!state.selectedAmount;
      case 2: return !!state.selectedBlockchain && !!state.selectedCurrency;
      case 3: return !!state.cryptoAmount;
      case 4: return !!state.connectedWallet;
      default: return true;
    }
  }
}));