import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { useTransaction } from '../hooks/useTransaction';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const PaymentConfirmation = () => {
  const { 
    selectedAmount,
    selectedBlockchain,
    cryptoAmount,
    connectedWallet,
    nextStep 
  } = usePaymentStore();

  const { simulatePayment, isProcessing, transaction } = useTransaction();

  const handlePayment = async () => {
    try {
      // Use simulation for now (switch to executePayment when wallets are fully integrated)
      await simulatePayment();
      nextStep();
    } catch (error) {
      console.error('Payment failed:', error);
      // Error is handled by the hook
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 backdrop-blur-sm bg-gradient-to-br from-emerald-400/70 to-green-500/70 border border-white/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-100 mb-4">Portfel połączony</h2>
        <div className="text-sm text-gray-600">
          {connectedWallet?.walletName} • {connectedWallet?.address?.slice(0, 8)}...
        </div>
      </div>

      {/* Payment Details */}
      <PaymentDetailsCard 
        amount={selectedAmount}
        cryptoAmount={cryptoAmount}
        blockchain={selectedBlockchain}
      />

      {/* Transaction Status */}
      <TransactionStatus 
        transaction={transaction}
        isProcessing={isProcessing}
      />

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing || transaction.status === 'pending'}
        className="w-full bg-gradient-to-r from-emerald-500/80 to-green-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-600/80 hover:to-green-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mb-4"
      >
        {isProcessing ? 'Wysyłanie...' : 'Wyślij płatność'}
      </button>

      {/* Network Info */}
      <div className="text-center text-sm text-gray-600 flex items-center justify-center backdrop-blur-sm bg-white/40 px-4 py-2 rounded-xl border border-gray-200/50">
        <Clock className="w-4 h-4 mr-1" />
        Potwierdzenie: {selectedBlockchain?.time}
      </div>
    </div>
  );
};

const PaymentDetailsCard = ({ amount, cryptoAmount, blockchain }) => (
  <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-6 mb-6 text-center shadow-lg">
    <div className="text-sm text-gray-700 mb-2">Kwota do zapłaty</div>
    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
      {cryptoAmount?.amount} {cryptoAmount?.symbol}
    </div>
    <div className="text-lg text-gray-600">≈ {amount} PLN</div>
    <div className="text-sm text-gray-500 mt-2">Sieć: {blockchain?.name}</div>
  </div>
);

const TransactionStatus = ({ transaction, isProcessing }) => {
  if (!isProcessing && transaction.status === 'pending') return null;

  let statusConfig = {
    icon: <Clock className="w-5 h-5" />,
    text: 'Oczekiwanie...',
    bgColor: 'bg-blue-100/70 border-blue-200/50',
    textColor: 'text-blue-800'
  };

  if (isProcessing) {
    statusConfig = {
      icon: <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>,
      text: 'Przetwarzanie płatności...',
      bgColor: 'bg-yellow-100/70 border-yellow-200/50',
      textColor: 'text-yellow-800'
    };
  } else if (transaction.status === 'confirmed') {
    statusConfig = {
      icon: <CheckCircle className="w-5 h-5" />,
      text: 'Transakcja potwierdzona!',
      bgColor: 'bg-green-100/70 border-green-200/50',
      textColor: 'text-green-800'
    };
  } else if (transaction.status === 'failed') {
    statusConfig = {
      icon: <AlertCircle className="w-5 h-5" />,
      text: 'Transakcja nieudana',
      bgColor: 'bg-red-100/70 border-red-200/50',
      textColor: 'text-red-800'
    };
  }

  return (
    <div className={`backdrop-blur-sm ${statusConfig.bgColor} border rounded-xl p-4 mb-6 flex items-center`}>
      <div className={statusConfig.textColor}>{statusConfig.icon}</div>
      <span className={`text-sm ${statusConfig.textColor} ml-2 font-medium`}>
        {statusConfig.text}
      </span>
    </div>
  );
};

export default PaymentConfirmation;