import React, { useEffect } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { usePrices } from '../hooks/usePrices';
import { useFees } from '../hooks/useFees'; // NEW IMPORT
import { AlertTriangle, RefreshCw, Zap, Clock, TrendingUp } from 'lucide-react';
import BackButton from './BackButton';

const PaymentSummary = () => {
  const { 
    selectedAmount,
    selectedBlockchain,
    selectedCurrency,
    cryptoAmount,
    setCryptoAmount,
    nextStep,
    prevStep 
  } = usePaymentStore();

  const { calculateCrypto, loading: priceLoading, error: priceError, fetchPrices, hasData, isStale } = usePrices();
  
  // NEW: Real-time fee estimation
  const { 
    fees, 
    formattedFee, 
    selectedSpeed, 
    setSelectedSpeed, 
    loading: feeLoading, 
    error: feeError, 
    fetchFees,
    isStale: feeIsStale 
  } = useFees(selectedBlockchain);

  // Calculate crypto amount when data changes
  useEffect(() => {
    if (selectedAmount && selectedBlockchain && selectedCurrency && hasData) {
      const result = calculateCrypto(selectedAmount, selectedBlockchain, selectedCurrency);
      if (result) {
        setCryptoAmount(result);
      }
    }
  }, [selectedAmount, selectedBlockchain, selectedCurrency, hasData, calculateCrypto, setCryptoAmount]);

  const handleRefreshPrices = () => {
    fetchPrices(false);
  };

  const handleRefreshFees = () => {
    fetchFees();
  };

  const isLoading = priceLoading || feeLoading;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">Podsumowanie płatności</h2>
      </div>

      {/* Price Status */}
      <PriceStatus 
        loading={priceLoading}
        error={priceError}
        isStale={isStale}
        onRefresh={handleRefreshPrices}
      />

      {/* Payment Details */}
      <PaymentDetails 
        blockchain={selectedBlockchain}
        currency={selectedCurrency}
        amount={selectedAmount}
        cryptoAmount={cryptoAmount}
        loading={priceLoading}
      />

      {/* NEW: Dynamic Network Fee Section */}
      <NetworkFeeSection 
        fees={fees}
        formattedFee={formattedFee}
        selectedSpeed={selectedSpeed}
        onSpeedChange={setSelectedSpeed}
        loading={feeLoading}
        error={feeError}
        isStale={feeIsStale}
        onRefresh={handleRefreshFees}
      />

      {/* Continue Button */}
      <button
        onClick={nextStep}
        disabled={isLoading || !cryptoAmount}
        className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600/80 hover:to-indigo-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        {isLoading ? 'Ładowanie...' : 'Połącz portfel'}
      </button>
    </div>
  );
};

// NEW: Network Fee Section Component
const NetworkFeeSection = ({ fees, formattedFee, selectedSpeed, onSpeedChange, loading, error, isStale, onRefresh }) => {
  if (loading) {
    return (
      <div className="backdrop-blur-sm bg-blue-100/70 border border-blue-200/50 rounded-xl p-4 mb-8 flex items-center">
        <RefreshCw className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
        <span className="text-sm text-blue-800">Aktualizowanie opłat sieciowych...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="backdrop-blur-sm bg-red-100/70 border border-red-200/50 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm text-red-800">Błąd opłat: {error}</span>
          </div>
          <button 
            onClick={onRefresh}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!fees) {
    return (
      <div className="backdrop-blur-sm bg-gray-100/70 border border-gray-200/50 rounded-xl p-4 mb-8 text-center">
        <span className="text-sm text-gray-600">Opłaty sieciowe niedostępne</span>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Opłata sieciowa</h3>
        {isStale && (
          <button 
            onClick={onRefresh}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Odśwież
          </button>
        )}
      </div>

      {/* Fee Speed Selection */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(fees).map(([speed, feeData]) => (
          <button
            key={speed}
            onClick={() => onSpeedChange(speed)}
            className={`p-3 rounded-lg text-center transition-all duration-200 border ${
              selectedSpeed === speed 
                ? 'bg-blue-500/20 border-blue-400 text-blue-700' 
                : 'bg-white/50 border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              {speed === 'slow' && <Clock className="w-4 h-4" />}
              {speed === 'standard' && <Zap className="w-4 h-4" />}
              {speed === 'fast' && <TrendingUp className="w-4 h-4" />}
            </div>
            <div className="text-xs font-medium capitalize">{speed}</div>
            <div className="text-xs">{feeData.time}</div>
            <div className="text-xs font-bold">{feeData.pln} PLN</div>
          </button>
        ))}
      </div>

      {/* Selected Fee Display */}
      <div className="text-center p-3 bg-gray-50/70 rounded-lg">
        <div className="text-sm text-gray-600">Wybrana opłata ({selectedSpeed})</div>
        <div className="text-lg font-bold text-gray-800">{formattedFee}</div>
      </div>
    </div>
  );
};

// Keep existing components...
const PriceStatus = ({ loading, error, isStale, onRefresh }) => {
  // ... existing implementation
  if (loading) {
    return (
      <div className="backdrop-blur-sm bg-blue-100/70 border border-blue-200/50 rounded-xl p-4 mb-6 flex items-center">
        <RefreshCw className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
        <span className="text-sm text-blue-800">Aktualizowanie cen...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="backdrop-blur-sm bg-red-100/70 border border-red-200/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm text-red-800">Błąd cen: {error}</span>
          </div>
          <button 
            onClick={onRefresh}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (isStale) {
    return (
      <div className="backdrop-blur-sm bg-yellow-100/70 border border-yellow-200/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-yellow-800">Ceny mogą być nieaktualne</span>
          <button 
            onClick={onRefresh}
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Odśwież
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const PaymentDetails = ({ blockchain, currency, amount, cryptoAmount, loading }) => (
  <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-8 mb-8 shadow-lg">
    <div className="grid grid-cols-2 gap-6 text-center">
      <div>
        <div className="text-sm text-gray-600 mb-1">Sieć</div>
        <div className="font-bold text-lg text-gray-800">{blockchain?.name}</div>
      </div>
      <div>
        <div className="text-sm text-gray-600 mb-1">Typ waluty</div>
        <div className="font-bold text-lg text-gray-800">
          {currency === 'stablecoin' ? 'USDC' : blockchain?.symbol}
        </div>
      </div>
    </div>
    
    <div className="border-t border-gray-200/50 mt-6 pt-6 text-center">
      <div className="text-sm text-gray-600 mb-2">Do zapłaty</div>
      {loading ? (
        <div className="text-2xl font-bold text-gray-400 mb-1">Ładowanie...</div>
      ) : cryptoAmount ? (
        <>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
            {cryptoAmount.amount} {cryptoAmount.symbol}
          </div>
          <div className="text-lg text-gray-600">≈ {amount} PLN</div>
          {cryptoAmount.change24h && (
            <div className={`text-sm mt-1 ${cryptoAmount.change24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {cryptoAmount.change24h > 0 ? '▲' : '▼'} {Math.abs(cryptoAmount.change24h).toFixed(2)}% (24h)
            </div>
          )}
        </>
      ) : (
        <div className="text-2xl font-bold text-red-500 mb-1">Błąd kalkulacji</div>
      )}
    </div>
  </div>
);

export default PaymentSummary;