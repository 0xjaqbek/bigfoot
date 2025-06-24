import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { useTranslations } from '../hooks/useTranslations';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { openInExplorer, getExplorerName } from '../utils/explorers';

const PaymentSuccess = () => {
  const { resetPayment, transaction, selectedBlockchain } = usePaymentStore();
  const { t } = useTranslations();
  
  const txHash = transaction.hash;
  const explorerName = getExplorerName(selectedBlockchain);

  const handleExplorerClick = () => {
    if (txHash && selectedBlockchain) {
      openInExplorer(selectedBlockchain, txHash);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="w-24 h-24 backdrop-blur-sm bg-gradient-to-br from-emerald-400/70 to-green-500/70 border border-white/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-4xl font-bold text-gray-100 mb-6">{t('paymentSent')}</h2>
      
      <div className="backdrop-blur-sm bg-emerald-100/60 border border-emerald-200/50 rounded-2xl p-6 mb-8 shadow-lg">
        <div className="text-emerald-800">
          <div className="font-bold text-lg mb-2">{t('thankYou')}</div>
          <div className="text-sm">{t('transactionProcessing')}</div>
        </div>
      </div>

      {txHash && (
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-4 mb-8 text-left shadow-sm">
          <div className="text-sm">
            <div className="font-semibold mb-2 text-gray-800">{t('transactionHash')}</div>
            <div className="font-mono text-xs backdrop-blur-sm bg-white/70 p-3 rounded-xl border border-gray-200/50 break-all mb-3">
              {txHash}
            </div>
            <button 
              onClick={handleExplorerClick}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              {t('viewInExplorer')} {explorerName} →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={resetPayment}
        className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold hover:from-blue-600/80 hover:to-indigo-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        {t('nextPayment')}
      </button>
    </div>
  );
};

export default PaymentSuccess;