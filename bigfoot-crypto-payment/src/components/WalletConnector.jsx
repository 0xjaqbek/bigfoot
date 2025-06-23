import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { WALLETS_BY_TYPE } from '../utils/constants';
import BackButton from './BackButton';

const WalletConnector = () => {
  const { 
    selectedBlockchain,
    isConnecting,
    setConnecting,
    nextStep,
    prevStep 
  } = usePaymentStore();

  const availableWallets = WALLETS_BY_TYPE[selectedBlockchain?.type] || [];

  const handleWalletConnect = async (wallet) => {
    setConnecting(true);
    
    // TODO: Implement actual wallet connection logic in Phase 2
    // For now, simulate connection and save wallet info
    setTimeout(() => {
      // Save connected wallet info to store
      usePaymentStore.getState().setWallet({
        name: wallet.name,
        type: selectedBlockchain?.type,
        address: 'mock_address_' + Date.now() // Mock address for now
      });
      
      setConnecting(false);
      nextStep();
    }, 2000);
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
    </div>
  );
};

const WalletButton = ({ wallet, isConnecting, onClick }) => (
  <button
    onClick={onClick}
    disabled={isConnecting}
    className={`w-full p-5 backdrop-blur-sm bg-gradient-to-r ${wallet.color} border border-white/30 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-between disabled:opacity-50 group hover:scale-105 shadow-md`}
  >
    <div className="flex items-center">
      <span className="text-2xl mr-4">{wallet.icon}</span>
      <span className="font-semibold text-lg text-white">{wallet.name}</span>
    </div>
    {isConnecting && (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    )}
  </button>
);

export default WalletConnector;