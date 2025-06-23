import React, { useEffect } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { usePrices } from '../hooks/usePrices';
import { AlertTriangle, RefreshCw } from 'lucide-react';
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

  const { calculateCrypto, loading, error, fetchPrices, hasData, isStale } = usePrices();

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
    fetchPrices(false); // Force fresh data
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Podsumowanie płatności</h2>
      </div>

      {/* Price Status */}
      <PriceStatus 
        loading={loading}
        error={error}
        isStale={isStale}
        onRefresh={handleRefreshPrices}
      />

      {/* Payment Details */}
      <PaymentDetails 
        blockchain={selectedBlockchain}
        currency={selectedCurrency}
        amount={selectedAmount}
        cryptoAmount={cryptoAmount}
        loading={loading}
      />

      {/* Network Fee Warning */}
      <NetworkFeeWarning fee={selectedBlockchain?.fee} />

      {/* Continue Button */}
      <button
        onClick={nextStep}
        disabled={loading || !cryptoAmount}
        className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600/80 hover:to-indigo-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        {loading ? 'Ładowanie cen...' : 'Połącz portfel'}
      </button>
    </div>
  );
};

const PriceStatus = ({ loading, error, isStale, onRefresh }) => {
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

const NetworkFeeWarning = ({ fee }) => (
  <div className="backdrop-blur-sm bg-amber-100/70 border border-amber-200/50 rounded-xl p-4 mb-8 shadow-sm">
    <div className="flex items-center text-amber-800">
      <AlertTriangle className="w-5 h-5 mr-2" />
      <span className="text-sm font-medium">Opłata sieciowa: {fee} (dodatkowo)</span>
    </div>
  </div>
);

export default PaymentSummary;