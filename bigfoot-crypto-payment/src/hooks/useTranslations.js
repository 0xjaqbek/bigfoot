import { usePaymentStore } from '../stores/paymentStore';

// Language Configuration
export const LANGUAGES = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' }
];

// Complete translations object
export const translations = {
  pl: {
    // Header
    title: "Wsparcie Kryptowalutą",
    step: "Krok",
    
    // Navigation
    back: "Powrót",
    continue: "Dalej",
    continueToPayment: "Kontynuuj do płatności",
    sendPayment: "Wyślij płatność",
    nextPayment: "Kolejna płatność",
    
    // Tier Selector
    customAmount: "Własna kwota",
    
    // Blockchain Selector
    selectBlockchain: "Wybierz blockchain",
    fastAndCheap: "Szybkie i tanie",
    popular: "Popularne",
    ethereumL2: "L2 Ethereum",
    networkFee: "Opłata sieciowa",
    confirmation: "Potwierdzenie",
    
    // Currency Types
    nativeCurrency: "Natywna",
    stablecoin: "Stablecoin (USDC)",
    nativeDescription: "Oryginalna waluta sieci",
    stablecoinDescription: "Stabilna wartość w USD",
    selectCurrencyType: "Wybierz typ waluty:",
    
    // Payment Summary
    paymentSummary: "Podsumowanie płatności",
    toPay: "Do zapłaty",
    network: "Sieć",
    currencyType: "Typ waluty",
    networkFeeTitle: "Opłata sieciowa",
    selectedFee: "Wybrana opłata",
    refreshingPrices: "Aktualizowanie cen...",
    refreshingFees: "Aktualizowanie opłat sieciowych...",
    pricesError: "Błąd cen",
    feesError: "Błąd opłat",
    tryAgain: "Spróbuj ponownie",
    pricesOutdated: "Ceny mogą być nieaktualne",
    refresh: "Odśwież",
    loading: "Ładowanie...",
    calculationError: "Błąd kalkulacji",
    connectWallet: "Połącz portfel",
    unavailable: "Niedostępne",
    
    // User Info Form
    supporterData: "Dane wspierającego",
    yourRewards: "Twoje nagrody",
    shippingRequired: "Zawiera wysyłkę - wymagany adres pocztowy",
    personalData: "Dane osobowe",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    phone: "Telefon (opcjonalnie)",
    shippingAddress: "Adres wysyłki nagród",
    streetAndNumber: "Ulica i numer",
    city: "Miasto",
    postalCode: "Kod pocztowy",
    country: "Kraj",
    facebookAccess: "Dostęp do grupy Facebook",
    facebookUsername: "Nazwa użytkownika Facebook",
    facebookHelp: "Podaj nazwę użytkownika lub handle, aby zostać dodanym do prywatnej grupy FB",
    
    // Consents
    acceptTerms: "Akceptuję",
    terms: "regulamin",
    and: "oraz",
    privacyPolicy: "politykę prywatności",
    required: "*",
    marketingConsent: "Wyrażam zgodę na otrzymywanie informacji o wydarzeniach BigFoot Works (opcjonalnie)",
    
    // Validation Errors
    firstNameRequired: "Imię jest wymagane",
    lastNameRequired: "Nazwisko jest wymagane",
    emailRequired: "Email jest wymagany",
    invalidEmail: "Nieprawidłowy format email",
    addressRequired: "Adres jest wymagany dla wysyłki nagród",
    cityRequired: "Miasto jest wymagane",
    postalCodeRequired: "Kod pocztowy jest wymagany",
    postalCodeFormat: "Format: XX-XXX",
    facebookRequired: "Nazwa użytkownika FB jest wymagana do dodania do grupy",
    termsRequired: "Akceptacja regulaminu i polityki prywatności jest wymagana",
    
    // Wallet Connector
    connectWalletTitle: "Połącz portfel",
    compatibleWith: "Kompatybilne z",
    notInstalled: "Nie zainstalowany",
    noWalletsDetected: "Nie wykryto żadnych portfeli dla sieci",
    installSupportedWallet: "Zainstaluj jeden z obsługiwanych portfeli.",
    
    // Payment Confirmation
    walletConnected: "Portfel połączony",
    amountToPay: "Kwota do zapłaty",
    sending: "Wysyłanie...",
    confirmationTime: "Potwierdzenie:",
    waiting: "Oczekiwanie...",
    processing: "Przetwarzanie płatności...",
    confirmed: "Transakcja potwierdzona!",
    failed: "Transakcja nieudana",
    
    // Payment Success
    paymentSent: "Płatność wysłana!",
    thankYou: "Dziękujemy za wsparcie!",
    transactionProcessing: "Transakcja jest przetwarzana. Otrzymasz email z potwierdzeniem i szczegółami nagród.",
    transactionHash: "Hash transakcji:",
    viewInExplorer: "Zobacz w",
    
    // Tiers
    student: "Student",
    tourist: "Turysta", 
    scout: "Skaut",
    ranger: "Ranger",
    sheriff: "Szeryf",
    
    // Tier Rewards
    studentRewards: "Naklejka + dostęp do grupy FB",
    touristRewards: "Naklejka + opaska + grupa FB",
    scoutRewards: "Naklejka + złota opaska + grupa FB",
    rangerRewards: "Wypukła naklejka + opaska + grupa FB",
    sheriffRewards: "Pełen pakiet: naklejki, opaska, t-shirt, czapka, otwieracz + pierwszeństwo w eventach",
    
    // Footer
    madeBy: "Stworzone przez",
    for: "dla",
    year: new Date().getFullYear().toString(),
    footerDescription: "Kryptopłatności dla bikeparku • Bezpieczne • Decentralizowane",
    
    // Fee speeds
    slow: "Wolna",
    standard: "Standardowa", 
    fast: "Szybka",

        // Welcome Modal
    welcomeTitle: "Witamy!",
    welcomeToApp: "Witamy w BigFoot Works Crypto Donation",
    welcomeDescription: "Bezpieczny i przejrzysty sposób wspierania BigFoot Works Bikepark za pomocą kryptowalut. Możesz użyć tego narzędzia lub wysłać dotację ręcznie bezpośrednio z portfela.",
    securePayments: "Bezpieczne płatności",
    securePaymentsDesc: "Decentralizowane transakcje bez pośredników",
    multipleChains: "Wiele sieci blockchain",
    multipleChainsDesc: "Bitcoin, Ethereum, Solana, TON i więcej",
    openSource: "Kod źródłowy",
    openSourceDesc: "Sprawdź kod na GitHub dla pełnej transparentności",
    manualDonationOption: "Opcja ręcznej dotacji",
    manualDonationDesc: "Wolisz wysłać środki bezpośrednio z portfela? Mamy dla Ciebie prostszą opcję!",
    startDonation: "Rozpocznij w aplikacji",
    manualDonation: "Wyślij ręcznie z portfela",
    viewSourceCode: "Zobacz kod źródłowy",
    trustMessage: "💯 Transparentny, bezpieczny i zbudowany dla BFW",
    
    // Manual Donation
    manualDonationTitle: "Ręczna dotacja z portfela",
    walletAddresses: "Adresy portfeli fundacji",
    copyAddress: "Kopiuj adres",
    copied: "Skopiowano!",
    donationDetails: "Szczegóły dotacji",
    donationInfo: "Informacje o dotacji",
    amount: "Kwota",
    blockchain: "Blockchain",
    transactionLink: "Link do transakcji",
    transactionLinkHelp: "Wklej link do transakcji z eksploratora blockchain (np. Etherscan, Blockstream)",
    amountRequired: "Kwota jest wymagana",
    invalidAmount: "Nieprawidłowa kwota",
    blockchainRequired: "Wybór blockchain jest wymagany",
    transactionLinkRequired: "Link do transakcji jest wymagany",
    submitDonation: "Wyślij zgłoszenie dotacji",
    submitting: "Wysyłanie...",
    donationSubmitted: "Dotacja zgłoszona!",
    manualDonationThankYou: "Dziękujemy za dotację! Sprawdzimy Twoją transakcję i skontaktujemy się w sprawie nagród.",
    backToMain: "Powrót do strony głównej",
    submissionFailed: "Błąd wysyłania. Spróbuj ponownie.",

      // Calculator Modal
    cryptoCalculator: "Kalkulator Krypto",
    amounts: "kwoty",
    refreshPrices: "Odśwież ceny",
    loadingPrices: "Ładowanie cen kryptowalut...",
    priceLoadError: "Błąd ładowania cen. Sprawdź połączenie internetowe.",
    retryLoading: "Spróbuj ponownie",
    calculatorInfo: "Kalkulator kwot krypto",
    calculatorDescription: "Wybierz poziom wsparcia, aby zobaczyć dokładną kwotę kryptowaluty do wysłania",
    tierCalculations: "Kalkulacje dla poziomów wsparcia",
    tierRewards: "Nagrody",
    copyAmount: "Kopiuj kwotę",
    select: "Wybierz",
    priceDisclaimer: "Ceny są orientacyjne i mogą się zmieniać. Sprawdź aktualne kursy przed wysłaniem.",
    
    // Manual Donation Updates
    openCalculator: "Otwórz kalkulator kwot",
    calculatorHelp: "Kliknij aby obliczyć dokładne kwoty krypto dla różnych poziomów wsparcia",
    selectAmount: "Wybierz kwotę",
    copy: "Kopiuj",
    selectTierStep: "Wybierz poziom wsparcia",
    selectBlockchainStep: "Wybierz blockchain",
    chooseSupportTier: "Wybierz poziom wsparcia",
    selectTierDescription: "Każdy poziom ma różne nagrody i kwoty",
    chooseBlockchain: "Wybierz blockchain",
    selectedTier: "Wybrany poziom",
    calculationResults: "Wyniki kalkulacji",
    pleasewait: "Proszę czekać...",

  },
  
  en: {
    // Header
    title: "Crypto Support",
    step: "Step",
    
    // Navigation
    back: "Back",
    continue: "Continue",
    continueToPayment: "Continue to Payment",
    sendPayment: "Send Payment",
    nextPayment: "Next Payment",
    
    // Tier Selector
    customAmount: "Custom Amount",
    
    // Blockchain Selector
    selectBlockchain: "Select Blockchain",
    fastAndCheap: "Fast & Cheap",
    popular: "Popular",
    ethereumL2: "Ethereum L2",
    networkFee: "Network fee",
    confirmation: "Confirmation",
    
    // Currency Types
    nativeCurrency: "Native",
    stablecoin: "Stablecoin (USDC)",
    nativeDescription: "Original network currency",
    stablecoinDescription: "Stable USD value",
    selectCurrencyType: "Select currency type:",
    
    // Payment Summary
    paymentSummary: "Payment Summary",
    toPay: "To Pay",
    network: "Network",
    currencyType: "Currency Type",
    networkFeeTitle: "Network Fee",
    selectedFee: "Selected fee",
    refreshingPrices: "Refreshing prices...",
    refreshingFees: "Updating network fees...",
    pricesError: "Price error",
    feesError: "Fee error",
    tryAgain: "Try again",
    pricesOutdated: "Prices may be outdated",
    refresh: "Refresh",
    loading: "Loading...",
    calculationError: "Calculation error",
    connectWallet: "Connect Wallet",
    unavailable: "Unavailable",
    
    // User Info Form
    supporterData: "Supporter Information",
    yourRewards: "Your Rewards",
    shippingRequired: "Includes shipping - postal address required",
    personalData: "Personal Data",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone (optional)",
    shippingAddress: "Reward Shipping Address",
    streetAndNumber: "Street and Number",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    facebookAccess: "Facebook Group Access",
    facebookUsername: "Facebook Username",
    facebookHelp: "Provide username or handle to be added to private FB group",
    
    // Consents
    acceptTerms: "I accept",
    terms: "terms & conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    required: "*",
    marketingConsent: "I consent to receiving information about BigFoot Works events (optional)",
    
    // Validation Errors
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    emailRequired: "Email is required",
    invalidEmail: "Invalid email format",
    addressRequired: "Address is required for reward shipping",
    cityRequired: "City is required",
    postalCodeRequired: "Postal code is required",
    postalCodeFormat: "Format: XX-XXX",
    facebookRequired: "FB username is required to add to group",
    termsRequired: "Accepting terms and privacy policy is required",
    
    // Wallet Connector
    connectWalletTitle: "Connect Wallet",
    compatibleWith: "Compatible with",
    notInstalled: "Not installed",
    noWalletsDetected: "No wallets detected for network",
    installSupportedWallet: "Install one of the supported wallets.",
    
    // Payment Confirmation
    walletConnected: "Wallet Connected",
    amountToPay: "Amount to Pay",
    sending: "Sending...",
    confirmationTime: "Confirmation:",
    waiting: "Waiting...",
    processing: "Processing payment...",
    confirmed: "Transaction confirmed!",
    failed: "Transaction failed",
    
    // Payment Success
    paymentSent: "Payment Sent!",
    thankYou: "Thank you for your support!",
    transactionProcessing: "Transaction is being processed. You will receive an email with confirmation and reward details.",
    transactionHash: "Transaction Hash:",
    viewInExplorer: "View in",
    
    // Tiers
    student: "Student",
    tourist: "Tourist",
    scout: "Scout", 
    ranger: "Ranger",
    sheriff: "Sheriff",
    
    // Tier Rewards
    studentRewards: "Sticker + FB group access",
    touristRewards: "Sticker + wristband + FB group",
    scoutRewards: "Sticker + gold wristband + FB group",
    rangerRewards: "3D sticker + wristband + FB group",
    sheriffRewards: "Full package: stickers, wristband, t-shirt, cap, bottle opener + event priority",
    
    // Footer
    madeBy: "Made by",
    for: "for",
    year: new Date().getFullYear().toString(),
    footerDescription: "Crypto payments for bikepark • Secure • Decentralized",
    
    // Fee speeds
    slow: "Slow",
    standard: "Standard",
    fast: "Fast",

        // Welcome Modal
    welcomeTitle: "Welcome!",
    welcomeToApp: "Welcome to BigFoot Works Crypto Donation",
    welcomeDescription: "A secure and transparent way to support BigFoot Works Bikepark using cryptocurrencies. You can use this tool or send donation manually directly from your wallet.",
    securePayments: "Secure payments",
    securePaymentsDesc: "Decentralized transactions without intermediaries",
    multipleChains: "Multiple blockchains",
    multipleChainsDesc: "Bitcoin, Ethereum, Solana, TON and more",
    openSource: "Open source",
    openSourceDesc: "Check the code on GitHub for full transparency",
    manualDonationOption: "Manual donation option",
    manualDonationDesc: "Prefer to send funds directly from your wallet? We have a simpler option for you!",
    startDonation: "Start in app",
    manualDonation: "Send manually from wallet",
    viewSourceCode: "View source code",
    trustMessage: "💯 Transparent, secure and built for the MTB community",
    
    // Manual Donation
    manualDonationTitle: "Manual donation from wallet",
    walletAddresses: "Foundation wallet addresses",
    copyAddress: "Copy address",
    copied: "Copied!",
    donationDetails: "Donation details",
    donationInfo: "Donation information",
    amount: "Amount",
    blockchain: "Blockchain",
    transactionLink: "Transaction link",
    transactionLinkHelp: "Paste the transaction link from blockchain explorer (e.g. Etherscan, Blockstream)",
    amountRequired: "Amount is required",
    invalidAmount: "Invalid amount",
    blockchainRequired: "Blockchain selection is required",
    transactionLinkRequired: "Transaction link is required",
    submitDonation: "Submit donation",
    submitting: "Submitting...",
    donationSubmitted: "Donation submitted!",
    manualDonationThankYou: "Thank you for your donation! We will verify your transaction and contact you about rewards.",
    backToMain: "Back to main page",
    submissionFailed: "Submission failed. Please try again.",

      // Calculator Modal
    cryptoCalculator: "Crypto Calculator",
    amounts: "amounts",
    refreshPrices: "Refresh prices",
    loadingPrices: "Loading cryptocurrency prices...",
    priceLoadError: "Error loading prices. Check your internet connection.",
    retryLoading: "Try again",
    calculatorInfo: "Crypto amount calculator",
    calculatorDescription: "Select a support tier to see the exact amount of cryptocurrency to send",
    tierCalculations: "Support tier calculations",
    tierRewards: "Rewards",
    copyAmount: "Copy amount",
    select: "Select",
    priceDisclaimer: "Prices are indicative and may change. Check current rates before sending.",
    
    // Manual Donation Updates
    openCalculator: "Open amount calculator",
    calculatorHelp: "Click to calculate exact crypto amounts for different support tiers",
    selectAmount: "Select amount",
    copy: "Copy",
    selectTierStep: "Select support tier",
    selectBlockchainStep: "Select blockchain",
    chooseSupportTier: "Choose support tier",
    selectTierDescription: "Each tier has different rewards and amounts",
    chooseBlockchain: "Choose blockchain",
    selectedTier: "Selected tier",
    calculationResults: "Calculation results",
    pleasewait: "Please wait...",
  },
  
  de: {
    // Header
    title: "Krypto-Unterstützung",
    step: "Schritt",
    
    // Navigation
    back: "Zurück",
    continue: "Weiter",
    continueToPayment: "Zur Zahlung",
    sendPayment: "Zahlung senden",
    nextPayment: "Nächste Zahlung",
    
    // Tier Selector
    customAmount: "Eigener Betrag",
    
    // Blockchain Selector
    selectBlockchain: "Blockchain wählen",
    fastAndCheap: "Schnell & Günstig",
    popular: "Beliebt",
    ethereumL2: "Ethereum L2",
    networkFee: "Netzwerkgebühr",
    confirmation: "Bestätigung",
    
    // Currency Types
    nativeCurrency: "Native",
    stablecoin: "Stablecoin (USDC)",
    nativeDescription: "Original-Netzwerkwährung",
    stablecoinDescription: "Stabiler USD-Wert",
    selectCurrencyType: "Währungstyp wählen:",
    
    // Payment Summary
    paymentSummary: "Zahlungsübersicht",
    toPay: "Zu zahlen",
    network: "Netzwerk",
    currencyType: "Währungstyp",
    networkFeeTitle: "Netzwerkgebühr",
    selectedFee: "Gewählte Gebühr",
    refreshingPrices: "Preise aktualisieren...",
    refreshingFees: "Netzwerkgebühren aktualisieren...",
    pricesError: "Preisfehler",
    feesError: "Gebührenfehler",
    tryAgain: "Erneut versuchen",
    pricesOutdated: "Preise könnten veraltet sein",
    refresh: "Aktualisieren",
    loading: "Lädt...",
    calculationError: "Berechnungsfehler",
    connectWallet: "Wallet verbinden",
    unavailable: "Nicht verfügbar",
    
    // User Info Form
    supporterData: "Unterstützer-Daten",
    yourRewards: "Ihre Belohnungen",
    shippingRequired: "Inklusive Versand - Postadresse erforderlich",
    personalData: "Persönliche Daten",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon (optional)",
    shippingAddress: "Versandadresse für Belohnungen",
    streetAndNumber: "Straße und Hausnummer",
    city: "Stadt",
    postalCode: "Postleitzahl",
    country: "Land",
    facebookAccess: "Facebook-Gruppenzugang",
    facebookUsername: "Facebook-Benutzername",
    facebookHelp: "Benutzername oder Handle angeben, um zur privaten FB-Gruppe hinzugefügt zu werden",
    
    // Consents
    acceptTerms: "Ich akzeptiere",
    terms: "AGB",
    and: "und",
    privacyPolicy: "Datenschutzerklärung",
    required: "*",
    marketingConsent: "Ich stimme dem Erhalt von Informationen über BigFoot Works Events zu (optional)",
    
    // Validation Errors
    firstNameRequired: "Vorname ist erforderlich",
    lastNameRequired: "Nachname ist erforderlich",
    emailRequired: "E-Mail ist erforderlich",
    invalidEmail: "Ungültiges E-Mail-Format",
    addressRequired: "Adresse ist für den Versand der Belohnungen erforderlich",
    cityRequired: "Stadt ist erforderlich",
    postalCodeRequired: "Postleitzahl ist erforderlich",
    postalCodeFormat: "Format: XX-XXX",
    facebookRequired: "FB-Benutzername ist erforderlich für Gruppenzugang",
    termsRequired: "Akzeptierung der AGB und Datenschutzerklärung ist erforderlich",
    
    // Wallet Connector
    connectWalletTitle: "Wallet verbinden",
    compatibleWith: "Kompatibel mit",
    notInstalled: "Nicht installiert",
    noWalletsDetected: "Keine Wallets für Netzwerk erkannt",
    installSupportedWallet: "Installieren Sie eine der unterstützten Wallets.",
    
    // Payment Confirmation
    walletConnected: "Wallet verbunden",
    amountToPay: "Zu zahlender Betrag",
    sending: "Sende...",
    confirmationTime: "Bestätigung:",
    waiting: "Warten...",
    processing: "Zahlung wird verarbeitet...",
    confirmed: "Transaktion bestätigt!",
    failed: "Transaktion fehlgeschlagen",
    
    // Payment Success
    paymentSent: "Zahlung gesendet!",
    thankYou: "Vielen Dank für Ihre Unterstützung!",
    transactionProcessing: "Transaktion wird verarbeitet. Sie erhalten eine E-Mail mit Bestätigung und Belohnungsdetails.",
    transactionHash: "Transaktions-Hash:",
    viewInExplorer: "Ansehen in",
    
    // Tiers
    student: "Student",
    tourist: "Tourist",
    scout: "Pfadfinder",
    ranger: "Ranger",
    sheriff: "Sheriff",
    
    // Tier Rewards
    studentRewards: "Aufkleber + FB-Gruppenzugang",
    touristRewards: "Aufkleber + Armband + FB-Gruppe",
    scoutRewards: "Aufkleber + goldenes Armband + FB-Gruppe",
    rangerRewards: "3D-Aufkleber + Armband + FB-Gruppe",
    sheriffRewards: "Vollpaket: Aufkleber, Armband, T-Shirt, Mütze, Flaschenöffner + Event-Priorität",
    
    // Footer
    madeBy: "Erstellt von",
    for: "für",
    year: new Date().getFullYear().toString(),
    footerDescription: "Krypto-Zahlungen für Bikepark • Sicher • Dezentralisiert",
    
    // Fee speeds
    slow: "Langsam",
    standard: "Standard",
    fast: "Schnell",

        // Welcome Modal
    welcomeTitle: "Willkommen!",
    welcomeToApp: "Willkommen bei BigFoot Works Crypto Donation",
    welcomeDescription: "Ein sicherer und transparenter Weg, BigFoot Works Bikepark mit Kryptowährungen zu unterstützen. Sie können dieses Tool verwenden oder eine Spende manuell direkt von Ihrer Wallet senden.",
    securePayments: "Sichere Zahlungen",
    securePaymentsDesc: "Dezentrale Transaktionen ohne Vermittler",
    multipleChains: "Mehrere Blockchains",
    multipleChainsDesc: "Bitcoin, Ethereum, Solana, TON und mehr",
    openSource: "Open Source",
    openSourceDesc: "Überprüfen Sie den Code auf GitHub für volle Transparenz",
    manualDonationOption: "Manuelle Spende-Option",
    manualDonationDesc: "Bevorzugen Sie es, Geld direkt von Ihrer Wallet zu senden? Wir haben eine einfachere Option für Sie!",
    startDonation: "In der App starten",
    manualDonation: "Manuell von Wallet senden",
    viewSourceCode: "Quellcode ansehen",
    trustMessage: "💯 Transparent, sicher und für die MTB-Community gebaut",
    
    // Manual Donation
    manualDonationTitle: "Manuelle Spende von Wallet",
    walletAddresses: "Stiftungs-Wallet-Adressen",
    copyAddress: "Adresse kopieren",
    copied: "Kopiert!",
    donationDetails: "Spendendetails",
    donationInfo: "Spenden-Informationen",
    amount: "Betrag",
    blockchain: "Blockchain",
    transactionLink: "Transaktionslink",
    transactionLinkHelp: "Fügen Sie den Transaktionslink vom Blockchain-Explorer ein (z.B. Etherscan, Blockstream)",
    amountRequired: "Betrag ist erforderlich",
    invalidAmount: "Ungültiger Betrag",
    blockchainRequired: "Blockchain-Auswahl ist erforderlich",
    transactionLinkRequired: "Transaktionslink ist erforderlich",
    submitDonation: "Spende einreichen",
    submitting: "Wird eingereicht...",
    donationSubmitted: "Spende eingereicht!",
    manualDonationThankYou: "Vielen Dank für Ihre Spende! Wir werden Ihre Transaktion überprüfen und Sie bezüglich der Belohnungen kontaktieren.",
    backToMain: "Zurück zur Hauptseite",
    submissionFailed: "Einreichung fehlgeschlagen. Bitte versuchen Sie es erneut.",

      // Calculator Modal
    cryptoCalculator: "Krypto-Rechner",
    amounts: "Beträge",
    refreshPrices: "Preise aktualisieren",
    loadingPrices: "Lade Kryptowährungspreise...",
    priceLoadError: "Fehler beim Laden der Preise. Überprüfen Sie Ihre Internetverbindung.",
    retryLoading: "Erneut versuchen",
    calculatorInfo: "Krypto-Betrag-Rechner",
    calculatorDescription: "Wählen Sie eine Unterstützungsstufe, um den genauen Kryptowährungsbetrag zu sehen",
    tierCalculations: "Berechnungen für Unterstützungsstufen",
    tierRewards: "Belohnungen",
    copyAmount: "Betrag kopieren",
    select: "Auswählen",
    priceDisclaimer: "Die Preise sind Richtwerte und können sich ändern. Überprüfen Sie die aktuellen Kurse vor dem Senden.",
    
    // Manual Donation Updates
    openCalculator: "Betrag-Rechner öffnen",
    calculatorHelp: "Klicken Sie, um genaue Krypto-Beträge für verschiedene Unterstützungsstufen zu berechnen",
    selectAmount: "Betrag auswählen",
    copy: "Kopieren",
    selectTierStep: "Unterstützungsstufe auswählen",
    selectBlockchainStep: "Blockchain auswählen",
    chooseSupportTier: "Unterstützungsstufe wählen",
    selectTierDescription: "Jede Stufe hat verschiedene Belohnungen und Beträge",
    chooseBlockchain: "Blockchain wählen",
    selectedTier: "Gewählte Stufe",
    calculationResults: "Berechnungsergebnisse",
    pleasewait: "Bitte warten...",



  },
  
  sv: {
    // Header
    title: "Krypto-stöd",
    step: "Steg",
    
    // Navigation
    back: "Tillbaka",
    continue: "Fortsätt",
    continueToPayment: "Fortsätt till betalning",
    sendPayment: "Skicka betalning",
    nextPayment: "Nästa betalning",
    
    // Tier Selector
    customAmount: "Anpassat belopp",
    
    // Blockchain Selector
    selectBlockchain: "Välj blockchain",
    fastAndCheap: "Snabbt & Billigt",
    popular: "Populärt",
    ethereumL2: "Ethereum L2",
    networkFee: "Nätverksavgift",
    confirmation: "Bekräftelse",
    
    // Currency Types
    nativeCurrency: "Inbyggd",
    stablecoin: "Stablecoin (USDC)",
    nativeDescription: "Original nätverksvaluta",
    stablecoinDescription: "Stabilt USD-värde",
    selectCurrencyType: "Välj valuta typ:",
    
    // Payment Summary
    paymentSummary: "Betalningssammanfattning",
    toPay: "Att betala",
    network: "Nätverk",
    currencyType: "Valuta typ",
    networkFeeTitle: "Nätverksavgift",
    selectedFee: "Vald avgift",
    refreshingPrices: "Uppdaterar priser...",
    refreshingFees: "Uppdaterar nätverksavgifter...",
    pricesError: "Prisfel",
    feesError: "Avgiftsfel",
    tryAgain: "Försök igen",
    pricesOutdated: "Priserna kan vara föråldrade",
    refresh: "Uppdatera",
    loading: "Laddar...",
    calculationError: "Beräkningsfel",
    connectWallet: "Anslut plånbok",
    unavailable: "Ej tillgänglig",
    
    // User Info Form
    supporterData: "Supporterinformation",
    yourRewards: "Dina belöningar",
    shippingRequired: "Inkluderar frakt - postadress krävs",
    personalData: "Personlig data",
    firstName: "Förnamn",
    lastName: "Efternamn",
    email: "E-post",
    phone: "Telefon (valfritt)",
    shippingAddress: "Fraktadress för belöningar",
    streetAndNumber: "Gata och nummer",
    city: "Stad",
    postalCode: "Postnummer",
    country: "Land",
    facebookAccess: "Facebook-gruppåtkomst",
    facebookUsername: "Facebook-användarnamn",
    facebookHelp: "Ange användarnamn eller handle för att läggas till i privat FB-grupp",
    
    // Consents
    acceptTerms: "Jag accepterar",
    terms: "användarvillkor",
    and: "och",
    privacyPolicy: "integritetspolicy",
    required: "*",
    marketingConsent: "Jag samtycker till att få information om BigFoot Works evenemang (valfritt)",
    
    // Validation Errors
    firstNameRequired: "Förnamn krävs",
    lastNameRequired: "Efternamn krävs",
    emailRequired: "E-post krävs",
    invalidEmail: "Ogiltigt e-postformat",
    addressRequired: "Adress krävs för belöningsfrakt",
    cityRequired: "Stad krävs",
    postalCodeRequired: "Postnummer krävs",
    postalCodeFormat: "Format: XXX XX",
    facebookRequired: "FB-användarnamn krävs för gruppåtkomst",
    termsRequired: "Accepterande av användarvillkor och integritetspolicy krävs",
    
    // Wallet Connector
    connectWalletTitle: "Anslut plånbok",
    compatibleWith: "Kompatibel med",
    notInstalled: "Inte installerad",
    noWalletsDetected: "Inga plånböcker upptäckta för nätverk",
    installSupportedWallet: "Installera en av de stödda plånböckerna.",
    
    // Payment Confirmation
    walletConnected: "Plånbok ansluten",
    amountToPay: "Belopp att betala",
    sending: "Skickar...",
    confirmationTime: "Bekräftelse:",
    waiting: "Väntar...",
    processing: "Bearbetar betalning...",
    confirmed: "Transaktion bekräftad!",
    failed: "Transaktion misslyckades",
    
    // Payment Success
    paymentSent: "Betalning skickad!",
    thankYou: "Tack för ditt stöd!",
    transactionProcessing: "Transaktionen bearbetas. Du kommer att få ett e-postmeddelande med bekräftelse och belöningsdetaljer.",
    transactionHash: "Transaktionshash:",
    viewInExplorer: "Visa i",
    
    // Tiers
    student: "Student",
    tourist: "Turist",
    scout: "Scout",
    ranger: "Ranger",
    sheriff: "Sheriff",
    
    // Tier Rewards
    studentRewards: "Klistermärke + FB-gruppåtkomst",
    touristRewards: "Klistermärke + armband + FB-grupp",
    scoutRewards: "Klistermärke + guldarmband + FB-grupp",
    rangerRewards: "3D-klistermärke + armband + FB-grupp",
    sheriffRewards: "Fullständigt paket: klistermärken, armband, t-shirt, keps, flasköppnare + evenemangsprioritet",
    
    // Footer
    madeBy: "Skapad av",
    for: "för",
    year: new Date().getFullYear().toString(),
    footerDescription: "Kryptobetalningar för cykelpark • Säker • Decentraliserad",
    
    // Fee speeds
    slow: "Långsam",
    standard: "Standard",
    fast: "Snabb",

       // Welcome Modal
    welcomeTitle: "Välkommen!",
    welcomeToApp: "Välkommen till BigFoot Works Crypto Donation",
    welcomeDescription: "Ett säkert och transparent sätt att stödja BigFoot Works Bikepark med kryptovalutor. Du kan använda detta verktyg eller skicka donation manuellt direkt från din plånbok.",
    securePayments: "Säkra betalningar",
    securePaymentsDesc: "Decentraliserade transaktioner utan mellanhänder",
    multipleChains: "Flera blockkedjor",
    multipleChainsDesc: "Bitcoin, Ethereum, Solana, TON och mer",
    openSource: "Öppen källkod",
    openSourceDesc: "Kolla koden på GitHub för full transparens",
    manualDonationOption: "Manuell donationsalternativ",
    manualDonationDesc: "Föredrar du att skicka pengar direkt från din plånbok? Vi har ett enklare alternativ för dig!",
    startDonation: "Starta i appen",
    manualDonation: "Skicka manuellt från plånbok",
    viewSourceCode: "Visa källkod",
    trustMessage: "💯 Transparent, säker och byggd för MTB-gemenskapen",
    
    // Manual Donation
    manualDonationTitle: "Manuell donation från plånbok",
    walletAddresses: "Stiftelsens plånboksadresser",
    copyAddress: "Kopiera adress",
    copied: "Kopierat!",
    donationDetails: "Donationsdetaljer",
    donationInfo: "Donationsinformation",
    amount: "Belopp",
    blockchain: "Blockchain",
    transactionLink: "Transaktionslänk",
    transactionLinkHelp: "Klistra in transaktionslänken från blockchain-utforskaren (t.ex. Etherscan, Blockstream)",
    amountRequired: "Belopp krävs",
    invalidAmount: "Ogiltigt belopp",
    blockchainRequired: "Blockchain-val krävs",
    transactionLinkRequired: "Transaktionslänk krävs",
    submitDonation: "Skicka donation",
    submitting: "Skickar...",
    donationSubmitted: "Donation skickad!",
    manualDonationThankYou: "Tack för din donation! Vi kommer att verifiera din transaktion och kontakta dig om belöningar.",
    backToMain: "Tillbaka till huvudsidan",
    submissionFailed: "Inlämning misslyckades. Försök igen.",

      // Calculator Modal
    cryptoCalculator: "Krypto-kalkylator",
    amounts: "belopp",
    refreshPrices: "Uppdatera priser",
    loadingPrices: "Laddar kryptovalutapriser...",
    priceLoadError: "Fel vid laddning av priser. Kontrollera din internetanslutning.",
    retryLoading: "Försök igen",
    calculatorInfo: "Krypto-beloppskalkylator",
    calculatorDescription: "Välj en stödnivå för att se det exakta beloppet kryptovaluta att skicka",
    tierCalculations: "Beräkningar för stödnivåer",
    tierRewards: "Belöningar",
    copyAmount: "Kopiera belopp",
    select: "Välj",
    priceDisclaimer: "Priserna är vägledande och kan ändras. Kontrollera aktuella kurser innan du skickar.",
    
    // Manual Donation Updates
    openCalculator: "Öppna beloppskalkylator",
    calculatorHelp: "Klicka för att beräkna exakta kryptobelopp för olika stödnivåer",
    selectAmount: "Välj belopp",
    copy: "Kopiera",
    selectTierStep: "Välj stödnivå",
    selectBlockchainStep: "Välj blockchain",
    chooseSupportTier: "Välj stödnivå",
    selectTierDescription: "Varje nivå har olika belöningar och belopp",
    chooseBlockchain: "Välj blockchain",
    selectedTier: "Vald nivå",
    calculationResults: "Beräkningsresultat",
    pleasewait: "Vänta...",


  },
  
  no: {
    // Header
    title: "Krypto-støtte",
    step: "Trinn",
    
    // Navigation
    back: "Tilbake",
    continue: "Fortsett",
    continueToPayment: "Fortsett til betaling",
    sendPayment: "Send betaling",
    nextPayment: "Neste betaling",
    
    // Tier Selector
    customAmount: "Tilpasset beløp",
    
    // Blockchain Selector
    selectBlockchain: "Velg blockchain",
    fastAndCheap: "Raskt & Billig",
    popular: "Populært",
    ethereumL2: "Ethereum L2",
    networkFee: "Nettverksavgift",
    confirmation: "Bekreftelse",
    
    // Currency Types
    nativeCurrency: "Innebygd",
    stablecoin: "Stablecoin (USDC)",
    nativeDescription: "Original nettverksvaluta",
    stablecoinDescription: "Stabil USD-verdi",
    selectCurrencyType: "Velg valuta type:",
    
    // Payment Summary
    paymentSummary: "Betalingssammendrag",
    toPay: "Å betale",
    network: "Nettverk",
    currencyType: "Valuta type",
    networkFeeTitle: "Nettverksavgift",
    selectedFee: "Valgt avgift",
    refreshingPrices: "Oppdaterer priser...",
    refreshingFees: "Oppdaterer nettverksavgifter...",
    pricesError: "Prisfeil",
    feesError: "Avgiftsfeil",
    tryAgain: "Prøv igjen",
    pricesOutdated: "Prisene kan være utdaterte",
    refresh: "Oppdater",
    loading: "Laster...",
    calculationError: "Beregningsfeil",
    connectWallet: "Koble til lommebok",
    unavailable: "Ikke tilgjengelig",
    
    // User Info Form
    supporterData: "Støtteinformasjon",
    yourRewards: "Dine belønninger",
    shippingRequired: "Inkluderer frakt - postadresse påkrevd",
    personalData: "Personlige data",
    firstName: "Fornavn",
    lastName: "Etternavn",
    email: "E-post",
    phone: "Telefon (valgfritt)",
    shippingAddress: "Fraktadresse for belønninger",
    streetAndNumber: "Gate og nummer",
    city: "By",
    postalCode: "Postnummer",
    country: "Land",
    facebookAccess: "Facebook-gruppeadgang",
    facebookUsername: "Facebook-brukernavn",
    facebookHelp: "Oppgi brukernavn eller handle for å bli lagt til i privat FB-gruppe",
    
    // Consents
    acceptTerms: "Jeg aksepterer",
    terms: "vilkår",
    and: "og",
    privacyPolicy: "personvernpolicy",
    required: "*",
    marketingConsent: "Jeg samtykker til å motta informasjon om BigFoot Works-arrangementer (valgfritt)",
    
    // Validation Errors
    firstNameRequired: "Fornavn er påkrevd",
    lastNameRequired: "Etternavn er påkrevd",
    emailRequired: "E-post er påkrevd",
    invalidEmail: "Ugyldig e-postformat",
    addressRequired: "Adresse er påkrevd for belønningsfrakt",
    cityRequired: "By er påkrevd",
    postalCodeRequired: "Postnummer er påkrevd",
    postalCodeFormat: "Format: XXXX",
    facebookRequired: "FB-brukernavn er påkrevd for gruppeadgang",
    termsRequired: "Akseptering av vilkår og personvernpolicy er påkrevd",
    
    // Wallet Connector
    connectWalletTitle: "Koble til lommebok",
    compatibleWith: "Kompatibel med",
    notInstalled: "Ikke installert",
    noWalletsDetected: "Ingen lommebøker oppdaget for nettverk",
    installSupportedWallet: "installer en av de støttede lommebøkene.",
    
    // Payment Confirmation
    walletConnected: "Lommebok tilkoblet",
    amountToPay: "Beløp å betale",
    sending: "Sender...",
    confirmationTime: "Bekreftelse:",
    waiting: "Venter...",
    processing: "Behandler betaling...",
    confirmed: "Transaksjon bekreftet!",
    failed: "Transaksjon mislyktes",
    
    // Payment Success
    paymentSent: "Betaling sendt!",
    thankYou: "Takk for din støtte!",
    transactionProcessing: "Transaksjonen behandles. Du vil motta en e-post med bekreftelse og belønningsdetaljer.",
    transactionHash: "Transaksjonshash:",
    viewInExplorer: "Vis i",
    
    // Tiers
    student: "Student",
    tourist: "Turist",
    scout: "Speider",
    ranger: "Ranger",
    sheriff: "Sheriff",
    
    // Tier Rewards
    studentRewards: "Klistremerke + FB-gruppeadgang",
    touristRewards: "Klistremerke + armbånd + FB-gruppe",
    scoutRewards: "Klistremerke + gullarmbånd + FB-gruppe",
    rangerRewards: "3D-klistremerke + armbånd + FB-gruppe",
    sheriffRewards: "Komplett pakke: klistremerker, armbånd, t-skjorte, caps, flaskeåpner + arrangementsprioritet",
    
    // Footer
    madeBy: "Laget av",
    for: "for",
    year: new Date().getFullYear().toString(),
    footerDescription: "Kryptobetalinger for sykkelpark • Sikker • Desentralisert",
    
    // Fee speeds
    slow: "Langsom",
    standard: "Standard",
    fast: "Rask",

        // Welcome Modal
    welcomeTitle: "Velkommen!",
    welcomeToApp: "Velkommen til BigFoot Works Crypto Donation",
    welcomeDescription: "En sikker og transparent måte å støtte BigFoot Works Bikepark ved hjelp av kryptovalutaer. Du kan bruke dette verktøyet eller sende donasjon manuelt direkte fra lommeboken din.",
    securePayments: "Sikre betalinger",
    securePaymentsDesc: "Desentraliserte transaksjoner uten mellommenn",
    multipleChains: "Flere blokkjeder",
    multipleChainsDesc: "Bitcoin, Ethereum, Solana, TON og mer",
    openSource: "Åpen kildekode",
    openSourceDesc: "Sjekk koden på GitHub for full åpenhet",
    manualDonationOption: "Manuelt donasjonsalternativ",
    manualDonationDesc: "Foretrekker du å sende penger direkte fra lommeboken din? Vi har et enklere alternativ for deg!",
    startDonation: "Start i appen",
    manualDonation: "Send manuelt fra lommebok",
    viewSourceCode: "Vis kildekode",
    trustMessage: "💯 Transparent, sikker og bygget for MTB-fellesskapet",
    
    // Manual Donation
    manualDonationTitle: "Manuell donasjon fra lommebok",
    walletAddresses: "Stiftelsens lommebokadresser",
    copyAddress: "Kopier adresse",
    copied: "Kopiert!",
    donationDetails: "Donasjonsdetaljer",
    donationInfo: "Donasjonsinformasjon",
    amount: "Beløp",
    blockchain: "Blockchain",
    transactionLink: "Transaksjonslenke",
    transactionLinkHelp: "Lim inn transaksjonslenken fra blockchain-utforskeren (f.eks. Etherscan, Blockstream)",
    amountRequired: "Beløp er påkrevd",
    invalidAmount: "Ugyldig beløp",
    blockchainRequired: "Blockchain-valg er påkrevd",
    transactionLinkRequired: "Transaksjonslenke er påkrevd",
    submitDonation: "Send inn donasjon",
    submitting: "Sender inn...",
    donationSubmitted: "Donasjon sendt inn!",
    manualDonationThankYou: "Takk for din donasjon! Vi vil verifisere transaksjonen din og kontakte deg om belønninger.",
    backToMain: "Tilbake til hovedsiden",
    submissionFailed: "Innsending mislyktes. Prøv igjen.",

      // Calculator Modal
    cryptoCalculator: "Krypto-kalkulator",
    amounts: "beløp",
    refreshPrices: "Oppdater priser",
    loadingPrices: "Laster kryptovalutapriser...",
    priceLoadError: "Feil ved lasting av priser. Sjekk internetttilkoblingen din.",
    retryLoading: "Prøv igjen",
    calculatorInfo: "Krypto-beløpskalkulator",
    calculatorDescription: "Velg et støttenivå for å se det nøyaktige beløpet kryptovaluta å sende",
    tierCalculations: "Beregninger for støttenivåer",
    tierRewards: "Belønninger",
    copyAmount: "Kopier beløp",
    select: "Velg",
    priceDisclaimer: "Prisene er veiledende og kan endre seg. Sjekk gjeldende kurser før sending.",
    
    // Manual Donation Updates
    openCalculator: "Åpne beløpskalkulator",
    calculatorHelp: "Klikk for å beregne nøyaktige kryptobeløp for ulike støttenivåer",
    selectAmount: "Velg beløp",
    copy: "Kopier",
    selectTierStep: "Velg støttenivå",
    selectBlockchainStep: "Velg blockchain",
    chooseSupportTier: "Velg støttenivå",
    selectTierDescription: "Hvert nivå har forskjellige belønninger og beløp",
    chooseBlockchain: "Velg blockchain",
    selectedTier: "Valgt nivå",
    calculationResults: "Beregningsresultater",
    pleasewait: "Vennligst vent...",


  },
  
  da: {
    // Header
    title: "Krypto-støtte",
    step: "Trin",
    
    // Navigation
    back: "Tilbage",
    continue: "Fortsæt",
    continueToPayment: "Fortsæt til betaling",
    sendPayment: "Send betaling",
    nextPayment: "Næste betaling",
    
    // Tier Selector
    customAmount: "Tilpasset beløb",
    
    // Blockchain Selector
    selectBlockchain: "Vælg blockchain",
    fastAndCheap: "Hurtigt & Billigt",
    popular: "Populært",
    ethereumL2: "Ethereum L2",
    networkFee: "Netværksgebyr",
    confirmation: "Bekræftelse",
    
    // Currency Types
    nativeCurrency: "Indbygget",
    stablecoin: "Stablecoin (USDC)",
    nativeDescription: "Original netværksvaluta",
    stablecoinDescription: "Stabil USD-værdi",
    selectCurrencyType: "Vælg valuta type:",
    
    // Payment Summary
    paymentSummary: "Betalingsoversigt",
    toPay: "At betale",
    network: "Netværk",
    currencyType: "Valuta type",
    networkFeeTitle: "Netværksgebyr",
    selectedFee: "Valgt gebyr",
    refreshingPrices: "Opdaterer priser...",
    refreshingFees: "Opdaterer netværksgebyrer...",
    pricesError: "Prisfejl",
    feesError: "Gebyrfejl",
    tryAgain: "Prøv igen",
    pricesOutdated: "Priserne kan være forældede",
    refresh: "Opdater",
    loading: "Indlæser...",
    calculationError: "Beregningsfejl",
    connectWallet: "Tilslut tegnebog",
    unavailable: "Ikke tilgængelig",
    
    // User Info Form
    supporterData: "Støtteinformation",
    yourRewards: "Dine belønninger",
    shippingRequired: "Inkluderer fragt - postadresse påkrævet",
    personalData: "Personlige data",
    firstName: "Fornavn",
    lastName: "Efternavn",
    email: "E-mail",
    phone: "Telefon (valgfrit)",
    shippingAddress: "Fragtadresse for belønninger",
    streetAndNumber: "Gade og nummer",
    city: "By",
    postalCode: "Postnummer",
    country: "Land",
    facebookAccess: "Facebook-gruppeadgang",
    facebookUsername: "Facebook-brugernavn",
    facebookHelp: "Angiv brugernavn eller handle for at blive tilføjet til privat FB-gruppe",
    
    // Consents
    acceptTerms: "Jeg accepterer",
    terms: "vilkår",
    and: "og",
    privacyPolicy: "privatlivspolitik",
    required: "*",
    marketingConsent: "Jeg samtykker i at modtage information om BigFoot Works-arrangementer (valgfrit)",
    
    // Validation Errors
    firstNameRequired: "Fornavn er påkrævet",
    lastNameRequired: "Efternavn er påkrævet",
    emailRequired: "E-mail er påkrævet",
    invalidEmail: "Ugyldigt e-mail-format",
    addressRequired: "Adresse er påkrævet for belønningsfragt",
    cityRequired: "By er påkrævet",
    postalCodeRequired: "Postnummer er påkrævet",
    postalCodeFormat: "Format: XXXX",
    facebookRequired: "FB-brugernavn er påkrævet for gruppeadgang",
    termsRequired: "Acceptering af vilkår og privatlivspolitik er påkrævet",
    
    // Wallet Connector
    connectWalletTitle: "Tilslut tegnebog",
    compatibleWith: "Kompatibel med",
    notInstalled: "Ikke installeret",
    noWalletsDetected: "Ingen tegnebøger opdaget for netværk",
    installSupportedWallet: "Installer en af de understøttede tegnebøger.",
    
    // Payment Confirmation
    walletConnected: "Tegnebog tilsluttet",
    amountToPay: "Beløb at betale",
    sending: "Sender...",
    confirmationTime: "Bekræftelse:",
    waiting: "Venter...",
    processing: "Behandler betaling...",
    confirmed: "Transaktion bekræftet!",
    failed: "Transaktion mislykkedes",
    
    // Payment Success
    paymentSent: "Betaling sendt!",
    thankYou: "Tak for din støtte!",
    transactionProcessing: "Transaktionen behandles. Du vil modtage en e-mail med bekræftelse og belønningsdetaljer.",
    transactionHash: "Transaktionshash:",
    viewInExplorer: "Vis i",
    
    // Tiers
    student: "Student",
    tourist: "Turist",
    scout: "Spejder",
    ranger: "Ranger",
    sheriff: "Sheriff",
    
    // Tier Rewards
    studentRewards: "Klistermærke + FB-gruppeadgang",
    touristRewards: "Klistermærke + armbånd + FB-gruppe",
    scoutRewards: "Klistermærke + guldarmbånd + FB-gruppe",
    rangerRewards: "3D-klistermærke + armbånd + FB-gruppe",
    sheriffRewards: "Komplet pakke: klistermærker, armbånd, t-shirt, kasket, flaskeåbner + arrangementsprioritet",
    
    // Footer
    madeBy: "Lavet af",
    for: "for",
    year: new Date().getFullYear().toString(),
    footerDescription: "Kryptobetalinger for cykelpark • Sikker • Decentraliseret",
    
    // Fee speeds
    slow: "Langsom",
    standard: "Standard",
    fast: "Hurtig",

        // Welcome Modal
    welcomeTitle: "Velkommen!",
    welcomeToApp: "Velkommen til BigFoot Works Crypto Donation",
    welcomeDescription: "En sikker og gennemsigtig måde at støtte BigFoot Works Bikepark ved hjælp af kryptovalutaer. Du kan bruge dette værktøj eller sende donation manuelt direkte fra din tegnebog.",
    securePayments: "Sikre betalinger",
    securePaymentsDesc: "Decentraliserede transaktioner uden mellemmænd",
    multipleChains: "Flere blockchains",
    multipleChainsDesc: "Bitcoin, Ethereum, Solana, TON og mere",
    openSource: "Åben kildekode",
    openSourceDesc: "Tjek koden på GitHub for fuld gennemsigtighed",
    manualDonationOption: "Manuel donationsalternativ",
    manualDonationDesc: "Foretrækker du at sende penge direkte fra din tegnebog? Vi har et enklere alternativ til dig!",
    startDonation: "Start i appen",
    manualDonation: "Send manuelt fra tegnebog",
    viewSourceCode: "Vis kildekode",
    trustMessage: "💯 Gennemsigtig, sikker og bygget til MTB-fællesskabet",
    
    // Manual Donation
    manualDonationTitle: "Manuel donation fra tegnebog",
    walletAddresses: "Fondens tegnebogsadresser",
    copyAddress: "Kopier adresse",
    copied: "Kopieret!",
    donationDetails: "Donationsdetaljer",
    donationInfo: "Donationsinformation",
    amount: "Beløb",
    blockchain: "Blockchain",
    transactionLink: "Transaktionslink",
    transactionLinkHelp: "Indsæt transaktionslinket fra blockchain-udforskeren (f.eks. Etherscan, Blockstream)",
    amountRequired: "Beløb er påkrævet",
    invalidAmount: "Ugyldigt beløb",
    blockchainRequired: "Blockchain-valg er påkrævet",
    transactionLinkRequired: "Transaktionslink er påkrævet",
    submitDonation: "Indsend donation",
    submitting: "Indsender...",
    donationSubmitted: "Donation indsendt!",
    manualDonationThankYou: "Tak for din donation! Vi vil verificere din transaktion og kontakte dig om belønninger.",
    backToMain: "Tilbage til hovedsiden",
    submissionFailed: "Indsendelse mislykkedes. Prøv igen.",

      // Calculator Modal
    cryptoCalculator: "Krypto-lommeregner",
    amounts: "beløb",
    refreshPrices: "Opdater priser",
    loadingPrices: "Indlæser kryptovalutapriser...",
    priceLoadError: "Fejl ved indlæsning af priser. Tjek din internetforbindelse.",
    retryLoading: "Prøv igen",
    calculatorInfo: "Krypto-beløbsberegner",
    calculatorDescription: "Vælg et støtteniveau for at se det nøjagtige beløb kryptovaluta at sende",
    tierCalculations: "Beregninger for støtteniveauer",
    tierRewards: "Belønninger",
    copyAmount: "Kopier beløb",
    select: "Vælg",
    priceDisclaimer: "Priserne er vejledende og kan ændre sig. Tjek aktuelle kurser før afsendelse.",
    
    // Manual Donation Updates
    openCalculator: "Åbn beløbsberegner",
    calculatorHelp: "Klik for at beregne nøjagtige kryptobeløb for forskellige støtteniveauer",
    selectAmount: "Vælg beløb",
    copy: "Kopier",
    selectTierStep: "Vælg støtteniveau",
    selectBlockchainStep: "Vælg blockchain",
    chooseSupportTier: "Vælg støtteniveau",
    selectTierDescription: "Hvert niveau har forskellige belønninger og beløb",
    chooseBlockchain: "Vælg blockchain",
    selectedTier: "Valgt niveau",
    calculationResults: "Beregningsresultater",
    pleasewait: "Vent venligst...",


  }
};

// Main hook for translations
export const useTranslations = () => {
  const { language } = usePaymentStore();
  
  const currentTranslations = translations[language] || translations.pl;
  
  const t = (key, fallback = key) => {
    return currentTranslations[key] || fallback;
  };
  
  return { t, language, translations: currentTranslations };
};