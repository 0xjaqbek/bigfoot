import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Code, Heart, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslations();
  
  const handleEthClick = () => {
    window.open('mailto:jaqbek.eth@gmail.com');
  };

  return (
    <footer className="relative z-10 mt-16 pb-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="backdrop-blur-sm bg-white/30 border border-gray-200/30 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-6">
            
            {/* Made by */}
            <div className="flex items-center space-x-1 text-sm text-gray-700">
              <Code className="w-4 h-4" />
              <span>{t('madeBy')}</span>
              <button 
                onClick={handleEthClick}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1 hover:underline"
              >
                <span>jaqbek.eth</span>
                <Mail className="w-3 h-3" />
              </button>
            </div>

            {/* For BigFoot Works */}
            <div className="flex items-center space-x-1 text-gray-600">
              <span className="text-sm">{t('for')}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">BigFoot Works</span>
            </div>

            {/* Year */}
            <div className="text-sm text-gray-600 font-medium">
              {t('year')}
            </div>
          </div>
          
          {/* Bottom line - Additional info */}
          <div className="mt-1 pt-1 border-t border-gray-200/30 text-center">
            <p className="text-xs text-gray-600">
              {t('footerDescription')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;