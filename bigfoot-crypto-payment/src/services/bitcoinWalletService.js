// Unisat Wallet Connection
export const connectUnisat = async () => {
  if (typeof window.unisat === 'undefined') {
    throw new Error('Unisat Wallet nie jest zainstalowany');
  }

  try {
    const accounts = await window.unisat.requestAccounts();
    
    if (accounts.length === 0) {
      throw new Error('Brak dostępnych kont');
    }

    // Get network info
    const network = await window.unisat.getNetwork();
    const balance = await window.unisat.getBalance();

    return {
      address: accounts[0],
      network,
      balance,
      provider: window.unisat
    };
  } catch (error) {
    throw new Error(`Błąd połączenia Unisat: ${error.message}`);
  }
};

// Send Bitcoin Transaction via Unisat
export const sendBitcoinTransaction = async (to, amount) => {
  try {
    // Convert amount to satoshis
    const satoshis = Math.round(amount * 100000000);
    
    const txid = await window.unisat.sendBitcoin(to, satoshis);
    return txid;
  } catch (error) {
    throw new Error(`Błąd wysyłania BTC: ${error.message}`);
  }
};

// Trust Wallet (Bitcoin support)
export const connectTrustWallet = async () => {
  // Trust Wallet uses WalletConnect for Bitcoin
  // For now, mock implementation
  throw new Error('Trust Wallet Bitcoin support w trakcie implementacji');
};

// Generic Bitcoin Wallet Detection
export const detectBitcoinWallets = () => {
  const wallets = [];
  
  if (typeof window.unisat !== 'undefined') {
    wallets.push({ name: 'Unisat', detected: true });
  }
  
  if (typeof window.trustwallet !== 'undefined') {
    wallets.push({ name: 'Trust Wallet', detected: true });
  }

  return wallets;
};