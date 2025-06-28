import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { X, Info, Coins, Zap, Shield, Wallet, CheckCircle, Star, TrendingUp, Clock, AlertTriangle, Target } from 'lucide-react';

// Complete translations for all languages directly in component
const modalTranslations = {
  pl: {
    // Header
    dappInstructionsTitle: "Jak korzystać z dApp",
    dappInstructionsSubtitle: "Przewodnik krok po kroku",
    
    // Introduction
    dappIntro: "Nasza aplikacja ułatwia wsparcie BigFoot Works",
    dappDescription: "Prosty proces w 7 krokach: wybierz poziom wsparcia, blockchain, walutę, podaj dane, połącz portfel i wyślij płatność.",
    
    // Main sections
    howToUseDapp: "Jak korzystać z aplikacji?",
    whatAreTiers: "Czym są poziomy wsparcia?",
    blockchainGuide: "Przewodnik po blockchain",
    currencyTypes: "Typy walut",
    dappBenefits: "Zalety korzystania z dApp",
    
    // Steps
    step1TitleDapp: "Wybierz poziom wsparcia",
    step1DescriptionDapp: "Każdy poziom ma różne nagrody - od naklejek po pełne pakiety z koszulkami. Możesz też wybrać własną kwotę.",
    
    step2TitleDapp: "Wybierz blockchain",
    step2DescriptionDapp: "Różne sieci mają różne opłaty i szybkość. Solana i TON to najtańsze opcje, Bitcoin i Ethereum to popularne wybory.",
    
    step3TitleDapp: "Wybierz typ waluty", 
    step3DescriptionDapp: "Możesz płacić natywną walutą sieci (np. ETH, BTC) lub stabilną walutą USDC w niektórych sieciach.",
    
    step4TitleDapp: "Podaj dane osobowe",
    step4DescriptionDapp: "Potrzebujemy Twoich danych do wysłania nagród i dodania do grupy Facebook. Adres wymagany tylko dla kwot ≥50 PLN.",
    
    step5TitleDapp: "Połącz portfel",
    step5DescriptionDapp: "Aplikacja wykryje dostępne portfele i pomoże Ci się połączyć. Obsługujemy MetaMask, Phantom, Tonkeeper i inne.",
    
    step6TitleDapp: "Potwierdź płatność",
    step6DescriptionDapp: "Sprawdź szczegóły i wyślij transakcję z portfela. Otrzymasz potwierdzenie i link do śledzenia.",
    
    step7TitleDapp: "Otrzymaj nagrody",
    step7DescriptionDapp: "Email z potwierdzeniem przyjdzie automatycznie. Dostęp do grupy FB w 24h, wysyłka nagród w 7-14 dni.",
    
    // Tiers explanation
    tierStudent: "Student (50 PLN)",
    tierStudentDesc: "Naklejka BigFoot Works + dostęp do prywatnej grupy Facebook",
    tierTourist: "Turysta (100 PLN)", 
    tierTouristDesc: "Naklejka + opaska materiałowa + grupa Facebook",
    tierScout: "Skaut (170 PLN)",
    tierScoutDesc: "Naklejka + złota opaska + grupa Facebook",
    tierRanger: "Ranger (360 PLN)",
    tierRangerDesc: "Wypukła naklejka 3D + opaska premium + grupa Facebook",
    tierSheriff: "Szeryf (750 PLN)",
    tierSheriffDesc: "Pełny pakiet: naklejki, opaska, koszulka, czapka, otwieracz + pierwszeństwo w eventach",
    tierCustom: "Własna kwota",
    tierCustomDesc: "Dowolna kwota wsparcia - dostęp do grupy Facebook zawsze włączony",
    
    // Blockchain explanations
    blockchainFast: "Szybkie i tanie sieci",
    blockchainFastDesc: "Solana (~0.01$), TON (~0.02$), Polygon (~0.05$) - najlepsze dla małych kwot",
    blockchainPopular: "Popularne sieci",
    blockchainPopularDesc: "Bitcoin i Ethereum - najbardziej znane, ale wyższe opłaty (5-80 PLN)",
    blockchainL2: "Ethereum Layer 2", 
    blockchainL2Desc: "Arbitrum, Optimism, zkSync - szybsze i tańsze niż główny Ethereum (~1-4 PLN)",
    
    // Currency types
    nativeCurrencyExplain: "Natywna waluta sieci",
    nativeCurrencyExplainDesc: "Oryginalna waluta blockchain (BTC, ETH, SOL, TON). Wartość zmienia się z rynkiem.",
    stablecoinExplain: "Stablecoin (USDC)",
    stablecoinExplainDesc: "Stabilna waluta cyfrowa zawsze warta ~1 USD. Dostępna w większości sieci EVM i Solana.",
    
    // Benefits
    dappBenefit1: "Automatyczne powiadomienia email dla Ciebie i fundacji",
    dappBenefit2: "Natychmiastowe potwierdzenie transakcji i statusu",
    dappBenefit3: "Wsparcie dla wszystkich głównych portfeli krypto", 
    dappBenefit4: "Kalkulacja dokładnych kwot w czasie rzeczywistym",
    dappBenefit5: "Wielojęzyczny interfejs (6 języków)",
    dappBenefit6: "Bezpieczne - open source i przejrzyste",
    
    // Important notes
    importantNotesDapp: "Ważne informacje",
    noteWallet: "Musisz mieć zainstalowany portfel krypto w przeglądarce",
    noteFunds: "Upewnij się, że masz wystarczające środki + opłaty sieciowe",
    noteNetwork: "Sprawdź, czy portfel jest ustawiony na właściwą sieć",
    noteMobile: "Na telefonie używaj portfeli z wbudowaną przeglądarką (Trust Wallet, MetaMask Mobile)",
    
    // Tips
    bestPractices: "Najlepsze praktyki",
    tipSmallAmounts: "Dla małych kwot (50-100 PLN) używaj Solana lub TON - najniższe opłaty",
    tipLargeAmounts: "Dla dużych kwot (500+ PLN) Bitcoin lub Ethereum to bezpieczny wybór",
    tipStablecoin: "Jeśli nie chcesz ryzyka zmian kursu, wybierz USDC",
    tipWalletSafety: "Nigdy nie udostępniaj swojego seed phrase ani kluczy prywatnych",
    
    // Footer
    gotItStartSupporting: "Rozumiem, zacznij wspieranie!",
    needHelpContact: "Potrzebujesz pomocy? Napisz na: fundacja@bigfootworks.pl"
  },
  
  en: {
    // Header
    dappInstructionsTitle: "How to use the dApp",
    dappInstructionsSubtitle: "Step-by-step guide",
    
    // Introduction
    dappIntro: "Our application makes supporting BigFoot Works easy",
    dappDescription: "Simple 7-step process: choose support tier, blockchain, currency, enter details, connect wallet, and send payment.",
    
    // Main sections
    howToUseDapp: "How to use the application?",
    whatAreTiers: "What are support tiers?",
    blockchainGuide: "Blockchain guide",
    currencyTypes: "Currency types",
    dappBenefits: "Benefits of using the dApp",
    
    // Steps
    step1TitleDapp: "Choose support tier",
    step1DescriptionDapp: "Each tier has different rewards - from stickers to full packages with t-shirts. You can also choose your own amount.",
    
    step2TitleDapp: "Select blockchain",
    step2DescriptionDapp: "Different networks have different fees and speeds. Solana and TON are cheapest options, Bitcoin and Ethereum are popular choices.",
    
    step3TitleDapp: "Choose currency type",
    step3DescriptionDapp: "You can pay with network's native currency (e.g. ETH, BTC) or stable USDC currency on some networks.",
    
    step4TitleDapp: "Enter personal details",
    step4DescriptionDapp: "We need your details to send rewards and add to Facebook group. Address required only for amounts ≥50 PLN.",
    
    step5TitleDapp: "Connect wallet",
    step5DescriptionDapp: "App will detect available wallets and help you connect. We support MetaMask, Phantom, Tonkeeper and others.",
    
    step6TitleDapp: "Confirm payment",
    step6DescriptionDapp: "Check details and send transaction from your wallet. You'll get confirmation and tracking link.",
    
    step7TitleDapp: "Receive rewards",
    step7DescriptionDapp: "Confirmation email arrives automatically. Facebook group access in 24h, reward shipping in 7-14 days.",
    
    // Tiers explanation
    tierStudent: "Student (50 PLN)",
    tierStudentDesc: "BigFoot Works sticker + private Facebook group access",
    tierTourist: "Tourist (100 PLN)",
    tierTouristDesc: "Sticker + fabric wristband + Facebook group",
    tierScout: "Scout (170 PLN)",
    tierScoutDesc: "Sticker + gold wristband + Facebook group",
    tierRanger: "Ranger (360 PLN)",
    tierRangerDesc: "3D embossed sticker + premium wristband + Facebook group",
    tierSheriff: "Sheriff (750 PLN)",
    tierSheriffDesc: "Full package: stickers, wristband, t-shirt, cap, bottle opener + event priority",
    tierCustom: "Custom amount",
    tierCustomDesc: "Any support amount - Facebook group access always included",
    
    // Blockchain explanations
    blockchainFast: "Fast and cheap networks",
    blockchainFastDesc: "Solana (~$0.01), TON (~$0.02), Polygon (~$0.05) - best for small amounts",
    blockchainPopular: "Popular networks",
    blockchainPopularDesc: "Bitcoin and Ethereum - most known, but higher fees (5-80 PLN)",
    blockchainL2: "Ethereum Layer 2",
    blockchainL2Desc: "Arbitrum, Optimism, zkSync - faster and cheaper than main Ethereum (~1-4 PLN)",
    
    // Currency types
    nativeCurrencyExplain: "Network native currency",
    nativeCurrencyExplainDesc: "Original blockchain currency (BTC, ETH, SOL, TON). Value changes with market.",
    stablecoinExplain: "Stablecoin (USDC)",
    stablecoinExplainDesc: "Stable digital currency always worth ~$1 USD. Available on most EVM networks and Solana.",
    
    // Benefits
    dappBenefit1: "Automatic email notifications for you and foundation",
    dappBenefit2: "Instant transaction confirmation and status",
    dappBenefit3: "Support for all major crypto wallets",
    dappBenefit4: "Real-time accurate amount calculation",
    dappBenefit5: "Multilingual interface (6 languages)",
    dappBenefit6: "Secure - open source and transparent",
    
    // Important notes
    importantNotesDapp: "Important information",
    noteWallet: "You must have a crypto wallet installed in your browser",
    noteFunds: "Make sure you have sufficient funds + network fees",
    noteNetwork: "Check that your wallet is set to the correct network",
    noteMobile: "On mobile use wallets with built-in browser (Trust Wallet, MetaMask Mobile)",
    
    // Tips
    bestPractices: "Best practices",
    tipSmallAmounts: "For small amounts (50-100 PLN) use Solana or TON - lowest fees",
    tipLargeAmounts: "For large amounts (500+ PLN) Bitcoin or Ethereum are safe choices",
    tipStablecoin: "If you don't want exchange rate risk, choose USDC",
    tipWalletSafety: "Never share your seed phrase or private keys",
    
    // Footer
    gotItStartSupporting: "Got it, start supporting!",
    needHelpContact: "Need help? Write to: fundacja@bigfootworks.pl"
  },
  
  de: {
    // Header
    dappInstructionsTitle: "Wie man die dApp verwendet",
    dappInstructionsSubtitle: "Schritt-für-Schritt Anleitung",
    
    // Introduction
    dappIntro: "Unsere Anwendung macht die Unterstützung von BigFoot Works einfach",
    dappDescription: "Einfacher 7-Schritte-Prozess: Unterstützungsstufe wählen, Blockchain, Währung, Details eingeben, Wallet verbinden und Zahlung senden.",
    
    // Main sections
    howToUseDapp: "Wie verwendet man die Anwendung?",
    whatAreTiers: "Was sind Unterstützungsstufen?",
    blockchainGuide: "Blockchain-Leitfaden",
    currencyTypes: "Währungstypen",
    dappBenefits: "Vorteile der dApp-Nutzung",
    
    // Steps
    step1TitleDapp: "Unterstützungsstufe wählen",
    step1DescriptionDapp: "Jede Stufe hat verschiedene Belohnungen - von Aufklebern bis zu Vollpaketen mit T-Shirts. Sie können auch Ihren eigenen Betrag wählen.",
    
    step2TitleDapp: "Blockchain auswählen",
    step2DescriptionDapp: "Verschiedene Netzwerke haben unterschiedliche Gebühren und Geschwindigkeiten. Solana und TON sind günstigste Optionen, Bitcoin und Ethereum beliebte Wahlen.",
    
    step3TitleDapp: "Währungstyp wählen",
    step3DescriptionDapp: "Sie können mit der nativen Währung des Netzwerks (z.B. ETH, BTC) oder stabiler USDC-Währung in einigen Netzwerken bezahlen.",
    
    step4TitleDapp: "Persönliche Daten eingeben",
    step4DescriptionDapp: "Wir brauchen Ihre Daten um Belohnungen zu senden und zur Facebook-Gruppe hinzuzufügen. Adresse nur für Beträge ≥50 PLN erforderlich.",
    
    step5TitleDapp: "Wallet verbinden",
    step5DescriptionDapp: "App erkennt verfügbare Wallets und hilft beim Verbinden. Wir unterstützen MetaMask, Phantom, Tonkeeper und andere.",
    
    step6TitleDapp: "Zahlung bestätigen",
    step6DescriptionDapp: "Details prüfen und Transaktion von Ihrer Wallet senden. Sie erhalten Bestätigung und Tracking-Link.",
    
    step7TitleDapp: "Belohnungen erhalten",
    step7DescriptionDapp: "Bestätigungs-E-Mail kommt automatisch. Facebook-Gruppenzugang in 24h, Belohnungsversand in 7-14 Tagen.",
    
    // Tiers explanation
    tierStudent: "Student (50 PLN)",
    tierStudentDesc: "BigFoot Works Aufkleber + privater Facebook-Gruppenzugang",
    tierTourist: "Tourist (100 PLN)",
    tierTouristDesc: "Aufkleber + Stoffarmband + Facebook-Gruppe",
    tierScout: "Pfadfinder (170 PLN)",
    tierScoutDesc: "Aufkleber + goldenes Armband + Facebook-Gruppe",
    tierRanger: "Ranger (360 PLN)",
    tierRangerDesc: "3D-Aufkleber + Premium-Armband + Facebook-Gruppe",
    tierSheriff: "Sheriff (750 PLN)",
    tierSheriffDesc: "Vollpaket: Aufkleber, Armband, T-Shirt, Mütze, Flaschenöffner + Event-Priorität",
    tierCustom: "Individueller Betrag",
    tierCustomDesc: "Beliebiger Unterstützungsbetrag - Facebook-Gruppenzugang immer enthalten",
    
    // Blockchain explanations
    blockchainFast: "Schnelle und günstige Netzwerke",
    blockchainFastDesc: "Solana (~0,01$), TON (~0,02$), Polygon (~0,05$) - am besten für kleine Beträge",
    blockchainPopular: "Beliebte Netzwerke",
    blockchainPopularDesc: "Bitcoin und Ethereum - am bekanntesten, aber höhere Gebühren (5-80 PLN)",
    blockchainL2: "Ethereum Layer 2",
    blockchainL2Desc: "Arbitrum, Optimism, zkSync - schneller und günstiger als Haupt-Ethereum (~1-4 PLN)",
    
    // Currency types
    nativeCurrencyExplain: "Native Netzwerkwährung",
    nativeCurrencyExplainDesc: "Ursprüngliche Blockchain-Währung (BTC, ETH, SOL, TON). Wert ändert sich mit dem Markt.",
    stablecoinExplain: "Stablecoin (USDC)",
    stablecoinExplainDesc: "Stabile digitale Währung immer im Wert von ~1$ USD. Verfügbar in den meisten EVM-Netzwerken und Solana.",
    
    // Benefits
    dappBenefit1: "Automatische E-Mail-Benachrichtigungen für Sie und die Stiftung",
    dappBenefit2: "Sofortige Transaktionsbestätigung und Status",
    dappBenefit3: "Unterstützung für alle großen Krypto-Wallets",
    dappBenefit4: "Echtzeit-genaue Betragsberechnung",
    dappBenefit5: "Mehrsprachige Benutzeroberfläche (6 Sprachen)",
    dappBenefit6: "Sicher - Open Source und transparent",
    
    // Important notes
    importantNotesDapp: "Wichtige Informationen",
    noteWallet: "Sie müssen eine Krypto-Wallet in Ihrem Browser installiert haben",
    noteFunds: "Stellen Sie sicher, dass Sie ausreichende Mittel + Netzwerkgebühren haben",
    noteNetwork: "Überprüfen Sie, dass Ihre Wallet auf das richtige Netzwerk eingestellt ist",
    noteMobile: "Auf dem Handy verwenden Sie Wallets mit eingebautem Browser (Trust Wallet, MetaMask Mobile)",
    
    // Tips
    bestPractices: "Beste Praktiken",
    tipSmallAmounts: "Für kleine Beträge (50-100 PLN) verwenden Sie Solana oder TON - niedrigste Gebühren",
    tipLargeAmounts: "Für große Beträge (500+ PLN) sind Bitcoin oder Ethereum sichere Wahlen",
    tipStablecoin: "Wenn Sie kein Wechselkursrisiko wollen, wählen Sie USDC",
    tipWalletSafety: "Teilen Sie niemals Ihre Seed-Phrase oder privaten Schlüssel",
    
    // Footer
    gotItStartSupporting: "Verstanden, mit der Unterstützung beginnen!",
    needHelpContact: "Brauchen Sie Hilfe? Schreiben Sie an: fundacja@bigfootworks.pl"
  },
  
  sv: {
    // Header
    dappInstructionsTitle: "Hur man använder dApp",
    dappInstructionsSubtitle: "Steg-för-steg guide",
    
    // Introduction
    dappIntro: "Vår applikation gör det enkelt att stödja BigFoot Works",
    dappDescription: "Enkel 7-stegsprocess: välj stödnivå, blockchain, valuta, ange detaljer, anslut plånbok och skicka betalning.",
    
    // Main sections
    howToUseDapp: "Hur använder man applikationen?",
    whatAreTiers: "Vad är stödnivåer?",
    blockchainGuide: "Blockchain-guide",
    currencyTypes: "Valuttyper",
    dappBenefits: "Fördelar med att använda dApp",
    
    // Steps
    step1TitleDapp: "Välj stödnivå",
    step1DescriptionDapp: "Varje nivå har olika belöningar - från klistermärken till fullständiga paket med t-shirts. Du kan också välja ditt eget belopp.",
    
    step2TitleDapp: "Välj blockchain",
    step2DescriptionDapp: "Olika nätverk har olika avgifter och hastigheter. Solana och TON är billigaste alternativen, Bitcoin och Ethereum är populära val.",
    
    step3TitleDapp: "Välj valuttyp",
    step3DescriptionDapp: "Du kan betala med nätverkets inhemska valuta (t.ex. ETH, BTC) eller stabil USDC-valuta på vissa nätverk.",
    
    step4TitleDapp: "Ange personuppgifter",
    step4DescriptionDapp: "Vi behöver dina uppgifter för att skicka belöningar och lägga till i Facebook-grupp. Adress krävs endast för belopp ≥50 PLN.",
    
    step5TitleDapp: "Anslut plånbok",
    step5DescriptionDapp: "Appen upptäcker tillgängliga plånböcker och hjälper dig ansluta. Vi stöder MetaMask, Phantom, Tonkeeper och andra.",
    
    step6TitleDapp: "Bekräfta betalning",
    step6DescriptionDapp: "Kontrollera detaljer och skicka transaktion från din plånbok. Du får bekräftelse och spårningslänk.",
    
    step7TitleDapp: "Ta emot belöningar",
    step7DescriptionDapp: "Bekräftelse-e-post kommer automatiskt. Facebook-gruppåtkomst inom 24h, belöningsfrakt inom 7-14 dagar.",
    
    // Tiers explanation
    tierStudent: "Student (50 PLN)",
    tierStudentDesc: "BigFoot Works klistermärke + privat Facebook-gruppåtkomst",
    tierTourist: "Turist (100 PLN)",
    tierTouristDesc: "Klistermärke + tygarmband + Facebook-grupp",
    tierScout: "Scout (170 PLN)",
    tierScoutDesc: "Klistermärke + guldarmband + Facebook-grupp",
    tierRanger: "Ranger (360 PLN)",
    tierRangerDesc: "3D-klistermärke + premium armband + Facebook-grupp",
    tierSheriff: "Sheriff (750 PLN)",
    tierSheriffDesc: "Komplett paket: klistermärken, armband, t-shirt, keps, flasköppnare + evenemangsprioritet",
    tierCustom: "Anpassat belopp",
    tierCustomDesc: "Valfritt stödbelopp - Facebook-gruppåtkomst alltid inkluderad",
    
    // Blockchain explanations
    blockchainFast: "Snabba och billiga nätverk",
    blockchainFastDesc: "Solana (~0,01$), TON (~0,02$), Polygon (~0,05$) - bäst för små belopp",
    blockchainPopular: "Populära nätverk",
    blockchainPopularDesc: "Bitcoin och Ethereum - mest kända, men högre avgifter (5-80 PLN)",
    blockchainL2: "Ethereum Layer 2",
    blockchainL2Desc: "Arbitrum, Optimism, zkSync - snabbare och billigare än huvudsakliga Ethereum (~1-4 PLN)",
    
    // Currency types
    nativeCurrencyExplain: "Nätverkets inhemska valuta",
    nativeCurrencyExplainDesc: "Ursprunglig blockchain-valuta (BTC, ETH, SOL, TON). Värdet ändras med marknaden.",
    stablecoinExplain: "Stablecoin (USDC)",
    stablecoinExplainDesc: "Stabil digital valuta alltid värd ~1$ USD. Tillgänglig på de flesta EVM-nätverk och Solana.",
    
    // Benefits
    dappBenefit1: "Automatiska e-postmeddelanden för dig och stiftelsen",
    dappBenefit2: "Omedelbar transaktionsbekräftelse och status",
    dappBenefit3: "Stöd för alla stora krypto-plånböcker",
    dappBenefit4: "Realtidsexakt beloppskalkylering",
    dappBenefit5: "Flerspråkigt gränssnitt (6 språk)",
    dappBenefit6: "Säker - öppen källkod och transparent",
    
    // Important notes
    importantNotesDapp: "Viktig information",
    noteWallet: "Du måste ha en krypto-plånbok installerad i din webbläsare",
    noteFunds: "Se till att du har tillräckliga medel + nätverksavgifter",
    noteNetwork: "Kontrollera att din plånbok är inställd på rätt nätverk",
    noteMobile: "På mobilen använd plånböcker med inbyggd webbläsare (Trust Wallet, MetaMask Mobile)",
    
    // Tips
    bestPractices: "Bästa praxis",
    tipSmallAmounts: "För små belopp (50-100 PLN) använd Solana eller TON - lägsta avgifter",
    tipLargeAmounts: "För stora belopp (500+ PLN) är Bitcoin eller Ethereum säkra val",
    tipStablecoin: "Om du inte vill ha växelkursrisk, välj USDC",
    tipWalletSafety: "Dela aldrig din seed-fras eller privata nycklar",
    
    // Footer
    gotItStartSupporting: "Förstått, börja stödja!",
    needHelpContact: "Behöver hjälp? Skriv till: fundacja@bigfootworks.pl"
  },
  
  no: {
    // Header
    dappInstructionsTitle: "Hvordan bruke dApp",
    dappInstructionsSubtitle: "Steg-for-steg guide",
    
    // Introduction
    dappIntro: "Vår applikasjon gjør det enkelt å støtte BigFoot Works",
    dappDescription: "Enkel 7-stegs prosess: velg støttenivå, blockchain, valuta, skriv inn detaljer, koble til lommebok og send betaling.",
    
    // Main sections
    howToUseDapp: "Hvordan bruke applikasjonen?",
    whatAreTiers: "Hva er støttenivåer?",
    blockchainGuide: "Blockchain-guide",
    currencyTypes: "Valuttyper",
    dappBenefits: "Fordeler ved å bruke dApp",
    
    // Steps
    step1TitleDapp: "Velg støttenivå",
    step1DescriptionDapp: "Hvert nivå har forskjellige belønninger - fra klistremerker til fullstendige pakker med t-skjorter. Du kan også velge ditt eget beløp.",
    
    step2TitleDapp: "Velg blockchain",
    step2DescriptionDapp: "Forskjellige nettverk har forskjellige avgifter og hastigheter. Solana og TON er billigste alternativer, Bitcoin og Ethereum er populære valg.",
    
    step3TitleDapp: "Velg valuttype",
    step3DescriptionDapp: "Du kan betale med nettverkets opprinnelige valuta (f.eks. ETH, BTC) eller stabil USDC-valuta på noen nettverk.",
    
    step4TitleDapp: "Skriv inn personlige opplysninger",
    step4DescriptionDapp: "Vi trenger dine opplysninger for å sende belønninger og legge til i Facebook-gruppe. Adresse kreves kun for beløp ≥50 PLN.",
    
    step5TitleDapp: "Koble til lommebok",
    step5DescriptionDapp: "Appen oppdager tilgjengelige lommebøker og hjelper deg med å koble til. Vi støtter MetaMask, Phantom, Tonkeeper og andre.",
    
    step6TitleDapp: "Bekreft betaling",
    step6DescriptionDapp: "Sjekk detaljer og send transaksjon fra din lommebok. Du får bekreftelse og sporingslenke.",
    
    step7TitleDapp: "Motta belønninger",
    step7DescriptionDapp: "Bekreftelses-e-post kommer automatisk. Facebook-gruppeadgang innen 24t, belønningsfrakt innen 7-14 dager.",
    
    // Tiers explanation
    tierStudent: "Student (50 PLN)",
    tierStudentDesc: "BigFoot Works klistremerke + privat Facebook-gruppeadgang",
    tierTourist: "Turist (100 PLN)",
    tierTouristDesc: "Klistremerke + stoffarmbånd + Facebook-gruppe",
    tierScout: "Speider (170 PLN)",
    tierScoutDesc: "Klistremerke + gullarmbånd + Facebook-gruppe",
    tierRanger: "Ranger (360 PLN)",
    tierRangerDesc: "3D-klistremerke + premium armbånd + Facebook-gruppe",
    tierSheriff: "Sheriff (750 PLN)",
    tierSheriffDesc: "Komplett pakke: klistremerker, armbånd, t-skjorte, caps, flaskeåpner + arrangementsprioritet",
    tierCustom: "Tilpasset beløp",
    tierCustomDesc: "Valgfritt støttebeløp - Facebook-gruppeadgang alltid inkludert",
    
    // Blockchain explanations
    blockchainFast: "Raske og billige nettverk",
    blockchainFastDesc: "Solana (~0,01$), TON (~0,02$), Polygon (~0,05$) - best for små beløp",
    blockchainPopular: "Populære nettverk",
    blockchainPopularDesc: "Bitcoin og Ethereum - mest kjente, men høyere avgifter (5-80 PLN)",
    blockchainL2: "Ethereum Layer 2",
    blockchainL2Desc: "Arbitrum, Optimism, zkSync - raskere og billigere enn hoved-Ethereum (~1-4 PLN)",
    
    // Currency types
    nativeCurrencyExplain: "Nettverkets opprinnelige valuta",
    nativeCurrencyExplainDesc: "Opprinnelig blockchain-valuta (BTC, ETH, SOL, TON). Verdien endres med markedet.",
    stablecoinExplain: "Stablecoin (USDC)",
    stablecoinExplainDesc: "Stabil digital valuta alltid verdt ~1$ USD. Tilgjengelig på de fleste EVM-nettverk og Solana.",
    
    // Benefits
    dappBenefit1: "Automatiske e-postvarsler for deg og stiftelsen",
    dappBenefit2: "Øyeblikkelig transaksjonsbekreftelse og status",
    dappBenefit3: "Støtte for alle store krypto-lommebøker",
    dappBenefit4: "Sanntidseksakt beløpskalkulering",
    dappBenefit5: "Flerspråklig grensesnitt (6 språk)",
    dappBenefit6: "Sikker - åpen kildekode og transparent",
    
    // Important notes
    importantNotesDapp: "Viktig informasjon",
    noteWallet: "Du må ha en krypto-lommebok installert i nettleseren din",
    noteFunds: "Sørg for at du har tilstrekkelige midler + nettverksavgifter",
    noteNetwork: "Sjekk at lommeboken din er satt til riktig nettverk",
    noteMobile: "På mobil bruk lommebøker med innebygd nettleser (Trust Wallet, MetaMask Mobile)",
    
    // Tips
    bestPractices: "Beste praksis",
    tipSmallAmounts: "For små beløp (50-100 PLN) bruk Solana eller TON - laveste avgifter",
    tipLargeAmounts: "For store beløp (500+ PLN) er Bitcoin eller Ethereum trygge valg",
    tipStablecoin: "Hvis du ikke vil ha valutakursrisiko, velg USDC",
    tipWalletSafety: "Del aldri din seed-frase eller private nøkler",
    
    // Footer
    gotItStartSupporting: "Forstått, begynn å støtte!",
    needHelpContact: "Trenger hjelp? Skriv til: fundacja@bigfootworks.pl"
  },
  
  da: {
    // Header
    dappInstructionsTitle: "Sådan bruger man dApp",
    dappInstructionsSubtitle: "Trin-for-trin guide",
    
    // Introduction
    dappIntro: "Vores applikation gør det nemt at støtte BigFoot Works",
    dappDescription: "Simpel 7-trins proces: vælg støtteniveau, blockchain, valuta, indtast detaljer, tilslut tegnebog og send betaling.",
    
    // Main sections
    howToUseDapp: "Hvordan bruger man applikationen?",
    whatAreTiers: "Hvad er støtteniveauer?",
    blockchainGuide: "Blockchain-guide",
    currencyTypes: "Valuttyper",
    dappBenefits: "Fordele ved at bruge dApp",
    
    // Steps
    step1TitleDapp: "Vælg støtteniveau",
    step1DescriptionDapp: "Hvert niveau har forskellige belønninger - fra klistermærker til komplette pakker med t-shirts. Du kan også vælge dit eget beløb.",
    
    step2TitleDapp: "Vælg blockchain",
    step2DescriptionDapp: "Forskellige netværk har forskellige gebyrer og hastigheder. Solana og TON er billigste muligheder, Bitcoin og Ethereum er populære valg.",
    
    step3TitleDapp: "Vælg valuttype",
    step3DescriptionDapp: "Du kan betale med netværkets oprindelige valuta (f.eks. ETH, BTC) eller stabil USDC-valuta på nogle netværk.",
    
    step4TitleDapp: "Indtast personlige oplysninger",
    step4DescriptionDapp: "Vi har brug for dine oplysninger for at sende belønninger og tilføje til Facebook-gruppe. Adresse kun påkrævet for beløb ≥50 PLN.",
    
    step5TitleDapp: "Tilslut tegnebog",
    step5DescriptionDapp: "Appen opdager tilgængelige tegnebøger og hjælper dig med at forbinde. Vi understøtter MetaMask, Phantom, Tonkeeper og andre.",
    
    step6TitleDapp: "Bekræft betaling",
    step6DescriptionDapp: "Tjek detaljer og send transaktion fra din tegnebog. Du får bekræftelse og sporingslink.",
    
    step7TitleDapp: "Modtag belønninger",
    step7DescriptionDapp: "Bekræftelses-e-mail kommer automatisk. Facebook-gruppeadgang inden for 24t, belønningsforsendelse inden for 7-14 dage.",
    
    // Tiers explanation
    tierStudent: "Student (50 PLN)",
    tierStudentDesc: "BigFoot Works klistermærke + privat Facebook-gruppeadgang",
    tierTourist: "Turist (100 PLN)",
    tierTouristDesc: "Klistermærke + stofarmbånd + Facebook-gruppe",
    tierScout: "Spejder (170 PLN)",
    tierScoutDesc: "Klistermærke + guldarmbånd + Facebook-gruppe",
    tierRanger: "Ranger (360 PLN)",
    tierRangerDesc: "3D-klistermærke + premium armbånd + Facebook-gruppe",
    tierSheriff: "Sheriff (750 PLN)",
    tierSheriffDesc: "Komplet pakke: klistermærker, armbånd, t-shirt, kasket, flaskeåbner + arrangementsprioritet",
    tierCustom: "Tilpasset beløb",
    tierCustomDesc: "Valgfrit støttebeløb - Facebook-gruppeadgang altid inkluderet",
    
    // Blockchain explanations
    blockchainFast: "Hurtige og billige netværk",
    blockchainFastDesc: "Solana (~0,01$), TON (~0,02$), Polygon (~0,05$) - bedst til små beløb",
    blockchainPopular: "Populære netværk",
    blockchainPopularDesc: "Bitcoin og Ethereum - mest kendte, men højere gebyrer (5-80 PLN)",
    blockchainL2: "Ethereum Layer 2",
    blockchainL2Desc: "Arbitrum, Optimism, zkSync - hurtigere og billigere end hoved-Ethereum (~1-4 PLN)",
    
    // Currency types
    nativeCurrencyExplain: "Netværkets oprindelige valuta",
    nativeCurrencyExplainDesc: "Oprindelig blockchain-valuta (BTC, ETH, SOL, TON). Værdi ændres med markedet.",
    stablecoinExplain: "Stablecoin (USDC)",
    stablecoinExplainDesc: "Stabil digital valuta altid værd ~1$ USD. Tilgængelig på de fleste EVM-netværk og Solana.",
    
    // Benefits
    dappBenefit1: "Automatiske e-mailmeddelelser for dig og fonden",
    dappBenefit2: "Øjeblikkelig transaktionsbekræftelse og status",
    dappBenefit3: "Understøttelse af alle store krypto-tegnebøger",
    dappBenefit4: "Realtidspræcis beløbsberegning",
    dappBenefit5: "Flersproget interface (6 sprog)",
    dappBenefit6: "Sikker - åben kildekode og transparent",
    
    // Important notes
    importantNotesDapp: "Vigtig information",
    noteWallet: "Du skal have en krypto-tegnebog installeret i din browser",
    noteFunds: "Sørg for at du har tilstrækkelige midler + netværksgebyrer",
    noteNetwork: "Tjek at din tegnebog er indstillet til det rigtige netværk",
    noteMobile: "På mobil brug tegnebøger med indbygget browser (Trust Wallet, MetaMask Mobile)",
    
    // Tips
    bestPractices: "Bedste praksis",
    tipSmallAmounts: "For små beløb (50-100 PLN) brug Solana eller TON - laveste gebyrer",
    tipLargeAmounts: "For store beløb (500+ PLN) er Bitcoin eller Ethereum sikre valg",
    tipStablecoin: "Hvis du ikke vil have valutakursrisiko, vælg USDC",
    tipWalletSafety: "Del aldrig din seed-sætning eller private nøgler",
    
    // Footer
    gotItStartSupporting: "Forstået, begynd at støtte!",
    needHelpContact: "Brug for hjælp? Skriv til: fundacja@bigfootworks.pl"
  }
};

