import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { usePrices } from '../hooks/usePrices';
import { X, Calculator, Coins, TrendingUp, Copy, Check, RefreshCw, ArrowLeft, ChevronRight, AlertCircle } from 'lucide-react';

const CalculationModal = ({ isOpen, onClose, onAmountSelect }) => {
  const { t } = useTranslations();
  const { calculateCrypto, loading: priceLoading, fetchPrices, hasData } = usePrices();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedBlockchainStep, setSelectedBlockchainStep] = useState(null);
  const [copiedAmount, setCopiedAmount] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [customAmountError, setCustomAmountError] = useState('');

  // Available blockchains
  const blockchains = [
    { name: 'Bitcoin', symbol: 'BTC', hasStablecoin: false, icon: '₿', color: 'from-orange-400 to-yellow-500' },
    { name: 'Ethereum', symbol: 'ETH', hasStablecoin: true, icon: 'Ξ', color: 'from-blue-400 to-indigo-500' },
    { name: 'Solana', symbol: 'SOL', hasStablecoin: true, icon: '◎', color: 'from-purple-400 to-pink-500' },
    { name: 'TON', symbol: 'TON', hasStablecoin: true, icon: '💎', color: 'from-cyan-400 to-blue-500' }
  ];

  // Tier amounts in PLN
  const tiers = [
    { name: 'student', amount: 50, icon: '🎓', color: 'from-blue-400/20 to-cyan-500/20' },
    { name: 'tourist', amount: 100, icon: '🗺️', color: 'from-emerald-400/20 to-green-500/20' },
    { name: 'scout', amount: 170, icon: '🔍', color: 'from-amber-400/20 to-yellow-500/20' },
    { name: 'ranger', amount: 360, icon: '🏕️', color: 'from-orange-400/20 to-red-500/20' },
    { name: 'sheriff', amount: 750, icon: '⭐', color: 'from-purple-400/20 to-pink-500/20' },
    { name: 'custom', amount: null, icon: '💝', color: 'from-gray-400/20 to-slate-500/20' }
  ];

  useEffect(() => {
    if (isOpen && !hasData) {
      fetchPrices(false);
    }
  }, [isOpen, hasData, fetchPrices]);

  // Reset modal when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedTier(null);
      setSelectedBlockchainStep(null);
      setCopiedAmount(null);
      setCustomAmount('');
      setCustomAmountError('');
    }
  }, [isOpen]);

  const handleRefreshPrices = async () => {
    setRefreshing(true);
    try {
      await fetchPrices(false);
    } catch (error) {
      console.error('Failed to refresh prices:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCustomAmountSubmit = () => {
    const amount = parseFloat(customAmount);
    
    // Validate custom amount
    if (!customAmount || isNaN(amount) || amount <= 0) {
      setCustomAmountError(t('amountRequired'));
      return;
    }
    
    if (amount < 1) {
      setCustomAmountError(t('minimumAmount'));
      return;
    }
    
    if (amount > 10000) {
      setCustomAmountError(t('maximumAmount'));
      return;
    }
    
    // Clear error and update tier with custom amount
    setCustomAmountError('');
    setSelectedTier({
      ...selectedTier,
      amount: amount
    });
    setCurrentStep(2);
  };

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    if (tier.name === 'custom') {
      // For custom tier, stay on step 1 to show custom amount input
      // Don't proceed to step 2 yet
    } else {
      setCurrentStep(2);
    }
  };

  const handleBlockchainSelect = (blockchain) => {
    console.log('=== BLOCKCHAIN SELECTED ===');
    console.log('Selected blockchain object:', blockchain);
    console.log('Blockchain name:', blockchain?.name);
    setSelectedBlockchainStep(blockchain);
    setCurrentStep(3);
  };

  const handleCopyAmount = async (amount, symbol) => {
    try {
      await navigator.clipboard.writeText(amount.toString());
      setCopiedAmount(`${amount}-${symbol}`);
      setTimeout(() => setCopiedAmount(null), 2000);
    } catch (error) {
      console.error('Failed to copy amount:', error);
    }
  };

  const handleSelectAmount = (cryptoData, currencyType) => {
    console.log('=== CALCULATOR SENDING DATA ===');
    console.log('selectedBlockchainStep:', selectedBlockchainStep);
    console.log('selectedBlockchainStep.name:', selectedBlockchainStep?.name);
    
    const dataToSend = {
      plnAmount: selectedTier.amount,
      cryptoAmount: cryptoData.amount,
      symbol: cryptoData.symbol,
      tierName: selectedTier.name === 'custom' ? t('customAmount') : t(selectedTier.name),
      currencyType,
      blockchainName: selectedBlockchainStep?.name // Use optional chaining
    };
    
    console.log('Full data being sent:', dataToSend);
    onAmountSelect(dataToSend);
    onClose();
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedTier(null);
      setCustomAmount('');
      setCustomAmountError('');
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setSelectedBlockchainStep(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <style dangerouslySetInnerHTML={{
        __html: `
          .calc-modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .calc-modal-scroll::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
            border-radius: 4px;
          }
          .calc-modal-scroll::-webkit-scrollbar-thumb {
            background: rgba(107, 114, 128, 0.6);
            border-radius: 4px;
          }
          .calc-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.8);
          }
          .calc-modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(107, 114, 128, 0.6) rgba(55, 65, 81, 0.3);
          }
        `
      }} />
      
      <div className="backdrop-blur-xl bg-gradient-to-b from-black/95 to-gray-800/95 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-600/50 max-h-[90vh] overflow-y-auto calc-modal-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600/50">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-white transition-colors mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t('cryptoCalculator')}</h2>
              <p className="text-sm text-gray-300">
                {currentStep === 1 && !selectedTier && t('selectTierStep')}
                {currentStep === 1 && selectedTier?.name === 'custom' && t('enterCustomAmount')}
                {currentStep === 1 && selectedTier?.name !== 'custom' && selectedTier && t('selectBlockchainStep')}
                {currentStep === 2 && t('selectBlockchainStep')}
                {currentStep === 3 && `${selectedTier?.amount} PLN • ${selectedBlockchainStep?.name}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentStep === 3 && (
              <button
                onClick={handleRefreshPrices}
                disabled={refreshing}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={t('refreshPrices')}
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Tier Selection */}
          {currentStep === 1 && (
            <TierSelectionStep
              tiers={tiers}
              selectedTier={selectedTier}
              customAmount={customAmount}
              customAmountError={customAmountError}
              onTierSelect={handleTierSelect}
              onCustomAmountChange={setCustomAmount}
              onCustomAmountSubmit={handleCustomAmountSubmit}
              t={t}
            />
          )}

          {/* Step 2: Blockchain Selection */}
          {currentStep === 2 && selectedTier && (
            <BlockchainSelectionStep
              blockchains={blockchains}
              selectedTier={selectedTier}
              onBlockchainSelect={handleBlockchainSelect}
              t={t}
            />
          )}

          {/* Step 3: Amount Display */}
          {currentStep === 3 && selectedTier && selectedBlockchainStep && (
            <AmountDisplayStep
              tier={selectedTier}
              blockchain={selectedBlockchainStep}
              calculateCrypto={calculateCrypto}
              onCopy={handleCopyAmount}
              onSelect={handleSelectAmount}
              copiedAmount={copiedAmount}
              priceLoading={priceLoading}
              hasData={hasData}
              onRefresh={handleRefreshPrices}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Step 1: Tier Selection
const TierSelectionStep = ({ 
  tiers, 
  selectedTier, 
  customAmount, 
  customAmountError, 
  onTierSelect, 
  onCustomAmountChange, 
  onCustomAmountSubmit, 
  t 
}) => (
  <div className="space-y-4">
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold text-white mb-2">{t('chooseSupportTier')}</h3>
      <p className="text-gray-300 text-sm">{t('selectTierDescription')}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiers.map((tier) => (
        <button
          key={tier.name}
          onClick={() => onTierSelect(tier)}
          className={`relative overflow-hidden backdrop-blur-sm bg-gradient-to-br ${tier.color} border transition-all duration-300 group ${
            selectedTier?.name === tier.name 
              ? 'border-blue-400 text-white shadow-lg scale-105' 
              : 'border-white/20 text-white hover:border-white/40 hover:scale-105'
          } p-6 rounded-xl shadow-lg hover:shadow-xl transform`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{tier.icon}</div>
            <div className="text-left">
              <h4 className="text-lg font-bold">{t(tier.name)}</h4>
              <p className="text-2xl font-bold">
                {tier.name === 'custom' ? t('customAmount') : `${tier.amount} PLN`}
              </p>
              <p className="text-sm opacity-75">
                {tier.name === 'custom' ? t('customAmountDescription') : t(`${tier.name}Rewards`)}
              </p>
            </div>
          </div>
          <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>

    {/* Custom Amount Input - Show when custom tier is selected */}
    {selectedTier?.name === 'custom' && (
      <div className="mt-6 p-6 backdrop-blur-sm bg-gradient-to-r from-gray-500/20 to-slate-600/20 border border-white/30 rounded-xl">
        <h4 className="text-lg font-semibold text-white mb-4">{t('enterCustomAmount')}</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t('amount')} (PLN) *
            </label>
            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => onCustomAmountChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onCustomAmountSubmit();
                  }
                }}
                placeholder="100"
                min="1"
                max="10000"
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  customAmountError ? 'border-red-400' : 'border-white/30'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-300 text-sm">PLN</span>
              </div>
            </div>
            {customAmountError && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {customAmountError}
              </p>
            )}
          </div>

          <button
            onClick={onCustomAmountSubmit}
            disabled={!customAmount}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>{t('continueToBlockchain')}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )}
  </div>
);

// Step 2: Blockchain Selection
const BlockchainSelectionStep = ({ blockchains, selectedTier, onBlockchainSelect, t }) => (
  <div className="space-y-4">
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold text-white mb-2">{t('chooseBlockchain')}</h3>
      <p className="text-gray-300 text-sm">
        {t('selectedTier')}: <span className="text-emerald-400 font-semibold">
          {selectedTier.name === 'custom' ? t('customAmount') : t(selectedTier.name)} ({selectedTier.amount} PLN)
        </span>
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {blockchains.map((blockchain) => (
        <button
          key={blockchain.name}
          onClick={() => onBlockchainSelect(blockchain)}
          className={`bg-gradient-to-r ${blockchain.color} p-1 rounded-xl hover:shadow-lg transition-all duration-300 group`}
        >
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{blockchain.icon}</span>
                <div>
                  <h4 className="font-semibold text-white text-lg">{blockchain.name}</h4>
                  <p className="text-sm text-gray-300">{blockchain.symbol}</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span className="text-gray-300">{t('nativeCurrency')}: {blockchain.symbol}</span>
              </div>
              {blockchain.hasStablecoin && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span className="text-gray-300">{t('stablecoin')}: USDC</span>
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Step 3: Amount Display
const AmountDisplayStep = ({ 
  tier, 
  blockchain, 
  calculateCrypto, 
  onCopy, 
  onSelect, 
  copiedAmount, 
  priceLoading, 
  hasData, 
  onRefresh, 
  t 
}) => {
  if (priceLoading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-300 text-lg">{t('loadingPrices')}</p>
        <p className="text-gray-400 text-sm mt-2">{t('pleasewait')}</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-400 mb-4 text-lg">{t('priceLoadError')}</p>
        <button
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          {t('retryLoading')}
        </button>
      </div>
    );
  }

  // Calculate native currency amount
  const nativeCrypto = calculateCrypto(tier.amount, { name: blockchain.name, symbol: blockchain.symbol }, 'native');
  
  // Calculate stablecoin amount (if supported)
  const stableCrypto = blockchain.hasStablecoin ? calculateCrypto(tier.amount, { name: blockchain.name }, 'stablecoin') : null;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">{t('calculationResults')}</h3>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
            {tier.name === 'custom' ? t('customAmount') : t(tier.name)} • {tier.amount} PLN
          </span>
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
            {blockchain.name}
          </span>
        </div>
      </div>

      {/* Currency Options */}
      <div className="space-y-4">
        {/* Native Currency */}
        {nativeCrypto && (
          <CurrencyOption
            type="native"
            crypto={nativeCrypto}
            blockchain={blockchain}
            onCopy={onCopy}
            onSelect={onSelect}
            copiedAmount={copiedAmount}
            t={t}
          />
        )}

        {/* Stablecoin */}
        {stableCrypto && (
          <CurrencyOption
            type="stablecoin"
            crypto={stableCrypto}
            blockchain={blockchain}
            onCopy={onCopy}
            onSelect={onSelect}
            copiedAmount={copiedAmount}
            t={t}
          />
        )}
      </div>

      {/* Footer Note */}
      <div className="text-center pt-6 border-t border-gray-600/50">
        <p className="text-xs text-gray-400">
          {t('priceDisclaimer')}
        </p>
      </div>
    </div>
  );
};

const CurrencyOption = ({ type, crypto, blockchain, onCopy, onSelect, copiedAmount, t }) => {
  const isCopied = copiedAmount === `${crypto.amount}-${crypto.symbol}`;
  
  return (
    <div className={`backdrop-blur-sm border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
      type === 'native' 
        ? 'bg-orange-500/10 border-orange-500/30 hover:border-orange-400/50' 
        : 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400/50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
            type === 'native'
              ? 'bg-orange-500/20'
              : 'bg-emerald-500/20'
          }`}>
            {type === 'native' ? blockchain.icon : '🏛️'}
          </div>
          <div>
            <div className={`text-2xl font-bold ${
              type === 'native' ? 'text-orange-300' : 'text-emerald-300'
            }`}>
              {crypto.amount} {crypto.symbol}
            </div>
            <div className="text-gray-400 text-sm">
              {type === 'native' ? t('nativeCurrency') : t('stablecoin')}
            </div>
            {crypto.priceInPln && (
              <div className="text-xs text-gray-500">
                1 {crypto.symbol} ≈ {crypto.priceInPln.toFixed(2)} PLN
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onCopy(crypto.amount, crypto.symbol)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              type === 'native'
                ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
            }`}
            title={t('copyAmount')}
          >
            {isCopied ? (
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span className="text-sm">{t('copied')}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Copy className="w-4 h-4" />
                <span className="text-sm">{t('copy')}</span>
              </div>
            )}
          </button>
          <button
            onClick={() => onSelect(crypto, type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              type === 'native'
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {t('selectAmount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculationModal;