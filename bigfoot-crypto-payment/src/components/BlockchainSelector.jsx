import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { BLOCKCHAIN_GROUPS } from '../utils/constants';
import { ChevronLeft } from 'lucide-react';
import BackButton from './BackButton';
import Modal from './Modal';

const BlockchainSelector = () => {
  const { 
    selectedAmount, 
    showMobileInfo, 
    setMobileInfo,
    setBlockchain,
    setCurrency,
    nextStep,
    prevStep 
  } = usePaymentStore();

  const handleBlockchainSelect = (chain) => {
    setMobileInfo(chain);
  };

  const handleConfirmSelection = (chain, currency) => {
    setBlockchain(chain);
    setCurrency(currency);
    setMobileInfo(null);
    nextStep();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">Wybierz blockchain</h2>
        <div className="backdrop-blur-sm bg-gradient-to-r from-emerald-400/20 to-green-500/20 border border-emerald-300/30 inline-block px-6 py-3 rounded-xl shadow-sm">
          <span className="text-emerald-200 font-bold text-lg">{selectedAmount} PLN</span>
        </div>
      </div>

      {/* Sekcje blockchain obok siebie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {BLOCKCHAIN_GROUPS.map((group) => (
          <BlockchainGroup 
            key={group.title}
            group={group}
            onChainSelect={handleBlockchainSelect}
          />
        ))}
      </div>

      {/* Universal Modal */}
      {showMobileInfo && (
        <Modal
          chain={showMobileInfo}
          onClose={() => setMobileInfo(null)}
          onConfirm={handleConfirmSelection}
        />
      )}
    </div>
  );
};

const BlockchainGroup = ({ group, onChainSelect }) => (
  <div className="backdrop-blur-sm bg-white/40 border border-gray-200/50 rounded-2xl p-6 shadow-lg">
    <div className="flex items-center mb-4">
      <div className="text-2xl mr-3">{group.icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{group.title}</h3>
    </div>
    
    <div className="flex flex-row flex-wrap gap-3">
      {group.chains.map((chain) => (
        <div key={chain.name} className="flex-1 min-w-0">
          <BlockchainCard 
            chain={chain} 
            onClick={() => onChainSelect(chain)}
          />
        </div>
      ))}
    </div>
  </div>
);

const BlockchainCard = ({ chain, onClick }) => (
  <button
    onClick={() => onClick(chain)}
    className="w-full h-14 backdrop-blur-sm bg-white/60 border border-gray-200/50 hover:border-gray-300/70 rounded-xl p-3 transition-all duration-200 hover:shadow-md hover:scale-102 flex items-center justify-center text-left"
  >
    <div className="flex items-center space-x-2">
      <div className="text-lg">{chain.logo}</div>
      <div>
        <div className="font-semibold text-gray-800 text-sm">{chain.name}</div>
      </div>
    </div>
  </button>
);

export default BlockchainSelector;