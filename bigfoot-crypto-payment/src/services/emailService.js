import emailjs from 'emailjs-com';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  foundationTemplateId: import.meta.env.VITE_EMAILJS_FOUNDATION_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  supporterTemplateId: import.meta.env.VITE_EMAILJS_SUPPORTER_TEMPLATE_ID,
  userId: import.meta.env.VITE_EMAILJS_USER_ID
};

// Foundation email
const FOUNDATION_EMAIL = import.meta.env.VITE_FOUNDATION_EMAIL || 'fundacja@bigfootworks.pl';

// Validate EmailJS configuration
const validateConfig = () => {
  const { serviceId, foundationTemplateId, userId } = EMAILJS_CONFIG;
  
  if (!serviceId || !foundationTemplateId || !userId) {
    throw new Error('EmailJS configuration is incomplete. Check environment variables.');
  }
};

// Generate unique payment ID
const generatePaymentId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BFW-${timestamp}-${random}`.toUpperCase();
};

// Get detailed tier information
const getTierDetails = (tierLevel) => {
  const tiers = {
    'Student': {
      amount: 50,
      description: 'Naklejka + dostęp do grupy FB',
      items: [
        'Naklejka BigFoot Works',
        'Dostęp do prywatnej grupy Facebook'
      ],
      physicalItems: ['Naklejka BigFoot Works'],
      digitalItems: ['Dostęp do prywatnej grupy Facebook'],
      shippingRequired: true,
      processingTime: '7-14 dni roboczych'
    },
    'Turysta': {
      amount: 100,
      description: 'Naklejka + opaska + grupa FB',
      items: [
        'Naklejka BigFoot Works',
        'Opaska materiałowa',
        'Dostęp do prywatnej grupy Facebook'
      ],
      physicalItems: ['Naklejka BigFoot Works', 'Opaska materiałowa'],
      digitalItems: ['Dostęp do prywatnej grupy Facebook'],
      shippingRequired: true,
      processingTime: '7-14 dni roboczych'
    },
    'Skaut': {
      amount: 170,
      description: 'Naklejka + złota opaska + grupa FB',
      items: [
        'Naklejka BigFoot Works',
        'Złota opaska materiałowa',
        'Dostęp do prywatnej grupy Facebook'
      ],
      physicalItems: ['Naklejka BigFoot Works', 'Złota opaska materiałowa'],
      digitalItems: ['Dostęp do prywatnej grupy Facebook'],
      shippingRequired: true,
      processingTime: '7-14 dni roboczych'
    },
    'Ranger': {
      amount: 360,
      description: 'Wypukła naklejka + opaska + grupa FB',
      items: [
        'Wypukła naklejka 3D',
        'Opaska materiałowa premium',
        'Dostęp do prywatnej grupy Facebook'
      ],
      physicalItems: ['Wypukła naklejka 3D', 'Opaska materiałowa premium'],
      digitalItems: ['Dostęp do prywatnej grupy Facebook'],
      shippingRequired: true,
      processingTime: '7-14 dni roboczych'
    },
    'Szeryf': {
      amount: 750,
      description: 'Pełen pakiet + pierwszeństwo w eventach',
      items: [
        'Zestaw naklejek BigFoot Works',
        'Opaska materiałowa premium',
        'Koszulka BigFoot Works',
        'Czapka z logo',
        'Otwieracz do butelek',
        'Dostęp do prywatnej grupy Facebook',
        'Pierwszeństwo w zapisach na eventy'
      ],
      physicalItems: [
        'Zestaw naklejek BigFoot Works',
        'Opaska materiałowa premium',
        'Koszulka BigFoot Works',
        'Czapka z logo',
        'Otwieracz do butelek'
      ],
      digitalItems: [
        'Dostęp do prywatnej grupy Facebook',
        'Pierwszeństwo w zapisach na eventy'
      ],
      shippingRequired: true,
      processingTime: '7-14 dni roboczych'
    }
  };
  
  return tiers[tierLevel] || {
    description: 'Niestandardowa kwota wsparcia',
    items: ['Indywidualne ustalenie nagród'],
    physicalItems: [],
    digitalItems: ['Dostęp do prywatnej grupy Facebook'],
    shippingRequired: false,
    processingTime: 'Do ustalenia'
  };
};

// 📧 EMAIL TO FOUNDATION - Complete notification with all details
export const sendPaymentNotification = async (paymentData) => {
  try {
    validateConfig();

    const paymentId = generatePaymentId();
    const tierDetails = getTierDetails(paymentData.tierLevel);
    
    const templateParams = {
      // Email routing
      to_email: FOUNDATION_EMAIL,
      subject: `🎯 Nowe wsparcie krypto: ${paymentData.amountPln} PLN od ${paymentData.fullName}`,
      
      // Payment identification
      payment_id: paymentId,
      timestamp: paymentData.paymentDate + ' ' + paymentData.paymentTime,
      
      // Financial details
      amount_pln: paymentData.amountPln,
      amount_crypto: paymentData.amountCrypto,
      currency: paymentData.currency,
      blockchain: paymentData.blockchain,
      wallet_type: paymentData.wallet,
      
      // Transaction details
      tx_hash: paymentData.txHash || 'Oczekiwanie na potwierdzenie...',
      transaction_status: paymentData.transactionStatus || 'pending',
      foundation_address: paymentData.foundationAddress || 'Adres fundacji',
      
      // Supporter personal details
      supporter_name: paymentData.fullName,
      first_name: paymentData.firstName,
      last_name: paymentData.lastName,
      supporter_email: paymentData.email,
      supporter_phone: paymentData.phone || 'Nie podano',
      
      // Social media
      fb_username: paymentData.fbUsername,
      fb_action_needed: `Dodaj użytkownika "${paymentData.fbUsername}" do prywatnej grupy Facebook BigFoot Works`,
      
      // Shipping information
      needs_shipping: tierDetails.shippingRequired ? 'TAK' : 'NIE',
      shipping_address: paymentData.fullAddress || 'Brak adresu - tylko nagrody cyfrowe',
      shipping_country: paymentData.country || 'Polska',
      
      // Tier and rewards details
      tier_level: paymentData.tierLevel,
      tier_description: tierDetails.description,
      physical_items: tierDetails.physicalItems.join('\n• '),
      digital_items: tierDetails.digitalItems.join('\n• '),
      processing_time: tierDetails.processingTime,
      
      // Marketing and privacy
      terms_accepted: paymentData.termsAccepted ? 'TAK - zaakceptowano regulamin i politykę prywatności' : 'NIE - nie zaakceptowano',
      marketing_consent: paymentData.marketingConsent ? 'TAK - może otrzymywać newsletter' : 'NIE - tylko niezbędne komunikaty',
            
      
      // Action items for foundation
      action_items: `
