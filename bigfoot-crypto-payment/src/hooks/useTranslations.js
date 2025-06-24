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
    fast: "Szybka"
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
    fast: "Fast"
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
    fast: "Schnell"
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
    fast: "Snabb"
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
    fast: "Rask"
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
    fast: "Hurtig"
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