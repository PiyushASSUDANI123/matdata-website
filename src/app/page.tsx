'use client';

import React, { useState } from 'react';
import {
  Search,
  Users,
  Activity,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Vote,
  Target,
  Check,
  X,
  Menu,
  ChevronDown,
  Layers,
  FileSpreadsheet,
  Lock,
  Headphones,
  Database,
  Globe,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Clock,
  Printer,
  Sliders,
  Send,
  Zap,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';
const DISPLAY_PHONE = '+91 98765 43210';

export default function LandingPage() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Slip Simulator State
  const [slipMode, setSlipMode] = useState<'photo' | 'text'>('photo');
  const [candidateName, setCandidateName] = useState('रोहित शर्मा');
  const [candidateParty, setCandidateParty] = useState('विकास मोर्चा');
  const [candidateSymbol, setCandidateSymbol] = useState('कमल / टॉर्च / कप-प्लेट');
  const [voterName, setVoterName] = useState('सुरेश कुमार वर्मा');
  const [voterFather, setVoterFather] = useState('रामनारायण वर्मा');
  const [voterWard, setVoterWard] = useState('4');
  const [voterBooth, setVoterBooth] = useState('37');
  const [voterSerial, setVoterSerial] = useState('342');
  const [voterHouse, setVoterHouse] = useState('27क');
  const [voterEpic, setVoterEpic] = useState('SSB0683086');
  const [pollingStation, setPollingStation] = useState('राजकीय उच्च माध्यमिक विद्यालय, कमरा नं. 2');

  // Role Tab State
  const [activeTab, setActiveTab] = useState<'worker' | 'warroom' | 'polling'>('warroom');

  // Lead Modal
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    constituency: '',
    electionType: 'विधानसभा (Assembly)',
  });

  // Slip share simulation feedback
  const [slipCopied, setSlipCopied] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const modules = [
    {
      id: 'search',
      title: 'सुपरफास्ट वोटर सर्च',
      subtitle: '0.2s Instant Search Engine',
      icon: Search,
      badge: 'बिजली जैसी गति',
      description: 'नाम, पिता/पति के नाम, मकान संख्या, वार्ड या EPIC नंबर से मात्र 0.2 सेकंड में मतदाता खोजें। हिंदी और अंग्रेजी दोनों में बिना किसी स्पेलिंग गलती के सटीक परिणाम।',
      features: [
        'देवनागरी व अंग्रेज़ी दोनों में तेज़ फॉनेटिक सर्च',
        'अल्फाबेटिकल व मकानवार तुरंत फ़िल्टरिंग',
        '2G / कमजोर इंटरनेट पर भी बिना रुकावट सर्च',
        'मोबाइल व डेस्कटॉप दोनों के लिए अनुकूलित'
      ],
      metric: '0.2 सेकंड',
      metricSub: 'लाखों वोटर्स में तुरंत रिजल्ट'
    },
    {
      id: 'whatsapp',
      title: 'ऑटोमैटिक WhatsApp पर्ची',
      subtitle: '1-Click Digital Photo Slip',
      icon: MessageCircle,
      badge: 'सबसे लोकप्रिय',
      description: 'प्रत्याशी की फोटो, चुनाव चिन्ह और मतदान केंद्र के गूगल मैप्स लोकेशन के साथ 1-क्लिक में डिजिटल पर्ची सीधे मतदाता के WhatsApp पर भेजें।',
      features: [
        'प्रत्याशी की फोटो व चुनाव चिन्ह के साथ आकर्षक ब्रांडिंग',
        'मतदान केंद्र का नाम व कमरा नंबर ऑटो-शामिल',
        'सत्यापित QR कोड से तुरंत वोटर पर्ची वेरिफिकेशन',
        'परिवार के सभी सदस्यों की पर्चियां एक साथ भेजने की सुविधा'
      ],
      metric: '100% डिलीवरी',
      metricSub: 'कागजी पर्ची से 80% सस्ता व असरदार'
    },
    {
      id: 'warroom',
      title: 'लाइव पोलिंग डे वॉर-रूम',
      subtitle: 'Real-time Election Day Intelligence',
      icon: Activity,
      badge: 'जीत का निर्णय',
      description: 'मतदान दिवस पर बूथ-वार और घंटे-वार मतदान प्रतिशत (Turnout %) का लाइव ट्रैक। दोपहर 2 बजे पता लगाएं कि हमारे किस बूथ पर वोटिंग कम है ताकि तुरंत टीम भेजी जा सके।',
      features: [
        'घंटेवार (सुबह 7 से शाम 6) लाइव मतदान प्रतिशत',
        'कमजोर और मजबूत बूथों का तत्काल रेड-अलर्ट',
        'परिवारवार मार्किंग — कौन आया, कौन बाकी है',
        'बड़ी स्क्रीन (LED Wall) पर लाइव वॉर-रूम डिस्प्ले'
      ],
      metric: 'लाइव घंटेवार',
      metricSub: 'जीत का अंतर तय करने वाला टूल'
    },
    {
      id: 'workers',
      title: 'कार्यकर्ता व पन्ना प्रमुख प्रबंधन',
      subtitle: 'Booth & Panna Pramukh App',
      icon: Users,
      badge: 'ग्राउंड कमांड',
      description: 'हर पन्ना प्रमुख को उसके 30 से 60 मतदाताओं की लिस्ट मोबाइल पर दें। कार्यकर्ता की ग्राउंड सक्रियता, कॉलिंग रिपोर्ट और वोटर समर्थन स्टेटस को लाइव ट्रैक करें।',
      features: [
        'पन्ना प्रमुखों को उनके पन्ने की एक्सक्लूसिव डिजिटल लिस्ट',
        'सपोर्टर (पक्ष), न्यूट्रल (तटस्थ) व विरोधी (विपक्ष) टैगिंग',
        'घर-घर जनसंपर्क की जीपीएस व समय-वार ट्रैकिंग',
        'बूथ एजेंट को मतदान दिवस पर सरल मार्किंग इंटरफेस'
      ],
      metric: '100% बूथ कवरेज',
      metricSub: 'हर टेबल व कार्यकर्ता पर नियंत्रण'
    },
    {
      id: 'family',
      title: 'पारिवारिक क्लस्टरिंग व समीकरण',
      subtitle: 'Family Grouping & Caste Intelligence',
      icon: Layers,
      badge: 'माइक्रो-टारगेटिंग',
      description: 'मकान संख्या और उपनाम से परिवारों का स्वतः समूह बनाएं। एक मकान के 10 सदस्यों को एक साथ संपर्क करें और वार्ड के सामाजिक-जातिगत समीकरण समझें।',
      features: [
        'एक मकान के सभी वोटरों का स्वतः पारिवारिक ग्रुप',
        'मुखिया (Head of Family) की पहचान व सीधा संपर्क',
        'जातिगत व सामाजिक वर्ग वार मतदाता वर्गीकरण',
        'प्रवासी मतदाताओं (Outstation Voters) की अलग सूची'
      ],
      metric: '1-क्लिक परिवार',
      metricSub: 'संपूर्ण परिवार का एकमुश्त संपर्क'
    },
    {
      id: 'export',
      title: 'प्रिंट-रेडी लिस्ट व एक्सेल एक्सपोर्ट',
      subtitle: 'ECI Standard Print & Excel Engine',
      icon: FileSpreadsheet,
      badge: '100% सटीक ECI फॉर्मेट',
      description: 'नामावली को वर्णमाला (Alphabetical), मकानवार (House-wise) और क्रमांकवार (Serial-wise) एक क्लिक में डाउनलोड करें या प्रिंट निकालें।',
      features: [
        'ECI अधिकृत फॉर्मेट में सुव्यवस्थित एक्सेल (.xlsx)',
        'बूथ एजेंट टेबल के लिए प्रिंट-रेडी PDF फॉर्मेट',
        'विलोपित (Deleted) वोटरों का स्वतः निष्कासन',
        'अल्फाबेटिकल वोटर सर्च स्लिप डायरेक्ट प्रिंटिंग'
      ],
      metric: '1-क्लिक डाउनलोड',
      metricSub: 'बिना कंप्यूटर ऑपरेटर के तुरंत तैयार'
    }
  ];

  const faqs = [
    {
      q: 'हमारी विधानसभा या वार्ड का डेटा सॉफ्टवेयर में कैसे लोड होगा?',
      a: 'आपको बस अपनी आधिकारिक PDF मतदाता सूची देनी होती है। हमारा आधुनिक डेटा इंजन मात्र 24 घंटे के अंदर आपकी पूरी विधानसभा या वार्ड का 100% सटीक डेटा सॉफ्टवेयर में लोड कर देता है।'
    },
    {
      q: 'क्या कार्यकर्ताओं को इसे चलाने के लिए ट्रेनिंग की ज़रूरत होगी?',
      a: 'बिल्कुल नहीं! हमारा मोबाइल ऐप विशेष रूप से ग्रामीण व शहरी कार्यकर्ताओं की सहूलियत के लिए शुद्ध सरल हिंदी में डिज़ाइन किया गया है। 2 मिनट में कोई भी कार्यकर्ता इसे आसानी से चलाना सीख जाता है।'
    },
    {
      q: 'WhatsApp पर्ची में क्या-क्या जानकारी भेजी जाती है?',
      a: 'पर्ची में प्रत्याशी की फोटो, पार्टी का चुनाव चिन्ह, मतदाता का नाम, पिता/पति का नाम, वार्ड व बूथ संख्या, क्रम संख्या, मकान नंबर, EPIC नंबर और मतदान केंद्र का पूरा पता व कमरा नंबर भेजा जाता है।'
    },
    {
      q: 'मतदान के दिन यह सॉफ्टवेयर कैसे मदद करता है?',
      a: 'मतदान के दिन बूथ पर बैठे कार्यकर्ता आते ही वोटर को "मार्क" कर देते हैं। वॉर रूम में मुख्य प्रत्याशी को हर घंटे का लाइव पोलिंग प्रतिशत दिखता है और दोपहर बाद बचे हुए समर्थकों की लिस्ट निकाल कर तुरंत संपर्क किया जा सकता है।'
    },
    {
      q: 'क्या हमारा चुनावी डेटा पूरी तरह सुरक्षित और गोपनीय रहेगा?',
      a: 'हाँ, 100% सुरक्षित। आपका पूरा डेटा 256-बिट एन्क्रिप्शन के साथ सुरक्षित क्लाउड पर रहता है। केवल आपके द्वारा अधिकृत प्रत्याशी और मुख्य एडमिन ही इस डेटा को एक्सेस कर सकते हैं।'
    },
    {
      q: 'सॉफ्टवेयर चालू होने में कितना समय लगता है?',
      a: 'डेटा प्राप्त होने के 24 घंटे के भीतर आपका संपूर्ण वॉर रूम और कार्यकर्ता ऐप चालू कर दिया जाता है। आपको और आपकी टीम को पूरा लाइव सपोर्ट दिया जाता है।'
    }
  ];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);

    const waText = `नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम और वोटर सॉफ्टवेयर का लाइव डेमो चाहिए।\n\nउम्मीदवार / नाम: ${leadForm.name}\nमोबाइल: ${leadForm.phone}\nक्षेत्र / वार्ड: ${leadForm.constituency}\nचुनाव स्तर: ${leadForm.electionType}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    try {
      const targets = [
        'https://matdataportal.vercel.app/api/admin/leads',
        'http://localhost:5002/api/admin/leads',
      ];
      for (const target of targets) {
        try {
          const res = await fetch(target, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadForm),
          });
          if (res.ok) break;
        } catch {}
      }
    } catch (err) {
      console.warn('Leads API warning:', err);
    }

    setLeadSubmitting(false);
    setLeadSubmitted(true);

    window.open(waUrl, '_blank');

    setTimeout(() => {
      setLeadModalOpen(false);
      setLeadSubmitted(false);
      setLeadForm({ name: '', phone: '', constituency: '', electionType: 'विधानसभा (Assembly)' });
    }, 2800);
  };

  const getWaLink = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleSimulatedShare = () => {
    setSlipCopied(true);
    setTimeout(() => setSlipCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-emerald-600 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* TOP NOTIFICATION BAR */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shrink-0">
            आधिकारिक संस्करण
          </span>
          <span className="text-emerald-50">
            100% प्री-लोडेड वोटर डेटा • 24 घंटे में लाइव वॉर रूम • WhatsApp पर्ची ऑटोमेशन
          </span>
          <a
            href={getWaLink('नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम सॉफ्टवेयर का लाइव डेमो चाहिए।')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1 font-bold text-white hover:text-emerald-200 underline underline-offset-2 ml-1"
          >
            <span>लाइव डेमो ({DISPLAY_PHONE})</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>

      {/* STICKY LIGHT NAVBAR */}
      <nav className="sticky top-0 z-50 glass-nav-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo - Matdata Portal only */}
            <a href="#" className="flex items-center space-x-3 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center shadow-sm group-hover:border-emerald-400 transition-colors">
                <img
                  src="/logo.png"
                  alt="Matdata Portal"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center">
                  Matdata<span className="text-emerald-600">Portal</span>
                  <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                    मतदाता पोर्टल
                  </span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block tracking-wider -mt-0.5 whitespace-nowrap">
                  हर वोट • सही दिशा • जीत की ओर
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-7 text-sm font-semibold text-slate-700">
              <a href="#features" className="hover:text-emerald-600 transition-colors">सुविधाएं</a>
              <a href="#simulator" className="hover:text-emerald-600 transition-colors">पर्ची सिम्युलेटर</a>
              <a href="#warroom-preview" className="hover:text-emerald-600 transition-colors">वॉर-रूम</a>
              <a href="#roles" className="hover:text-emerald-600 transition-colors">कार्यकर्ता व भूमिकाएं</a>
              <a href="#comparison" className="hover:text-emerald-600 transition-colors">तुलना</a>
              <a href="#plans" className="hover:text-emerald-600 transition-colors">पैकेजेस</a>
              <a href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</a>
            </div>

            {/* Nav Actions */}
            <div className="flex items-center space-x-3 shrink-0">
              <a
                href={getWaLink('नमस्ते Matdata Portal टीम, मुझे सॉफ्टवेयर के बारे में जानकारी चाहिए।')}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all whitespace-nowrap"
              >
                <Phone size={13} className="text-emerald-600" />
                <span>कॉल / WhatsApp: {DISPLAY_PHONE}</span>
              </a>

              <a
                href="https://matdataportal.vercel.app/login"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Lock size={13} className="text-emerald-600" />
                <span>लॉगिन</span>
              </a>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="glow-btn px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>लाइव डेमो</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">सुविधाएं (Features)</a>
              <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">पर्ची सिम्युलेटर (Demo)</a>
              <a href="#warroom-preview" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">वॉर-रूम (War Room)</a>
              <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">कार्यकर्ता व भूमिकाएं (Roles)</a>
              <a href="#comparison" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">तुलना (Comparison)</a>
              <a href="#plans" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">पैकेजेस (Pricing Plans)</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700">FAQ (सामान्य प्रश्न)</a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://matdataportal.vercel.app/login"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                क्लाइंट लॉगिन करें
              </a>
              <a
                href={getWaLink('नमस्ते Matdata Portal टीम, मुझे सॉफ्टवेयर के बारे में जानकारी चाहिए।')}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center space-x-2"
              >
                <Phone size={14} className="text-emerald-600" />
                <span>कॉल / WhatsApp: {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - RADIANT LIGHT THEME */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-light-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Trust Badge */}
              <div className="pulse-badge-light">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>भारत का नंबर 1 चुनाव प्रबंधन व डिजिटल वॉर रूम सॉफ्टवेयर</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                हर बूथ पर पकड़, हर वोट पर नजर —{' '}
                <span className="gradient-text-emerald">
                  जीत की पक्की गारंटी
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                <strong className="text-emerald-800 font-bold">Matdata Portal (मतदाता पोर्टल)</strong> के साथ 0.2 सेकंड में मतदाता खोजें, 
                प्रत्याशी की फोटो वाली आधिकारिक WhatsApp पर्ची भेजें, पन्ना प्रमुखों को लाइव ट्रैक करें और 
                मतदान के दिन वॉर-रूम से हर घंटे का टर्नआउट देखें।
              </p>

              {/* Trust Value Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>100% सटीक ECI डिजिटल वोटर डेटा</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>24 घंटे में आपके क्षेत्र के लिए लाइव</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>फोटो व QR कोड सहित WhatsApp पर्ची</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>2G व कमजोर इंटरनेट पर भी सुपरफ़ास्ट</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => setLeadModalOpen(true)}
                  className="glow-btn px-7 py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                >
                  <Sparkles size={18} />
                  <span>फ्री लाइव डेमो बुक करें</span>
                  <ArrowRight size={18} />
                </button>

                <a
                  href={getWaLink('नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम और वोटर पर्ची सॉफ्टवेयर का लाइव डेमो चाहिए।')}
                  target="_blank"
                  rel="noreferrer"
                  className="wa-btn px-6 py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center space-x-2.5 shadow-lg"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp पर बात करें</span>
                </a>
              </div>

              {/* Stats Highlights */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">500+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">सफल चुनाव अभियान</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600">0.2s</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">सुपरफ़ास्ट सर्च गति</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600">99.9%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">अपटाइम व शुद्धता</div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Authentic Clean Light Slip Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                {/* Clean Light Card */}
                <div className="light-card-elevated p-6 sm:p-7">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                        <Vote size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">डिजिटल मतदाता पर्ची</div>
                        <div className="text-[10px] text-emerald-700 font-bold">1-SECOND INSTANT SLIP</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Candidate Header in Slip */}
                  <div className="my-4 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-emerald-800 font-semibold">{candidateParty}</div>
                      <div className="text-base font-bold text-slate-900">{candidateName}</div>
                      <div className="text-[11px] text-amber-700 font-medium">चुनाव चिन्ह: {candidateSymbol}</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-emerald-300 flex flex-col items-center justify-center text-center shadow-sm">
                      <span className="text-[8px] text-slate-500 font-bold">क्रमांक</span>
                      <span className="text-lg font-black text-emerald-700 leading-none">1</span>
                    </div>
                  </div>

                  {/* Voter Details Table */}
                  <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">मतदाता का नाम:</span>
                      <strong className="text-slate-900 font-bold">{voterName}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">पिता/पति का नाम:</span>
                      <span className="text-slate-800 font-medium">{voterFather}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-1.5 text-center bg-white rounded-xl border border-slate-200">
                      <div>
                        <div className="text-[10px] text-slate-500 font-medium">वार्ड नं.</div>
                        <div className="font-bold text-slate-900 text-sm">{voterWard}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-medium">बूथ नं.</div>
                        <div className="font-bold text-emerald-700 text-sm">{voterBooth}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-medium">क्रम संख्या</div>
                        <div className="font-bold text-amber-700 text-sm">{voterSerial}</div>
                      </div>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">EPIC No:</span>
                      <span className="font-mono font-bold text-emerald-800">{voterEpic}</span>
                    </div>
                    <div className="text-[11px] text-slate-700 pt-1 border-t border-slate-200">
                      <span className="text-slate-500 font-medium">मतदान केंद्र:</span> {pollingStation}
                    </div>
                  </div>

                  {/* QR Code & Slip Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      <span className="text-[11px] font-medium">ECI मानक सत्यापित QR कोड</span>
                    </div>
                    <a
                      href="#simulator"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                    >
                      <span>कस्टमाइज़ करें</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-20 relative bg-white border-t border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              शक्तिशाली चुनावी टूल्स
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              चुनाव जीतने के 6 आधुनिक डिजिटल हथियार
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              मतदाता खोज से लेकर मतदान दिवस के लाइव वॉर-रूम तक — एक ही सुरक्षित प्लेटफ़ॉर्म पर सब कुछ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="light-card p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">{mod.title}</h3>
                    <div className="text-xs text-emerald-700 font-mono font-semibold mb-3">{mod.subtitle}</div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {mod.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {mod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-slate-900">{mod.metric}</div>
                      <div className="text-[10px] text-slate-500">{mod.metricSub}</div>
                    </div>
                    <button
                      onClick={() => setLeadModalOpen(true)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>डेमो देखें</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE LIVE SLIP SIMULATOR SECTION */}
      <section id="simulator" className="py-20 relative bg-[#f1f5f9] border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1 rounded-full">
              लाइव पर्ची सिम्युलेटर
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              डिजिटल मतदाता पर्ची कस्टमाइज़ करें
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              नीचे जानकारी बदलें और देखें कि मतदाता के WhatsApp पर फोटो वाली पर्ची या टेक्स्ट संदेश कैसा दिखाई देता है।
            </p>

            {/* Toggle Mode: Photo Slip vs Text Slip */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-slate-300 shadow-sm max-w-full">
              <button
                onClick={() => setSlipMode('photo')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  slipMode === 'photo'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📸 फोटो वाली पर्ची (Photo Slip)
              </button>
              <button
                onClick={() => setSlipMode('text')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  slipMode === 'text'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📝 टेक्स्ट पर्ची (Text Slip)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Config Controls */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Sliders size={18} className="text-emerald-600" />
                <span>पर्ची कस्टमाइज़ेशन पैनल</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">प्रत्याशी का नाम</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">दल / पार्टी</label>
                  <input
                    type="text"
                    value={candidateParty}
                    onChange={(e) => setCandidateParty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">चुनाव चिन्ह / सिंबल</label>
                <input
                  type="text"
                  value={candidateSymbol}
                  onChange={(e) => setCandidateSymbol(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">मतदाता का नाम</label>
                  <input
                    type="text"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">पिता/पति का नाम</label>
                  <input
                    type="text"
                    value={voterFather}
                    onChange={(e) => setVoterFather(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">वार्ड नं.</label>
                  <input
                    type="text"
                    value={voterWard}
                    onChange={(e) => setVoterWard(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">बूथ नं.</label>
                  <input
                    type="text"
                    value={voterBooth}
                    onChange={(e) => setVoterBooth(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">क्रम संख्या</label>
                  <input
                    type="text"
                    value={voterSerial}
                    onChange={(e) => setVoterSerial(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-emerald-700 font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">मकान संख्या</label>
                  <input
                    type="text"
                    value={voterHouse}
                    onChange={(e) => setVoterHouse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">EPIC No</label>
                  <input
                    type="text"
                    value={voterEpic}
                    onChange={(e) => setVoterEpic(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">मतदान केंद्र (Polling Station)</label>
                <input
                  type="text"
                  value={pollingStation}
                  onChange={(e) => setPollingStation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                💡 <strong>स्मार्टबूथ टेक्नोलॉजी:</strong> वास्तविक चुनाव में यह पर्ची 1-क्लिक में आधिकारिक WhatsApp Cloud API से सीधे मतदाता के मोबाइल पर डिलीवर होती है।
              </div>
            </div>

            {/* Simulated WhatsApp Phone Screen in Light Theme */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md bg-slate-900 rounded-[44px] p-4 border-4 border-slate-700 shadow-2xl relative">
                {/* Speaker Notch */}
                <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

                {/* WhatsApp Chat Top Header */}
                <div className="bg-[#075e54] p-3 rounded-2xl flex items-center space-x-3 mb-3 text-white shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm text-white">
                    {candidateName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate flex items-center gap-1.5">
                      <span>{candidateName} ({candidateParty})</span>
                      <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                    </div>
                    <div className="text-[10px] text-emerald-200">आधिकारिक चुनाव अभियान • ऑनलाइन</div>
                  </div>
                  <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-1 rounded-md">10:45 AM</span>
                </div>

                {/* WhatsApp Message Bubble Area */}
                <div className="space-y-3 min-h-[380px] p-3 bg-[#e5ddd5] rounded-2xl">
                  <div className="bg-white text-slate-900 p-3.5 rounded-2xl rounded-tl-sm text-xs space-y-2.5 shadow-md">
                    <div className="text-emerald-800 font-bold">
                      सादर प्रणाम {voterName} जी 🙏
                    </div>

                    {slipMode === 'photo' ? (
                      /* PHOTO SLIP CARD IN CHAT */
                      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 shadow-sm">
                        <div className="border-b border-slate-200 pb-2 text-center bg-emerald-50 -mx-3 -mt-3 p-2.5 rounded-t-xl">
                          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                            आधिकारिक डिजिटल मतदाता पर्ची
                          </div>
                          <div className="text-xs font-black text-slate-900">
                            {candidateParty} • प्रत्याशी: {candidateName}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-800">
                          <div><span className="text-slate-500">नाम:</span> <strong>{voterName}</strong></div>
                          <div><span className="text-slate-500">पिता/पति:</span> {voterFather}</div>
                          <div><span className="text-slate-500">वार्ड:</span> <strong>{voterWard}</strong></div>
                          <div><span className="text-slate-500">बूथ नं:</span> <strong className="text-emerald-700">{voterBooth}</strong></div>
                          <div><span className="text-slate-500">क्रम संख्या:</span> <strong className="text-amber-700 font-bold">{voterSerial}</strong></div>
                          <div><span className="text-slate-500">मकान नं:</span> {voterHouse}</div>
                        </div>

                        <div className="text-[10px] text-slate-600 bg-slate-100 p-1.5 rounded-lg">
                          <strong>मतदान केंद्र:</strong> {pollingStation}
                        </div>

                        <div className="text-[10px] text-center text-emerald-800 font-bold pt-1 border-t border-slate-200">
                          चुनाव चिन्ह: {candidateSymbol} पर मुहर लगाएं!
                        </div>
                      </div>
                    ) : (
                      /* TEXT SLIP FORMAT */
                      <div className="text-xs space-y-1 font-mono text-slate-800 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                        <div>🗳️ <strong>मतदाता पर्ची विवरण</strong></div>
                        <div>नाम: {voterName}</div>
                        <div>पिता/पति: {voterFather}</div>
                        <div>वार्ड नं: {voterWard} | बूथ नं: {voterBooth}</div>
                        <div>क्रम संख्या: {voterSerial} | मकान: {voterHouse}</div>
                        <div>EPIC: {voterEpic}</div>
                        <div className="text-[10px] text-slate-600">केंद्र: {pollingStation}</div>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-600">
                      कृपया अपने मताधिकार का प्रयोग अवश्य करें। आपका एक वोट हमारा हौसला है।
                    </div>
                  </div>

                  {/* Simulator action feedback */}
                  {slipCopied && (
                    <div className="text-center py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs rounded-xl font-semibold">
                      ✓ पर्ची WhatsApp पर भेजने के लिए तैयार है!
                    </div>
                  )}

                  {/* WhatsApp Quick Buttons in Chat */}
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={handleSimulatedShare}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 text-xs font-bold text-center border border-slate-300 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                    >
                      <Send size={13} />
                      <span>WhatsApp पर शेयर करें (Simulate)</span>
                    </button>
                    <button
                      onClick={() => setLeadModalOpen(true)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-colors shadow-md cursor-pointer"
                    >
                      अपने चुनाव के लिए ऐसा सिस्टम चालू करवाएं
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAR ROOM LIVE INTELLIGENCE SHOWCASE */}
      <section id="warroom-preview" className="py-20 relative bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              COMMAND CENTER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              मतदान दिवस का लाइव वॉर-रूम
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              सुबह 7:00 बजे से लेकर शाम 6:00 बजे तक हर बूथ का लाइव मतदान प्रतिशत और कमजोर बूथों का तत्काल रेड-अलर्ट।
            </p>
          </div>

          <div className="light-card p-6 sm:p-10 relative overflow-hidden">
            {/* Top War Room KPI Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">कुल मतदाता</div>
                <div className="text-2xl font-black text-slate-900 mt-1">2,48,930</div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">100% ECI नामावली</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">डाले गए वोट (Live)</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">1,80,224</div>
                <div className="text-[10px] text-slate-500 mt-1">अपडेटेड: 03:00 PM</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">लाइव टर्नआउट</div>
                <div className="text-2xl font-black text-amber-600 mt-1">72.4%</div>
                <div className="text-[10px] text-amber-700 font-bold mt-1">↑ +4.2% पिछले चुनाव से</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">सक्रिय बूथ एजेंट्स</div>
                <div className="text-2xl font-black text-blue-600 mt-1">248 / 252</div>
                <div className="text-[10px] text-blue-700 font-bold mt-1">98.4% रिपोर्टिंग लाइव</div>
              </div>
            </div>

            {/* Live Booth Alerts Table Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-2">
                <span>बूथ वार लाइव स्थिति (Sample Booths)</span>
                <span className="text-emerald-700 flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  LIVE STREAMING
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="font-bold text-slate-900">बूथ नं. 42 — रा.उ.मा.वि. कमरा नं. 1</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-slate-600">वोटिंग: <strong className="text-slate-900">820 / 1024</strong></span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      80.1% (मजबूत)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-amber-200 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="font-bold text-slate-900">बूथ नं. 87 — पंचायत भवन हॉल</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-slate-600">वोटिंग: <strong className="text-slate-900">610 / 980</strong></span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                      62.2% (औसत)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-red-200 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-slate-900">बूथ नं. 115 — प्राथमिक विद्यालय उत्तरी भाग</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-slate-600">वोटिंग: <strong className="text-slate-900">390 / 920</strong></span>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-xs">
                      42.4% (रेड अलर्ट - टीम भेजें)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-medium">
                ⚡ दोपहर 3 बजे कम वोटिंग वाले बूथों की सूची 1-क्लिक में निकालें और अपनी टीम तुरंत भेजें।
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="glow-btn px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white cursor-pointer"
              >
                वॉर रूम लाइव डेमो बुक करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE-BASED APPLICATION INTERFACE */}
      <section id="roles" className="py-20 relative bg-[#f8fafc] border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              टीम ऑपरेशन्स
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              हर कार्यकर्ता के लिए समर्पित इंटरफेस
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              प्रत्याशी, पन्ना प्रमुख और बूथ एजेंट — हर स्तर के लिए सही अधिकार और सरल मोबाइल इंटरफेस।
            </p>

            {/* Role Tabs */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-slate-300 shadow-sm">
              <button
                onClick={() => setActiveTab('warroom')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'warroom'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📊 मुख्य वॉर-रूम (Candidate)
              </button>
              <button
                onClick={() => setActiveTab('worker')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'worker'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📱 पन्ना प्रमुख ऐप (Ground)
              </button>
              <button
                onClick={() => setActiveTab('polling')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'polling'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🗳️ पोलिंग डेस्क (Slip Counter)
              </button>
            </div>
          </div>

          {/* Role Tab Content Previews */}
          <div className="light-card p-6 sm:p-10 border border-slate-200 shadow-xl">
            {activeTab === 'warroom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase">प्रत्याशी व मुख्य रणनीतिकार</span>
                  <h3 className="text-2xl font-black text-slate-900">संपूर्ण विधानसभा का 360° विहंगम दृश्य</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    वॉर-रूम डैशबोर्ड से लाइव देखें कि किस वार्ड में कितने वोटर्स से संपर्क हो चुका है, जातिगत समीकरण क्या कहते हैं, और कौन से बूथ पर जीत का मार्जिन बन रहा है।
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>बूथ-वार टर्नआउट व कमजोर बूथों की लाइव मॉनिटरिंग</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>प्रवासी मतदाताओं (Outstation Voters) की ट्रैकिंग</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>सुपर एडमिन कंसोल व डेटा प्राइवेसी सुरक्षा</span>
                    </li>
                  </ul>
                  <button onClick={() => setLeadModalOpen(true)} className="glow-btn px-6 py-3 rounded-xl text-xs font-bold text-white cursor-pointer mt-2">
                    वॉर-रूम एक्सेस डेमो
                  </button>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-700">वॉर-रूम लाइव मैट्रिक्स</div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[74%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>कुल संपर्क लक्ष्य: 74% पूर्ण</span>
                    <span className="text-emerald-700 font-bold">1,84,000 वोटर्स</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'worker' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase">ग्राउंड कार्यकर्ता व पन्ना प्रमुख</span>
                  <h3 className="text-2xl font-black text-slate-900">हर कार्यकर्ता की जेब में उसका पन्ना</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    पन्ना प्रमुख को सिर्फ उसके 30 से 60 मतदाताओं की लिस्ट दिखती है। वह मतदाता के घर जाकर 1-क्लिक में सपोर्टर, न्यूट्रल या विरोधी मार्क कर सकता है।
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>सरल हिंदी इंटरफेस — बिना ट्रेनिंग के तुरंत चालू</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>1-क्लिक में फोन कॉल व WhatsApp पर्ची डिस्पैच</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>ऑफलाइन मोड सपोर्ट — इंटरनेट न होने पर भी काम करे</span>
                    </li>
                  </ul>
                  <button onClick={() => setLeadModalOpen(true)} className="glow-btn px-6 py-3 rounded-xl text-xs font-bold text-white cursor-pointer mt-2">
                    कार्यकर्ता ऐप डेमो देखें
                  </button>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">पन्ना प्रमुख: मोहन लाल (पन्ना संख्या 14)</div>
                  <div className="text-slate-500">कुल वोटर: 45 • संपर्क हुआ: 38 (84%)</div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-800 font-bold">पक्ष: 31</div>
                    <div className="bg-amber-100 p-2 rounded-xl text-amber-800 font-bold">तटस्थ: 5</div>
                    <div className="bg-red-100 p-2 rounded-xl text-red-800 font-bold">विपक्ष: 2</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'polling' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-amber-700 uppercase">पोलिंग बूथ व पर्ची काउंटर</span>
                  <h3 className="text-2xl font-black text-slate-900">बूथ की मेज पर सुपरफास्ट पर्ची वितरण</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    मतदान केंद्र के बाहर बैठे कार्यकर्ता के पास आते ही मतदाता का नाम बोलते ही 0.2 सेकंड में क्रम संख्या मिल जाती है। कागजों में ढूंढने का झंझट हमेशा के लिए खत्म।
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>0.2 सेकंड में नाम व मकान नंबर से सर्च</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>मतदान करने वालों की 1-टैप मार्किंग (Voted)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check size={14} className="text-emerald-600 font-bold" />
                      <span>मोबाइल थर्मल प्रिंटर से डायरेक्ट पर्ची प्रिंटिंग</span>
                    </li>
                  </ul>
                  <button onClick={() => setLeadModalOpen(true)} className="glow-btn px-6 py-3 rounded-xl text-xs font-bold text-white cursor-pointer mt-2">
                    पोलिंग डेस्क डेमो देखें
                  </button>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                    <Search size={16} className="text-emerald-600" />
                    <span className="text-xs text-slate-700">खोजें: "रमेश शर्मा"</span>
                    <span className="text-[10px] text-emerald-700 ml-auto font-mono font-bold">0.18s</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 text-xs shadow-sm">
                    <div className="font-bold text-slate-900">रमेश चंद्र शर्मा • क्रम संख्या: 412</div>
                    <div className="text-[11px] text-slate-600">बूथ: 18 • कमरा नं: 2 • मकान: 124</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX: TRADITIONAL VS MATDATA PORTAL */}
      <section id="comparison" className="py-20 relative bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              तुलनात्मक विश्लेषण
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              पुराना कागजी तरीका बनाम Matdata Portal
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              देखें कि आधुनिक टेक्नोलॉजी कैसे लाखों रुपये और अनगिनत घंटों की बर्बादी रोकती है।
            </p>
          </div>

          <div className="light-card overflow-hidden border border-slate-200 shadow-xl">
            <div className="grid grid-cols-12 bg-slate-50 p-4 sm:p-6 border-b border-slate-200 text-xs sm:text-sm font-bold">
              <div className="col-span-4 text-slate-600">मापदंड / फीचर</div>
              <div className="col-span-4 text-red-600 text-center">पुराना कागजी तरीका ❌</div>
              <div className="col-span-4 text-emerald-700 text-center">Matdata Portal 🚀</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                <div className="col-span-4 text-slate-900 font-semibold">वोटर खोजने की गति</div>
                <div className="col-span-4 text-slate-500 text-center">2 से 5 मिनट (पन्ने पलटना)</div>
                <div className="col-span-4 text-emerald-700 font-bold text-center">0.2 सेकंड (तुरंत रिजल्ट)</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center bg-slate-50/50">
                <div className="col-span-4 text-slate-900 font-semibold">पर्ची वितरण व ब्रांडिंग</div>
                <div className="col-span-4 text-slate-500 text-center">कागजी पर्ची (फेंक दी जाती है)</div>
                <div className="col-span-4 text-emerald-700 font-bold text-center">फोटो व सिंबल सहित WhatsApp</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                <div className="col-span-4 text-slate-900 font-semibold">मतदान दिवस टर्नआउट</div>
                <div className="col-span-4 text-slate-500 text-center">अंधेरे में तीर (शाम को पता चले)</div>
                <div className="col-span-4 text-emerald-700 font-bold text-center">हर घंटे लाइव बूथ-वार ट्रैकिंग</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center bg-slate-50/50">
                <div className="col-span-4 text-slate-900 font-semibold">कार्यकर्ता नियंत्रण</div>
                <div className="col-span-4 text-slate-500 text-center">कोई ट्रैकिंग नहीं</div>
                <div className="col-span-4 text-emerald-700 font-bold text-center">पन्ना प्रमुख GPS व रिपोर्टिंग</div>
              </div>

              <div className="grid grid-cols-12 p-4 sm:p-5 items-center">
                <div className="col-span-4 text-slate-900 font-semibold">खर्च व बचत</div>
                <div className="col-span-4 text-slate-500 text-center">लाखों रुपये प्रिंटिंग में बर्बाद</div>
                <div className="col-span-4 text-emerald-700 font-bold text-center">80% तक लागत में बचत</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & ELECTION PACKAGES */}
      <section id="plans" className="py-20 relative bg-[#f8fafc] border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              पारदर्शी चुनावी पैकेजेस
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              अपने चुनाव स्तर के अनुसार चुनें
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              पार्षद, ब्लॉक, विधानसभा से लेकर लोकसभा तक — हर स्तर के लिए कस्टमाइज्ड समाधान।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Ward */}
            <div className="light-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold">वार्ड / नगर पालिका / पार्षद</span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 mb-3">वार्ड पैकेज</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  1 से 3 वार्डों के प्रत्याशियों के लिए सटीक और बजट-अनुकूल समाधान।
                </p>
                <div className="space-y-3 text-xs text-slate-700 mb-8 font-medium">
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>अप टू 15,000 वोटर्स क्षमता</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>त्वरित मतदाता पर्ची सर्च व डाउनलोड</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>WhatsApp पर्ची शेयरिंग सपोर्ट</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>10 कार्यकर्ता / बूथ एजेंट्स लॉगिन</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>मतदान दिवस बूथ मार्किंग</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setLeadForm({ ...leadForm, electionType: 'वार्ड / पार्षद (Ward)' });
                  setLeadModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all cursor-pointer shadow-sm"
              >
                इस प्लान के लिए संपर्क करें
              </button>
            </div>

            {/* Plan 2: Assembly (Featured) */}
            <div className="light-card p-6 sm:p-8 flex flex-col justify-between relative border-2 border-emerald-500 shadow-2xl md:scale-105 bg-white">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-extrabold text-[11px] px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                सर्वाधिक अनुशंसित (MOST POPULAR)
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold">विधानसभा निर्वाचन क्षेत्र</span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 mb-3">विधानसभा वॉर-रूम प्रो</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  संपूर्ण विधानसभा सीट (1.5L - 3.5L मतदाता) का संपूर्ण डिजिटल प्रबंधन व वॉर रूम।
                </p>
                <div className="space-y-3 text-xs text-slate-800 mb-8 font-medium">
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span className="font-bold text-slate-900">असीमित मतदाता (पूरी विधानसभा)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>आधिकारिक Meta Cloud WhatsApp API इंजन</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>घंटेवार लाइव पोलिंग टर्नआउट व वॉर रूम डैशबोर्ड</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>जातिगत व सामाजिक समीकरण विश्लेषण</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>पन्ना प्रमुख व 250+ बूथ एजेंट्स प्रबंधन</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>प्रवासी मतदाता कॉलिंग व परिवहन मॉड्यूल</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>24x7 डेडीकेटेड टेक्निकल टीम सपोर्ट</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setLeadForm({ ...leadForm, electionType: 'विधानसभा (Assembly)' });
                  setLeadModalOpen(true);
                }}
                className="w-full glow-btn py-4 rounded-xl font-bold text-sm text-white cursor-pointer shadow-md"
              >
                विधानसभा डेमो व कोटेशन लें
              </button>
            </div>

            {/* Plan 3: Lok Sabha */}
            <div className="light-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold">संसदीय सीट / पॉलिटिकल कंसल्टेंसी</span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 mb-3">लोकसभा / एंटरप्राइज</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  लोकसभा सांसद प्रत्याशियों और चुनावी एजेंसियों के लिए मल्टी-विधानसभा कस्टम सॉल्यूशन।
                </p>
                <div className="space-y-3 text-xs text-slate-700 mb-8 font-medium">
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>मल्टी-विधानसभा (15 लाख से 25 लाख वोटर्स)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>कस्टम डोमेन व पूर्ण व्हाइट-लेबल ब्रांडिंग</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>सेंट्रल वॉर-रूम + 8 विधानसभा सब-वॉर रूम्स</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>ऑन-साइट टेक्निकल एक्सपर्ट डिप्लॉयमेंट</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600 font-bold" />
                    <span>कस्टम AI सर्वे व ओपिनियन पोलिंग</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setLeadForm({ ...leadForm, electionType: 'लोकसभा (Lok Sabha)' });
                  setLeadModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all cursor-pointer shadow-sm"
              >
                एंटरप्राइज डेमो के लिए संपर्क करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="faq" className="py-20 relative bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              सामान्य प्रश्न
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-4">
              अक्सर पूछे जाने वाले सवाल (FAQ)
            </h2>
            <p className="text-base text-slate-600">
              सॉफ्टवेयर, डेटा अपलोड और WhatsApp पर्ची से जुड़े सभी प्रमुख प्रश्नों के उत्तर।
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-emerald-600 shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* OFFICIAL LIVE REDIRECT CARD */}
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-700">
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
                <Globe size={28} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-[10.5px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  आधिकारिक लाइव वेब पोर्टल • Official Website
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Matdata Portal आधिकारिक वेबसाइट
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  डिजिटल वोटर पर्ची, वॉर रूम व कैंपेन कंसोल के लिए सीधे आधिकारिक पोर्टल पर जाएं।
                </p>
              </div>
            </div>
            <a
              href="https://matdataportal.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn px-7 py-4 rounded-2xl font-black text-sm text-white flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <span>वेबसाइट पर जाएं</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo.png"
                  alt="Matdata Portal Logo"
                  className="w-12 h-12 object-contain rounded-xl bg-white p-1"
                />
                <div>
                  <div className="text-2xl font-black tracking-tight text-white">
                    Matdata<span className="text-emerald-400">Portal</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">राजनीतिक चुनाव प्रबंधन व डिजिटल वॉर रूम</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                भारत का अग्रणी राजनीतिक चुनाव सॉफ्टवेयर। मतदाता खोज, WhatsApp पर्ची, 
                पन्ना प्रमुख ट्रैकिंग और पोलिंग टर्नआउट का संपूर्ण डिजिटल समाधान।
              </p>
            </div>

            <div>
              <div className="font-bold text-sm text-white mb-3">त्वरित लिंक्स</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#features" className="hover:text-emerald-400">सुविधाएं (Features)</a></li>
                <li><a href="#simulator" className="hover:text-emerald-400">लाइव पर्ची डेमो</a></li>
                <li><a href="#warroom-preview" className="hover:text-emerald-400">वॉर-रूम डैशबोर्ड</a></li>
                <li><a href="#plans" className="hover:text-emerald-400">पैकेजेस (Pricing)</a></li>
                <li><a href="#faq" className="hover:text-emerald-400">FAQ</a></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-sm text-white mb-3">संपर्क व सहायता</div>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="text-sm font-bold text-white">Matdata Portal Desk</div>
                <div>
                  <a
                    href={getWaLink('नमस्ते, मुझे Matdata Portal सॉफ्टवेयर डेमो के लिए संपर्क करना है।')}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 font-bold flex items-center gap-1.5 text-emerald-400"
                  >
                    <MessageCircle size={14} className="text-emerald-400" />
                    <span>WhatsApp: {DISPLAY_PHONE}</span>
                  </a>
                </div>
                <div>
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Phone size={14} className="text-emerald-400" />
                    <span>कॉल: {DISPLAY_PHONE}</span>
                  </a>
                </div>
                <div className="text-emerald-400 font-medium">🇮🇳 मेड इन इंडिया • भारतीय चुनावों के लिए समर्पित</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              © 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित।
            </div>
            <div className="flex space-x-4">
              <a href="https://matdataportal.vercel.app" className="hover:text-emerald-400 font-semibold">वेबसाइट</a>
              <a href="/privacy" className="hover:text-slate-300">गोपनीयता नीति (Privacy Policy)</a>
              <a href="/terms" className="hover:text-slate-300">नियम व शर्तें (Terms)</a>
              <a href="/child-safety" className="hover:text-slate-300">बाल सुरक्षा मानक (Child Safety)</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP CTA BUTTON */}
      <a
        href={getWaLink('नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम और वोटर पर्ची का लाइव डेमो चाहिए।')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 wa-btn px-4 py-3 rounded-full shadow-2xl transition-transform hover:scale-105 cursor-pointer font-bold text-xs sm:text-sm"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle size={20} />
        <span className="hidden sm:inline">WhatsApp पर बात करें ({DISPLAY_PHONE})</span>
      </a>

      {/* LEAD CAPTURE MODAL - LIGHT THEME */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <X size={20} />
            </button>

            {leadSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-black text-slate-900">धन्यवाद! अनुरोध प्राप्त हुआ</h3>
                <p className="text-xs text-slate-600 font-medium">
                  आपकी पूछताछ दर्ज हो गई है। हमारी टीम WhatsApp पर आपसे तुरंत संपर्क करेगी।
                </p>
                <div className="pt-2">
                  <a
                    href={getWaLink(`नमस्ते, मैंने वेबसाइट पर डेमो फॉर्म भरा है। नाम: ${leadForm.name}, क्षेत्र: ${leadForm.constituency}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 wa-btn text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp पर डायरेक्ट बात करें</span>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-start space-x-3.5">
                  <img
                    src="/logo.png"
                    alt="Matdata Portal"
                    className="w-12 h-12 object-contain rounded-2xl p-1 bg-emerald-50 border border-emerald-200 shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      मुफ़्त लाइव डेमो • VIP एक्सेस
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-2">
                      अपने क्षेत्र का चुनाव वॉर-रूम देखें
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      नीचे विवरण भरें, हमारी टीम आपको तुरंत लाइव डेमो व सटीक कोटेशन प्रदान करेगी।
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      आपका नाम / प्रत्याशी का नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राजेश चौधरी"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      मोबाइल नंबर (WhatsApp सक्रिय) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10 अंकों का मोबाइल नंबर"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      विधानसभा क्षेत्र / वार्ड / नगर का नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. हवामहल, जयपुर या वार्ड नं. 14"
                      value={leadForm.constituency}
                      onChange={(e) => setLeadForm({ ...leadForm, constituency: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      चुनाव का स्तर (Election Type)
                    </label>
                    <select
                      value={leadForm.electionType}
                      onChange={(e) => setLeadForm({ ...leadForm, electionType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    >
                      <option value="विधानसभा (Assembly)">विधानसभा (Assembly Election)</option>
                      <option value="वार्ड / पार्षद (Ward)">वार्ड / पार्षद / नगर पालिका</option>
                      <option value="नगर निगम (Corporation / Mayor)">नगर निगम / महापौर</option>
                      <option value="लोकसभा (Parliamentary)">लोकसभा (Parliamentary Election)</option>
                      <option value="पंचायत / जिला परिषद">पंचायत / सरपंच / जिला परिषद</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full glow-btn py-3.5 rounded-xl font-bold text-sm text-white cursor-pointer flex items-center justify-center space-x-2 mt-4"
                  >
                    {leadSubmitting ? (
                      <span>भेज रहे हैं...</span>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>लाइव डेमो शुरू करें (Instant Access)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    🔒 आपका डेटा 100% गोपनीय व सुरक्षित है। कोई स्पैम नहीं।
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
