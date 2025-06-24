import { TonConnectUI } from '@tonconnect/ui-react';

// ✅ FIXED: Use TonConnect UI instead of SDK
let tonConnectUI = null;

// Initialize TonConnect UI
const initTonConnect = () => {
  if (!tonConnectUI) {
    tonConnectUI = new TonConnectUI({
      manifestUrl: window.location.origin + '/bigfoot/tonconnect-manifest.json'
    });
  }
  return tonConnectUI;
};

// Tonkeeper Connection - FIXED
export const connectTonkeeper = async () => {
  try {
    const connector = initTonConnect();
    
    // Connect to Tonkeeper specifically
    await connector.connectWallet({
      name: 'tonkeeper',
      bridgeUrl: 'https://bridge.tonapi.io/bridge',
      universalLink: 'https://app.tonkeeper.com/ton-connect'
    });
    
    // Wait for connection
    const wallet = connector.wallet;
    if (!wallet) {
      throw new Error('Nie udało się połączyć z Tonkeeper');
    }
    
    return {
      address: wallet.account.address,
      chain: wallet.account.chain,
      publicKey: wallet.account.publicKey,
      provider: connector
    };
  } catch (error) {
    console.error('Tonkeeper connection error:', error);
    throw new Error(`Błąd połączenia Tonkeeper: ${error.message}`);
  }
};

// TON Wallet Connection - FIXED
export const connectTonWallet = async () => {
  try {
    const connector = initTonConnect();
    
    // Connect to TON Wallet
    await connector.connectWallet({
      name: 'tonwallet',
      bridgeUrl: 'https://bridge.tonapi.io/bridge',
      universalLink: 'https://wallet.ton.org/ton-connect'
    });
    
    const wallet = connector.wallet;
    if (!wallet) {
      throw new Error('Nie udało się połączyć z TON Wallet');
    }
    
    return {
      address: wallet.account.address,
      chain: wallet.account.chain,
      publicKey: wallet.account.publicKey,
      provider: connector
    };
  } catch (error) {
    console.error('TON Wallet connection error:', error);
    throw new Error(`Błąd połączenia TON Wallet: ${error.message}`);
  }
};

// ✅ IMPROVED: Universal TON connection with wallet selection
export const connectTonUniversal = async () => {
  try {
    const connector = initTonConnect();
    
    // Open wallet selection modal
    await connector.openModal();
    
    // Return promise that resolves when wallet connects
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Nie wybrano portfela w ciągu 60 sekund'));
      }, 60000);
      
      // Listen for wallet connection
      const unsubscribe = connector.onStatusChange((wallet) => {
        if (wallet) {
          clearTimeout(timeout);
          unsubscribe();
          resolve({
            address: wallet.account.address,
            chain: wallet.account.chain,
            publicKey: wallet.account.publicKey,
            provider: connector
          });
        }
      });
    });
  } catch (error) {
    console.error('TON Universal connection error:', error);
    throw new Error(`Błąd połączenia TON: ${error.message}`);
  }
};

// Send TON Transaction - FIXED
export const sendTonTransaction = async (to, amount) => {
  try {
    const connector = tonConnectUI;
    if (!connector || !connector.wallet) {
      throw new Error('TON wallet nie jest połączony');
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      messages: [
        {
          address: to,
          amount: (amount * 1000000000).toString(), // Convert to nanotons
        }
      ]
    };

    const result = await connector.sendTransaction(transaction);
    return result.boc; // Transaction hash
  } catch (error) {
    throw new Error(`Błąd wysyłania TON: ${error.message}`);
  }
};

// ✅ NEW: Check if TON wallets are available
export const detectTonWallets = () => {
  // TON wallets work via bridge, so they're always "available"
  // Real detection happens during connection attempt
  return [
    { name: 'Tonkeeper', detected: true },
    { name: 'TON Wallet', detected: true }
  ];
};