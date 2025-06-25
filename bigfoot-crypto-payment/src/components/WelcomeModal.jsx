import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { X, Github, Wallet, Shield, Code, Heart } from 'lucide-react';

const WelcomeModal = ({ isOpen, onClose, onManualDonation }) => {
  const { t } = useTranslations();

  if (!isOpen) return null;

  const handleGitHubClick = () => {
    window.open('https://github.com/0xjaqbek/bigfoot', '_blank', 'noopener,noreferrer');
  };

  const handleManualDonationClick = () => {
    onManualDonation();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/95 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200/50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('welcomeTitle')}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {t('welcomeToApp')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('welcomeDescription')}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-800">{t('securePayments')}</div>
                <div className="text-sm text-gray-600">{t('securePaymentsDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Wallet className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-800">{t('multipleChains')}</div>
                <div className="text-sm text-gray-600">{t('multipleChainsDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Code className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-800">{t('openSource')}</div>
                <div className="text-sm text-gray-600">{t('openSourceDesc')}</div>
              </div>
            </div>
          </div>

          {/* Manual Donation Info */}
          <div className="bg-blue-50/70 border border-blue-200/50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Wallet className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <div className="font-medium text-blue-800 mb-1">{t('manualDonationOption')}</div>
                <div className="text-sm text-blue-700">{t('manualDonationDesc')}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Start dApp Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('startDonation')}
            </button>

            {/* Manual Donation Button */}
            <button
              onClick={handleManualDonationClick}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('manualDonation')}
            </button>

            {/* GitHub Button */}
            <button
              onClick={handleGitHubClick}
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>{t('viewSourceCode')}</span>
            </button>
          </div>

          {/* Trust Message */}
          <div className="text-center pt-4 border-t border-gray-200/50">
            <p className="text-sm text-gray-600">
              {t('trustMessage')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;