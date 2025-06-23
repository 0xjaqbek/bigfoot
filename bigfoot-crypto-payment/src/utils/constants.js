// Payment Tiers
export const TIERS = [
  { 
    name: 'Student', 
    amount: 50, 
    color: 'from-blue-400/60 to-cyan-500/60', 
    icon: '🎓',
    rewards: 'Naklejka + dostęp do grupy FB'
  },
  { 
    name: 'Tourist', 
    amount: 100, 
    color: 'from-emerald-400/60 to-green-500/60', 
    icon: '🗺️',
    rewards: 'Naklejka + opaska + grupa FB'
  },
  { 
    name: 'Scout', 
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

// Blockchain Networks
export const BLOCKCHAIN_GROUPS = [
  {
    title: 'Szybkie i tanie',
    icon: '⚡',
    color: 'from-emerald-400/20 to-green-500/20',
    chains: [
      { 
        name: 'Solana', 
        symbol: 'SOL', 
        fee: '~0.01$', 
        time: '1s', 
        logo: '◐', 
        type: 'solana', 
        hasStablecoin: true 
      },
      { 
        name: 'TON', 
        symbol: 'TON', 
        fee: '~0.02$', 
        time: '5s', 
        logo: '💎', 
        type: 'ton', 
        hasStablecoin: true 
      },
      { 
        name: 'Polygon', 
        symbol: 'MATIC', 
        fee: '~0.05$', 
        time: '2s', 
        logo: '🔷', 
        type: 'evm', 
        hasStablecoin: true 
      }
    ]
  },
  {
    title: 'Popularne',
    icon: '🌟', 
    color: 'from-blue-400/20 to-indigo-500/20',
    chains: [
      { 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        fee: '15-50zł', 
        time: '30min', 
        logo: '₿', 
        type: 'bitcoin', 
        hasStablecoin: false 
      },
      { 
        name: 'Ethereum', 
        symbol: 'ETH', 
        fee: '20-80zł', 
        time: '2min', 
        logo: 'Ξ', 
        type: 'evm', 
        hasStablecoin: true 
      }
    ]
  },
  {
    title: 'L2 Ethereum',
    icon: '🚀',
    color: 'from-purple-400/20 to-violet-500/20', 
    chains: [
      { 
        name: 'Arbitrum', 
        symbol: 'ARB', 
        fee: '~2zł', 
        time: '1min', 
        logo: '🔵', 
        type: 'evm', 
        hasStablecoin: true 
      },
      { 
        name: 'Optimism', 
        symbol: 'OP', 
        fee: '~2zł', 
        time: '1min', 
        logo: '🔴', 
        type: 'evm', 
        hasStablecoin: true 
      },
      { 
        name: 'zkSync', 
        symbol: 'ZKS', 
        fee: '~1zł', 
        time: '30s', 
        logo: '⚪', 
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

// Price API Configuration  
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

// App Configuration
export const APP_CONFIG = {
  title: 'BigFoot Works - Płatność Krypto',
  description: 'Wsparcie BigFoot Works Bikepark',
  totalSteps: 6,
  priceUpdateInterval: 30000, // 30 seconds
  defaultLanguage: 'pl'
};