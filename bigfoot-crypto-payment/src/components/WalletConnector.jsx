import React, { useEffect, useState } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { useWallet } from '../hooks/useWallet';
import { WALLETS_BY_TYPE } from '../utils/constants';
import BackButton from './BackButton';

const WalletConnector = () => {
  const { 
    selectedBlockchain,
    nextStep,
    prevStep 
  } = usePaymentStore();

  const { connect, isConnecting, error, detectWallets } = useWallet();
  const [availableWallets, setAvailableWallets] = useState([]);

  // Detect available wallets on mount
  useEffect(() => {
    const detected = detectWallets();
    const blockchainType = selectedBlockchain?.type;
    const configuredWallets = WALLETS_BY_TYPE[blockchainType] || [];
    
    // Filter wallets to show only detected ones
    const available = configuredWallets.map(wallet => ({
      ...wallet,
      detected: detected[blockchainType]?.includes(wallet.name) || false
    }));
    
    setAvailableWallets(available);
  }, [selectedBlockchain, detectWallets]);

  const handleWalletConnect = async (wallet) => {
    try {
      await connect(wallet.name, selectedBlockchain?.type);
      nextStep();
    } catch (err) {
      // Error is handled by useWallet hook
      console.error('Wallet connection failed:', err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Połącz portfel</h2>
        <div className="text-sm text-gray-600 backdrop-blur-sm bg-white/40 px-4 py-2 rounded-xl border border-gray-200/50 inline-block">
          Kompatybilne z {selectedBlockchain?.name}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100/70 border border-red-200/50 rounded-xl">
          <div className="text-red-800 text-sm">{error}</div>
        </div>
      )}

      <div className="space-y-4">
        {availableWallets.map((wallet) => (
          <WalletButton
            key={wallet.name}
            wallet={wallet}
            isConnecting={isConnecting}
            onClick={() => handleWalletConnect(wallet)}
          />
        ))}
      </div>

      {/* No wallets detected */}
      {availableWallets.filter(w => w.detected).length === 0 && (
        <div className="text-center mt-6 p-4 bg-yellow-100/70 border border-yellow-200/50 rounded-xl">
          <div className="text-yellow-800 text-sm">
            Nie wykryto żadnych portfeli dla sieci {selectedBlockchain?.name}.
            Zainstaluj jeden z obsługiwanych portfeli.
          </div>
        </div>
      )}
    </div>
  );
};

const WalletButton = ({ wallet, isConnecting, onClick }) => (
  <button
    onClick={onClick}
    disabled={isConnecting || !wallet.detected}
    className={`w-full p-5 backdrop-blur-sm bg-gradient-to-r ${wallet.color} border border-white/30 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-between group hover:scale-105 shadow-md
      ${!wallet.detected ? 'opacity-50 cursor-not-allowed' : ''}
      ${isConnecting ? 'opacity-75' : ''}`}
  >
    <div className="flex items-center">
      <span className="text-2xl mr-4">{wallet.icon}</span>
      <div className="text-left">
        <span className="font-semibold text-lg text-white block">{wallet.name}</span>
        {!wallet.detected && (
          <span className="text-xs text-white/70">Nie zainstalowany</span>
        )}
      </div>
    </div>
    {isConnecting && (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    )}
  </button>
);

export default WalletConnector;