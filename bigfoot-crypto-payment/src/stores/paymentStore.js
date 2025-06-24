import { create } from 'zustand';

export const usePaymentStore = create((set, get) => ({
  // Language State
  language: 'pl', // domyślny język
  
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

  // Actions - Language
  setLanguage: (language) => {
    set({ language });
    // Update country default based on language
    const countryDefaults = {
      pl: 'Polska',
      en: 'Poland',
      de: 'Polen',
      sv: 'Polen',
      no: 'Polen', 
      da: 'Polen'
    };
    if (get().userInfo.country === get().userInfo.country) {
      set(state => ({
        userInfo: {
          ...state.userInfo,
          country: countryDefaults[language] || 'Polska'
        }
      }));
    }
  },

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
    // language nie resetujemy - pozostaje wybór użytkownika
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
    const language = get().language;
    
    if (!amount) return null;
    
    // Get localized tier data
    const tierData = {
      pl: {
        student: { name: 'Student', rewards: 'Naklejka + dostęp do grupy FB' },
        tourist: { name: 'Turysta', rewards: 'Naklejka + opaska + grupa FB' },
        scout: { name: 'Skaut', rewards: 'Naklejka + złota opaska + grupa FB' },
        ranger: { name: 'Ranger', rewards: 'Wypukła naklejka + opaska + grupa FB' },
        sheriff: { name: 'Szeryf', rewards: 'Pełen pakiet: naklejki, opaska, t-shirt, czapka, otwieracz + pierwszeństwo w eventach' },
        custom: { name: 'Custom', rewards: 'Niestandardowa kwota wsparcia' }
      },
      en: {
        student: { name: 'Student', rewards: 'Sticker + FB group access' },
        tourist: { name: 'Tourist', rewards: 'Sticker + wristband + FB group' },
        scout: { name: 'Scout', rewards: 'Sticker + gold wristband + FB group' },
        ranger: { name: 'Ranger', rewards: '3D sticker + wristband + FB group' },
        sheriff: { name: 'Sheriff', rewards: 'Full package: stickers, wristband, t-shirt, cap, bottle opener + event priority' },
        custom: { name: 'Custom', rewards: 'Custom support amount' }
      },
      de: {
        student: { name: 'Student', rewards: 'Aufkleber + FB-Gruppenzugang' },
        tourist: { name: 'Tourist', rewards: 'Aufkleber + Armband + FB-Gruppe' },
        scout: { name: 'Pfadfinder', rewards: 'Aufkleber + goldenes Armband + FB-Gruppe' },
        ranger: { name: 'Ranger', rewards: '3D-Aufkleber + Armband + FB-Gruppe' },
        sheriff: { name: 'Sheriff', rewards: 'Vollpaket: Aufkleber, Armband, T-Shirt, Mütze, Flaschenöffner + Event-Priorität' },
        custom: { name: 'Custom', rewards: 'Individuelle Unterstützung' }
      },
      sv: {
        student: { name: 'Student', rewards: 'Klistermärke + FB-gruppåtkomst' },
        tourist: { name: 'Turist', rewards: 'Klistermärke + armband + FB-grupp' },
        scout: { name: 'Scout', rewards: 'Klistermärke + guldarmband + FB-grupp' },
        ranger: { name: 'Ranger', rewards: '3D-klistermärke + armband + FB-grupp' },
        sheriff: { name: 'Sheriff', rewards: 'Fullständigt paket: klistermärken, armband, t-shirt, keps, flasköppnare + evenemangsprioritet' },
        custom: { name: 'Anpassad', rewards: 'Anpassat stödbelopp' }
      },
      no: {
        student: { name: 'Student', rewards: 'Klistremerke + FB-gruppeadgang' },
        tourist: { name: 'Turist', rewards: 'Klistremerke + armbånd + FB-gruppe' },
        scout: { name: 'Speider', rewards: 'Klistremerke + gullarmbånd + FB-gruppe' },
        ranger: { name: 'Ranger', rewards: '3D-klistremerke + armbånd + FB-gruppe' },
        sheriff: { name: 'Sheriff', rewards: 'Komplett pakke: klistremerker, armbånd, t-skjorte, caps, flaskeåpner + arrangementsprioritet' },
        custom: { name: 'Tilpasset', rewards: 'Tilpasset støttebeløp' }
      },
      da: {
        student: { name: 'Student', rewards: 'Klistermærke + FB-gruppeadgang' },
        tourist: { name: 'Turist', rewards: 'Klistermærke + armbånd + FB-gruppe' },
        scout: { name: 'Spejder', rewards: 'Klistermærke + guldarmbånd + FB-gruppe' },
        ranger: { name: 'Ranger', rewards: '3D-klistermærke + armbånd + FB-gruppe' },
        sheriff: { name: 'Sheriff', rewards: 'Komplet pakke: klistermærker, armbånd, t-shirt, kasket, flaskeåbner + arrangementsprioritet' },
        custom: { name: 'Tilpasset', rewards: 'Tilpasset støttebeløb' }
      }
    };
    
    const currentLang = tierData[language] || tierData.pl;
    
    if (amount <= 50) return { 
      ...currentLang.student,
      hasPhysicalRewards: true
    };
    if (amount <= 100) return { 
      ...currentLang.tourist,
      hasPhysicalRewards: true
    };
    if (amount <= 170) return { 
      ...currentLang.scout,
      hasPhysicalRewards: true
    };
    if (amount <= 360) return { 
      ...currentLang.ranger,
      hasPhysicalRewards: true
    };
    if (amount >= 750) return { 
      ...currentLang.sheriff,
      hasPhysicalRewards: true
    };
    
    return { 
      ...currentLang.custom,
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
      paymentTime: new Date().toLocaleTimeString('pl-PL'),
      language: state.language
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