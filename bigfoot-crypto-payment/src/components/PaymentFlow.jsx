import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import TierSelector from './TierSelector';
import BlockchainSelector from './BlockchainSelector';
import PaymentSummary from './PaymentSummary';
import WalletConnector from './WalletConnector';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentSuccess from './PaymentSuccess';
import Footer from './Footer'; 
import { APP_CONFIG } from '../utils/constants';
import logo from '../assets/BFW-GOLD.png';

const PaymentFlow = () => {
  const { currentStep } = usePaymentStore();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-indigo-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto  relative z-10">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="mt-12">
          {currentStep === 1 && <TierSelector />}
          {currentStep === 2 && <BlockchainSelector />}
          {currentStep === 3 && <PaymentSummary />}
          {currentStep === 4 && <WalletConnector />}
          {currentStep === 5 && <PaymentConfirmation />}
          {currentStep === 6 && <PaymentSuccess />}
        </div>

        {/* Footer - NEW */}
        <Footer />
      </div>
    </div>
  );
};

const Header = () => {
  const { currentStep } = usePaymentStore();

  return (
    <div className="text-center">
<div className="relative p-1 rounded-lg text-center" 
     style={{
       background: 'linear-gradient(90deg, #f8fafc 0%, #000000 50%, #f1f5f9 100%)'
     }}>
  <img
    src={logo}
    alt="BigFoot Works Logo"
    className="mx-auto h-21 object-contain mb-1"
  />
  <p
    className="text-white text-xl font-semibold"
    style={{
      fontFamily:
        '"Syncopate", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    }}
  >
    Płatność Krypto
  </p>
</div>
      <div className="flex items-center justify-center space-x-4">
        <div className="text-sm text-gray-600 font-medium backdrop-blur-sm bg-white/40 px-3 py-1 rounded-xl border border-gray-200/50">
          Krok {currentStep} / {APP_CONFIG.totalSteps}
        </div>
        <div className="w-32 bg-gray-200/50 backdrop-blur-sm rounded-full h-3 border border-gray-300/30">
          <div 
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / APP_CONFIG.totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFlow;