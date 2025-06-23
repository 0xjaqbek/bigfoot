import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Solana RPC Connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Phantom Wallet Connection
export const connectPhantom = async () => {
  if (!window.solana || !window.solana.isPhantom) {
    throw new Error('Phantom Wallet nie jest zainstalowany');
  }

  try {
    const response = await window.solana.connect();
    const publicKey = response.publicKey.toString();
    
    // Get balance
    const balance = await connection.getBalance(response.publicKey);
    
    return {
      address: publicKey,
      publicKey: response.publicKey,
      balance: balance / LAMPORTS_PER_SOL,
      provider: window.solana
    };
  } catch (error) {
    throw new Error(`Błąd połączenia Phantom: ${error.message}`);
  }
};

// Solflare Wallet Connection
export const connectSolflare = async () => {
  if (!window.solflare || !window.solflare.isSolflare) {
    throw new Error('Solflare Wallet nie jest zainstalowany');
  }

  try {
    await window.solflare.connect();
    const publicKey = window.solflare.publicKey.toString();
    
    const balance = await connection.getBalance(window.solflare.publicKey);
    
    return {
      address: publicKey,
      publicKey: window.solflare.publicKey,
      balance: balance / LAMPORTS_PER_SOL,
      provider: window.solflare
    };
  } catch (error) {
    throw new Error(`Błąd połączenia Solflare: ${error.message}`);
  }
};

// Send Solana Transaction
export const sendSolanaTransaction = async (toAddress, amount, wallet) => {
  try {
    const fromPubkey = wallet.publicKey;
    const toPubkey = new PublicKey(toAddress);
    const lamports = amount * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports
      })
    );

    // Get recent blockhash
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