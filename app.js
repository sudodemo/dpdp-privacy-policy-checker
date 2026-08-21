const $ = id => document.getElementById(id);
const matrix = () => window.DPDP_MATRIX || [];

const T = {
  en: {
    navCitizen:'Citizens',
    navCompany:'Companies',
    navFaq:'FAQ',
    navTerms:'Terminology',
    eyebrow:'INDIAN DIGITAL PRIVACY • DPDPA 2023 • DPDP RULES 2025',
    title:'Know your data.<br>Know your rights.',
    subtitle:'Understand what companies say about your personal data, learn your privacy rights in simple language, and find practical steps you can take.',
    heroCitizen:"👤 I'm a citizen",
    heroCompany:"🏢 I'm a company",
    badgeBrowser:'🔒 Browser-only assessment',
    badgeAccount:'🚫 No account',
    badgeDatabase:'🗄️ No database',
    badgeLanguages:'🌐 English • हिन्दी • मराठी',

    forCitizens:'FOR CITIZENS',
    citizenCardTitle:'What does this company know about me?',
    citizenCardText:'Check a Privacy Policy and get a simple explanation of what the company says it collects, why it uses it, retention, sharing, rights and what you can do.',
    citizenSelect:'Understand my privacy',

    forCompanies:'FOR COMPANIES',
    companyCardTitle:'Assess my Privacy Policy',
    companyCardText:'Assess whether publicly available privacy-policy disclosures evidence alignment with the DPDPA 2023 and DPDP Rules 2025.',
    companySelect:'Run policy assessment',

    simpleTitle:'Privacy, explained simply',
    personalTitle:'📱 What is personal data?',
    personalText:'Information that relates to an identifiable person — such as your name, phone number, email or location.',
    whyTitle:'🎯 Why does it matter?',
    whyText:'Your data can reveal where you go, what you buy, who you know and how you behave. Privacy helps reduce misuse and unwanted exposure.',
    dpdpTitle:'🛡️ What is DPDP?',
    dpdpText:"India's statutory framework for digital personal data. It gives individuals rights and places obligations on organisations processing personal data.",

    citizenCheck:'CITIZEN CHECK',
    citizenToolTitle:"Check a company's privacy policy",
    citizenToolText:'Use the exact Privacy Policy URL when possible. If browser access is blocked by CORS, paste the policy text. Your assessment stays in this browser tab.',

    companyCheck:'COMPANY ASSESSMENT',
    companyToolTitle:'DPDP Privacy Policy Gap Assessment',
    companyToolText:'Evidence-based policy screening. It does not establish operational compliance, certification or an audit opinion.',

    urlLabel:'Privacy Policy URL',
    pasteLabel:'Or paste Privacy Policy text',
    readPolicy:'Read policy',
    explain:'Explain this to me',
    runAssessment:'Run assessment',
    exportPdf:'Save / Export PDF',
    back:'← Back',
    pasteCitizen:'Paste the policy text here...',
    pasteCompany:'Paste the full policy text here...',

    rightsTitle:'What you can do with your privacy rights',
    rightKnow:'🧾 Know',
    rightKnowText:'Ask what personal data an organisation processes and why.',
    rightCorrect:'✏️ Correct',
    rightCorrectText:'Ask for inaccurate or incomplete personal data to be corrected or updated.',
    rightErase:'🗑️ Erase',
    rightEraseText:'Request erasure where the applicable legal conditions are met, subject to lawful retention requirements.',
    rightWithdraw:'🚪 Withdraw consent',
    rightWithdrawText:'When consent is the basis, withdrawal should be as easy as giving consent.',
    rightComplain:'📣 Complain',
    rightComplainText:"Use the organisation's grievance mechanism and applicable statutory escalation route.",
    rightBreach:'🚨 Respond to a breach',
    rightBreachText:'Contact the organisation, preserve evidence, secure affected accounts and follow official guidance.',

    faqEyebrow:'FAQ',
    faqTitle:'Frequently asked questions',
    faq1q:'Is a company homepage URL enough?',
    faq1a:"An exact Privacy Policy URL is better. A homepage can be a starting point, but a static browser app cannot bypass another site's CORS restrictions. The paste-text fallback is the reliable option.",
    faq2q:'Does DataSaathi store my policy or URL?',
    faq2a:'No. There is no account, database, cookie, analytics SDK or localStorage. Assessment state is held only in memory in your browser tab.',
    faq3q:'Does “evidence found” mean the company complies?',
    faq3a:'No. It means the supplied policy contains relevant disclosure. A policy cannot prove that operational controls actually exist or work.',
    faq4q:'Why are there citizen and company modes?',
    faq4a:'Both use the same evidence approach. Citizen mode explains findings in everyday language; company mode adds legal references, risk and remediation-oriented detail.',
    faq5q:'What about the 72-hour breach requirement?',
    faq5a:'The Rules require notice to affected Data Principals without delay and provide for detailed information to the Board within 72 hours of becoming aware of a breach, unless the Board permits a longer period.',

    termsEyebrow:'TERMINOLOGY',
    termsTitle:'Privacy jargon in plain language',
    termPrincipal:'Data Principal',
    termPrincipalDef:'The person the personal data is about — for example, a customer.',
    termFiduciary:'Data Fiduciary',
    termFiduciaryDef:'The organisation deciding why and how personal data is processed.',
    termProcessor:'Data Processor',
    termProcessorDef:'A service provider processing personal data for a Data Fiduciary.',
    termConsent:'Consent',
    termConsentDef:"A person's agreement to processing for a specified purpose when consent is the legal basis.",
    termNotice:'Notice',
    termNoticeDef:'Information given to a person about what data is processed and why.',
    termPersonal:'Personal data',
    termPersonalDef:'Digital information about an identifiable individual.',
    termBreach:'Data breach',
    termBreachDef:'Unauthorised processing or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss that compromises personal data.',
    termSdf:'SDF',
    termSdfDef:'Significant Data Fiduciary — a Data Fiduciary or class notified for enhanced obligations.',
    termDpia:'DPIA',
    termDpiaDef:'Data Protection Impact Assessment — a structured assessment of significant personal-data risks and mitigations.',
    termCors:'CORS',
    termCorsDef:'A browser security mechanism controlling whether one website can request content from another.',

    footerDisclaimer:'DataSaathi is an independent educational and policy-disclosure assessment tool. It is not a government service, legal advice, certification, audit opinion or proof of operational compliance.',
    footerSources:'Primary references:',

    validUrl:'Please enter a valid http/https URL. An exact Privacy Policy URL is recommended.',
    loading:'Trying to read the public page in your browser. No policy text is uploaded to this site.',
    loaded:'Policy text loaded locally. Confirm that this is the intended Privacy Policy page.',
    failed:'Automatic reading was blocked or failed. This is usually a browser CORS restriction. Paste the exact Privacy Policy text below.',
    minText:'Please provide at least 100 characters of Privacy Policy text.',
    policyOnly:'Policy only',
    topicsEvidence:'Topics with evidence',
    riskLabel:'Policy disclosure risk',
    coverage:'Evidence coverage',
    important:'Important:',
    importantText:'Evidence found means relevant wording was identified. It does not prove operational compliance. Evidence not found does not by itself prove unlawful processing. Some requirements are not determinable from a public policy.',
    found:'🟢 Evidence found',
    notFound:'🔴 Evidence not found',
    simple:'In simple terms:',
    finding:'Finding:',
    relevant:'Relevant policy language was identified',
    noEvidence:'No clear evidence for this requirement was identified by the screening engine.',
    legal:'Legal reference:',
    applicability:'Applicability:',
    manual:'Manual verification:',
    action:'Recommended action:'
  },

  hi: {
    navCitizen:'नागरिक',
    navCompany:'कंपनियाँ',
    navFaq:'सामान्य प्रश्न',
    navTerms:'शब्दावली',
    eyebrow:'भारतीय डिजिटल गोपनीयता • DPDPA 2023 • DPDP नियम 2025',
    title:'अपना डेटा जानें।<br>अपने अधिकार जानें।',
    subtitle:'समझें कि कंपनियाँ आपके व्यक्तिगत डेटा के बारे में क्या बताती हैं, अपने गोपनीयता अधिकार सरल भाषा में जानें और समस्या होने पर क्या करें।',
    heroCitizen:'👤 मैं एक नागरिक हूँ',
    heroCompany:'🏢 मैं एक कंपनी हूँ',
    badgeBrowser:'🔒 ब्राउज़र में आकलन',
    badgeAccount:'🚫 कोई खाता नहीं',
    badgeDatabase:'🗄️ कोई डेटाबेस नहीं',
    badgeLanguages:'🌐 English • हिन्दी • मराठी',

    forCitizens:'नागरिकों के लिए',
    citizenCardTitle:'यह कंपनी मेरे बारे में क्या जानती है?',
    citizenCardText:'Privacy Policy जाँचें और सरल भाषा में समझें कि कंपनी कौन-सा डेटा लेने, क्यों उपयोग करने, कितने समय रखने और किसके साथ साझा करने की बात करती है।',
    citizenSelect:'मेरी गोपनीयता समझें',

    forCompanies:'कंपनियों के लिए',
    companyCardTitle:'अपनी Privacy Policy का आकलन करें',
    companyCardText:'देखें कि सार्वजनिक Privacy Policy में DPDPA 2023 और DPDP नियम 2025 के अनुरूप होने के कौन से प्रमाण मिलते हैं।',
    companySelect:'नीति का आकलन शुरू करें',

    simpleTitle:'गोपनीयता, सरल भाषा में',
    personalTitle:'📱 व्यक्तिगत डेटा क्या है?',
    personalText:'ऐसी जानकारी जो किसी पहचाने जा सकने वाले व्यक्ति से जुड़ी हो — जैसे नाम, फोन नंबर, ईमेल या स्थान।',
    whyTitle:'🎯 यह क्यों महत्वपूर्ण है?',
    whyText:'आपका डेटा बता सकता है कि आप कहाँ जाते हैं, क्या खरीदते हैं, किन लोगों से जुड़े हैं और कैसे व्यवहार करते हैं। गोपनीयता दुरुपयोग और अनचाहे खुलासे को कम करने में मदद करती है।',
    dpdpTitle:'🛡️ DPDP क्या है?',
    dpdpText:'भारत का डिजिटल व्यक्तिगत डेटा संरक्षण ढाँचा। यह व्यक्तियों को अधिकार देता है और डेटा संसाधित करने वाले संगठनों पर दायित्व डालता है।',

    citizenCheck:'नागरिक जाँच',
    citizenToolTitle:'कंपनी की Privacy Policy जाँचें',
    citizenToolText:'जहाँ संभव हो, सटीक Privacy Policy URL दें। यदि ब्राउज़र CORS के कारण पेज नहीं पढ़ पाता, तो नीति का पाठ यहाँ चिपकाएँ। आकलन इसी ब्राउज़र टैब में रहता है।',

    companyCheck:'कंपनी आकलन',
    companyToolTitle:'DPDP Privacy Policy Gap Assessment',
    companyToolText:'यह नीति में उपलब्ध प्रमाणों की जाँच है। यह वास्तविक संचालन की अनुपालन पुष्टि, प्रमाणन या ऑडिट राय नहीं है।',

    urlLabel:'Privacy Policy URL',
    pasteLabel:'या Privacy Policy का पाठ चिपकाएँ',
    readPolicy:'नीति पढ़ें',
    explain:'मुझे सरल भाषा में समझाएँ',
    runAssessment:'आकलन चलाएँ',
    exportPdf:'PDF सहेजें / निर्यात करें',
    back:'← वापस',
    pasteCitizen:'यहाँ Privacy Policy का पाठ चिपकाएँ...',
    pasteCompany:'पूरी Privacy Policy का पाठ यहाँ चिपकाएँ...',

    rightsTitle:'आप अपने गोपनीयता अधिकारों का उपयोग कैसे कर सकते हैं',
    rightKnow:'🧾 जानकारी लें',
    rightKnowText:'पूछें कि संगठन आपके किस व्यक्तिगत डेटा को संसाधित करता है और क्यों।',
    rightCorrect:'✏️ सुधार करें',
    rightCorrectText:'गलत या अधूरी व्यक्तिगत जानकारी को सुधारने या अपडेट करने का अनुरोध करें।',
    rightErase:'🗑️ मिटाने का अनुरोध',
    rightEraseText:'जहाँ कानून की शर्तें पूरी हों, वहाँ डेटा मिटाने का अनुरोध करें, कानूनी रूप से आवश्यक संरक्षण के अधीन।',
    rightWithdraw:'🚪 सहमति वापस लें',
    rightWithdrawText:'यदि प्रसंस्करण सहमति पर आधारित है, तो सहमति वापस लेना देना जितना आसान होना चाहिए।',
    rightComplain:'📣 शिकायत करें',
    rightComplainText:'संगठन की शिकायत व्यवस्था और लागू वैधानिक अपील/शिकायत प्रक्रिया का उपयोग करें।',
    rightBreach:'🚨 डेटा उल्लंघन पर कार्रवाई',
    rightBreachText:'संगठन से संपर्क करें, प्रमाण सुरक्षित रखें, प्रभावित खातों को सुरक्षित करें और आधिकारिक निर्देशों का पालन करें।',

    faqEyebrow:'सामान्य प्रश्न',
    faqTitle:'अक्सर पूछे जाने वाले प्रश्न',
    faq1q:'क्या कंपनी का होमपेज URL पर्याप्त है?',
    faq1a:'सटीक Privacy Policy URL बेहतर है। होमपेज से शुरुआत की जा सकती है, लेकिन स्थिर ब्राउज़र ऐप दूसरी वेबसाइट के CORS प्रतिबंधों को पार नहीं कर सकता। पाठ चिपकाने का विकल्प सबसे भरोसेमंद है।',
    faq2q:'क्या DataSaathi मेरी नीति या URL को सहेजता है?',
    faq2a:'नहीं। कोई खाता, डेटाबेस, कुकी, एनालिटिक्स SDK या localStorage नहीं है। आकलन की जानकारी केवल आपके ब्राउज़र टैब की मेमोरी में रहती है।',
    faq3q:'क्या “प्रमाण मिला” का मतलब कंपनी कानून का पालन करती है?',
    faq3a:'नहीं। इसका अर्थ है कि दी गई नीति में संबंधित भाषा मिली। नीति यह साबित नहीं कर सकती कि वास्तविक तकनीकी या संचालनात्मक नियंत्रण मौजूद हैं और सही काम कर रहे हैं।',
    faq4q:'नागरिक और कंपनी के अलग विकल्प क्यों हैं?',
    faq4a:'दोनों एक ही प्रमाण-आधारित तरीका इस्तेमाल करते हैं। नागरिक मोड परिणामों को आसान भाषा में समझाता है; कंपनी मोड कानूनी संदर्भ, जोखिम और सुधार के सुझाव जोड़ता है।',
    faq5q:'72 घंटे वाले डेटा उल्लंघन नियम के बारे में क्या?',
    faq5a:'नियम प्रभावित Data Principals को बिना देरी सूचना देने और उल्लंघन का पता चलने के बाद बोर्ड को विस्तृत जानकारी 72 घंटे के भीतर देने का प्रावधान करते हैं, जब तक बोर्ड अधिक समय की अनुमति न दे।',

    termsEyebrow:'शब्दावली',
    termsTitle:'गोपनीयता के कठिन शब्द, सरल भाषा में',
    termPrincipal:'Data Principal',
    termPrincipalDef:'वह व्यक्ति जिससे व्यक्तिगत डेटा संबंधित है — जैसे ग्राहक।',
    termFiduciary:'Data Fiduciary',
    termFiduciaryDef:'वह संगठन जो तय करता है कि व्यक्तिगत डेटा क्यों और कैसे संसाधित किया जाएगा।',
    termProcessor:'Data Processor',
    termProcessorDef:'वह सेवा प्रदाता जो Data Fiduciary की ओर से व्यक्तिगत डेटा संसाधित करता है।',
    termConsent:'सहमति',
    termConsentDef:'किसी निर्दिष्ट उद्देश्य के लिए डेटा संसाधित करने की व्यक्ति की स्वीकृति, जब सहमति कानूनी आधार हो।',
    termNotice:'सूचना (Notice)',
    termNoticeDef:'व्यक्ति को यह बताने वाली जानकारी कि कौन-सा डेटा और किस उद्देश्य से संसाधित किया जाता है।',
    termPersonal:'व्यक्तिगत डेटा',
    termPersonalDef:'किसी पहचाने जा सकने वाले व्यक्ति से जुड़ी डिजिटल जानकारी।',
    termBreach:'डेटा उल्लंघन',
    termBreachDef:'ऐसा अनधिकृत प्रसंस्करण या आकस्मिक खुलासा, प्राप्ति, साझा करना, उपयोग, बदलाव, नष्ट होना या खोना जिससे व्यक्तिगत डेटा की सुरक्षा प्रभावित हो।',
    termSdf:'SDF',
    termSdfDef:'Significant Data Fiduciary — सरकार द्वारा अधिसूचित Data Fiduciary या वर्ग, जिस पर अतिरिक्त दायित्व लागू होते हैं।',
    termDpia:'DPIA',
    termDpiaDef:'Data Protection Impact Assessment — व्यक्तिगत डेटा से जुड़े महत्वपूर्ण जोखिमों और उनके उपायों का व्यवस्थित आकलन।',
    termCors:'CORS',
    termCorsDef:'ब्राउज़र की सुरक्षा व्यवस्था जो तय करती है कि एक वेबसाइट दूसरी वेबसाइट से सामग्री माँग सकती है या नहीं।',

    footerDisclaimer:'DataSaathi एक स्वतंत्र शैक्षिक और Privacy Policy प्रकटीकरण आकलन उपकरण है। यह सरकारी सेवा, कानूनी सलाह, प्रमाणन, ऑडिट राय या वास्तविक अनुपालन का प्रमाण नहीं है।',
    footerSources:'मुख्य संदर्भ:',

    validUrl:'कृपया सही http/https URL दें। सटीक Privacy Policy URL बेहतर है।',
    loading:'ब्राउज़र में सार्वजनिक पेज पढ़ने की कोशिश हो रही है। नीति का पाठ इस वेबसाइट पर अपलोड नहीं किया जाता।',
    loaded:'नीति का पाठ स्थानीय रूप से पढ़ लिया गया है। कृपया जाँचें कि यह सही Privacy Policy पेज है।',
    failed:'स्वचालित पढ़ना रोका गया या विफल हुआ। यह सामान्यतः ब्राउज़र के CORS प्रतिबंध के कारण होता है। नीचे सटीक Privacy Policy का पाठ चिपकाएँ।',
    minText:'कृपया कम से कम 100 अक्षरों का Privacy Policy पाठ दें।',
    policyOnly:'केवल नीति',
    topicsEvidence:'प्रमाण वाले विषय',
    riskLabel:'नीति प्रकटीकरण जोखिम',
    coverage:'प्रमाण कवरेज',
    important:'महत्वपूर्ण:',
    importantText:'प्रमाण मिला का अर्थ है कि संबंधित भाषा मिली। यह वास्तविक अनुपालन साबित नहीं करता। प्रमाण न मिलने का अर्थ अपने-आप कानून का उल्लंघन नहीं है। कुछ आवश्यकताओं का निर्णय सार्वजनिक नीति से नहीं किया जा सकता।',
    found:'🟢 प्रमाण मिला',
    notFound:'🔴 प्रमाण नहीं मिला',
    simple:'सरल भाषा में:',
    finding:'निष्कर्ष:',
    relevant:'नीति में संबंधित भाषा मिली',
    noEvidence:'इस आवश्यकता के लिए स्क्रीनिंग इंजन को स्पष्ट प्रमाण नहीं मिला।',
    legal:'कानूनी संदर्भ:',
    applicability:'लागू होने की स्थिति:',
    manual:'मानवीय जाँच:',
    action:'सुझाया गया सुधार:'
  },

  mr: {
    navCitizen:'नागरिक',
    navCompany:'कंपन्या',
    navFaq:'सामान्य प्रश्न',
    navTerms:'परिभाषा',
    eyebrow:'भारतीय डिजिटल गोपनीयता • DPDPA 2023 • DPDP नियम 2025',
    title:'तुमचा डेटा जाणून घ्या।<br>तुमचे अधिकार जाणून घ्या।',
    subtitle:'कंपन्या तुमच्या वैयक्तिक डेटाबद्दल काय सांगतात ते सोप्या भाषेत समजा, तुमचे गोपनीयता अधिकार जाणून घ्या आणि समस्या आल्यास काय करायचे ते पहा.',
    heroCitizen:'👤 मी नागरिक आहे',
    heroCompany:'🏢 मी कंपनी आहे',
    badgeBrowser:'🔒 ब्राउझरमध्ये आकलन',
    badgeAccount:'🚫 खाते नाही',
    badgeDatabase:'🗄️ डेटाबेस नाही',
    badgeLanguages:'🌐 English • हिन्दी • मराठी',

    forCitizens:'नागरिकांसाठी',
    citizenCardTitle:'ही कंपनी माझ्याबद्दल काय जाणते?',
    citizenCardText:'Privacy Policy तपासा आणि कंपनी कोणता डेटा घेते, का वापरते, किती काळ ठेवते, कोणासोबत शेअर करते आणि तुमचे अधिकार काय आहेत हे सोप्या भाषेत समजा.',
    citizenSelect:'माझी गोपनीयता समजून घ्या',

    forCompanies:'कंपन्यांसाठी',
    companyCardTitle:'माझ्या Privacy Policy चे आकलन करा',
    companyCardText:'सार्वजनिक Privacy Policy मध्ये DPDPA 2023 आणि DPDP नियम 2025 शी जुळणारे कोणते पुरावे आहेत ते तपासा.',
    companySelect:'धोरणाचे आकलन सुरू करा',

    simpleTitle:'गोपनीयता, सोप्या भाषेत',
    personalTitle:'📱 वैयक्तिक डेटा म्हणजे काय?',
    personalText:'ओळखता येणाऱ्या व्यक्तीशी संबंधित माहिती — जसे नाव, फोन नंबर, ईमेल किंवा स्थान.',
    whyTitle:'🎯 हे महत्त्वाचे का आहे?',
    whyText:'तुमचा डेटा तुम्ही कुठे जाता, काय खरेदी करता, कोणाशी जोडलेले आहात आणि कसे वागता हे दाखवू शकतो. गोपनीयता गैरवापर आणि अनावश्यक उघडकीस येणे कमी करण्यास मदत करते.',
    dpdpTitle:'🛡️ DPDP म्हणजे काय?',
    dpdpText:'भारताचा डिजिटल वैयक्तिक डेटा संरक्षणाचा कायदेशीर ढाचा. तो व्यक्तींना अधिकार देतो आणि डेटा प्रक्रिया करणाऱ्या संस्थांवर जबाबदाऱ्या टाकतो.',

    citizenCheck:'नागरिक तपासणी',
    citizenToolTitle:'कंपनीची Privacy Policy तपासा',
    citizenToolText:'शक्य असल्यास अचूक Privacy Policy URL द्या. ब्राउझर CORS मुळे पेज वाचू शकला नाही तर धोरणाचा मजकूर येथे पेस्ट करा. आकलन या ब्राउझर टॅबमध्येच राहते.',

    companyCheck:'कंपनी आकलन',
    companyToolTitle:'DPDP Privacy Policy Gap Assessment',
    companyToolText:'हे धोरणात उपलब्ध पुराव्यांचे आकलन आहे. हे प्रत्यक्ष अनुपालन, प्रमाणपत्र किंवा ऑडिट मत सिद्ध करत नाही.',

    urlLabel:'Privacy Policy URL',
    pasteLabel:'किंवा Privacy Policy चा मजकूर पेस्ट करा',
    readPolicy:'धोरण वाचा',
    explain:'मला समजावून सांगा',
    runAssessment:'आकलन चालवा',
    exportPdf:'PDF जतन / निर्यात करा',
    back:'← मागे',
    pasteCitizen:'येथे Privacy Policy चा मजकूर पेस्ट करा...',
    pasteCompany:'संपूर्ण Privacy Policy चा मजकूर येथे पेस्ट करा...',

    rightsTitle:'तुमच्या गोपनीयता अधिकारांचा वापर कसा कराल',
    rightKnow:'🧾 माहिती घ्या',
    rightKnowText:'संस्था तुमचा कोणता वैयक्तिक डेटा प्रक्रिया करते आणि का हे विचारा.',
    rightCorrect:'✏️ दुरुस्ती',
    rightCorrectText:'चुकीची किंवा अपूर्ण वैयक्तिक माहिती दुरुस्त किंवा अपडेट करण्याची विनंती करा.',
    rightErase:'🗑️ हटवण्याची विनंती',
    rightEraseText:'लागू कायदेशीर अटी पूर्ण झाल्यास, कायदेशीर जतनाच्या आवश्यकतांच्या अधीन राहून डेटा हटवण्याची विनंती करा.',
    rightWithdraw:'🚪 संमती मागे घ्या',
    rightWithdrawText:'प्रक्रिया संमतीवर आधारित असल्यास, संमती देणे जितके सोपे तितकेच ती मागे घेणे सोपे असावे.',
    rightComplain:'📣 तक्रार करा',
    rightComplainText:'संस्थेची तक्रार निवारण व्यवस्था आणि लागू वैधानिक मार्ग वापरा.',
    rightBreach:'🚨 डेटा उल्लंघनावर कृती',
    rightBreachText:'संस्थेशी संपर्क करा, पुरावे जतन करा, प्रभावित खाती सुरक्षित करा आणि अधिकृत सूचनांचे पालन करा.',

    faqEyebrow:'सामान्य प्रश्न',
    faqTitle:'वारंवार विचारले जाणारे प्रश्न',
    faq1q:'कंपनीचा होमपेज URL पुरेसा आहे का?',
    faq1a:'अचूक Privacy Policy URL अधिक चांगला आहे. होमपेजपासून सुरुवात करता येते, पण स्थिर ब्राउझर अॅप दुसऱ्या वेबसाइटचे CORS निर्बंध ओलांडू शकत नाही. मजकूर पेस्ट करणे हा विश्वासार्ह पर्याय आहे.',
    faq2q:'DataSaathi माझी धोरणे किंवा URL साठवते का?',
    faq2a:'नाही. खाते, डेटाबेस, कुकी, analytics SDK किंवा localStorage नाही. आकलनाची माहिती फक्त तुमच्या ब्राउझर टॅबच्या मेमरीत राहते.',
    faq3q:'“पुरावा मिळाला” म्हणजे कंपनी कायद्याचे पालन करते का?',
    faq3a:'नाही. दिलेल्या धोरणात संबंधित मजकूर सापडला याचा अर्थ आहे. प्रत्यक्ष नियंत्रण अस्तित्वात आहे किंवा योग्य प्रकारे कार्य करते हे धोरण सिद्ध करू शकत नाही.',
    faq4q:'नागरिक आणि कंपनीचे वेगळे मोड का आहेत?',
    faq4a:'दोन्ही समान पुरावा-आधारित पद्धत वापरतात. नागरिक मोड निष्कर्ष सोप्या भाषेत समजावतो; कंपनी मोड कायदेशीर संदर्भ, जोखीम आणि सुधारणा जोडतो.',
    faq5q:'72 तासांच्या डेटा उल्लंघन नियमाबद्दल काय?',
    faq5a:'नियम प्रभावित Data Principals ना विलंब न करता सूचना देणे आणि उल्लंघनाची माहिती झाल्यापासून 72 तासांत बोर्डाला सविस्तर माहिती देण्याची तरतूद करतात, जोपर्यंत बोर्ड अधिक वेळ देत नाही.',

    termsEyebrow:'परिभाषा',
    termsTitle:'गोपनीयतेचे तांत्रिक शब्द, सोप्या भाषेत',
    termPrincipal:'Data Principal',
    termPrincipalDef:'ज्या व्यक्तीशी वैयक्तिक डेटा संबंधित आहे — उदाहरणार्थ ग्राहक.',
    termFiduciary:'Data Fiduciary',
    termFiduciaryDef:'वैयक्तिक डेटा का आणि कसा प्रक्रिया करायचा हे ठरवणारी संस्था.',
    termProcessor:'Data Processor',
    termProcessorDef:'Data Fiduciary च्या वतीने वैयक्तिक डेटा प्रक्रिया करणारा सेवा प्रदाता.',
    termConsent:'संमती',
    termConsentDef:'संमती हा कायदेशीर आधार असताना विशिष्ट उद्देशासाठी डेटा प्रक्रिया करण्यास व्यक्तीची मान्यता.',
    termNotice:'सूचना (Notice)',
    termNoticeDef:'कोणता डेटा आणि कोणत्या कारणासाठी प्रक्रिया केला जातो हे व्यक्तीला सांगणारी माहिती.',
    termPersonal:'वैयक्तिक डेटा',
    termPersonalDef:'ओळखता येणाऱ्या व्यक्तीशी संबंधित डिजिटल माहिती.',
    termBreach:'डेटा उल्लंघन',
    termBreachDef:'अनधिकृत प्रक्रिया किंवा अपघाती खुलासा, मिळवणे, शेअर करणे, वापर, बदल, नष्ट होणे किंवा हरवणे ज्यामुळे वैयक्तिक डेटाची सुरक्षा धोक्यात येते.',
    termSdf:'SDF',
    termSdfDef:'Significant Data Fiduciary — अतिरिक्त जबाबदाऱ्यांसाठी अधिसूचित Data Fiduciary किंवा वर्ग.',
    termDpia:'DPIA',
    termDpiaDef:'Data Protection Impact Assessment — वैयक्तिक डेटाशी संबंधित महत्त्वाच्या जोखमी आणि उपायांचे पद्धतशीर आकलन.',
    termCors:'CORS',
    termCorsDef:'एका वेबसाइटला दुसऱ्या वेबसाइटकडून सामग्री मागता येईल की नाही हे नियंत्रित करणारी ब्राउझर सुरक्षा यंत्रणा.',

    footerDisclaimer:'DataSaathi हे स्वतंत्र शैक्षणिक आणि Privacy Policy प्रकटीकरण आकलन साधन आहे. ही सरकारी सेवा, कायदेशीर सल्ला, प्रमाणपत्र, ऑडिट मत किंवा प्रत्यक्ष अनुपालनाचा पुरावा नाही.',
    footerSources:'मुख्य संदर्भ:',

    validUrl:'कृपया योग्य http/https URL द्या. अचूक Privacy Policy URL अधिक चांगला आहे.',
    loading:'ब्राउझरमध्ये सार्वजनिक पेज वाचण्याचा प्रयत्न सुरू आहे. धोरणाचा मजकूर या वेबसाइटवर अपलोड केला जात नाही.',
    loaded:'धोरणाचा मजकूर स्थानिकरित्या वाचला आहे. हे योग्य Privacy Policy पेज आहे याची खात्री करा.',
    failed:'स्वयंचलित वाचन थांबले किंवा अयशस्वी झाले. हे सामान्यतः ब्राउझरच्या CORS निर्बंधामुळे होते. खाली अचूक Privacy Policy मजकूर पेस्ट करा.',
    minText:'कृपया किमान 100 अक्षरांचा Privacy Policy मजकूर द्या.',
    policyOnly:'फक्त धोरण',
    topicsEvidence:'पुरावा असलेले विषय',
    riskLabel:'धोरण प्रकटीकरण जोखीम',
    coverage:'पुरावा कव्हरेज',
    important:'महत्त्वाचे:',
    importantText:'पुरावा मिळाला म्हणजे संबंधित भाषा सापडली. हे प्रत्यक्ष अनुपालन सिद्ध करत नाही. पुरावा न मिळाल्याने कायद्याचे उल्लंघन सिद्ध होत नाही. काही बाबी सार्वजनिक धोरणातून ठरवता येत नाहीत.',
    found:'🟢 पुरावा मिळाला',
    notFound:'🔴 पुरावा मिळाला नाही',
    simple:'सोप्या भाषेत:',
    finding:'निष्कर्ष:',
    relevant:'धोरणात संबंधित भाषा आढळली',
    noEvidence:'या आवश्यकतेसाठी स्क्रीनिंग इंजिनला स्पष्ट पुरावा आढळला नाही.',
    legal:'कायदेशीर संदर्भ:',
    applicability:'लागूपणा:',
    manual:'मानवी पडताळणी:',
    action:'सुचवलेली सुधारणा:'
  }
};


