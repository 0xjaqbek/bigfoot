import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { X, Info, Copy, Send, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const ManualDonationModal = ({ isOpen, onClose }) => {
  const { t } = useTranslations();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .manual-modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .manual-modal-scroll::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
            border-radius: 4px;
          }
          .manual-modal-scroll::-webkit-scrollbar-thumb {
            background: rgba(107, 114, 128, 0.6);
            border-radius: 4px;
          }
          .manual-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.8);
          }
          .manual-modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(107, 114, 128, 0.6) rgba(55, 65, 81, 0.3);
          }
        `
      }} />
      
      <div className="backdrop-blur-xl bg-gradient-to-b from-black/95 to-gray-800/95 rounded-2xl max-w-3xl w-full shadow-2xl border border-gray-600/50 max-h-[90vh] overflow-y-auto manual-modal-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t('manualDonationGuide')}</h2>
              <p className="text-sm text-gray-300">{t('manualDonationSubtitle')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Introduction */}
          <div className="bg-blue-900/30 border border-blue-600/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-400 mt-0.5">💡</div>
              <div>
                <p className="text-blue-200 font-medium mb-2">{t('manualDonationIntro')}</p>
                <p className="text-blue-300 text-sm">{t('manualDonationDescription')}</p>
              </div>
            </div>
          </div>

          {/* Step-by-step guide */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">{t('howToManualDonate')}</h3>
            
            {/* Step 1 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Copy className="w-4 h-4 mr-2 text-emerald-400" />
                  {t('step1Title')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step1Description')}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Send className="w-4 h-4 mr-2 text-blue-400" />
                  {t('step2Title')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step2Description')}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-purple-400" />
                  {t('step3Title')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step3Description')}</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-emerald-900/30 border border-emerald-600/30 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-200 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {t('manualDonationBenefits')}
            </h4>
            <ul className="space-y-2 text-emerald-300 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('benefit1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('benefit2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('benefit3')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('benefit4')}</span>
              </li>
            </ul>
          </div>

          {/* Important notes */}
          <div className="bg-amber-900/30 border border-amber-600/30 rounded-xl p-4">
            <h4 className="font-semibold text-amber-200 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {t('importantNotes')}
            </h4>
            <ul className="space-y-2 text-amber-300 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">⚠️</span>
                <span>{t('note1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">⚠️</span>
                <span>{t('note2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">⚠️</span>
                <span>{t('note3')}</span>
              </li>
            </ul>
          </div>

          {/* Processing time */}
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-4">
            <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {t('processingTime')}
            </h4>
            <p className="text-gray-300 text-sm">{t('processingTimeDescription')}</p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('gotItStartDonating')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualDonationModal;