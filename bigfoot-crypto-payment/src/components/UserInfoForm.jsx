import React, { useState } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { User, Mail, MapPin, Users, Phone, AlertCircle } from 'lucide-react';
import BackButton from './BackButton';

const UserInfoForm = () => {
  const { 
    selectedAmount,
    userInfo,
    setUserInfo,
    nextStep,
    prevStep 
  } = usePaymentStore();

  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    address: userInfo?.address || '',
    city: userInfo?.city || '',
    postalCode: userInfo?.postalCode || '',
    country: userInfo?.country || 'Polska',
    fbUsername: userInfo?.fbUsername || '',
    phone: userInfo?.phone || '',
    termsAccepted: userInfo?.termsAccepted || false,
    marketingConsent: userInfo?.marketingConsent || false
  });

  const [errors, setErrors] = useState({});

  // Sprawdź czy nagrody fizyczne są potrzebne
  const needsPhysicalRewards = selectedAmount >= 50;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Usuń błąd dla tego pola
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Wymagane pola
    if (!formData.firstName.trim()) newErrors.firstName = 'Imię jest wymagane';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nazwisko jest wymagane';
    if (!formData.email.trim()) newErrors.email = 'Email jest wymagany';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    // Adres wymagany tylko dla nagród fizycznych
    if (needsPhysicalRewards) {
      if (!formData.address.trim()) newErrors.address = 'Adres jest wymagany dla wysyłki nagród';
      if (!formData.city.trim()) newErrors.city = 'Miasto jest wymagane';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Kod pocztowy jest wymagany';
      else if (!/^\d{2}-\d{3}$/.test(formData.postalCode)) {
        newErrors.postalCode = 'Format: XX-XXX';
      }
    }

    // Facebook username dla dostępu do grupy
    if (!formData.fbUsername.trim()) {
      newErrors.fbUsername = 'Nazwa użytkownika FB jest wymagana do dodania do grupy';
    }

    // Regulamin i polityka prywatności - wymagane
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Akceptacja regulaminu i polityki prywatności jest wymagana';
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

    // Zapisz dane użytkownika
    setUserInfo(formData);
    nextStep();
  };

  const getTierInfo = () => {
    if (selectedAmount <= 50) return { name: 'Student', rewards: 'Naklejka + dostęp do grupy FB' };
    if (selectedAmount <= 100) return { name: 'Turysta', rewards: 'Naklejka + opaska + grupa FB' };
    if (selectedAmount <= 170) return { name: 'Skaut', rewards: 'Naklejka + złota opaska + grupa FB' };
    if (selectedAmount <= 360) return { name: 'Ranger', rewards: 'Wypukła naklejka + opaska + grupa FB' };
    return { name: 'Szeryf', rewards: 'Pełen pakiet: naklejki, opaska, t-shirt, czapka, otwieracz + pierwszeństwo w eventach' };
  };

  const tierInfo = getTierInfo();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <BackButton onClick={prevStep} />

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">Dane wspierającego</h2>
        <div className="backdrop-blur-sm bg-gradient-to-r from-emerald-400/20 to-green-500/20 border border-emerald-300/30 inline-block px-6 py-3 rounded-xl shadow-sm">
          <span className="text-emerald-200 font-bold text-lg">{selectedAmount} PLN</span>
          <span className="text-emerald-300 text-sm ml-2">• {tierInfo.name}</span>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="backdrop-blur-sm bg-blue-100/70 border border-blue-200/50 rounded-xl p-4 mb-6">
        <div className="flex items-center mb-2">
          <User className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-semibold text-blue-800">Twoje nagrody</span>
        </div>
        <p className="text-sm text-blue-700">{tierInfo.rewards}</p>
        {needsPhysicalRewards && (
          <p className="text-xs text-blue-600 mt-2">📦 Zawiera wysyłkę - wymagany adres pocztowy</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Podstawowe dane */}
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Dane osobowe
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Imię *"
              value={formData.firstName}
              onChange={(value) => handleInputChange('firstName', value)}
              error={errors.firstName}
              placeholder="Jan"
            />
            <FormField
              label="Nazwisko *"
              value={formData.lastName}
              onChange={(value) => handleInputChange('lastName', value)}
              error={errors.lastName}
              placeholder="Kowalski"
            />
          </div>

          <FormField
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            error={errors.email}
            placeholder="jan.kowalski@example.com"
            icon={<Mail className="w-4 h-4" />}
          />

          <FormField
            label="Telefon (opcjonalnie)"
            type="tel"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            error={errors.phone}
            placeholder="+48 123 456 789"
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        {/* Adres - tylko dla nagród fizycznych */}
        {needsPhysicalRewards && (
          <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Adres wysyłki nagród
            </h3>
            
            <FormField
              label="Ulica i numer *"
              value={formData.address}
              onChange={(value) => handleInputChange('address', value)}
              error={errors.address}
              placeholder="ul. Przykładowa 123/45"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Miasto *"
                value={formData.city}
                onChange={(value) => handleInputChange('city', value)}
                error={errors.city}
                placeholder="Warszawa"
              />
              <FormField
                label="Kod pocztowy *"
                value={formData.postalCode}
                onChange={(value) => handleInputChange('postalCode', value)}
                error={errors.postalCode}
                placeholder="00-001"
              />
              <FormField
                label="Kraj"
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                error={errors.country}
                placeholder="Polska"
              />
            </div>
          </div>
        )}

        {/* Facebook */}
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Dostęp do grupy Facebook
          </h3>
          
          <FormField
            label="Nazwa użytkownika Facebook *"
            value={formData.fbUsername}
            onChange={(value) => handleInputChange('fbUsername', value)}
            error={errors.fbUsername}
            placeholder="jan.kowalski lub @jankowalski"
            helpText="Podaj nazwę użytkownika lub handle, aby zostać dodanym do prywatnej grupy FB"
          />
        </div>

        {/* Zgody */}
        <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl p-6 shadow-lg space-y-4">
          {/* Obowiązkowa zgoda na regulamin */}
          <div>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="text-sm text-gray-700">
                <span className="font-medium">Akceptuję </span>
                <a 
                  href="https://bigfootworks.pl/regulamin/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  regulamin
                </a>
                <span> oraz </span>
                <a 
                  href="https://bigfootworks.pl/polityka-prywatnosci/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  politykę prywatności
                </a>
                <span className="text-red-500 ml-1">*</span>
              </div>
            </label>
            {errors.termsAccepted && (
              <div className="flex items-center text-red-600 text-xs mt-2 ml-7">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.termsAccepted}
              </div>
            )}
          </div>

          {/* Opcjonalna zgoda na newsletter */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Wyrażam zgodę na otrzymywanie informacji o wydarzeniach BigFoot Works (opcjonalnie)
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600/80 hover:to-indigo-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Kontynuuj do płatności
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