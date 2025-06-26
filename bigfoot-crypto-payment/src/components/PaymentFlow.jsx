import React, { useState, useEffect } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { useTranslations } from '../hooks/useTranslations';
import TierSelector from './TierSelector';
import BlockchainSelector from './BlockchainSelector';
import PaymentSummary from './PaymentSummary';
import UserInfoForm from './UserInfoForm';
import WalletConnector from './WalletConnector';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentSuccess from './PaymentSuccess';
import Footer from './Footer'; 
import LanguageSelector from './LanguageSelector';
import { APP_CONFIG } from '../utils/constants';
import logo from '../assets/BFW-GOLD.png';
import WelcomeModal from './WelcomeModal';
import ManualDonation from './ManualDonation';

const PaymentFlow = () => {
  const { currentStep } = usePaymentStore();
  const { _t } = useTranslations();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showManualDonation, setShowManualDonation] = useState(false);

  // Show welcome modal on first load
  useEffect(() => {
    // In a real app, you would check localStorage here
    // For this demo, we'll always show the welcome modal initially
    setShowWelcomeModal(true);
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    // In a real app, you would save to localStorage here
    // localStorage.setItem('bigfoot_welcome_seen', 'true');
  };

  const handleManualDonation = () => {
    setShowManualDonation(true);
  };

  const handleBackFromManual = () => {
    setShowManualDonation(false);
  };

  // Show manual donation page if active
  if (showManualDonation) {
    return <ManualDonation onBack={handleBackFromManual} />;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, black 20%, #f1f5f9 100%)',
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-indigo-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header - FIXED: Now passing the handleManualDonation function */}
        <Header onManualDonation={handleManualDonation} />

        {/* Content */}
        <div className="mt-12">
          {currentStep === 1 && <TierSelector />}
          {currentStep === 2 && <BlockchainSelector />}
          {currentStep === 3 && <PaymentSummary />}
          {currentStep === 4 && <UserInfoForm />}
          {currentStep === 5 && <WalletConnector />}
          {currentStep === 6 && <PaymentConfirmation />}
          {currentStep === 7 && <PaymentSuccess />}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcome}
        onManualDonation={handleManualDonation}
      />
    </div>
  );
};

const Header = ({ onManualDonation }) => {
  const { currentStep } = usePaymentStore();
  const { t } = useTranslations();

  return (
    <div className="text-center">
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] p-4 text-center" 
       style={{ background: 'black'}}>
        {/* Manual Donation Button - positioned at top left */}
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={onManualDonation}
            className="flex items-center space-x-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl px-3 py-2 hover:bg-white/30 transition-all duration-200 shadow-sm text-white text-sm font-medium"
            title={t('manualDonation')}
          >
            <span>💰</span>
            <span>{t('manualDonation')}</span>
          </button>
        </div>
        
        {/* Language Selector - positioned at top right */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSelector />
        </div>
        
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
          {t('title')}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-center space-x-4">
        <div className="text-sm text-white font-medium backdrop-blur-sm bg-black px-3 py-1 rounded-xl border border-gray-200/50">
          {t('step')} {currentStep} / {APP_CONFIG.totalSteps}
        </div>
        <div className="w-32 backdrop-blur-sm rounded-full h-3 border border-gray-100/30">
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