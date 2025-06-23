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
  
  // Price Data - EXPANDED
  prices: {},
  lastPriceUpdate: null,
  priceLoading: false,
  priceError: null,
  
  // Transaction State - NEW
  transaction: {
    hash: null,
    status: 'pending', // pending, confirmed, failed
    timestamp: null,
    amount: null,
    currency: null
  },
  
  // Email State - NEW  
  emailSent: false,
  emailError: null,

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

  // Actions - Prices - EXPANDED
  setPrices: (prices) => set({ 
    prices, 
    lastPriceUpdate: Date.now(),
    priceError: null
  }),
  setPriceLoading: (loading) => set({ priceLoading: loading }),
  setPriceError: (error) => set({ priceError: error }),
  
  // Actions - Transaction - NEW
  setTransaction: (tx) => set({ transaction: { ...get().transaction, ...tx } }),
  resetTransaction: () => set({ 
    transaction: { 
      hash: null, 
      status: 'pending', 
      timestamp: null, 
      amount: null, 
      currency: null 
    } 
  }),
  
  // Actions - Email - NEW
  setEmailSent: (sent) => set({ emailSent: sent }),
  setEmailError: (error) => set({ emailError: error }),

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
    error: null,
    transaction: { 
      hash: null, 
      status: 'pending', 
      timestamp: null, 
      amount: null, 
      currency: null 
    },
    emailSent: false,
    emailError: null
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
  },
  
  // Helper - Get payment summary for email
  getPaymentSummary: () => {
    const state = get();
    return {
      amountPln: state.selectedAmount,
      amountCrypto: state.cryptoAmount?.amount,
      currency: state.cryptoAmount?.symbol,
      blockchain: state.selectedBlockchain?.name,
      wallet: state.connectedWallet?.walletName,
      tierLevel: state.selectedAmount <= 50 ? 'Student' : 
                state.selectedAmount <= 100 ? 'Tourist' :
                state.selectedAmount <= 170 ? 'Scout' :
                state.selectedAmount <= 360 ? 'Ranger' : 'Szeryf',
      timestamp: new Date().toISOString()
    };
  }
}));