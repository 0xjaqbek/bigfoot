import emailjs from 'emailjs-com';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  userId: import.meta.env.VITE_EMAILJS_USER_ID
};

// Validate EmailJS configuration
const validateConfig = () => {
  const { serviceId, templateId, userId } = EMAILJS_CONFIG;
  
  if (!serviceId || !templateId || !userId) {
    throw new Error('EmailJS configuration is incomplete. Check environment variables.');
  }
};

// Send payment notification to foundation
export const sendPaymentNotification = async (paymentData) => {
  try {
    validateConfig();

    const templateParams = {
      // Foundation email (recipient)
      to_email: import.meta.env.VITE_FOUNDATION_EMAIL || 'fundacja@bigfootworks.pl',
      
      // Payment details
      amount_pln: paymentData.amountPln,
      amount_crypto: `${paymentData.amountCrypto} ${paymentData.currency}`,
      currency: paymentData.currency,
      blockchain: paymentData.blockchain,
      wallet_type: paymentData.wallet,
      
      // Transaction info
      tx_hash: paymentData.txHash || 'Pending...',
      foundation_address: paymentData.foundationAddress,
      
      // Supporter details
      tier_level: paymentData.tierLevel,
      support_amount: `${paymentData.amountPln} PLN`,
      
      // Metadata
      timestamp: paymentData.timestamp,
      payment_id: generatePaymentId(),
      
      // Additional context
      message: `Nowe wsparcie kryptowalutowe dla BigFoot Works w wysokości ${paymentData.amountPln} PLN (${paymentData.amountCrypto} ${paymentData.currency}) przez sieć ${paymentData.blockchain}.`
    };

    console.log('Sending email notification:', templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.userId
    );

    if (response.status === 200) {
      console.log('Email sent successfully:', response);
      return { success: true, response };
    } else {
      throw new Error(`EmailJS responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Enhanced error messages
    let errorMessage = 'Błąd wysyłania email';
    
    if (error.message.includes('configuration')) {
      errorMessage = 'Błąd konfiguracji EmailJS';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage = 'Błąd połączenia - spróbuj ponownie';
    } else if (error.text) {
      errorMessage = `EmailJS Error: ${error.text}`;
    }
    
    throw new Error(errorMessage);
  }
};

// Send supporter confirmation email (optional feature)
export const sendSupporterConfirmation = async (supporterData) => {
  try {
    validateConfig();

    const templateParams = {
      to_email: supporterData.email,
      supporter_name: supporterData.name,
      amount_pln: supporterData.amountPln,
      tier_level: supporterData.tierLevel,
      rewards_info: getTierRewards(supporterData.tierLevel),
      tx_hash: supporterData.txHash,
      timestamp: supporterData.timestamp
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'supporter_confirmation_template', // Different template
      templateParams,
      EMAILJS_CONFIG.userId
    );

    return { success: true, response };
  } catch (error) {
    console.error('Supporter email failed:', error);
    // Don't throw - this is optional
    return { success: false, error: error.message };
  }
};

// Generate unique payment ID
const generatePaymentId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BFW-${timestamp}-${random}`.toUpperCase();
};

// Get tier rewards description
const getTierRewards = (tierLevel) => {
  const rewards = {
    'Student': 'Naklejka + dostęp do grupy FB',
    'Tourist': 'Naklejka + opaska + grupa FB',
    'Scout': 'Naklejka + złota opaska + grupa FB',
    'Ranger': 'Wypukła naklejka + opaska + grupa FB',
    'Szeryf': 'Pełen pakiet: naklejki, opaska, t-shirt, czapka, otwieracz + pierwszeństwo w eventach'
  };
  
  return rewards[tierLevel] || 'Niestandardowa kwota wsparcia';
};

// Test EmailJS configuration
export const testEmailConfiguration = async () => {
  try {
    validateConfig();
    
    // Just validate the config without actually sending
    console.log('EmailJS configuration is valid');
    console.log('Service ID:', EMAILJS_CONFIG.serviceId ? '✓ Set' : '✗ Missing');
    console.log('Template ID:', EMAILJS_CONFIG.templateId ? '✓ Set' : '✗ Missing');
    console.log('User ID:', EMAILJS_CONFIG.userId ? '✓ Set' : '✗ Missing');
    
    return { success: true, message: 'Configuration is valid' };
  } catch (error) {
    console.error('EmailJS configuration test failed:', error);
    return { success: false, error: error.message };
  }
};