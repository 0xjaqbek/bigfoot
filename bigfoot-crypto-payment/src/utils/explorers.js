// Blockchain explorers configuration
const EXPLORERS = {
  bitcoin: {
    name: 'Blockstream',
    baseUrl: 'https://blockstream.info/tx/',
    txUrl: (hash) => `https://blockstream.info/tx/${hash}`
  },
  ethereum: {
    name: 'Etherscan',
    baseUrl: 'https://etherscan.io/tx/',
    txUrl: (hash) => `https://etherscan.io/tx/${hash}`
  },
  polygon: {
    name: 'PolygonScan',
    baseUrl: 'https://polygonscan.com/tx/',
    txUrl: (hash) => `https://polygonscan.com/tx/${hash}`
  },
  arbitrum: {
    name: 'Arbiscan',
    baseUrl: 'https://arbiscan.io/tx/',
    txUrl: (hash) => `https://arbiscan.io/tx/${hash}`
  },
  optimism: {
    name: 'Optimistic Etherscan',
    baseUrl: 'https://optimistic.etherscan.io/tx/',
    txUrl: (hash) => `https://optimistic.etherscan.io/tx/${hash}`
  },
  solana: {
    name: 'Solscan',
    baseUrl: 'https://solscan.io/tx/',
    txUrl: (hash) => `https://solscan.io/tx/${hash}`
  },
  ton: {
    name: 'TONScan',
    baseUrl: 'https://tonscan.org/tx/',
    txUrl: (hash) => `https://tonscan.org/tx/${hash}`
  }
};

// Get explorer URL for transaction
export const getExplorerUrl = (blockchain, txHash) => {
  if (!txHash) return null;
  
  const blockchainKey = blockchain?.name?.toLowerCase() || blockchain?.type;
  const explorer = EXPLORERS[blockchainKey];
  
  if (!explorer) {
    console.warn(`No explorer configured for blockchain: ${blockchainKey}`);
    return null;
  }
  
  return explorer.txUrl(txHash);
};

// Get explorer name
export const getExplorerName = (blockchain) => {
  const blockchainKey = blockchain?.name?.toLowerCase() || blockchain?.type;
  const explorer = EXPLORERS[blockchainKey];
  return explorer?.name || 'Blockchain Explorer';
};

// Open transaction in explorer
export const openInExplorer = (blockchain, txHash) => {
  const url = getExplorerUrl(blockchain, txHash);
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    console.error('Cannot open explorer: invalid blockchain or transaction hash');
  }
};