export const TIERS = [
  { 
    name: 'Student', 
    amount: 50, 
    color: 'from-blue-400/60 to-cyan-500/60', 
    icon: '🎓',
    rewards: 'Naklejka + dostęp do grupy FB'
  },
  { 
    name: 'Turysta', 
    amount: 100, 
    color: 'from-emerald-400/60 to-green-500/60', 
    icon: '🗺️',
    rewards: 'Naklejka + opaska + grupa FB'
  },
  { 
    name: 'Skaut', 
    amount: 170, 
    color: 'from-amber-400/60 to-yellow-500/60', 
    icon: '🔍',
    rewards: 'Naklejka + złota opaska + grupa FB'
  },
  { 
    name: 'Ranger', 
    amount: 360, 
    color: 'from-orange-400/60 to-red-500/60', 
    icon: '🏕️',
    rewards: 'Wypukła naklejka + opaska + grupa FB'
  },
  { 
    name: 'Szeryf', 
    amount: 750, 
    color: 'from-purple-400/60 to-pink-500/60', 
    icon: '⭐',
    rewards: 'Pełen pakiet: naklejki, opaska, t-shirt, czapka, otwieracz + pierwszeństwo w eventach'
  }
];

// Blockchain Networks - zawierają domyślne nazwy grup
// Tłumaczenia są obsługiwane przez useTranslations hook
export const BLOCKCHAIN_GROUPS = [
  {
    title: 'Szybkie i tanie', // Tłumaczone w BlockchainSelector jako t('fastAndCheap')
    icon: '⚡',
    color: 'from-emerald-400/20 to-green-500/20',
    chains: [
      { 
        name: 'Solana', 
        symbol: 'SOL', 
        fee: '~0.01$', 
        time: '1s', 
        type: 'solana', 
        hasStablecoin: true 
      },
      { 
        name: 'TON', 
        symbol: 'TON', 
        fee: '~0.02$', 
        time: '5s', 
        type: 'ton', 
        hasStablecoin: true 
      },
      { 
        name: 'Polygon', 
        symbol: 'MATIC', 
        fee: '~0.05$', 
        time: '2s', 
        type: 'evm', 
        hasStablecoin: true 
      }
    ]
  },
  {
    title: 'Popularne', // Tłumaczone jako t('popular')
    icon: '🌟', 
    color: 'from-blue-400/20 to-indigo-500/20',
    chains: [
      { 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        fee: '5-50zł', 
        time: '~30min', 
        type: 'bitcoin', 
        hasStablecoin: false 
      },
      { 
        name: 'Ethereum', 
        symbol: 'ETH', 
        fee: '5-80zł', 
        time: '~2min', 
        type: 'evm', 
        hasStablecoin: true 
      }
    ]
  },
  {
    title: 'L2 Ethereum', // Tłumaczone jako t('ethereumL2')
    icon: '🚀',
    color: 'from-purple-400/20 to-violet-500/20', 
    chains: [
      { 
        name: 'Arbitrum', 
        symbol: 'ARB', 
        fee: '~2zł', 
        time: '~1min', 
        type: 'evm', 
        hasStablecoin: true 
      },
      { 
        name: 'Optimism', 
        symbol: 'OP', 
        fee: '~2zł', 
        time: '~1min', 
        type: 'evm', 
        hasStablecoin: true 
      },
      { 
        name: 'zkSync', 
        symbol: 'ETH', 
        fee: '~1zł', 
        time: '~30s', 
        type: 'evm', 
        hasStablecoin: true 
      }
    ]
  }
];

