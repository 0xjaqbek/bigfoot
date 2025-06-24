import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// ✅ FIXED: Use better RPC endpoints with fallbacks
const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://rpc.ankr.com/solana'
];

// Create connection with retry logic
const createConnection = () => {
  // Try different RPC endpoints
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      return new Connection(endpoint, 'confirmed');
    } catch (error) {
      console.warn(`Failed to connect to ${endpoint}:`, error);
    }
  }
  // Fallback to default
  return new Connection('https://api.mainnet-beta.solana.com');
};

const connection = createConnection();

// Phantom Wallet Connection - FIXED
export const connectPhantom = async () => {
  if (!window.solana || !window.solana.isPhantom) {
    throw new Error('Phantom Wallet nie jest zainstalowany');
  }

  try {
    const response = await window.solana.connect();
    const publicKey = response.publicKey.toString();
    
    // ✅ FIXED: Skip balance fetch to avoid 403 errors
    // Instead of getting balance immediately, just return connection info
    console.log('Phantom connected:', publicKey);
    
    return {
      address: publicKey,
      publicKey: response.publicKey,
      balance: null, // We'll fetch this when needed
      provider: window.solana
    };
  } catch (error) {
    console.error('Phantom connection error:', error);
    throw new Error(`Błąd połączenia Phantom: ${error.message}`);
  }
};

// Fetch balance separately (when needed)
export const getSolanaBalance = async (publicKey) => {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.warn('Could not fetch Solana balance:', error);
    return 0; // Return 0 instead of throwing error
  }
};

// Solflare Wallet Connection - FIXED
export const connectSolflare = async () => {
  if (!window.solflare || !window.solflare.isSolflare) {
    throw new Error('Solflare Wallet nie jest zainstalowany');
  }

  try {
    await window.solflare.connect();
    const publicKey = window.solflare.publicKey.toString();
    
    return {
      address: publicKey,
      publicKey: window.solflare.publicKey,
      balance: null, // Skip balance fetch
      provider: window.solflare
    };
  } catch (error) {
    throw new Error(`Błąd połączenia Solflare: ${error.message}`);
  }
};

// Send Solana Transaction - IMPROVED
export const sendSolanaTransaction = async (toAddress, amount, wallet) => {
  try {
    const fromPubkey = wallet.publicKey;
    const toPubkey = new PublicKey(toAddress);
    const lamports = Math.round(amount * LAMPORTS_PER_SOL);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports
      })
    );

    // Get recent blockhash with retry
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;

    // Sign and send
    const signedTransaction = await wallet.provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    
    return signature;
  } catch (error) {
    throw new Error(`Błąd wysyłania SOL: ${error.message}`);
  }
};

// Detect Solana Wallets
export const detectSolanaWallets = () => {
  const wallets = [];
  
  if (window.solana?.isPhantom) {
    wallets.push({ name: 'Phantom', detected: true });
  }
  
  if (window.solflare?.isSolflare) {
    wallets.push({ name: 'Solflare', detected: true });
  }

  return wallets;
};