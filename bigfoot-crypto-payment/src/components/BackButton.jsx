import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

const BackButton = ({ onClick }) => {
  const { t } = useTranslations();

  return (
    <button 
      onClick={onClick}
      className="flex items-center text-blue-100 hover:text-blue-700 mb-8 font-semibold backdrop-blur-sm bg-grey/10 px-4 py-2 rounded-xl border border-gray-200/50 transition-all duration-300 hover:bg-white/60"
    >
      <ChevronLeft className="w-5 h-5 mr-1" />
      {t('back')}
    </button>
  );
};

export default BackButton;