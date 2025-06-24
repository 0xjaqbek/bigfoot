import emailjs from 'emailjs-com';
import { translations } from '../hooks/useTranslations';

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

// Get localized text helper
const getLocalizedText = (key, language = 'pl', fallback = '') => {
  const lang = translations[language] || translations.pl;
  return lang[key] || fallback;
};

// Get detailed tier information (multi-language)
const getTierDetails = (tierLevel, language = 'pl') => {
  // Mapowanie możliwych nazw tier na standardowe klucze
  const tierMapping = {
    'Student': 'Student',
    'Turysta': 'Tourist', 
    'Tourist': 'Tourist',
    'Skaut': 'Scout',
    'Scout': 'Scout',
    'Speider': 'Scout', // Norweski
    'Spejder': 'Scout', // Duński
    'Pfadfinder': 'Scout', // Niemiecki
    'Ranger': 'Ranger',
    'Szeryf': 'Sheriff',
    'Sheriff': 'Sheriff'
  };
  
  const mappedTierLevel = tierMapping[tierLevel] || tierLevel;
  
  const tierData = {
    'Student': {
      amount: 50,
      physicalItems: {
        pl: ['Naklejka BigFoot Works'],
        en: ['BigFoot Works Sticker'],
        de: ['BigFoot Works Aufkleber'],
        sv: ['BigFoot Works Klistermärke'],
        no: ['BigFoot Works Klistremerke'],
        da: ['BigFoot Works Klistermærke']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Turysta': {
      amount: 100,
      physicalItems: {
        pl: ['Naklejka BigFoot Works', 'Opaska materiałowa'],
        en: ['BigFoot Works Sticker', 'Fabric Wristband'],
        de: ['BigFoot Works Aufkleber', 'Stoffarmband'],
        sv: ['BigFoot Works Klistermärke', 'Tyg Armband'],
        no: ['BigFoot Works Klistremerke', 'Stoff Armbånd'],
        da: ['BigFoot Works Klistermærke', 'Stof Armbånd']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Tourist': { // English name mapping
      amount: 100,
      physicalItems: {
        pl: ['Naklejka BigFoot Works', 'Opaska materiałowa'],
        en: ['BigFoot Works Sticker', 'Fabric Wristband'],
        de: ['BigFoot Works Aufkleber', 'Stoffarmband'],
        sv: ['BigFoot Works Klistermärke', 'Tyg Armband'],
        no: ['BigFoot Works Klistremerke', 'Stoff Armbånd'],
        da: ['BigFoot Works Klistermærke', 'Stof Armbånd']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Skaut': {
      amount: 170,
      physicalItems: {
        pl: ['Naklejka BigFoot Works', 'Złota opaska materiałowa'],
        en: ['BigFoot Works Sticker', 'Gold Fabric Wristband'],
        de: ['BigFoot Works Aufkleber', 'Goldenes Stoffarmband'],
        sv: ['BigFoot Works Klistermärke', 'Guldarmband'],
        no: ['BigFoot Works Klistremerke', 'Gull Armbånd'],
        da: ['BigFoot Works Klistermærke', 'Guld Armbånd']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Scout': { // English name mapping
      amount: 170,
      physicalItems: {
        pl: ['Naklejka BigFoot Works', 'Złota opaska materiałowa'],
        en: ['BigFoot Works Sticker', 'Gold Fabric Wristband'],
        de: ['BigFoot Works Aufkleber', 'Goldenes Stoffarmband'],
        sv: ['BigFoot Works Klistermärke', 'Guldarmband'],
        no: ['BigFoot Works Klistremerke', 'Gull Armbånd'],
        da: ['BigFoot Works Klistermärke', 'Guld Armbånd']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Pfadfinder': { // German name mapping
      amount: 170,
      physicalItems: {
        pl: ['Naklejka BigFoot Works', 'Złota opaska materiałowa'],
        en: ['BigFoot Works Sticker', 'Gold Fabric Wristband'],
        de: ['BigFoot Works Aufkleber', 'Goldenes Stoffarmband'],
        sv: ['BigFoot Works Klistermärke', 'Guldarmband'],
        no: ['BigFoot Works Klistremerke', 'Gull Armbånd'],
        da: ['BigFoot Works Klistermærke', 'Guld Armbånd']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Ranger': {
      amount: 360,
      physicalItems: {
        pl: ['Wypukła naklejka 3D', 'Opaska materiałowa premium'],
        en: ['3D Embossed Sticker', 'Premium Fabric Wristband'],
        de: ['3D-Aufkleber', 'Premium Stoffarmband'],
        sv: ['3D-klistermärke', 'Premium Armband'],
        no: ['3D-klistremerke', 'Premium Armbånd'],
        da: ['3D-klistermærke', 'Premium Armbånd']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Szeryf': {
      amount: 750,
      physicalItems: {
        pl: ['Zestaw naklejek BigFoot Works', 'Opaska materiałowa premium', 'Koszulka BigFoot Works', 'Czapka z logo', 'Otwieracz do butelek'],
        en: ['BigFoot Works Sticker Set', 'Premium Fabric Wristband', 'BigFoot Works T-Shirt', 'Logo Cap', 'Bottle Opener'],
        de: ['BigFoot Works Aufkleber-Set', 'Premium Stoffarmband', 'BigFoot Works T-Shirt', 'Logo-Mütze', 'Flaschenöffner'],
        sv: ['BigFoot Works Klistermärke-set', 'Premium Armband', 'BigFoot Works T-shirt', 'Logo Keps', 'Flasköppnare'],
        no: ['BigFoot Works Klistremerke-sett', 'Premium Armbånd', 'BigFoot Works T-skjorte', 'Logo Caps', 'Flaskeåpner'],
        da: ['BigFoot Works Klistermærke-sæt', 'Premium Armbånd', 'BigFoot Works T-shirt', 'Logo Kasket', 'Flaskeåbner']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook', 'Pierwszeństwo w zapisach na eventy'],
        en: ['Access to private Facebook group', 'Priority in event registration'],
        de: ['Zugang zur privaten Facebook-Gruppe', 'Priorität bei Event-Anmeldungen'],
        sv: ['Tillgång till privat Facebook-grupp', 'Prioritet vid evenemangregistrering'],
        no: ['Tilgang til privat Facebook-gruppe', 'Prioritet ved arrangementsregistrering'],
        da: ['Adgang til privat Facebook-gruppe', 'Prioritet ved event-registrering']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    },
    'Sheriff': { // English name mapping
      amount: 750,
      physicalItems: {
        pl: ['Zestaw naklejek BigFoot Works', 'Opaska materiałowa premium', 'Koszulka BigFoot Works', 'Czapka z logo', 'Otwieracz do butelek'],
        en: ['BigFoot Works Sticker Set', 'Premium Fabric Wristband', 'BigFoot Works T-Shirt', 'Logo Cap', 'Bottle Opener'],
        de: ['BigFoot Works Aufkleber-Set', 'Premium Stoffarmband', 'BigFoot Works T-Shirt', 'Logo-Mütze', 'Flaschenöffner'],
        sv: ['BigFoot Works Klistermärke-set', 'Premium Armband', 'BigFoot Works T-shirt', 'Logo Keps', 'Flasköppnare'],
        no: ['BigFoot Works Klistremerke-sett', 'Premium Armbånd', 'BigFoot Works T-skjorte', 'Logo Caps', 'Flaskeåpner'],
        da: ['BigFoot Works Klistermærke-sæt', 'Premium Armbånd', 'BigFoot Works T-shirt', 'Logo Kasket', 'Flaskeåbner']
      },
      digitalItems: {
        pl: ['Dostęp do prywatnej grupy Facebook', 'Pierwszeństwo w zapisach na eventy'],
        en: ['Access to private Facebook group', 'Priority in event registration'],
        de: ['Zugang zur privaten Facebook-Gruppe', 'Priorität bei Event-Anmeldungen'],
        sv: ['Tillgång till privat Facebook-grupp', 'Prioritet vid evenemangregistrering'],
        no: ['Tilgang til privat Facebook-gruppe', 'Prioritet ved arrangementsregistrering'],
        da: ['Adgang til privat Facebook-gruppe', 'Prioritet ved event-registrering']
      },
      shippingRequired: true,
      processingTime: {
        pl: '7-14 dni roboczych',
        en: '7-14 business days',
        de: '7-14 Werktage',
        sv: '7-14 arbetsdagar',
        no: '7-14 virkedager',
        da: '7-14 arbejdsdage'
      }
    }
  };
  
  const tier = tierData[mappedTierLevel];
  if (!tier) {
    return {
      description: {
        pl: 'Niestandardowa kwota wsparcia',
        en: 'Custom support amount',
        de: 'Individuelle Unterstützung',
        sv: 'Anpassat stödbelopp',
        no: 'Tilpasset støttebeløp',
        da: 'Tilpasset støttebeløb'
      },
      physicalItems: { pl: [], en: [], de: [], sv: [], no: [], da: [] },
      digitalItems: { 
        pl: ['Dostęp do prywatnej grupy Facebook'],
        en: ['Access to private Facebook group'],
        de: ['Zugang zur privaten Facebook-Gruppe'],
        sv: ['Tillgång till privat Facebook-grupp'],
        no: ['Tilgang til privat Facebook-gruppe'],
        da: ['Adgang til privat Facebook-gruppe']
      },
      shippingRequired: false,
      processingTime: {
        pl: 'Do ustalenia',
        en: 'To be determined',
        de: 'Noch festzulegen',
        sv: 'Att bestämma',
        no: 'Skal bestemmes',
        da: 'At bestemme'
      }
    };
  }
  
  return {
    ...tier,
    description: getLocalizedText(`${mappedTierLevel.toLowerCase()}Rewards`, language, tier.physicalItems[language]?.join(' + ') || 'Custom rewards')
  };
};

// 📧 EMAIL TO FOUNDATION - Complete notification with all details (always in Polish for foundation)
export const sendPaymentNotification = async (paymentData) => {
  try {
    validateConfig();

    const paymentId = generatePaymentId();
    const tierDetails = getTierDetails(paymentData.tierLevel, 'pl'); // Foundation always gets Polish
    
    const templateParams = {
      // Email routing
      to_email: FOUNDATION_EMAIL,
      subject: `🎯 Nowe wsparcie krypto: ${paymentData.amountPln} PLN od ${paymentData.fullName}`,
      
      // Payment identification
      payment_id: paymentId,
      timestamp: paymentData.paymentDate + ' ' + paymentData.paymentTime,
      user_language: paymentData.language || 'pl',
      
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
      physical_items: tierDetails.physicalItems.pl?.join('\n• ') || 'Brak',
      digital_items: tierDetails.digitalItems.pl?.join('\n• ') || 'Brak',
      processing_time: tierDetails.processingTime.pl,
      
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
🗣️ Język: ${paymentData.language?.toUpperCase() || 'PL'}
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

// 📧 EMAIL TO SUPPORTER - Confirmation and next steps (in user's language)
export const sendSupporterConfirmation = async (paymentData) => {
  try {
    // Skip if no supporter email template configured
    if (!EMAILJS_CONFIG.supporterTemplateId) {
      console.warn('Supporter email template not configured, skipping...');
      return { success: false, reason: 'No template configured' };
    }

    validateConfig();
    
    const userLanguage = paymentData.language || 'pl';
    const tierDetails = getTierDetails(paymentData.tierLevel, userLanguage);
    const paymentId = generatePaymentId();
    
    // Get localized subject and content
    const subjects = {
      pl: `✅ Dziękujemy za wsparcie BigFoot Works! [${paymentData.amountPln} PLN]`,
      en: `✅ Thank you for supporting BigFoot Works! [${paymentData.amountPln} PLN]`,
      de: `✅ Vielen Dank für Ihre Unterstützung von BigFoot Works! [${paymentData.amountPln} PLN]`,
      sv: `✅ Tack för ditt stöd till BigFoot Works! [${paymentData.amountPln} PLN]`,
      no: `✅ Takk for din støtte til BigFoot Works! [${paymentData.amountPln} PLN]`,
      da: `✅ Tak for din støtte til BigFoot Works! [${paymentData.amountPln} PLN]`
    };
    
    const thankYouMessages = {
      pl: `
Cześć ${paymentData.firstName}!

Ogromnie dziękujemy za wsparcie BigFoot Works! 🙏

Twoja płatność w wysokości ${paymentData.amountPln} PLN została otrzymana i pomyślnie przetworzona. 
Jako poziom "${paymentData.tierLevel}" otrzymujesz następujące nagrody:

${tierDetails.physicalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}
${tierDetails.digitalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}

${tierDetails.shippingRequired ? 
  `Nagrody fizyczne wyślemy na podany adres w ciągu ${tierDetails.processingTime[userLanguage]}.` : 
  'Dostęp do grupy Facebook otrzymasz w ciągu 24 godzin.'}

Jesteś teraz częścią społeczności BigFoot Works! 🚵‍♂️

Dzięki Twojemu wsparciu możemy rozwijać bikepark i organizować więcej wydarzeń dla społeczności MTB.
      `.trim(),
      en: `
Hello ${paymentData.firstName}!

Thank you so much for supporting BigFoot Works! 🙏

Your payment of ${paymentData.amountPln} PLN has been received and successfully processed.
As a "${paymentData.tierLevel}" level supporter, you will receive the following rewards:

${tierDetails.physicalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}
${tierDetails.digitalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}

${tierDetails.shippingRequired ? 
  `Physical rewards will be shipped to your address within ${tierDetails.processingTime[userLanguage]}.` : 
  'You will receive Facebook group access within 24 hours.'}

You are now part of the BigFoot Works community! 🚵‍♂️

Thanks to your support, we can develop the bikepark and organize more events for the MTB community.
      `.trim(),
      de: `
Hallo ${paymentData.firstName}!

Vielen Dank für Ihre Unterstützung von BigFoot Works! 🙏

Ihre Zahlung von ${paymentData.amountPln} PLN wurde erhalten und erfolgreich verarbeitet.
Als "${paymentData.tierLevel}"-Unterstützer erhalten Sie folgende Belohnungen:

${tierDetails.physicalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}
${tierDetails.digitalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}

${tierDetails.shippingRequired ? 
  `Physische Belohnungen werden innerhalb von ${tierDetails.processingTime[userLanguage]} an Ihre Adresse versandt.` : 
  'Sie erhalten innerhalb von 24 Stunden Zugang zur Facebook-Gruppe.'}

Sie sind jetzt Teil der BigFoot Works-Community! 🚵‍♂️

Dank Ihrer Unterstützung können wir den Bikepark entwickeln und mehr Events für die MTB-Community organisieren.
      `.trim(),
      sv: `
Hej ${paymentData.firstName}!

Tack så mycket för ditt stöd till BigFoot Works! 🙏

Din betalning på ${paymentData.amountPln} PLN har mottagits och bearbetats framgångsrikt.
Som "${paymentData.tierLevel}"-nivå supporter kommer du att få följande belöningar:

${tierDetails.physicalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}
${tierDetails.digitalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}

${tierDetails.shippingRequired ? 
  `Fysiska belöningar skickas till din adress inom ${tierDetails.processingTime[userLanguage]}.` : 
  'Du kommer att få Facebook-gruppåtkomst inom 24 timmar.'}

Du är nu en del av BigFoot Works-gemenskapen! 🚵‍♂️

Tack vare ditt stöd kan vi utveckla cykelparken och organisera fler evenemang för MTB-gemenskapen.
      `.trim(),
      no: `
Hei ${paymentData.firstName}!

Tusen takk for din støtte til BigFoot Works! 🙏

Din betaling på ${paymentData.amountPln} PLN er mottatt og behandlet med suksess.
Som "${paymentData.tierLevel}"-nivå supporter vil du motta følgende belønninger:

${tierDetails.physicalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}
${tierDetails.digitalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}

${tierDetails.shippingRequired ? 
  `Fysiske belønninger sendes til din adresse innen ${tierDetails.processingTime[userLanguage]}.` : 
  'Du vil få Facebook-gruppeadgang innen 24 timer.'}

Du er nå en del av BigFoot Works-fellesskapet! 🚵‍♂️

Takket være din støtte kan vi utvikle sykkelparkn og organisere flere arrangementer for MTB-fellesskapet.
      `.trim(),
      da: `
Hej ${paymentData.firstName}!

Tusind tak for din støtte til BigFoot Works! 🙏

Din betaling på ${paymentData.amountPln} PLN er modtaget og behandlet med succes.
Som "${paymentData.tierLevel}"-niveau supporter vil du modtage følgende belønninger:

${tierDetails.physicalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}
${tierDetails.digitalItems[userLanguage]?.map(item => `✓ ${item}`).join('\n') || ''}

${tierDetails.shippingRequired ? 
  `Fysiske belønninger sendes til din adresse inden for ${tierDetails.processingTime[userLanguage]}.` : 
  'Du vil få Facebook-gruppeadgang inden for 24 timer.'}

Du er nu en del af BigFoot Works-fællesskabet! 🚵‍♂️

Takket være din støtte kan vi udvikle cykelparken og organisere flere arrangementer for MTB-fællesskabet.
      `.trim()
    };
    
    const templateParams = {
      // Email routing
      to_email: paymentData.email,
      supporter_email: paymentData.email,
      subject: subjects[userLanguage] || subjects.pl,
      
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
      tx_hash: paymentData.txHash || getLocalizedText('processing', userLanguage, 'Przetwarzanie...'),
      tx_status: paymentData.transactionStatus === 'confirmed' ? 
        getLocalizedText('confirmed', userLanguage, 'Potwierdzona') : 
        getLocalizedText('processing', userLanguage, 'W trakcie przetwarzania'),
      blockchain_explorer: getExplorerInfo(paymentData.blockchain, paymentData.txHash, userLanguage),
      
      // Tier and rewards
      tier_level: paymentData.tierLevel,
      tier_description: tierDetails.description,
      
      // Detailed rewards breakdown
      physical_rewards: tierDetails.physicalItems[userLanguage]?.length > 0 ? 
        `🎁 ${getLocalizedText('physicalRewards', userLanguage, 'Nagrody fizyczne')}:\n• ${tierDetails.physicalItems[userLanguage].join('\n• ')}` : 
        `🎁 ${getLocalizedText('noPhysicalRewards', userLanguage, 'Brak nagród fizycznych')}`,
      
      digital_rewards: `🔓 ${getLocalizedText('digitalRewards', userLanguage, 'Nagrody cyfrowe')}:\n• ${tierDetails.digitalItems[userLanguage]?.join('\n• ') || ''}`,
      
      all_rewards: `${[...tierDetails.physicalItems[userLanguage] || [], ...tierDetails.digitalItems[userLanguage] || []].map(item => `• ${item}`).join('\n')}`,
      
      // Shipping information
      shipping_needed: tierDetails.shippingRequired,
      shipping_info: tierDetails.shippingRequired ? 
        getShippingMessage(paymentData.fullAddress, tierDetails.processingTime[userLanguage], userLanguage) : 
        getNoShippingMessage(userLanguage),
      
      // Facebook group access
      fb_username: paymentData.fbUsername,
      fb_instructions: getFbInstructions(paymentData.fbUsername, userLanguage),
      
      // Thank you message
      thank_you_message: thankYouMessages[userLanguage] || thankYouMessages.pl,
      
      // Footer
      email_footer: getEmailFooter(userLanguage)
    };

    console.log('Sending supporter confirmation to:', paymentData.email, 'in language:', userLanguage);
    
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

// Helper functions for localized content
const getShippingMessage = (address, processingTime, language) => {
  const messages = {
    pl: `📦 Twoje nagrody zostaną wysłane na adres:\n${address}\n\n⏱️ Przewidywany czas wysyłki: ${processingTime}\n📧 Otrzymasz email z numerem przesyłki gdy paczka zostanie nadana.`,
    en: `📦 Your rewards will be shipped to:\n${address}\n\n⏱️ Expected shipping time: ${processingTime}\n📧 You will receive an email with tracking number when the package is dispatched.`,
    de: `📦 Ihre Belohnungen werden an folgende Adresse versandt:\n${address}\n\n⏱️ Voraussichtliche Versandzeit: ${processingTime}\n📧 Sie erhalten eine E-Mail mit der Sendungsverfolgungsnummer, sobald das Paket versandt wird.`,
    sv: `📦 Dina belöningar skickas till:\n${address}\n\n⏱️ Förväntad frakttid: ${processingTime}\n📧 Du kommer att få ett e-postmeddelande med spårningsnummer när paketet skickas.`,
    no: `📦 Dine belønninger sendes til:\n${address}\n\n⏱️ Forventet frakttid: ${processingTime}\n📧 Du vil få en e-post med sporingsnummer når pakken sendes.`,
    da: `📦 Dine belønninger sendes til:\n${address}\n\n⏱️ Forventet forsendelsestid: ${processingTime}\n📧 Du vil modtage en e-mail med sporingsnummer når pakken afsendes.`
  };
  return messages[language] || messages.pl;
};

const getNoShippingMessage = (language) => {
  const messages = {
    pl: '📱 Wszystkie nagrody są cyfrowe - nie wymagają wysyłki.',
    en: '📱 All rewards are digital - no shipping required.',
    de: '📱 Alle Belohnungen sind digital - kein Versand erforderlich.',
    sv: '📱 Alla belöningar är digitala - ingen frakt krävs.',
    no: '📱 Alle belønninger er digitale - ingen frakt nødvendig.',
    da: '📱 Alle belønninger er digitale - ingen forsendelse påkrævet.'
  };
  return messages[language] || messages.pl;
};

const getFbInstructions = (username, language) => {
  const messages = {
    pl: `
🔹 Zostaniesz dodany do prywatnej grupy Facebook BigFoot Works
🔹 Twoja nazwa użytkownika: ${username}
🔹 Oczekiwany czas dodania: do 24 godzin
🔹 Sprawdź zaproszenia do grup na Facebooku
    `.trim(),
    en: `
🔹 You will be added to the private BigFoot Works Facebook group
🔹 Your username: ${username}
🔹 Expected addition time: within 24 hours
🔹 Check your Facebook group invitations
    `.trim(),
    de: `
🔹 Sie werden zur privaten BigFoot Works Facebook-Gruppe hinzugefügt
🔹 Ihr Benutzername: ${username}
🔹 Voraussichtliche Zeit für Hinzufügung: innerhalb von 24 Stunden
🔹 Überprüfen Sie Ihre Facebook-Gruppeneinladungen
    `.trim(),
    sv: `
🔹 Du kommer att läggas till i den privata BigFoot Works Facebook-gruppen
🔹 Ditt användarnamn: ${username}
🔹 Förväntad tilläggningstid: inom 24 timmar
🔹 Kontrollera dina Facebook-gruppinbjudningar
    `.trim(),
    no: `
🔹 Du vil bli lagt til i den private BigFoot Works Facebook-gruppen
🔹 Ditt brukernavn: ${username}
🔹 Forventet tilleggstid: innen 24 timer
🔹 Sjekk dine Facebook-gruppeinvitasjoner
    `.trim(),
    da: `
🔹 Du vil blive tilføjet til den private BigFoot Works Facebook-gruppe
🔹 Dit brugernavn: ${username}
🔹 Forventet tilføjelsestid: inden for 24 timer
🔹 Tjek dine Facebook-gruppeinvitationer
    `.trim()
  };
  return messages[language] || messages.pl;
};

const getEmailFooter = (language) => {
  const messages = {
    pl: `
---
BigFoot Works Bikepark
Email wysłany automatycznie - prosimy nie odpowiadać
W razie pytań napisz na: ${FOUNDATION_EMAIL}
    `.trim(),
    en: `
---
BigFoot Works Bikepark
Automated email - please do not reply
For questions, write to: ${FOUNDATION_EMAIL}
    `.trim(),
    de: `
---
BigFoot Works Bikepark
Automatisierte E-Mail - bitte nicht antworten
Bei Fragen schreiben Sie an: ${FOUNDATION_EMAIL}
    `.trim(),
    sv: `
---
BigFoot Works Bikepark
Automatiserat e-postmeddelande - svara inte
För frågor, skriv till: ${FOUNDATION_EMAIL}
    `.trim(),
    no: `
---
BigFoot Works Bikepark
Automatisert e-post - ikke svar
For spørsmål, skriv til: ${FOUNDATION_EMAIL}
    `.trim(),
    da: `
---
BigFoot Works Bikepark
Automatiseret e-mail - svar ikke
For spørgsmål, skriv til: ${FOUNDATION_EMAIL}
    `.trim()
  };
  return messages[language] || messages.pl;
};

// Helper: Get blockchain explorer info (localized)
const getExplorerInfo = (blockchain, txHash, language = 'pl') => {
  if (!txHash) {
    const messages = {
      pl: 'Transakcja w trakcie przetwarzania',
      en: 'Transaction being processed',
      de: 'Transaktion wird verarbeitet',
      sv: 'Transaktion bearbetas',
      no: 'Transaksjon behandles',
      da: 'Transaktion behandles'
    };
    return messages[language] || messages.pl;
  }
  
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
  const viewTexts = {
    pl: 'Zobacz transakcję',
    en: 'View transaction',
    de: 'Transaktion anzeigen',
    sv: 'Visa transaktion',
    no: 'Vis transaksjon',
    da: 'Vis transaktion'
  };
  
  return explorerUrl ? 
    `${viewTexts[language] || viewTexts.pl}: ${explorerUrl}` : 
    `Hash: ${txHash}`;
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
export const sendTestEmails = async (language = 'pl') => {
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
    paymentTime: new Date().toLocaleTimeString('pl-PL'),
    language: language
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