🔸 Dodaj ${paymentData.fbUsername} do grupy FB
${tierDetails.shippingRequired ? `🔸 Przygotuj paczkę z nagrodami dla: ${paymentData.fullName}` : '🔸 Brak wysyłki - tylko dostęp do grupy'}
🔸 Potwierdź odbiór płatności w systemie
${paymentData.marketingConsent ? '🔸 Dodaj do listy mailingowej' : ''}
      `.trim(),
      
      // Summary message
      summary_message: `
Otrzymano nowe wsparcie kryptowalutowe:

💰 Kwota: ${paymentData.amountPln} PLN (${paymentData.amountCrypto} ${paymentData.currency})
👤 Wspierający: ${paymentData.fullName} (${paymentData.email})
🎁 Poziom: ${paymentData.tierLevel}
📦 Wysyłka: ${tierDetails.shippingRequired ? 'Wymagana' : 'Nie wymagana'}
📱 Facebook: ${paymentData.fbUsername}

${paymentData.fullAddress ? `📍 Adres: ${paymentData.fullAddress}` : ''}
🔗 TX: ${paymentData.txHash || 'Oczekiwanie...'}
      `.trim()
    };

    console.log('Sending foundation notification:', paymentId);
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.foundationTemplateId,
      templateParams,
      EMAILJS_CONFIG.userId
    );

    if (response.status === 200) {
      console.log('Foundation email sent successfully:', paymentId);
      return { success: true, paymentId, response };
    } else {
      throw new Error(`EmailJS responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Foundation email failed:', error);
    throw new Error(`Błąd wysyłania powiadomienia do fundacji: ${error.message}`);
  }
};

