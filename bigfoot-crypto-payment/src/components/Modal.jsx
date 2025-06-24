import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { X, Shield, Zap } from 'lucide-react';

const Modal = ({ chain, onClose, onConfirm }) => {
  const { _t } = useTranslations();
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/95 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-200/50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">{chain.name}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Chain Details */}
        <ChainDetails chain={chain} />

        {/* Currency Selection */}
        <CurrencySelection 
          chain={chain}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
};

const ChainDetails = ({ chain }) => {
  const { t } = useTranslations();
  
  return (
    <div className="backdrop-blur-sm bg-gray-50/70 rounded-xl p-4 mb-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Symbol:</span>
          <span className="font-semibold text-gray-800">{chain.symbol}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{t('networkFee')}:</span>
          <span className="font-semibold text-gray-800">{chain.fee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{t('confirmation')}:</span>
          <span className="font-semibold text-gray-800">{chain.time}</span>
        </div>
      </div>
    </div>
  );
};

const CurrencySelection = ({ chain, onConfirm }) => {
  const { t } = useTranslations();
  
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">{t('selectCurrencyType')}</h4>
      <div className="space-y-3">
        {/* Native Currency */}
        <CurrencyOption
          icon={<Zap className="w-5 h-5 text-orange-700" />}
          title={`${t('nativeCurrency')} ${chain.symbol}`}
          description={t('nativeDescription')}
          bgColor="bg-orange-100/50 border-orange-200/50 hover:bg-orange-200/50"
          onClick={() => onConfirm(chain, 'native')}
        />

        {/* Stablecoin (if supported) */}
        {chain.hasStablecoin && (
          <CurrencyOption
            icon={<Shield className="w-5 h-5 text-emerald-700" />}
            title={t('stablecoin')}
            description={t('stablecoinDescription')}
            bgColor="bg-emerald-100/50 border-emerald-200/50 hover:bg-emerald-200/50"
            onClick={() => onConfirm(chain, 'stablecoin')}
          />
        )}
      </div>
    </div>
  );
};

const CurrencyOption = ({ icon, title, description, bgColor, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 backdrop-blur-sm ${bgColor} border rounded-xl transition-all duration-300 text-left`}
  >
    <div className="flex items-center mb-2">
      {icon}
      <span className="font-semibold text-gray-800 ml-2">{title}</span>
    </div>
    <div className="text-sm text-gray-600">{description}</div>
  </button>
);

export default Modal;