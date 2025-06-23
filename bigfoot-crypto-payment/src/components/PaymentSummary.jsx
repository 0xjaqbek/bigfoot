import React, { useEffect } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { AlertTriangle } from 'lucide-react';
import { convertPlnToCrypto, convertPlnToUsd } from '../utils/helpers';
import BackButton from './BackButton';

const PaymentSummary = () => {
  const { 
    selectedAmount,
    selectedBlockchain,
    selectedCurrency,
    cryptoAmount,
    setCryptoAmount,
    prices,
    nextStep,
    prevStep 
  } = usePaymentStore();

  // Calculate crypto amount when data changes
  useEffect(() => {
    if (selectedAmount && selectedBlockchain && selectedCurrency && prices) {
      try {
        let amount, symbol;
        
        if (selectedCurrency === 'stablecoin') {
          amount = convertPlnToUsd(selectedAmount);
          symbol = 'USDC';
        } else {
          amount = convertPlnToCrypto(selectedAmount, selectedBlockchain.symbol, prices);
          symbol = selectedBlockchain.symbol;
        }
        
        setCryptoAmount({
          amount: amount.toFixed(6),
          symbol
        });
      } catch (error) {
        console.error('Price calculation error:', error);
      }
    }
  }, [selectedAmount, selectedBlockchain, selectedCurrency, prices, setCryptoAmount]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Podsumowanie płatności</h2>
      </div>

      {/* Payment Details */}
      <PaymentDetails 
        blockchain={selectedBlockchain}
        currency={selectedCurrency}
        amount={selectedAmount}
        cryptoAmount={cryptoAmount}
      />

      {/* Network Fee Warning */}
      <NetworkFeeWarning fee={selectedBlockchain?.fee} />

      {/* Continue Button */}
      <button
        onClick={nextStep}
        className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600/80 hover:to-indigo-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        Połącz portfel
      </button>
    </div>
  );
};

const PaymentDetails = ({ blockchain, currency, amount, cryptoAmount }) => (
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
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
        {cryptoAmount?.amount} {cryptoAmount?.symbol}
      </div>
      <div className="text-lg text-gray-600">≈ {amount} PLN</div>
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