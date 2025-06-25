import React, { useState } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { ChevronDown, Globe } from 'lucide-react';

// Languages without visual icons
const LANGUAGES = [
  { 
    code: 'pl', 
    name: 'Polski', 
    shortName: 'PL'
  },
  { 
    code: 'en', 
    name: 'English', 
    shortName: 'EN'
  },
  { 
    code: 'de', 
    name: 'Deutsch', 
    shortName: 'DE'
  },
  { 
    code: 'sv', 
    name: 'Svenska', 
    shortName: 'SV'
  },
  { 
    code: 'no', 
    name: 'Norsk', 
    shortName: 'NO'
  },
  { 
    code: 'da', 
    name: 'Dansk', 
    shortName: 'DK'
  }
];

const LanguageSelector = () => {
  const { language, setLanguage } = usePaymentStore();
  const [isOpen, setIsOpen] = useState(false);
  
  // Find current language with fallback
  const currentLanguage = LANGUAGES.find(lang => lang.code === language) || LANGUAGES[0];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Language Button - Clean text-only design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl px-3 py-2 hover:bg-white/30 transition-all duration-200 shadow-sm"
        title={`Current language: ${currentLanguage.name}`}
      >
        {/* Globe icon and language code */}
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-white/80" />
          <span className="text-sm font-medium text-white">
            {currentLanguage.shortName}
          </span>
        </div>
        
        {/* Dropdown arrow */}
        <ChevronDown className={`w-4 h-4 text-white/80 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute left-0 md:left-auto md:right-0 top-full mt-2 z-20 backdrop-blur-md bg-white/95 border border-gray-200/50 rounded-xl shadow-xl overflow-hidden min-w-[180px]">
            
            {/* Header */}
            <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-200/50">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span className="font-medium">Choose Language</span>
              </div>
            </div>

            {/* Language options */}
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100/70 transition-all duration-150 ${
                  language === lang.code ? 'bg-blue-50/80 text-blue-700' : 'text-gray-700'
                }`}
                title={`Switch to ${lang.name}`}
              >
                {/* Language info */}
                <div className="flex-1">
                  <div className="font-medium text-sm">{lang.name}</div>
                  <div className="text-xs opacity-60">{lang.shortName}</div>
                </div>
                
                {/* Check mark for active language */}
                {language === lang.code && (
                  <div className="text-blue-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
            
            {/* Footer */}
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-200/30">
              <div className="text-xs text-gray-500 text-center">
                🌍 BigFoot Works • 6 Languages
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;