// 📧 EMAIL TO SUPPORTER - Confirmation and next steps
export const sendSupporterConfirmation = async (paymentData) => {
  try {
    // Skip if no supporter email template configured
    if (!EMAILJS_CONFIG.supporterTemplateId) {
      console.warn('Supporter email template not configured, skipping...');
      return { success: false, reason: 'No template configured' };
    }

    validateConfig();
    
    const tierDetails = getTierDetails(paymentData.tierLevel);
    const paymentId = generatePaymentId();
    
    const templateParams = {
      // Email routing
      to_email: paymentData.email,
      supporter_email: paymentData.email,
      subject: `✅ Dziękujemy za wsparcie BigFoot Works! [${paymentData.amountPln} PLN]`,
      
      // Personal greeting
      supporter_name: paymentData.fullName,
      first_name: paymentData.firstName,
      
      // Payment confirmation
      amount_pln: paymentData.amountPln,
      amount_crypto: paymentData.amountCrypto,
      currency: paymentData.currency,
      blockchain: paymentData.blockchain,
      payment_date: paymentData.paymentDate,
      payment_time: paymentData.paymentTime,
      payment_id: paymentId,
      
      // Transaction details
      tx_hash: paymentData.txHash || 'Przetwarzanie...',
      tx_status: paymentData.transactionStatus === 'confirmed' ? 'Potwierdzona' : 'W trakcie przetwarzania',
      blockchain_explorer: getExplorerInfo(paymentData.blockchain, paymentData.txHash),
      
      // Tier and rewards
      tier_level: paymentData.tierLevel,
      tier_description: tierDetails.description,
      
      // Detailed rewards breakdown
      physical_rewards: tierDetails.physicalItems.length > 0 ? 
        `🎁 Nagrody fizyczne:\n• ${tierDetails.physicalItems.join('\n• ')}` : 
        '🎁 Brak nagród fizycznych',
      
      digital_rewards: `🔓 Nagrody cyfrowe:\n• ${tierDetails.digitalItems.join('\n• ')}`,
      
      all_rewards: `${tierDetails.items.map(item => `• ${item}`).join('\n')}`,
      
      // Shipping information
      shipping_needed: tierDetails.shippingRequired,
      shipping_info: tierDetails.shippingRequired ? 
        `📦 Twoje nagrody zostaną wysłane na adres:
${paymentData.fullAddress}

⏱️ Przewidywany czas wysyłki: ${tierDetails.processingTime}
📧 Otrzymasz email z numerem przesyłki gdy paczka zostanie nadana.` : 
        '📱 Wszystkie nagrody są cyfrowe - nie wymagają wysyłki.',
      
      // Facebook group access
      fb_username: paymentData.fbUsername,
      fb_instructions: `
🔹 Zostaniesz dodany do prywatnej grupy Facebook BigFoot Works
🔹 Twoja nazwa użytkownika: ${paymentData.fbUsername}
🔹 Oczekiwany czas dodania: do 24 godzin
🔹 Sprawdź zaproszenia do grup na Facebooku
      `.trim(),
      
      // Next steps
      next_steps: `
${tierDetails.shippingRequired ? '📦 Przygotowujemy Twoje nagrody do wysyłki' : ''}
👥 Dodajemy Cię do prywatnej grupy Facebook
📧 Będziemy Cię informować o statusie
${paymentData.tierLevel === 'Szeryf' ? '🎟️ Otrzymujesz pierwszeństwo w zapisach na eventy' : ''}
      `.trim(),
      
      // Contact information
      contact_info: `
📧 Email: ${FOUNDATION_EMAIL}
🌐 Strona: https://bigfootworks.pl
📱 Facebook: BigFoot Works Bikepark
      `.trim(),
      
      // Thank you message
      thank_you_message: `
Cześć ${paymentData.firstName}!

Ogromnie dziękujemy za wsparcie BigFoot Works! 🙏

Twoja płatność w wysokości ${paymentData.amountPln} PLN została otrzymana i pomyślnie przetworzona. 
Jako poziom "${paymentData.tierLevel}" otrzymujesz następujące nagrody:

${tierDetails.items.map(item => `✓ ${item}`).join('\n')}

${tierDetails.shippingRequired ? 
  `Nagrody fizyczne wyślemy na podany adres w ciągu ${tierDetails.processingTime}.` : 
  'Dostęp do grupy Facebook otrzymasz w ciągu 24 godzin.'}

Jesteś teraz częścią społeczności BigFoot Works! 🚵‍♂️

Dzięki Twojemu wsparciu możemy rozwijać bikepark i organizować więcej wydarzeń dla społeczności MTB.
      `.trim(),
      
      // Footer
      email_footer: `
---
BigFoot Works Bikepark
Email wysłany automatycznie - prosimy nie odpowiadać
W razie pytań napisz na: ${FOUNDATION_EMAIL}
      `.trim()
    };

    console.log('Sending supporter confirmation to:', paymentData.email);
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.supporterTemplateId,
      templateParams,
      EMAILJS_CONFIG.userId
    );

    if (response.status === 200) {
      console.log('Supporter email sent successfully to:', paymentData.email);
      return { success: true, response };
    } else {
      throw new Error(`EmailJS responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Supporter email failed:', error);
    // Don't throw - supporter email is optional
    return { 
      success: false, 
      error: error.message,
      reason: 'Email sending failed'
    };
  }
};

// Helper: Get blockchain explorer info
const getExplorerInfo = (blockchain, txHash) => {
  if (!txHash) return 'Transakcja w trakcie przetwarzania';
  
  const explorers = {
    'Bitcoin': `https://blockstream.info/tx/${txHash}`,
    'Ethereum': `https://etherscan.io/tx/${txHash}`,
    'Polygon': `https://polygonscan.com/tx/${txHash}`,
    'Solana': `https://solscan.io/tx/${txHash}`,
    'TON': `https://tonscan.org/tx/${txHash}`,
    'Arbitrum': `https://arbiscan.io/tx/${txHash}`,
    'Optimism': `https://optimistic.etherscan.io/tx/${txHash}`,
    'zkSync': `https://explorer.zksync.io/tx/${txHash}`
  };
  
  const explorerUrl = explorers[blockchain];
  return explorerUrl ? `Zobacz transakcję: ${explorerUrl}` : `Hash: ${txHash}`;
};

// 📧 MARKETING EMAIL - For supporters who consented (optional)
export const sendMarketingWelcome = async (supporterData) => {
  if (!supporterData.marketingConsent) {
    return { success: false, reason: 'No marketing consent' };
  }
  
  try {
    // This would be a separate marketing email template
    // Implementation depends on your marketing email setup
    console.log('Marketing email would be sent to:', supporterData.email);
    return { success: true, queued: true };
  } catch (error) {
    console.error('Marketing email failed:', error);
    return { success: false, error: error.message };
  }
};

// 🔧 UTILITY FUNCTIONS

// Test EmailJS configuration
export const testEmailConfiguration = async () => {
  try {
    validateConfig();
    
    console.log('EmailJS Configuration Check:');
    console.log('✅ Service ID:', EMAILJS_CONFIG.serviceId ? 'Set' : '❌ Missing');
    console.log('✅ Foundation Template:', EMAILJS_CONFIG.foundationTemplateId ? 'Set' : '❌ Missing');
    console.log('✅ Supporter Template:', EMAILJS_CONFIG.supporterTemplateId ? 'Set' : '⚠️ Optional');
    console.log('✅ User ID:', EMAILJS_CONFIG.userId ? 'Set' : '❌ Missing');
    console.log('✅ Foundation Email:', FOUNDATION_EMAIL);
    
    return { 
      success: true, 
      message: 'Configuration is valid',
      hasFoundationTemplate: !!EMAILJS_CONFIG.foundationTemplateId,
      hasSupporterTemplate: !!EMAILJS_CONFIG.supporterTemplateId
    };
  } catch (error) {
    console.error('EmailJS configuration test failed:', error);
    return { success: false, error: error.message };
  }
};

// Send test emails
export const sendTestEmails = async () => {
const testData = {
  amountPln: 100,
  amountCrypto: '0.025',
  currency: 'ETH',
  blockchain: 'Ethereum',
  wallet: 'MetaMask',
  firstName: 'Jan',
  lastName: 'Testowy',
  fullName: 'Jan Testowy',
  email: 'test@example.com',
  phone: '+48 123 456 789',
  fbUsername: 'jan.testowy',
  address: 'ul. Testowa 123',
  city: 'Warszawa',
  postalCode: '00-001',
  country: 'Polska',
  fullAddress: 'ul. Testowa 123, 00-001 Warszawa, Polska',
  tierLevel: 'Turysta',
  termsAccepted: true,
  marketingConsent: true,
  txHash: '0x1234567890abcdef...',
  transactionStatus: 'confirmed',
  paymentDate: new Date().toLocaleDateString('pl-PL'),
  paymentTime: new Date().toLocaleTimeString('pl-PL')
};

  try {
    const foundationResult = await sendPaymentNotification(testData);
    const supporterResult = await sendSupporterConfirmation(testData);
    
    return {
      success: true,
      foundation: foundationResult,
      supporter: supporterResult
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Export configuration for debugging
export const getEmailConfig = () => {
  return {
    serviceId: EMAILJS_CONFIG.serviceId ? '✅ Set' : '❌ Missing',
    foundationTemplate: EMAILJS_CONFIG.foundationTemplateId ? '✅ Set' : '❌ Missing',
    supporterTemplate: EMAILJS_CONFIG.supporterTemplateId ? '✅ Set' : '⚠️ Optional',
    userId: EMAILJS_CONFIG.userId ? '✅ Set' : '❌ Missing',
    foundationEmail: FOUNDATION_EMAIL
  };
};