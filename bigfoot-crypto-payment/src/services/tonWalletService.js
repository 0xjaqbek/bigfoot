import { TonConnect } from '@tonconnect/sdk';

// ✅ FIXED: Proper TonConnect initialization
let tonConnect = null;

// Initialize TonConnect
const initTonConnect = () => {
  if (!tonConnect) {
    tonConnect = new TonConnect({
      manifestUrl: window.location.origin + '/tonconnect-manifest.json'
    });
  }
  return tonConnect;
};

// Tonkeeper Connection - FIXED
export const connectTonkeeper = async () => {
  try {
    const connector = initTonConnect();
    
    // ✅ FIXED: Use proper TonConnect API
    const walletConnectionSource = {
      bridgeUrl: "https://bridge.tonapi.io/bridge",
      universalLink: "https://app.tonkeeper.com/ton-connect",
      jsBridgeKey: "tonkeeper"
    };

    // Connect to wallet
    await connector.connect(walletConnectionSource);
    
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
    
    const walletConnectionSource = {
      bridgeUrl: "https://bridge.tonapi.io/bridge", 
      universalLink: "https://wallet.ton.org/ton-connect",
      jsBridgeKey: "tonwallet"
    };

    await connector.connect(walletConnectionSource);
    
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

// Send TON Transaction - FIXED
export const sendTonTransaction = async (to, amount) => {
  try {
    const connector = tonConnect;
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