/* ---------- Helpers ---------- */

function clean(s) {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    }[c])
  );
}

function evidence(item, text) {
  const lower = text.toLowerCase();
  return item.evidence.filter(
    k => lower.includes(k.toLowerCase())
  );
}

function setHtml(el, value) {
  if (el) el.innerHTML = value;
}


/* ---------- Language ---------- */

function applyLanguage(lang) {

  const t = T[lang] || T.en;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {

    const key = el.dataset.i18n;

    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }

  });

  document
    .querySelectorAll('[data-i18n-placeholder]')
    .forEach(el => {

      const key = el.dataset.i18nPlaceholder;

      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }

    });

  setHtml($('title'), t.title);
  setHtml($('subtitle'), t.subtitle);

  document.title =
    'DataSaathi — ' +
    (
      lang === 'en'
        ? 'Know Your Data. Know Your Rights.'
        : lang === 'hi'
          ? 'अपना डेटा जानें। अपने अधिकार जानें।'
          : 'तुमचा डेटा जाणून घ्या। तुमचे अधिकार जाणून घ्या।'
    );
}


/* ---------- Navigation ---------- */

function showChoice() {

  document
    .querySelectorAll('.tool-section')
    .forEach(x => x.classList.add('hidden'));

  document
    .querySelectorAll('.intro-info')
    .forEach(x => x.classList.remove('hidden'));
}