// Wallet Configuration
export const WALLETS_BY_TYPE = {
  bitcoin: [
    { name: 'Trust Wallet', icon: '🛡️', color: 'from-blue-400/70 to-blue-500/70' },
    { name: 'Coinbase Wallet', icon: '🔵', color: 'from-indigo-400/70 to-indigo-500/70' },
    { name: 'Unisat', icon: '🟠', color: 'from-orange-400/70 to-red-400/70' },
    { name: 'Electrum', icon: '⚡', color: 'from-yellow-400/70 to-orange-400/70' }
  ],
  evm: [
    { name: 'MetaMask', icon: '🦊', color: 'from-orange-400/70 to-red-400/70' },
    { name: 'WalletConnect', icon: '🔗', color: 'from-blue-400/70 to-purple-400/70' },
    { name: 'Coinbase Wallet', icon: '🔵', color: 'from-indigo-400/70 to-indigo-500/70' },
    { name: 'Rainbow', icon: '🌈', color: 'from-pink-400/70 to-purple-400/70' }
  ],
  solana: [
    { name: 'Phantom', icon: '👻', color: 'from-purple-400/70 to-indigo-500/70' },
    { name: 'Solflare', icon: '☀️', color: 'from-yellow-400/70 to-orange-400/70' }
  ],
  ton: [
    { name: 'Tonkeeper', icon: '💎', color: 'from-blue-400/70 to-cyan-400/70' },
    { name: 'TON Wallet', icon: '🔷', color: 'from-indigo-400/70 to-blue-500/70' }
  ]
};

// Price API Configuration - FIXED: Removed ZKS since zkSync Era uses ETH
export const COIN_IDS = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum', 
  'SOL': 'solana',
  'TON': 'the-open-network',
  'MATIC': 'matic-network',
  'ARB': 'arbitrum',
  'OP': 'optimism',
  'USDC': 'usd-coin'
};

// App Configuration - UPDATED WITH 7 STEPS
export const APP_CONFIG = {
  title: 'BigFoot Works - Płatność Krypto',
  description: 'Wsparcie BigFoot Works Bikepark',
  totalSteps: 7, // Updated: 1=Tier, 2=Blockchain, 3=Summary, 4=UserInfo, 5=Wallet, 6=Confirmation, 7=Success
  priceUpdateInterval: 30000, // 30 seconds
  defaultLanguage: 'pl',
  supportedLanguages: ['pl', 'en', 'de', 'sv', 'no', 'da']
};

// Email Templates Configuration
export const EMAIL_CONFIG = {
  foundation: {
    required: true,
    templateEnvVar: 'VITE_EMAILJS_FOUNDATION_TEMPLATE_ID',
    fallbackEnvVar: 'VITE_EMAILJS_TEMPLATE_ID',
    recipient: 'VITE_FOUNDATION_EMAIL'
  },
  supporter: {
    required: false,
    templateEnvVar: 'VITE_EMAILJS_SUPPORTER_TEMPLATE_ID',
    recipient: 'dynamic' // Based on user input
  }
};

// Validation Rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  postalCode: /^\d{2}-\d{3}$/,
  phone: /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{2}\s?\d{3}\s?\d{2}\s?\d{2})$/,
  minAmount: 1,
  maxAmount: 10000
};

// Default country names by language
export const DEFAULT_COUNTRIES = {
  pl: 'Polska',
  en: 'Poland',
  de: 'Polen',
  sv: 'Polen',
  no: 'Polen', 
  da: 'Polen'
};

// Links and URLs
export const LINKS = {
  terms: {
    pl: 'https://bigfootworks.pl/regulamin/',
    en: 'https://bigfootworks.pl/regulamin/', // Jeśli będzie wersja angielska
    de: 'https://bigfootworks.pl/regulamin/', // Jeśli będzie wersja niemiecka
    sv: 'https://bigfootworks.pl/regulamin/', // Jeśli będzie wersja szwedzka
    no: 'https://bigfootworks.pl/regulamin/', // Jeśli będzie wersja norweska
    da: 'https://bigfootworks.pl/regulamin/' // Jeśli będzie wersja duńska
  },
  privacy: {
    pl: 'https://bigfootworks.pl/polityka-prywatnosci/',
    en: 'https://bigfootworks.pl/polityka-prywatnosci/', // Jeśli będzie wersja angielska
    de: 'https://bigfootworks.pl/polityka-prywatnosci/', // Jeśli będzie wersja niemiecka
    sv: 'https://bigfootworks.pl/polityka-prywatnosci/', // Jeśli będzie wersja szwedzka
    no: 'https://bigfootworks.pl/polityka-prywatnosci/', // Jeśli będzie wersja norweska
    da: 'https://bigfootworks.pl/polityka-prywatnosci/' // Jeśli będzie wersja duńska
  },
  website: 'https://bigfootworks.pl'
};