import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { CheckCircle, Clock } from 'lucide-react';

const PaymentConfirmation = () => {
  const { 
    selectedAmount,
    selectedBlockchain,
    cryptoAmount,
    nextStep 
  } = usePaymentStore();

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 backdrop-blur-sm bg-gradient-to-br from-emerald-400/70 to-green-500/70 border border-white/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Portfel połączony</h2>
      </div>

      <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-8 mb-8 text-center shadow-lg">
        <div className="text-sm text-gray-700 mb-2">Kwota do zapłaty</div>
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          {cryptoAmount?.amount} {cryptoAmount?.symbol}
        </div>
        <div className="text-lg text-gray-600">≈ {selectedAmount} PLN</div>
      </div>

      <button
        onClick={nextStep}
        className="w-full bg-gradient-to-r from-emerald-500/80 to-green-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-600/80 hover:to-green-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mb-4"
      >
        Wyślij płatność
      </button>

      <div className="text-center text-sm text-gray-600 flex items-center justify-center backdrop-blur-sm bg-white/40 px-4 py-2 rounded-xl border border-gray-200/50">
        <Clock className="w-4 h-4 mr-1" />
        Potwierdzenie: {selectedBlockchain?.time}
      </div>
    </div>
  );
};

export default PaymentConfirmation;