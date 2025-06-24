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
  
  // User Info State - COMPLETE
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Polska',
    fbUsername: '',
    phone: '',
    termsAccepted: false,
    marketingConsent: false
  },
  
  // UI State
  isConnecting: false,
  showMobileInfo: null,
  isLoading: false,
  error: null,
  
  // Price Data
  prices: {},
  lastPriceUpdate: null,
  priceLoading: false,
  priceError: null,
  
  // Transaction State
  transaction: {
    hash: null,
    status: 'idle', // idle, pending, confirmed, failed
    timestamp: null,
    amount: null,
    currency: null
  },
  
  // Email State
  emailSent: false,
  emailError: null,
  supporterEmailSent: false,

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
  
  // Actions - User Info
  setUserInfo: (info) => set({ userInfo: { ...get().userInfo, ...info } }),
  clearUserInfo: () => set({ 
    userInfo: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Polska',
      fbUsername: '',
      phone: '',
      termsAccepted: false,
      marketingConsent: false
    }
  }),

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
    lastPriceUpdate: Date.now(),
    priceError: null
  }),
  setPriceLoading: (loading) => set({ priceLoading: loading }),
  setPriceError: (error) => set({ priceError: error }),
  
  // Actions - Transaction
  setTransaction: (tx) => set({ transaction: { ...get().transaction, ...tx } }),
  resetTransaction: () => set({ 
    transaction: { 
      hash: null, 
      status: 'idle', 
      timestamp: null, 
      amount: null, 
      currency: null 
    } 
  }),
  
  // Actions - Email
  setEmailSent: (sent) => set({ emailSent: sent }),
  setEmailError: (error) => set({ emailError: error }),
  setSupporterEmailSent: (sent) => set({ supporterEmailSent: sent }),

  // Reset Payment Flow
  resetPayment: () => set({
    currentStep: 1,
    selectedAmount: null,
    customAmount: '',
    selectedBlockchain: null,
    selectedCurrency: null,
    connectedWallet: null,
    cryptoAmount: null,
    userInfo: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Polska',
      fbUsername: '',
      phone: '',
      termsAccepted: false,
      marketingConsent: false
    },
    isConnecting: false,
    showMobileInfo: null,
    error: null,
    transaction: { 
      hash: null, 
      status: 'idle', 
      timestamp: null, 
      amount: null, 
      currency: null 
    },
    emailSent: false,
    emailError: null,
    supporterEmailSent: false
  }),

  // Helper - Check if can proceed to next step
  canProceed: () => {
    const state = get();
    switch (state.currentStep) {
      case 1: 
        return !!state.selectedAmount;
      case 2: 
        return !!state.selectedBlockchain && !!state.selectedCurrency;
      case 3: 
        return !!state.cryptoAmount;
      case 4: {
        // User info validation
        const userValid = state.userInfo.firstName.trim() && 
                          state.userInfo.lastName.trim() && 
                          state.userInfo.email.trim() &&
                          state.userInfo.fbUsername.trim() &&
                          state.userInfo.termsAccepted;
        
        // Address validation for physical rewards (amount >= 50)
        const needsAddress = state.selectedAmount >= 50;
        const addressValid = !needsAddress || (
          state.userInfo.address.trim() && 
          state.userInfo.city.trim() && 
          state.userInfo.postalCode.trim()
        );
        
        return userValid && addressValid;
      }
      case 5: 
        return !!state.connectedWallet;
      case 6:
        return state.transaction.status === 'confirmed';
      default: 
        return true;
    }
  },
  
  // Helper - Get tier info by amount
  getTierInfo: () => {
    const amount = get().selectedAmount;
    if (!amount) return null;
    
    if (amount <= 50) return { 
      name: 'Student', 
      rewards: 'Naklejka + dostęp do grupy FB',
      hasPhysicalRewards: true
    };
    if (amount <= 100) return { 
      name: 'Turysta', 
      rewards: 'Naklejka + opaska + grupa FB',
      hasPhysicalRewards: true
    };
    if (amount <= 170) return { 
      name: 'Skaut', 
      rewards: 'Naklejka + złota opaska + grupa FB',
      hasPhysicalRewards: true
    };
    if (amount <= 360) return { 
      name: 'Ranger', 
      rewards: 'Wypukła naklejka + opaska + grupa FB',
      hasPhysicalRewards: true
    };
    if (amount >= 750) return { 
      name: 'Szeryf', 
      rewards: 'Pełen pakiet: naklejki, opaska, t-shirt, czapka, otwieracz + pierwszeństwo w eventach',
      hasPhysicalRewards: true
    };
    
    return { 
      name: 'Custom', 
      rewards: 'Niestandardowa kwota wsparcia',
      hasPhysicalRewards: amount >= 50
    };
  },
  
  // Helper - Get complete payment summary for emails
  getPaymentSummary: () => {
    const state = get();
    const tierInfo = get().getTierInfo();
    
    return {
      // Payment details
      amountPln: state.selectedAmount,
      amountCrypto: state.cryptoAmount?.amount,
      currency: state.cryptoAmount?.symbol,
      blockchain: state.selectedBlockchain?.name,
      wallet: state.connectedWallet?.walletName,
      
      // User details
      firstName: state.userInfo.firstName,
      lastName: state.userInfo.lastName,
      fullName: `${state.userInfo.firstName} ${state.userInfo.lastName}`,
      email: state.userInfo.email,
      phone: state.userInfo.phone,
      fbUsername: state.userInfo.fbUsername,
      
      // Address details
      address: state.userInfo.address,
      city: state.userInfo.city,
      postalCode: state.userInfo.postalCode,
      country: state.userInfo.country,
      fullAddress: state.userInfo.address ? 
        `${state.userInfo.address}, ${state.userInfo.postalCode} ${state.userInfo.city}, ${state.userInfo.country}` : '',
      
      // Tier and rewards
      tierLevel: tierInfo?.name || 'Custom',
      tierRewards: tierInfo?.rewards || 'Niestandardowa kwota',
      hasPhysicalRewards: tierInfo?.hasPhysicalRewards || false,
      
      // Preferences
      termsAccepted: state.userInfo.termsAccepted,
      marketingConsent: state.userInfo.marketingConsent,
      
      // Transaction details
      txHash: state.transaction.hash,
      transactionStatus: state.transaction.status,
      
      // Metadata
      timestamp: new Date().toISOString(),
      paymentDate: new Date().toLocaleDateString('pl-PL'),
      paymentTime: new Date().toLocaleTimeString('pl-PL')
    };
  },
  
  // Helper - Validate user info
  validateUserInfo: () => {
    const state = get();
    const errors = {};
    
    // Required fields
    if (!state.userInfo.firstName.trim()) {
      errors.firstName = 'Imię jest wymagane';
    }
    if (!state.userInfo.lastName.trim()) {
      errors.lastName = 'Nazwisko jest wymagane';
    }
    if (!state.userInfo.email.trim()) {
      errors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.userInfo.email)) {
      errors.email = 'Nieprawidłowy format email';
    }
    if (!state.userInfo.fbUsername.trim()) {
      errors.fbUsername = 'Nazwa użytkownika Facebook jest wymagana';
    }
    
    // Wymagana akceptacja regulaminu
    if (!state.userInfo.termsAccepted) {
      errors.termsAccepted = 'Akceptacja regulaminu i polityki prywatności jest wymagana';
    }
    
    // Address validation for physical rewards
    const needsAddress = state.selectedAmount >= 50;
    if (needsAddress) {
      if (!state.userInfo.address.trim()) {
        errors.address = 'Adres jest wymagany dla wysyłki nagród';
      }
      if (!state.userInfo.city.trim()) {
        errors.city = 'Miasto jest wymagane';
      }
      if (!state.userInfo.postalCode.trim()) {
        errors.postalCode = 'Kod pocztowy jest wymagany';
      } else if (!/^\d{2}-\d{3}$/.test(state.userInfo.postalCode)) {
        errors.postalCode = 'Format kodu pocztowego: XX-XXX';
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}));