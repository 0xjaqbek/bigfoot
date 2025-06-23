import { TonConnect } from '@tonconnect/sdk';

// TON Connect Configuration
const tonConnect = new TonConnect({
  manifestUrl: 'https://your-domain.com/tonconnect-manifest.json'
});

// Tonkeeper Connection
export const connectTonkeeper = async () => {
  try {
    const walletConnectionSource = {
      jsBridgeKey: "tonkeeper",
      bridgeUrl: "https://bridge.tonapi.io/bridge",
      universalLink: "https://app.tonkeeper.com/ton-connect"
    };

    const connectedWallet = await tonConnect.connectWallet(walletConnectionSource);
    
    return {
      address: connectedWallet.account.address,
      chain: connectedWallet.account.chain,
      publicKey: connectedWallet.account.publicKey,
      provider: tonConnect
    };
  } catch (error) {
    throw new Error(`Błąd połączenia Tonkeeper: ${error.message}`);
  }
};

// TON Wallet Connection
export const connectTonWallet = async () => {
  // Similar to Tonkeeper but different bridge
  try {
    const walletConnectionSource = {
      jsBridgeKey: "tonwallet",
      bridgeUrl: "https://bridge.tonapi.io/bridge", 
      universalLink: "https://wallet.ton.org/ton-connect"
    };

    const connectedWallet = await tonConnect.connectWallet(walletConnectionSource);
    
    return {
      address: connectedWallet.account.address,
      chain: connectedWallet.account.chain,
      publicKey: connectedWallet.account.publicKey,
      provider: tonConnect
    };
  } catch (error) {
    throw new Error(`Błąd połączenia TON Wallet: ${error.message}`);
  }
};

// Send TON Transaction
export const sendTonTransaction = async (to, amount) => {
  try {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      messages: [
        {
          address: to,
          amount: (amount * 1000000000).toString(), // Convert to nanotons
        }
      ]
    };

    const result = await tonConnect.sendTransaction(transaction);
    return result.boc; // Transaction hash
  } catch (error) {
    throw new Error(`Błąd wysyłania TON: ${error.message}`);
  }
};