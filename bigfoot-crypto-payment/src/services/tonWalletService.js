// ✅ COMPLETE REWRITE: Simplified TON wallet service without UI conflicts

// Global instance management to prevent conflicts
const TONCONNECT_GLOBAL_KEY = '__tonconnect_instance__';

// Get or create global TonConnect instance
const getTonConnectInstance = async () => {
  // Check if custom element is already registered
  if (customElements.get('tc-root')) {
    console.warn('TonConnect custom elements already registered, using existing instance');
    
    // Try to use existing global instance
    if (window[TONCONNECT_GLOBAL_KEY]) {
      return window[TONCONNECT_GLOBAL_KEY];
    }
  }

  try {
    // Dynamic import to avoid conflicts
    const { TonConnectUI } = await import('@tonconnect/ui-react');
    
    const instance = new TonConnectUI({
      manifestUrl: window.location.origin + '/bigfoot/tonconnect-manifest.json'
    });

    // Store globally
    window[TONCONNECT_GLOBAL_KEY] = instance;
    return instance;
  } catch (error) {
    console.error('Failed to create TonConnect instance:', error);
    throw new Error('TonConnect UI nie może zostać zainicjalizowany');
  }
};

// ✅ SIMPLIFIED: Direct wallet connection without UI conflicts
export const connectTonkeeper = async () => {
  try {
    // First try direct Tonkeeper extension if available
    if (window.tonkeeper) {
      const result = await window.tonkeeper.connect();
      return {
        address: result.address,
        chain: 'mainnet',
        publicKey: result.publicKey,
        provider: window.tonkeeper
      };
    }

    // Fallback to TonConnect if no direct extension
    const connector = await getTonConnectInstance();
    
    // Use openModal for better UX
    await connector.openModal();
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Nie połączono portfela w ciągu 30 sekund'));
      }, 30000);

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
    console.error('Tonkeeper connection error:', error);
    throw new Error(`Błąd połączenia Tonkeeper: ${error.message}`);
  }
};

// TON Wallet Connection - Simplified
export const connectTonWallet = async () => {
  try {
    const connector = await getTonConnectInstance();
    await connector.openModal();
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Nie połączono portfela'));
      }, 30000);

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
    console.error('TON Wallet connection error:', error);
    throw new Error(`Błąd połączenia TON Wallet: ${error.message}`);
  }
};

// ✅ UNIVERSAL: Best approach - let user choose
export const connectTonUniversal = async () => {
  try {
    const connector = await getTonConnectInstance();
    
    // Open wallet selection modal
    await connector.openModal();
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Nie wybrano portfela'));
      }, 60000);

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

      // Handle modal close
      const modalUnsubscribe = connector.onModalStateChange?.((state) => {
        if (state.status === 'closed' && !connector.wallet) {
          clearTimeout(timeout);
          unsubscribe();
          modalUnsubscribe?.();
          reject(new Error('Modal został zamknięty'));
        }
      });
    });
  } catch (error) {
    console.error('TON Universal connection error:', error);
    throw new Error(`Błąd połączenia TON: ${error.message}`);
  }
};

// Send TON Transaction
export const sendTonTransaction = async (to, amount) => {
  try {
    const connector = window[TONCONNECT_GLOBAL_KEY];
    if (!connector || !connector.wallet) {
      throw new Error('TON wallet nie jest połączony');
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: to,
          amount: (amount * 1000000000).toString(),
        }
      ]
    };

    const result = await connector.sendTransaction(transaction);
    return result.boc;
  } catch (error) {
    throw new Error(`Błąd wysyłania TON: ${error.message}`);
  }
};

// ✅ MOCK fallback for development
export const connectTonMock = async () => {
  // Mock connection for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address: 'UQBvI0aFLnw2QbZgjMPCLRdtRHxhUyinQudg6sdiohIwg5jL',
        chain: 'mainnet',
        publicKey: 'mock_public_key',
        provider: { isMock: true }
      });
    }, 1000);
  });
};

// Detect TON Wallets
export const detectTonWallets = () => {
  const detected = [];
  
  // Check for direct extensions
  if (window.tonkeeper) {
    detected.push({ name: 'Tonkeeper', detected: true, type: 'extension' });
  }
  
  if (window.ton) {
    detected.push({ name: 'TON Wallet', detected: true, type: 'extension' });
  }

  // TonConnect wallets are always available via bridge
  if (detected.length === 0) {
    detected.push(
      { name: 'Tonkeeper', detected: true, type: 'bridge' },
      { name: 'TON Wallet', detected: true, type: 'bridge' }
    );
  }

  return detected;
};

// ✅ SAFE cleanup
export const resetTonConnect = () => {
  try {
    const instance = window[TONCONNECT_GLOBAL_KEY];
    if (instance && typeof instance.disconnect === 'function') {
      instance.disconnect().catch(() => {
        // Ignore disconnect errors
      });
    }
  } catch (error) {
    console.warn('Error during TON reset:', error);
  }
  
  // Don't delete global instance to prevent re-registration issues
  // window[TONCONNECT_GLOBAL_KEY] = null;
};