import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Copy, Check, ExternalLink, User, Mail, MapPin, Users, Phone, AlertCircle, ArrowLeft, Send, Calculator, Coins, HelpCircle } from 'lucide-react';
import CalculationModal from './CalculationModal';
import ManualDonationModal from './ManualDonationModal';
import Footer from './Footer';

const ManualDonation = ({ onBack }) => {
  const { t, language } = useTranslations();
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: getDefaultCountry(language),
    fbUsername: '',
    phone: '',
    amount: '',
    cryptoAmount: '',
    cryptoSymbol: '',
    selectedBlockchain: '',
    selectedCurrency: '', // NEW: For independent currency selection
    transactionLink: '',
    termsAccepted: false,
    marketingConsent: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Show guide modal on every load
  useEffect(() => {
    setShowGuideModal(true);
  }, []);

  const handleCloseGuide = () => {
    setShowGuideModal(false);
  };

  // Debug effect to monitor blockchain selection
  useEffect(() => {
    console.log('Current selectedBlockchain in form:', formData.selectedBlockchain);
  }, [formData.selectedBlockchain]);

  // Clear incompatible currency selection when blockchain changes
  useEffect(() => {
    if (formData.selectedBlockchain && formData.selectedCurrency) {
      const availableCurrencies = getAvailableCurrencies();
      const isCurrentCurrencyAvailable = availableCurrencies.some(
        currency => currency.id === formData.selectedCurrency
      );
      
      if (!isCurrentCurrencyAvailable) {
        console.log('Clearing incompatible currency:', formData.selectedCurrency, 'for blockchain:', formData.selectedBlockchain);
        handleInputChange('selectedCurrency', '');
      }
    }
  }, [formData.selectedBlockchain]);

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

  // Available currencies for selection
  const availableCurrencies = [
    { id: 'BTC', name: 'Bitcoin (BTC)', blockchains: ['Bitcoin'] },
    { id: 'ETH', name: 'Ethereum (ETH)', blockchains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'zkSync'] },
    { id: 'SOL', name: 'Solana (SOL)', blockchains: ['Solana'] },
    { id: 'TON', name: 'TON (TON)', blockchains: ['TON'] },
    { id: 'USDC', name: 'USDC Stablecoin', blockchains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'zkSync', 'Solana', 'TON'] }
  ];

  // Filter currencies based on selected blockchain
  const getAvailableCurrencies = () => {
    if (!formData.selectedBlockchain) {
      return availableCurrencies; // Show all if no blockchain selected
    }

    return availableCurrencies.filter(currency => 
      currency.blockchains.includes(formData.selectedBlockchain)
    );
  };

  // Wallet addresses from environment variables
  const walletAddresses = {
    Bitcoin: {
      address: import.meta.env.VITE_BTC_ADDRESS || 'bc1qexample...',
      symbol: 'BTC',
      network: 'Bitcoin',
      icon: '₿',
      color: 'from-orange-400 to-yellow-500'
    },
    Ethereum: {
      address: import.meta.env.VITE_ETH_ADDRESS || '0xexample...',
      symbol: 'ETH/$',
      network: 'Polygon/Arb/Op/zkSync',
      icon: 'Ξ',
      color: 'from-blue-400 to-indigo-500'
    },
    Solana: {
      address: import.meta.env.VITE_SOL_ADDRESS || 'SolExample...',
      symbol: 'SOL/$',
      network: 'Solana',
      icon: '◎',
      color: 'from-purple-400 to-pink-500'
    },
    TON: {
      address: import.meta.env.VITE_TON_ADDRESS || 'UQExample...',
      symbol: 'TON/$',
      network: 'TON',
      icon: '💎',
      color: 'from-cyan-400 to-blue-500'
    }
  };

  const handleCopyAddress = async (blockchain, address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(blockchain);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remove error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleCalculatorSelect = (selectedData) => {
    console.log('=== CALCULATOR DATA RECEIVED ===');
    console.log('Full selectedData object:', selectedData);
    
    // Update form with calculator data
    setFormData(prev => {
      const updated = {
        ...prev,
        amount: selectedData.plnAmount.toString(),
        cryptoAmount: selectedData.cryptoAmount.toString(),
        cryptoSymbol: selectedData.symbol,
        selectedBlockchain: selectedData.blockchainName,
        selectedCurrency: selectedData.symbol // Auto-select currency based on calculator choice
      };
      console.log('=== FORM UPDATE FROM CALCULATOR ===');
      console.log('Updated form data:', updated);
      return updated;
    });
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
    if (!formData.amount.trim()) newErrors.amount = t('amountRequired');
    else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = t('invalidAmount');
    }
    if (!formData.selectedBlockchain) newErrors.selectedBlockchain = t('blockchainRequired');
    if (!formData.selectedCurrency) newErrors.selectedCurrency = t('currencyRequired');
    if (!formData.transactionLink.trim()) newErrors.transactionLink = t('transactionLinkRequired');
    if (!formData.fbUsername.trim()) newErrors.fbUsername = t('facebookRequired');

    // Address validation for amounts >= 50 PLN
    const needsAddress = parseFloat(formData.amount) >= 50;
    if (needsAddress) {
      if (!formData.address.trim()) newErrors.address = t('addressRequired');
      if (!formData.city.trim()) newErrors.city = t('cityRequired');
      if (!formData.postalCode.trim()) newErrors.postalCode = t('postalCodeRequired');
      else if (!/^\d{2}-\d{3}$/.test(formData.postalCode)) {
        newErrors.postalCode = t('postalCodeFormat');
      }
    }

    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = t('termsRequired');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would send the data to your backend/email service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Manual donation form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      setErrors({ submit: t('submissionFailed') });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
        </div>
        
        <div className="max-w-2xl mx-auto relative z-10 p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-4">{t('donationSubmitted')}</h2>
            <p className="text-gray-300 mb-8">{t('manualDonationThankYou')}</p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              {t('goToDapp')}
            </button>
          </div>
          
          <Footer />
        </div>
      </div>
    );
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

      <div className="max-w-4xl mx-auto relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-100 hover:text-blue-300 font-semibold backdrop-blur-sm bg-gray-800/30 px-4 py-2 rounded-xl border border-gray-600/50 transition-all duration-300 hover:bg-gray-700/40"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('goToDapp')}
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Help Button */}
            <button
              onClick={() => setShowGuideModal(true)}
              className="flex items-center space-x-2 backdrop-blur-sm bg-blue-600/20 border border-blue-500/30 px-3 py-2 rounded-xl hover:bg-blue-500/30 transition-all duration-300 text-blue-200"
              title={t('manualDonationGuide')}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{t('help')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Addresses Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">{t('walletAddresses')}</h2>
            
            {Object.entries(walletAddresses).map(([blockchain, wallet]) => (
              <div key={blockchain} className={`bg-gradient-to-r ${wallet.color} p-1 rounded-xl`}>
                <div className="backdrop-blur-sm bg-gray-800/90 rounded-lg p-6 border border-gray-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-100">{blockchain}</h3>
                        <p className="text-sm text-gray-400">{wallet.network}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-300">{wallet.symbol}</span>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3 mb-3 border border-gray-600/30">
                    <p className="font-mono text-sm break-all text-gray-200">{wallet.address}</p>
                  </div>
                  
                  <button
                    onClick={() => handleCopyAddress(blockchain, wallet.address)}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-gray-100 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600/50"
                  >
                    {copiedAddress === blockchain ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t('copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{t('copyAddress')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {/* Calculator Button - NOW OUTSIDE THE FORM */}
            <div className="backdrop-blur-sm bg-blue-600/20 border border-blue-500/30 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-blue-100 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                {t('cryptoCalculator')}
              </h3>
              <p className="text-blue-200 text-sm mb-4">{t('calculatorHelp')}</p>
              <button
                type="button"
                onClick={() => setShowCalculator(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>{t('openCalculator')}</span>
              </button>
            </div>

            {/* Form */}
            <div className="backdrop-blur-sm bg-gray-800/80 rounded-xl p-6 border border-gray-600/50 shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-100 mb-6">{t('donationDetails')}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
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

                {/* Donation Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    {t('donationInfo')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      label={`${t('amount')} (PLN) *`}
                      type="number"
                      value={formData.amount}
                      onChange={(value) => handleInputChange('amount', value)}
                      error={errors.amount}
                      placeholder="100"
                    />
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-300">
                        {t('cryptoAmount')} {formData.cryptoSymbol ? `(${formData.cryptoSymbol})` : ''}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Coins className="w-4 h-4" />
                        </div>
                        {formData.cryptoAmount && formData.cryptoSymbol && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                        )}
                        <input
                          type="text"
                          value={formData.cryptoAmount}
                          onChange={(e) => handleInputChange('cryptoAmount', e.target.value)}
                          placeholder={t('calculatedFromAmount')}
                          className={`w-full pl-10 ${formData.cryptoAmount && formData.cryptoSymbol ? 'pr-10' : 'pr-3'} py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400`}
                        />
                      </div>
                      {formData.cryptoAmount && formData.cryptoSymbol && (
                        <p className="text-xs text-green-400 mt-1">
                          ✓ {t('calculatedValue')}: {formData.cryptoAmount} {formData.cryptoSymbol}
                        </p>
                      )}
                      {!formData.cryptoAmount && (
                        <p className="text-xs text-gray-400 mt-1">{t('useCalculatorForExactAmount')}</p>
                      )}
                    </div>
                  </div>

                  {/* Currency Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('currency')} *
                      {formData.selectedBlockchain && (
                        <span className="text-xs text-gray-400 ml-2">
                          (Available for {formData.selectedBlockchain})
                        </span>
                      )}
                    </label>
                    <select
                      value={formData.selectedCurrency}
                      onChange={(e) => handleInputChange('selectedCurrency', e.target.value)}
                      className={`w-full px-3 py-2 bg-gray-700/50 border ${
                        errors.selectedCurrency ? 'border-red-400' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100`}
                    >
                      <option value="">{t('selectCurrency')}</option>
                      {getAvailableCurrencies().map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name}
                        </option>
                      ))}
                    </select>
                    {errors.selectedCurrency && (
                      <div className="flex items-center text-red-400 text-xs mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.selectedCurrency}
                      </div>
                    )}
                    {formData.selectedBlockchain && getAvailableCurrencies().length === 1 && (
                      <p className="text-xs text-yellow-400 mt-1">
                        ℹ️ {formData.selectedBlockchain === 'Bitcoin' ? 'Bitcoin supports only BTC payments' : 'Limited currency options for this blockchain'}
                      </p>
                    )}
                  </div>

                  {/* Blockchain Selection */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">
                      {t('blockchain')} * 
                      <span className="text-xs text-gray-400 ml-2">
                        (Current: {formData.selectedBlockchain || 'None'})
                      </span>
                    </label>
                    <select
                      key={`blockchain-${formData.selectedBlockchain}`}
                      value={formData.selectedBlockchain}
                      onChange={(e) => {
                        console.log('Dropdown changed to:', e.target.value);
                        handleInputChange('selectedBlockchain', e.target.value);
                      }}
                      className={`w-full px-3 py-2 bg-gray-700/50 border ${
                        errors.selectedBlockchain ? 'border-red-400' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100`}
                    >
                      <option value="">{t('selectBlockchain')}</option>
                      
                      {/* Bitcoin */}
                      <option value="Bitcoin">Bitcoin (BTC)</option>
                      
                      {/* Ethereum Mainnet */}
                      <option value="Ethereum">Ethereum Mainnet (ETH/USDC)</option>
                      
                      {/* Ethereum Layer 2 Networks */}
                      <optgroup label="━━━ Ethereum Layer 2 ━━━">
                        <option value="Polygon">Polygon (MATIC/USDC)</option>
                        <option value="Arbitrum">Arbitrum (ARB/USDC)</option>
                        <option value="Optimism">Optimism (OP/USDC)</option>
                        <option value="zkSync">zkSync Era (ZKS/USDC)</option>
                      </optgroup>
                      
                      {/* Other Networks */}
                      <option value="Solana">Solana (SOL/USDC)</option>
                      <option value="TON">TON (TON)</option>
                    </select>
                    {errors.selectedBlockchain && (
                      <div className="flex items-center text-red-400 text-xs mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.selectedBlockchain}
                      </div>
                    )}
                  </div>

                  <FormField
                    label={`${t('transactionLink')} *`}
                    value={formData.transactionLink}
                    onChange={(value) => handleInputChange('transactionLink', value)}
                    error={errors.transactionLink}
                    placeholder="https://etherscan.io/tx/0x..."
                    icon={<ExternalLink className="w-4 h-4" />}
                    helpText={t('transactionLinkHelp')}
                  />
                </div>

                {/* Address (conditional) */}
                {parseFloat(formData.amount) >= 50 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
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
                <div className="space-y-4">
                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                      />
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">{t('acceptTerms')} </span>
                        <a 
                          href="https://bigfootworks.pl/regulamin/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                        >
                          {t('terms')}
                        </a>
                        <span> {t('and')} </span>
                        <a 
                          href="https://bigfootworks.pl/polityka-prywatnosci/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                        >
                          {t('privacyPolicy')}
                        </a>
                        <span className="text-red-400 ml-1">{t('required')}</span>
                      </div>
                    </label>
                    {errors.termsAccepted && (
                      <div className="flex items-center text-red-400 text-xs mt-2 ml-7">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.termsAccepted}
                      </div>
                    )}
                  </div>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">
                      {t('marketingConsent')}
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? t('submitting') : t('submitDonation')}
                </button>

                {errors.submit && (
                  <div className="flex items-center text-red-400 text-sm mt-2">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.submit}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Calculation Modal */}
      <CalculationModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        selectedBlockchain={formData.selectedBlockchain}
        onAmountSelect={handleCalculatorSelect}
      />

      {/* Manual Donation Guide Modal */}
      <ManualDonationModal
        isOpen={showGuideModal}
        onClose={handleCloseGuide}
      />
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
  helpText,
  readOnly = false
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-300">
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
        readOnly={readOnly}
        className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 bg-gray-700/50 border ${
          error ? 'border-red-400' : 'border-gray-600'
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400 ${
          readOnly ? 'bg-gray-800/50 cursor-not-allowed' : ''
        }`}
      />
    </div>
    {error && (
      <div className="flex items-center text-red-400 text-xs mt-1">
        <AlertCircle className="w-3 h-3 mr-1" />
        {error}
      </div>
    )}
    {helpText && !error && (
      <p className="text-xs text-gray-400 mt-1">{helpText}</p>
    )}
  </div>
);

export default ManualDonation;