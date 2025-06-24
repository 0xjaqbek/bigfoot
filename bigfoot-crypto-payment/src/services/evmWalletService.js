import { ethers } from 'ethers';

// Network configurations
export const NETWORKS = {
  ethereum: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth-mainnet.alchemyapi.io/v2/your-key'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  polygon: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet', 
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  arbitrum: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum One',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io']
  },
  optimism: {
    chainId: '0xa',
    chainName: 'Optimism',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io']
  }
};

// MetaMask Connection
export const connectMetaMask = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask nie jest zainstalowany');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    if (accounts.length === 0) {
      throw new Error('Brak dostępnych kont');
    }

    // Get current network
    const chainId = await window.ethereum.request({
      method: 'eth_chainId'
    });

    return {
      address: accounts[0],
      chainId,
      provider: new ethers.BrowserProvider(window.ethereum)
    };
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('Użytkownik odrzucił połączenie');
    }
    throw new Error(`Błąd połączenia MetaMask: ${error.message}`);
  }
};

// Switch Network
export const switchNetwork = async (networkKey) => {
  const network = NETWORKS[networkKey];
  if (!network) {
    throw new Error('Nieznana sieć');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }]
    });
  } catch (error) {
    // Network not added to MetaMask
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [network]
      });
    } else {
      throw error;
    }
  }
};

// Send Transaction
export const sendEvmTransaction = async (to, amount, provider) => {
  const signer = await provider.getSigner();
  
  const transaction = {
    to,
    value: ethers.parseEther(amount.toString())
  };

  const tx = await signer.sendTransaction(transaction);
  return tx.hash;
};

// WalletConnect (simplified)
export const connectWalletConnect = async () => {
  // WalletConnect integration would go here
  // For now, return mock data
  throw new Error('WalletConnect integration w trakcie implementacji');
};

// Coinbase Wallet
export const connectCoinbaseWallet = async () => {
  if (typeof window.ethereum?.isCoinbaseWallet === 'undefined') {
    throw new Error('Coinbase Wallet nie jest zainstalowany');
  }

  return await connectMetaMask(); // Same API as MetaMask
};