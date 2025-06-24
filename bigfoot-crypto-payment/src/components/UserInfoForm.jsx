import React, { useState } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { useTranslations } from '../hooks/useTranslations';
import { User, Mail, MapPin, Users, Phone, AlertCircle } from 'lucide-react';
import BackButton from './BackButton';

const UserInfoForm = () => {
  const { 
    selectedAmount,
    userInfo,
    setUserInfo,
    nextStep,
    prevStep,
    language
  } = usePaymentStore();
  
  const { t } = useTranslations();

  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    address: userInfo?.address || '',
    city: userInfo?.city || '',
    postalCode: userInfo?.postalCode || '',
    country: userInfo?.country || getDefaultCountry(language),
    fbUsername: userInfo?.fbUsername || '',
    phone: userInfo?.phone || '',
    termsAccepted: userInfo?.termsAccepted || false,
    marketingConsent: userInfo?.marketingConsent || false
  });

  const [errors, setErrors] = useState({});

  // Get default country based on language
  function getDefaultCountry(lang) {
    const defaults = {
      pl: 'Polska',
      en: 'Poland', 
      de: 'Polen',
      sv: 'Polen',
      no: 'Polen',
      da: 'Polen'
    };
    return defaults[lang] || 'Polska';
  }

  // Check if physical rewards are needed
  const needsPhysicalRewards = selectedAmount >= 50;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remove error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = t('firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('lastNameRequired');
    if (!formData.email.trim()) newErrors.email = t('emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    // Address required only for physical rewards
    if (needsPhysicalRewards) {
      if (!formData.address.trim()) newErrors.address = t('addressRequired');
      if (!formData.city.trim()) newErrors.city = t('cityRequired');
      if (!formData.postalCode.trim()) newErrors.postalCode = t('postalCodeRequired');
      else if (!/^\d{2}-\d{3}$/.test(formData.postalCode)) {
        newErrors.postalCode = t('postalCodeFormat');
      }
    }

    // Facebook username for group access
    if (!formData.fbUsername.trim()) {
      newErrors.fbUsername = t('facebookRequired');
    }

    // Terms and privacy policy - required
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = t('termsRequired');
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save user data
    setUserInfo(formData);
    nextStep();
  };

  const getTierInfo = () => {
    // Używamy paymentStore.getTierInfo() które już ma tłumaczenia
    const storeGetTierInfo = usePaymentStore.getState().getTierInfo;
    return storeGetTierInfo();
  };

  const tierInfo = getTierInfo();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">{t('supporterData')}</h2>
        <div className="backdrop-blur-sm bg-gradient-to-r from-emerald-400/20 to-green-500/20 border border-emerald-300/30 inline-block px-6 py-3 rounded-xl shadow-sm">
          <span className="text-emerald-200 font-bold text-lg">{selectedAmount} PLN</span>
          <span className="text-emerald-300 text-sm ml-2">• {tierInfo.name}</span>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="backdrop-blur-sm bg-blue-100/70 border border-blue-200/50 rounded-xl p-4 mb-6">
        <div className="flex items-center mb-2">
          <User className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-semibold text-blue-800">{t('yourRewards')}</span>
        </div>
        <p className="text-sm text-blue-700">{tierInfo.rewards}</p>
        {needsPhysicalRewards && (
          <p className="text-xs text-blue-600 mt-2">📦 {t('shippingRequired')}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic data */}
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            {t('personalData')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label={`${t('firstName')} *`}
              value={formData.firstName}
              onChange={(value) => handleInputChange('firstName', value)}
              error={errors.firstName}
              placeholder="Jan"
            />
            <FormField
              label={`${t('lastName')} *`}
              value={formData.lastName}
              onChange={(value) => handleInputChange('lastName', value)}
              error={errors.lastName}
              placeholder="Kowalski"
            />
          </div>

          <FormField
            label={`${t('email')} *`}
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            error={errors.email}
            placeholder="jan.kowalski@example.com"
            icon={<Mail className="w-4 h-4" />}
          />

          <FormField
            label={t('phone')}
            type="tel"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            error={errors.phone}
            placeholder="+48 123 456 789"
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        {/* Address - only for physical rewards */}
        {needsPhysicalRewards && (
          <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {t('shippingAddress')}
            </h3>
            
            <FormField
              label={`${t('streetAndNumber')} *`}
              value={formData.address}
              onChange={(value) => handleInputChange('address', value)}
              error={errors.address}
              placeholder="ul. Przykładowa 123/45"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label={`${t('city')} *`}
                value={formData.city}
                onChange={(value) => handleInputChange('city', value)}
                error={errors.city}
                placeholder="Warszawa"
              />
              <FormField
                label={`${t('postalCode')} *`}
                value={formData.postalCode}
                onChange={(value) => handleInputChange('postalCode', value)}
                error={errors.postalCode}
                placeholder="00-001"
              />
              <FormField
                label={t('country')}
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                error={errors.country}
                placeholder={getDefaultCountry(language)}
              />
            </div>
          </div>
        )}

        {/* Facebook */}
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            {t('facebookAccess')}
          </h3>
          
          <FormField
            label={`${t('facebookUsername')} *`}
            value={formData.fbUsername}
            onChange={(value) => handleInputChange('fbUsername', value)}
            error={errors.fbUsername}
            placeholder="jan.kowalski lub @jankowalski"
            helpText={t('facebookHelp')}
          />
        </div>

        {/* Consents */}
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg space-y-4">
          {/* Required consent for terms */}
          <div>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="text-sm text-gray-700">
                <span className="font-medium">{t('acceptTerms')} </span>
                <a 
                  href="https://bigfootworks.pl/regulamin/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  {t('terms')}
                </a>
                <span> {t('and')} </span>
                <a 
                  href="https://bigfootworks.pl/polityka-prywatnosci/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  {t('privacyPolicy')}
                </a>
                <span className="text-red-500 ml-1">{t('required')}</span>
              </div>
            </label>
            {errors.termsAccepted && (
              <div className="flex items-center text-red-600 text-xs mt-2 ml-7">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.termsAccepted}
              </div>
            )}
          </div>

          {/* Optional consent for newsletter */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              {t('marketingConsent')}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600/80 hover:to-indigo-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          {t('continueToPayment')}
        </button>
      </form>
    </div>
  );
};

const FormField = ({ 
  label, 
  value, 
  onChange, 
  error, 
  type = "text", 
  placeholder, 
  icon, 
  helpText 
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 backdrop-blur-sm bg-white/70 border ${
          error ? 'border-red-300' : 'border-gray-200/50'
        } rounded-lg focus:ring-2 focus:ring-blue-400/50 focus:border-gray-300/50 text-gray-900 placeholder-gray-500`}
      />
    </div>
    {error && (
      <div className="flex items-center text-red-600 text-xs mt-1">
        <AlertCircle className="w-3 h-3 mr-1" />
        {error}
      </div>
    )}
    {helpText && !error && (
      <p className="text-xs text-gray-500 mt-1">{helpText}</p>
    )}
  </div>
);

export default UserInfoForm;