const DAppInstructionsModal = ({ isOpen, onClose }) => {
  const { language } = useTranslations();
  
  // Get translations for current language with fallback to Polish
  const t = (key) => {
    return modalTranslations[language]?.[key] || modalTranslations.pl[key] || key;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .dapp-modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .dapp-modal-scroll::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
            border-radius: 4px;
          }
          .dapp-modal-scroll::-webkit-scrollbar-thumb {
            background: rgba(107, 114, 128, 0.6);
            border-radius: 4px;
          }
          .dapp-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.8);
          }
          .dapp-modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(107, 114, 128, 0.6) rgba(55, 65, 81, 0.3);
          }
        `
      }} />
      
      <div className="backdrop-blur-xl bg-gradient-to-b from-black/95 to-gray-800/95 rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-600/50 max-h-[90vh] overflow-y-auto dapp-modal-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t('dappInstructionsTitle')}</h2>
              <p className="text-sm text-gray-300">{t('dappInstructionsSubtitle')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Introduction */}
          <div className="bg-blue-900/30 border border-blue-600/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-400 mt-0.5">💡</div>
              <div>
                <p className="text-blue-200 font-medium mb-2">{t('dappIntro')}</p>
                <p className="text-blue-300 text-sm">{t('dappDescription')}</p>
              </div>
            </div>
          </div>

          {/* How to use dApp */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">{t('howToUseDapp')}</h3>
            
            {/* Step 1 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-emerald-400" />
                  {t('step1TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step1DescriptionDapp')}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-400" />
                  {t('step2TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step2DescriptionDapp')}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Coins className="w-4 h-4 mr-2 text-purple-400" />
                  {t('step3TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step3DescriptionDapp')}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-orange-400" />
                  {t('step4TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step4DescriptionDapp')}</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                5
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Wallet className="w-4 h-4 mr-2 text-cyan-400" />
                  {t('step5TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step5DescriptionDapp')}</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                6
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-indigo-400" />
                  {t('step6TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step6DescriptionDapp')}</p>
              </div>
            </div>

            {/* Step 7 */}
            <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                7
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-green-400" />
                  {t('step7TitleDapp')}
                </h4>
                <p className="text-gray-300 text-sm">{t('step7DescriptionDapp')}</p>
              </div>
            </div>
          </div>

          {/* Support Tiers Explanation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              {t('whatAreTiers')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">{t('tierStudent')}</h4>
                <p className="text-blue-300 text-sm">{t('tierStudentDesc')}</p>
              </div>
              
              {/* Tourist */}
              <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-200 mb-2">{t('tierTourist')}</h4>
                <p className="text-emerald-300 text-sm">{t('tierTouristDesc')}</p>
              </div>
              
              {/* Scout */}
              <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">{t('tierScout')}</h4>
                <p className="text-amber-300 text-sm">{t('tierScoutDesc')}</p>
              </div>
              
              {/* Ranger */}
              <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-200 mb-2">{t('tierRanger')}</h4>
                <p className="text-orange-300 text-sm">{t('tierRangerDesc')}</p>
              </div>
              
              {/* Sheriff */}
              <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">{t('tierSheriff')}</h4>
                <p className="text-purple-300 text-sm">{t('tierSheriffDesc')}</p>
              </div>
              
              {/* Custom */}
              <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-2">{t('tierCustom')}</h4>
                <p className="text-gray-300 text-sm">{t('tierCustomDesc')}</p>
              </div>
            </div>
          </div>

          {/* Blockchain Guide */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              {t('blockchainGuide')}
            </h3>
            
            <div className="space-y-3">
              {/* Fast & Cheap */}
              <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-200 mb-2">{t('blockchainFast')}</h4>
                <p className="text-emerald-300 text-sm">{t('blockchainFastDesc')}</p>
              </div>
              
              {/* Popular */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">{t('blockchainPopular')}</h4>
                <p className="text-blue-300 text-sm">{t('blockchainPopularDesc')}</p>
              </div>
              
              {/* Layer 2 */}
              <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">{t('blockchainL2')}</h4>
                <p className="text-purple-300 text-sm">{t('blockchainL2Desc')}</p>
              </div>
            </div>
          </div>

          {/* Currency Types */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-yellow-400" />
              {t('currencyTypes')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Currency */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-200 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('nativeCurrencyExplain')}
                </h4>
                <p className="text-yellow-300 text-sm">{t('nativeCurrencyExplainDesc')}</p>
              </div>
              
              {/* Stablecoin */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  {t('stablecoinExplain')}
                </h4>
                <p className="text-blue-300 text-sm">{t('stablecoinExplainDesc')}</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-emerald-900/30 border border-emerald-600/30 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-200 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {t('dappBenefits')}
            </h4>
            <ul className="space-y-2 text-emerald-300 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('dappBenefit1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('dappBenefit2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('dappBenefit3')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('dappBenefit4')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('dappBenefit5')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{t('dappBenefit6')}</span>
              </li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-orange-900/30 border border-orange-600/30 rounded-xl p-4">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {t('importantNotesDapp')}
            </h4>
            <ul className="space-y-2 text-amber-300 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">⚠️</span>
                <span>{t('noteWallet')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">⚠️</span>
                <span>{t('noteFunds')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">⚠️</span>
                <span>{t('noteNetwork')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">⚠️</span>
                <span>{t('noteMobile')}</span>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-blue-900/30 border border-blue-600/30 rounded-xl p-4">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              {t('bestPractices')}
            </h4>
            <ul className="space-y-2 text-blue-300 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">💡</span>
                <span>{t('tipSmallAmounts')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">💡</span>
                <span>{t('tipLargeAmounts')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">💡</span>
                <span>{t('tipStablecoin')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">💡</span>
                <span>{t('tipWalletSafety')}</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('gotItStartSupporting')}
            </button>
          </div>

          {/* Help Contact */}
          <div className="text-center pt-2 border-t border-gray-700/50">
            <p className="text-xs text-gray-400">
              {t('needHelpContact')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAppInstructionsModal;