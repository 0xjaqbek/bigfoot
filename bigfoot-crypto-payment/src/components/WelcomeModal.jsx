import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { X, Github, Wallet, Shield, Code, Heart } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

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
      {/* Custom dark theme styles for language selector */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .dark-theme-language-selector button {
            background: rgba(55, 65, 81, 0.8) !important;
            border-color: rgba(107, 114, 128, 0.5) !important;
            color: white !important;
          }
          .dark-theme-language-selector button:hover {
            background: rgba(75, 85, 99, 0.9) !important;
          }
          .dark-theme-language-selector button span {
            color: white !important;
          }
          .dark-theme-language-selector button svg {
            color: rgba(229, 231, 235, 0.8) !important;
          }
          .dark-theme-language-selector .absolute > div {
            background: rgba(17, 24, 39, 0.95) !important;
            border-color: rgba(107, 114, 128, 0.5) !important;
            backdrop-filter: blur(12px);
          }
          .dark-theme-language-selector .absolute button {
            color: rgb(229, 231, 235) !important;
          }
          .dark-theme-language-selector .absolute button:hover {
            background: rgba(55, 65, 81, 0.7) !important;
          }
          .dark-theme-language-selector .absolute .text-gray-600 {
            color: rgb(156, 163, 175) !important;
          }
          .dark-theme-language-selector .absolute .text-gray-500 {
            color: rgb(107, 114, 128) !important;
          }
          
          /* Dark scrollbar for modal */
          .dark-modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .dark-modal-scroll::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
            border-radius: 4px;
          }
          .dark-modal-scroll::-webkit-scrollbar-thumb {
            background: rgba(107, 114, 128, 0.6);
            border-radius: 4px;
          }
          .dark-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.8);
          }
          
          /* Firefox scrollbar */
          .dark-modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(107, 114, 128, 0.6) rgba(55, 65, 81, 0.3);
          }
        `
      }} />
      
      <div className="backdrop-blur-xl bg-gradient-to-b from-black/95 to-gray-800/95 rounded-2xl max-w-3xl w-full shadow-2xl border border-gray-600/50 max-h-[90vh] overflow-y-auto dark-modal-scroll">
        {/* Top Bar: Language Selector on the left, Close Button on the right */}
        <div className="flex items-center justify-between px-6 pt-4 pb-6 border-b border-gray-700/50">
        <div className="dark-theme-language-selector">
            <LanguageSelector />
        </div>
        <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1"
        >
            <X className="w-6 h-6" />
        </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              {t('welcomeToApp')}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t('welcomeDescription')}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-white">{t('securePayments')}</div>
                <div className="text-sm text-gray-300">{t('securePaymentsDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Wallet className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-white">{t('multipleChains')}</div>
                <div className="text-sm text-gray-300">{t('multipleChainsDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Code className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-white">{t('openSource')}</div>
                <div className="text-sm text-gray-300">{t('openSourceDesc')}</div>
              </div>
            </div>
          </div>

          {/* Manual Donation Info */}
          <div className="bg-blue-900/30 border border-blue-600/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Wallet className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <div className="font-medium text-blue-200 mb-1">{t('manualDonationOption')}</div>
                <div className="text-sm text-blue-300">{t('manualDonationDesc')}</div>
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
          <div className="text-center pt-4 border-t border-gray-700/50">
            <p className="text-sm text-gray-400">
              {t('trustMessage')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;