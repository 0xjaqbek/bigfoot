import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { CheckCircle } from 'lucide-react';
import { generateMockTxHash } from '../utils/helpers';

const PaymentSuccess = () => {
  const { resetPayment } = usePaymentStore();
  const txHash = generateMockTxHash();

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="w-24 h-24 backdrop-blur-sm bg-gradient-to-br from-emerald-400/70 to-green-500/70 border border-white/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Płatność wysłana!</h2>
      
      <div className="backdrop-blur-sm bg-emerald-100/60 border border-emerald-200/50 rounded-2xl p-6 mb-8 shadow-lg">
        <div className="text-emerald-800">
          <div className="font-bold text-lg mb-2">Dziękujemy za wsparcie!</div>
          <div className="text-sm">Transakcja jest przetwarzana. Otrzymasz email z potwierdzeniem i szczegółami nagród.</div>
        </div>
      </div>

      <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-4 mb-8 text-left shadow-sm">
        <div className="text-sm">
          <div className="font-semibold mb-2 text-gray-800">Hash transakcji:</div>
          <div className="font-mono text-xs backdrop-blur-sm bg-white/70 p-3 rounded-xl border border-gray-200/50 break-all">
            {txHash}
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-xs mt-2 font-medium">
            Zobacz w eksploratorze →
          </button>
        </div>
      </div>

      <button
        onClick={resetPayment}
        className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold hover:from-blue-600/80 hover:to-indigo-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        Kolejna płatność
      </button>
    </div>
  );
};

export default PaymentSuccess;