function showMode(mode) {

  document
    .querySelectorAll('.tool-section')
    .forEach(x => x.classList.add('hidden'));

  document
    .querySelectorAll('.intro-info')
    .forEach(x => x.classList.add('hidden'));

  const target = $(mode + '-tool');

  if (!target) return;

  target.classList.remove('hidden');

  target.scrollIntoView({
    behavior:'smooth',
    block:'start'
  });
}


/* ---------- Read Privacy Policy ---------- */

async function fetchPolicy(mode) {

  const language = $('language')?.value || 'en';
  const t = T[language] || T.en;

  const urlInput = $(mode + 'Url');
  const textInput = $(mode + 'Text');
  const out = $(mode + 'Result');

  if (!urlInput || !out) {
    return;
  }

  const u = urlInput.value.trim();

  if (!/^https?:\/\/[^\s]+$/i.test(u)) {

    out.innerHTML =
      '<div class="notice">' +
      esc(t.validUrl) +
      '</div>';

    return;
  }

  out.innerHTML =
    '<div class="notice">' +
    esc(t.loading) +
    '</div>';

  let timer;

  try {

    const controller = new AbortController();

    timer = setTimeout(
      () => controller.abort(),
      9000
    );

    const response = await fetch(u, {
      redirect:'follow',
      signal:controller.signal,
      headers:{
        Accept:'text/html,text/plain'
      }
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    let html = await response.text();

    html = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');

    html = clean(html);

    if (html.length < 200) {
      throw new Error('not enough readable text');
    }

    if (textInput) {
      textInput.value = html;
    }

    out.innerHTML =
      '<div class="notice">' +
      esc(t.loaded) +
      '</div>';

  } catch (e) {

    if (timer) {
      clearTimeout(timer);
    }

    out.innerHTML =
      '<div class="notice">' +
      esc(t.failed) +
      (
        e.name === 'AbortError'
          ? ''
          : ' (' + esc(e.message) + ')'
      ) +
      '</div>';
  }
}


/* ---------- Assessment ---------- */

function assess(mode) {

  const language = $('language')?.value || 'en';
  const t = T[language] || T.en;

  const textInput = $(mode + 'Text');
  const out = $(mode + 'Result');

  if (!textInput || !out) {
    return;
  }

  const text = clean(textInput.value);

  if (text.length < 100) {

    out.innerHTML =
      '<div class="notice">' +
      esc(t.minText) +
      '</div>';

    return;
  }

  const rows = matrix().map(item => ({
    ...item,
    hits:evidence(item, text)
  }));

  if (!rows.length) {

    out.innerHTML =
      '<div class="notice">' +
      'The assessment matrix is unavailable.' +
      '</div>';

    return;
  }

  const found =
    rows.filter(x => x.hits.length).length;

  const coverage =
    Math.round(found / rows.length * 100);

  const risk =
    coverage < 35
      ? 'Critical'
      : coverage < 55
        ? 'High'
        : coverage < 75
          ? 'Medium'
          : 'Low';

  const citizen = mode === 'citizen';


  let output =
    '<div class="summary">' +

      '<div class="stat">' +
        '<span class="muted">' +
          esc(
            citizen
              ? t.topicsEvidence
              : t.riskLabel
          ) +
        '</span>' +
        '<strong>' +
          esc(
            citizen
              ? found + '/' + rows.length
              : risk
          ) +
        '</strong>' +
      '</div>' +

      '<div class="stat">' +
        '<span class="muted">' +
          esc(t.coverage) +
        '</span>' +
        '<strong>' +
          coverage +
          '%</strong>' +
      '</div>' +

      '<div class="stat">' +
        '<span class="muted">' +
          esc(t.policyOnly) +
        '</span>' +
        '<strong>✓</strong>' +
      '</div>' +

    '</div>' +

    '<div class="notice">' +
      '<b>' +
        esc(t.important) +
      '</b> ' +
      esc(t.importantText) +
    '</div>';


  output += rows.map(item => {

    const ok = item.hits.length > 0;

    return (

      '<article class="finding ' +
        (ok ? 'found' : 'gap') +
      '">' +

        '<span class="eyebrow">' +
          esc(item.area) +
          ' • ' +
          esc(item.priority) +
        '</span>' +

        '<h3>' +
          (ok ? esc(t.found) : esc(t.notFound)) +
          ' — ' +
          esc(item.title) +
        '</h3>' +

        '<p>' +
          '<b>' +
            esc(
              citizen
                ? t.simple
                : t.finding
            ) +
          '</b> ' +
          esc(item.citizen) +
        '</p>' +

        '<p>' +
          (
            ok
              ? esc(t.relevant) +
                ' (' +
                esc(
                  item.hits
                    .slice(0, 4)
                    .join(', ')
                ) +
                ').'
              : esc(t.noEvidence)
          ) +
        '</p>' +

        '<p class="small">' +
          '<b>' +
            esc(t.legal) +
          '</b> ' +
          esc(item.act) +
          '; ' +
          esc(item.rules) +
          '. ' +

          '<b>' +
            esc(t.applicability) +
          '</b> ' +
          esc(item.status) +
          '.' +
        '</p>' +

        '<p class="small">' +
          '<b>' +
            esc(t.manual) +
          '</b> ' +
          esc(item.manual) +
        '</p>' +

        '<p>' +
          '<b>' +
            esc(t.action) +
          '</b> ' +
          esc(item.remediation) +
        '</p>' +

      '</article>'

    );

  }).join('');

  out.innerHTML = output;
}


/* ---------- Application API ---------- */

/*
 * IMPORTANT:
 * ui-security.js uses this object to call the application
 * functions. This avoids inline onclick handlers and works
 * with the Content-Security-Policy.
 */
window.DataSaathiApp = Object.freeze({
  fetchPolicy,
  assess,
  showChoice,
  showMode,
  applyLanguage
});


/*
 * Expose translations to ui-security.js.
 * This is only local static UI text; no user data is stored here.
 */
window.T = T;


/* ---------- Initial event handlers ---------- */

const language = $('language');

if (language) {

  language.addEventListener(
    'change',
    e => applyLanguage(e.target.value)
  );

}


const citizenSelect = $('citizenSelect');

if (citizenSelect) {

  citizenSelect.addEventListener(
    'click',
    e => {
      e.preventDefault();
      showMode('citizen');
    }
  );

}


const companySelect = $('companySelect');

if (companySelect) {

  companySelect.addEventListener(
    'click',
    e => {
      e.preventDefault();
      showMode('company');
    }
  );

}


const heroCitizen = $('heroCitizen');

if (heroCitizen) {

  heroCitizen.addEventListener(
    'click',
    e => {
      e.preventDefault();
      showMode('citizen');
    }
  );

}


const heroCompany = $('heroCompany');

if (heroCompany) {

  heroCompany.addEventListener(
    'click',
    e => {
      e.preventDefault();
      showMode('company');
    }
  );

}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DataSaathi app.js loaded");

    // Citizen buttons
    const citizenReadPolicy = document.getElementById("citizenReadPolicy");
    const citizenAssess = document.getElementById("citizenAssess");

    if (citizenReadPolicy) {
        citizenReadPolicy.addEventListener("click", function () {
            fetchPolicy("citizen");
        });
    }

    if (citizenAssess) {
        citizenAssess.addEventListener("click", function () {
            assess("citizen");
        });
    }

    // Company buttons
    const companyReadPolicy = document.getElementById("companyReadPolicy");
    const companyAssess = document.getElementById("companyAssess");

    if (companyReadPolicy) {
        companyReadPolicy.addEventListener("click", function () {
            fetchPolicy("company");
        });
    }

    if (companyAssess) {
        companyAssess.addEventListener("click", function () {
            assess("company");
        });
    }

    // Export PDF
    const exportPdf = document.getElementById("exportPdf");

    if (exportPdf) {
        exportPdf.addEventListener("click", function () {
            window.print();
        });
    }

    // Back buttons
    document.querySelectorAll(".backBtn").forEach(function (button) {
        button.addEventListener("click", function () {
            showChoice();
        });
    });
});


/* ---------- Start application ---------- */

applyLanguage('en');
showChoice();
