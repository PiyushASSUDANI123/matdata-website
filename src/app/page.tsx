'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Users,
  Activity,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Shield,
  X,
  Menu,
  ChevronDown,
  Layers,
  FileSpreadsheet,
  Lock,
  Database,
  ExternalLink,
  Sparkles,
  BarChart3,
  Clock,
  Send,
  UserCheck,
  MapPin,
  FileCheck,
  Check,
  SlidersHorizontal,
  Smartphone,
  Server,
  Zap,
  Globe,
  Award,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Building,
  Vote,
  QrCode,
  Share2,
  Printer,
  Compass,
} from 'lucide-react';

const DISPLAY_PHONE = '+91 98765 43210';
const WHATSAPP_NUMBER = '919876543210';

// Sample voters for live interactive search sandbox
const SAMPLE_VOTERS = [
  { id: '1', epic: 'RJ/14/082/001001', nameHi: 'रामनिवास शर्मा', nameEn: 'Ramniwas Sharma', relHi: 'राधेश्याम शर्मा', relType: 'पिता', age: 48, gender: 'पुरुष', ward: '1', booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1', house: '12', caste: 'ब्राह्मण', voted: true, phone: '98290XXXXX' },
  { id: '2', epic: 'RJ/14/082/001002', nameHi: 'सुनीता शर्मा', nameEn: 'Sunita Sharma', relHi: 'रामनिवास शर्मा', relType: 'पति', age: 44, gender: 'स्त्री', ward: '1', booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1', house: '12', caste: 'ब्राह्मण', voted: true, phone: '98290XXXXX' },
  { id: '3', epic: 'RJ/14/082/001015', nameHi: 'मुकेश विश्नोई', nameEn: 'Mukesh Bishnoi', relHi: 'हनुमानराम विश्नोई', relType: 'पिता', age: 32, gender: 'पुरुष', ward: '2', booth: 'सामुदायिक भवन, कक्ष 2', house: '15', caste: 'विश्नोई', voted: false, phone: '94140XXXXX' },
  { id: '4', epic: 'RJ/14/082/001016', nameHi: 'कविता विश्नोई', nameEn: 'Kavita Bishnoi', relHi: 'मुकेश विश्नोई', relType: 'पति', age: 29, gender: 'स्त्री', ward: '2', booth: 'सामुदायिक भवन, कक्ष 2', house: '15', caste: 'विश्नोई', voted: false, phone: '94140XXXXX' },
  { id: '5', epic: 'RJ/14/082/001024', nameHi: 'सुरेश कुमार जाट', nameEn: 'Suresh Kumar Jat', relHi: 'भंवरलाल जाट', relType: 'पिता', age: 38, gender: 'पुरुष', ward: '3', booth: 'पंचायत समिति सभागार, कक्ष 3', house: '31', caste: 'जाट', voted: true, phone: '97840XXXXX' },
  { id: '6', epic: 'RJ/14/082/001025', nameHi: 'मंजू चौधरी', nameEn: 'Manju Choudhary', relHi: 'सुरेश कुमार जाट', relType: 'पति', age: 35, gender: 'स्त्री', ward: '3', booth: 'पंचायत समिति सभागार, कक्ष 3', house: '31', caste: 'जाट', voted: false, phone: '97840XXXXX' },
  { id: '7', epic: 'RJ/14/082/001032', nameHi: 'अशोक सिंह शेखावत', nameEn: 'Ashok Singh Shekhawat', relHi: 'डूंगर सिंह', relType: 'पिता', age: 42, gender: 'पुरुष', ward: '4', booth: 'राजकीय प्राथमिक विद्यालय, कक्ष 1', house: '45', caste: 'राजपूत', voted: false, phone: '99280XXXXX' },
  { id: '8', epic: 'RJ/14/082/001045', nameHi: 'किशनलाल मेघवाल', nameEn: 'Kishanlal Meghwal', relHi: 'मोहनराम मेघवाल', relType: 'पिता', age: 55, gender: 'पुरुष', ward: '5', booth: 'गांधी बाल मंदिर, कक्ष 2', house: '62', caste: 'मेघवाल', voted: true, phone: '96100XXXXX' },
  { id: '9', epic: 'RJ/14/082/001058', nameHi: 'प्रकाश प्रजापत', nameEn: 'Prakash Prajapat', relHi: 'बाबूलाल प्रजापत', relType: 'पिता', age: 26, gender: 'पुरुष', ward: '6', booth: 'नगर पालिका वाचनालय', house: '78', caste: 'प्रजापत', voted: false, phone: '91660XXXXX' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  // Workspace Demo Tab: 'slip' | 'turnout' | 'workers' | 'demographics'
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'slip' | 'turnout' | 'workers' | 'demographics'>('slip');
  const [slipSending, setSlipSending] = useState(false);
  const [slipSentState, setSlipSentState] = useState(false);
  
  // Role switcher tab: 'candidate' | 'manager' | 'worker'
  const [activeRoleTab, setActiveRoleTab] = useState<'candidate' | 'manager' | 'worker'>('candidate');

  // Interactive Live Search Sandbox
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<typeof SAMPLE_VOTERS[0]>(SAMPLE_VOTERS[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    constituency: '',
    electionType: 'विधानसभा (Assembly)',
    notes: ''
  });

  const filteredVoters = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_VOTERS.slice(0, 4);
    const q = searchQuery.toLowerCase().trim();
    return SAMPLE_VOTERS.filter(v => 
      v.nameHi.includes(q) || 
      v.nameEn.toLowerCase().includes(q) || 
      v.epic.toLowerCase().includes(q) || 
      v.relHi.includes(q) ||
      v.caste.includes(q) ||
      v.ward === q
    );
  }, [searchQuery]);

  const getWaLink = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    try {
      const targets = [
        'http://localhost:5003/api/admin/leads',
        'https://matdataportal.vercel.app/api/admin/leads',
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
    } catch {}
    setLeadSubmitting(false);
    setLeadSubmitted(true);
  };

  const handleSimulateSlipSend = () => {
    setSlipSending(true);
    setTimeout(() => {
      setSlipSending(false);
      setSlipSentState(true);
      setTimeout(() => setSlipSentState(false), 4000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#09090b] flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 text-center font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="bg-blue-600/90 text-white font-bold px-2 py-0.5 rounded text-[9px] tracking-wide uppercase">
            2026 ECI अनुपालन
          </span>
          <span className="text-slate-300">
            चुनाव आयोग डिजिटल मतदाता पर्ची दिशा-निर्देशों एवं DPDP Act 2023 के पूर्णतः अनुरूप तैयार।
          </span>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="text-blue-400 hover:text-blue-300 font-bold underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>लाइव वॉर-रूम डेमो बुक करें</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* 2. CRISP EXECUTIVE FULL-WIDTH NAVBAR */}
      <header className="site-header-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.svg"
              alt="Matdata Portal"
              className="w-8 h-8 object-contain rounded-lg transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-lg font-black tracking-tight text-slate-900 leading-none">
                  Matdata<span className="text-blue-600">Portal</span>
                </span>
                <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                  v2.6
                </span>
              </div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                भारतीय चुनाव वॉर-रूम प्रणाली
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">उत्पाद क्षमताएं</a>
            <a href="#warroom" className="hover:text-slate-900 transition-colors">वॉर-रूम सिस्टम</a>
            <a href="#sandbox" className="hover:text-slate-900 transition-colors">लाइव सैंडबॉक्स</a>
            <a href="#workflow" className="hover:text-slate-900 transition-colors">कार्यप्रणाली</a>
            <a href="#comparison" className="hover:text-slate-900 transition-colors">कागज़ी बनाम डिजिटल</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">पैकेज</a>
            <a href="#compliance" className="hover:text-slate-900 transition-colors">कानूनी सुरक्षा</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://matdataportal.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <span>कंसोल लॉगिन</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
            <button
              onClick={() => setLeadModalOpen(true)}
              className="btn-primary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Zap size={13} className="text-amber-400" />
              <span>लाइव डेमो शेड्यूल करें</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pb-3 border-b border-slate-100">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">उत्पाद क्षमताएं</a>
              <a href="#warroom" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">वॉर-रूम सिस्टम</a>
              <a href="#sandbox" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">लाइव सैंडबॉक्स</a>
              <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">कार्यप्रणाली</a>
              <a href="#comparison" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">कागज़ी बनाम डिजिटल</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">पैकेज एवं दरें</a>
              <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-blue-600">कानूनी सुरक्षा</a>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => { setMobileMenuOpen(false); setLeadModalOpen(true); }}
                className="w-full btn-primary py-2.5 rounded-xl text-xs font-bold text-center"
              >
                लाइव डेमो शेड्यूल करें
              </button>
              <a
                href="https://matdataportal.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="w-full btn-secondary py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <span>कंसोल लॉगिन</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. EXECUTIVE HERO SECTION */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-minimal-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>भारत का आधुनिक चुनावी वॉर-रूम व प्रबंधन प्लेटफॉर्म</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              हर बूथ, हर पन्ना, हर मतदाता — <br />
              <span className="text-slate-900 font-black">
                अब आपकी उंगलियों पर।
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              चुनाव आयोग (ECI) की मुद्रित व स्कैन की गई PDF से 15 मिनट में सम्पूर्ण डिजिटल डेटाबेस। आधिकारिक Meta WhatsApp 1-सेकंड डिजिटल पर्ची, पन्ना प्रमुख लाइव ट्रैकिंग और चुनाव दिवस का रियल-टाइम टर्नआउट वॉर-रूम।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full sm:w-auto btn-primary px-7 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap size={14} className="text-amber-400" />
                <span>निःशुल्क लाइव डेमो शुरू करें</span>
                <ArrowRight size={14} />
              </button>
              <a
                href={getWaLink('नमस्ते Matdata Portal टीम, मुझे अपनी विधानसभा के लिए चुनाव वॉर-रूम का लाइव डेमो चाहिए।')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto btn-secondary px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                <span>WhatsApp पर ब्रोशर प्राप्त करें</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-blue-600" /> 100% Zero-Block Meta Official API</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-blue-600" /> 0.1s त्वरित मतदाता खोज</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-blue-600" /> भारत में होस्टेड डेटा व DPDP Act सुरक्षा</span>
            </div>
          </div>

          {/* 4. REALISTIC WAR-ROOM COMMAND CENTER PREVIEW (HERO MOCKUP) */}
          <div id="warroom" className="mt-12 browser-mockup">
            {/* Window Header */}
            <div className="browser-header">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              </div>
              <div className="bg-white border border-slate-200 rounded-md px-3 py-0.5 text-[11px] text-slate-500 font-mono flex items-center gap-2 shadow-2xs">
                <Lock size={10} className="text-emerald-600" />
                <span>https://console.matdataportal.app/war-room/ac-14-hawa-mahal</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>लाइव वॉर-रूम सक्रिय</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 sm:p-6 bg-white">
              {/* Segmented Workspace Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveWorkspaceTab('slip')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeWorkspaceTab === 'slip' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    1-क्लिक डिजिटल पर्ची
                  </button>
                  <button
                    onClick={() => setActiveWorkspaceTab('turnout')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeWorkspaceTab === 'turnout' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    लाइव टर्नआउट ट्रैकर
                  </button>
                  <button
                    onClick={() => setActiveWorkspaceTab('workers')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeWorkspaceTab === 'workers' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    पन्ना प्रमुख ग्राउंड कमांड
                  </button>
                  <button
                    onClick={() => setActiveWorkspaceTab('demographics')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeWorkspaceTab === 'demographics' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    जनसांख्यिकी समीकरण
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  सक्रिय क्षेत्र: <strong className="text-slate-800">हवामहल विधानसभा (क्षेत्र 14) &bull; कुल मतदाता: 2,48,920</strong>
                </div>
              </div>

              {/* TAB 1: 1-CLICK VOTER SLIP WITH WHATSAPP SIMULATOR */}
              {activeWorkspaceTab === 'slip' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-3.5">
                    <span className="badge-minimal badge-blue">आधिकारिक मतदाता सूचना पर्ची प्रेषण</span>
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      मतदाता के मोबाइल पर 1 सेकंड में उसकी पूरी मतदान जानकारी।
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      बूथ संख्या, क्रम संख्या, भाग संख्या, मतदान कक्ष का नाम और सीधे गूगल मैप्स लोकेशन। मतदाता को बिना किसी कतार और परेशानी के पता रहता है कि उसे कहाँ वोट डालने जाना है।
                    </p>

                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between font-bold text-slate-900 pb-1.5 border-b border-slate-200">
                        <span>सिस्टम निष्पादन पैरामीटर</span>
                        <span className="text-emerald-700 font-mono">Meta Verified Enterprise API</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">डिलीवरी गति:</span>
                        <span className="font-semibold text-slate-900 font-mono">0.8 सेकंड / संदेश</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">सफलता दर:</span>
                        <span className="font-semibold text-emerald-700 font-mono">99.78% सत्यापित डिलीवरी</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ECI आदर्श आचार संहिता:</span>
                        <span className="font-semibold text-blue-700">100% अनुपालन (कोई अवैध प्रचार नहीं)</span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-3">
                      <button
                        onClick={handleSimulateSlipSend}
                        disabled={slipSending}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                          slipSentState
                            ? 'bg-emerald-600 text-white'
                            : 'btn-primary'
                        }`}
                      >
                        {slipSending ? (
                          <>
                            <Activity size={14} className="animate-spin text-amber-400" />
                            <span>Meta Cloud API द्वारा प्रेषित किया जा रहा है...</span>
                          </>
                        ) : slipSentState ? (
                          <>
                            <CheckCircle2 size={15} />
                            <span>WhatsApp पर सफलतापूर्वक भेजा गया (0.8s)</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>डेमो पर्ची भेजकर देखें (Test Send)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* HIGH-FIDELITY VOTER SLIP CARD */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-xs bg-white border border-slate-300 rounded-xl shadow-md p-4 relative">
                      {/* Tricolor top header */}
                      <div className="h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-600 -mx-4 -mt-4 mb-3" />
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div>
                          <div className="text-[9px] uppercase font-bold text-slate-400">विधानसभा चुनाव 2026</div>
                          <div className="text-xs font-black text-slate-900">डिजिटल मतदाता सूचना पर्ची</div>
                        </div>
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                          क्रमांक #12
                        </span>
                      </div>

                      <div className="py-3 space-y-1.5 text-[11px]">
                        <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                          <span className="text-slate-500">मतदाता का नाम:</span>
                          <span className="font-bold text-slate-900">रामनिवास शर्मा</span>
                        </div>
                        <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                          <span className="text-slate-500">पिता/पति:</span>
                          <span className="font-semibold text-slate-800">राधेश्याम शर्मा</span>
                        </div>
                        <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                          <span className="text-slate-500">पहचान पत्र (EPIC):</span>
                          <span className="font-mono font-bold text-blue-700">RJ/14/082/001001</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-dashed border-slate-200 pb-1">
                          <div>
                            <span className="text-slate-500 block text-[10px]">भाग / वार्ड:</span>
                            <span className="font-bold text-slate-900">भाग 14 (वार्ड 1)</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">मकान संख्या:</span>
                            <span className="font-bold text-slate-900">#12</span>
                          </div>
                        </div>
                        <div className="pt-0.5">
                          <span className="text-slate-500 block text-[10px]">मतदान केंद्र (Poling Station):</span>
                          <span className="font-bold text-slate-900 block mt-0.5 text-[10px] leading-tight">
                            राजकीय उच्च माध्यमिक विद्यालय, कक्ष क्र. 1 (हवामहल)
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-2 text-[10px] text-slate-600 flex justify-between border border-slate-200 mt-1">
                        <span>मतदान समय: प्रातः 7:00 से सायं 6:00</span>
                        <span className="font-bold text-emerald-700">वोट अवश्य डालें</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE TURNOUT WAR-ROOM */}
              {activeWorkspaceTab === 'turnout' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">मतदान दिवस: लाइव टर्नआउट मॉनिटर</h4>
                      <p className="text-[11px] text-slate-500">बूथ स्तर पर वोटिंग प्रतिशत, शेष वोटर्स और अलर्ट ट्रैकिंग</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
                      औसत टर्नआउट: 68.42% (समय: 3:30 PM)
                    </span>
                  </div>

                  {/* 4 Metric Boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">कुल पंजीकृत मतदाता</div>
                      <div className="text-xl font-black text-slate-900 mt-1">2,48,920</div>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <div className="text-[10px] text-emerald-800 uppercase font-bold">मतदान संपन्न (Voted)</div>
                      <div className="text-xl font-black text-emerald-700 mt-1">1,70,311</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <div className="text-[10px] text-amber-800 uppercase font-bold">शेष मतदाता (Pending)</div>
                      <div className="text-xl font-black text-amber-700 mt-1">78,609</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <div className="text-[10px] text-blue-800 uppercase font-bold">सक्रिय बूथ एजेंट</div>
                      <div className="text-xl font-black text-blue-700 mt-1">214 / 214</div>
                    </div>
                  </div>

                  {/* Hourly turnout trend bar */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>घंटे-दर-घंटे मतदान प्रगति (Hourly Trend)</span>
                      <span className="text-blue-700 font-mono">+12.4% पिछले 2 घंटों में</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                      <div>
                        <div className="text-slate-500 mb-1">9 AM</div>
                        <div className="font-bold text-slate-900 bg-white border border-slate-200 py-1 rounded">14.2%</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">11 AM</div>
                        <div className="font-bold text-slate-900 bg-white border border-slate-200 py-1 rounded">28.6%</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">1 PM</div>
                        <div className="font-bold text-slate-900 bg-white border border-slate-200 py-1 rounded">42.1%</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">3 PM</div>
                        <div className="font-bold text-slate-900 bg-white border border-slate-200 py-1 rounded">56.0%</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">5 PM (अनुमान)</div>
                        <div className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 rounded">72.5%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PANNA PRAMUKH ROSTER */}
              {activeWorkspaceTab === 'workers' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-900">पन्ना प्रमुख एवं कार्यकर्ता लाइव समन्वय</h4>
                    <span className="text-[11px] text-slate-500">184 पन्ना प्रमुख फील्ड में सक्रिय</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'राकेश चौधरी', ward: 'वार्ड 1 (पन्ना 1-4)', done: '154 / 180 संपर्क पूर्ण', pct: 85, alert: false },
                      { name: 'विकास शर्मा', ward: 'वार्ड 2 (पन्ना 5-8)', done: '162 / 175 संपर्क पूर्ण', pct: 92, alert: false },
                      { name: 'संजय विश्नोई', ward: 'वार्ड 3 (पन्ना 9-12)', done: '98 / 190 संपर्क (धीमा)', pct: 51, alert: true },
                    ].map((w, i) => (
                      <div key={i} className={`p-3 rounded-xl border space-y-1.5 ${w.alert ? 'bg-amber-50/50 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex justify-between text-xs font-bold text-slate-900">
                          <span>{w.name}</span>
                          <span className={w.alert ? 'text-amber-800' : 'text-blue-700'}>{w.pct}%</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{w.ward}</div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${w.alert ? 'bg-amber-500' : 'bg-blue-600'}`} style={{ width: `${w.pct}%` }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-semibold text-slate-700">{w.done}</span>
                          {w.alert && <span className="text-amber-700 font-bold">मदद टीम भेजी गई</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: DEMOGRAPHICS */}
              {activeWorkspaceTab === 'demographics' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">जनसांख्यिकी एवं आयु-वार विश्लेषण</h4>
                      <p className="text-[11px] text-slate-500">बूथ स्तर पर युवा, वरिष्ठ एवं महिला मतदाताओं का सटीक अनुपात</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">18-25 वर्ष (प्रथम मतदाता)</div>
                      <div className="text-lg font-black text-slate-900 mt-1">44,805 (18%)</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">WhatsApp प्राथमिकता</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">26-40 वर्ष (युवा कार्यबल)</div>
                      <div className="text-lg font-black text-slate-900 mt-1">94,589 (38%)</div>
                      <div className="text-[10px] text-blue-600 font-semibold mt-0.5">रोजगार व विकास फोकस</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">41-60 वर्ष (पारिवारिक कोर)</div>
                      <div className="text-lg font-black text-slate-900 mt-1">77,165 (31%)</div>
                      <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">घर-घर संपर्क फोकस</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">60+ वर्ष (वरिष्ठ नागरिक)</div>
                      <div className="text-lg font-black text-slate-900 mt-1">32,361 (13%)</div>
                      <div className="text-[10px] text-purple-600 font-semibold mt-0.5">सवारी व सहायता सुविधा</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE CAMPAIGN IMPACT METRIC STRIP */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="px-3">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">0.1s</div>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">मतदाता खोज लेटेंसी (त्वरित रिज़ल्ट)</p>
            </div>
            <div className="px-3 pt-3 sm:pt-0">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">15 Min</div>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">ECI PDF से सम्पूर्ण डिजिटल DB</p>
            </div>
            <div className="px-3 pt-3 sm:pt-0">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">99.8%</div>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">भारतीय लिपियों में OCR सटीकता</p>
            </div>
            <div className="px-3 pt-3 sm:pt-0">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">0% Ban</div>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">आधिकारिक Meta Cloud API गारंटी</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIVE INTERACTIVE SEARCH & SLIP SANDBOX */}
      <section id="sandbox" className="py-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="badge-minimal badge-blue">लाइव सैंडबॉक्स • स्वयं चलाकर देखें</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              मतदाता खोज एवं पर्ची जनरेशन
            </h2>
            <p className="text-xs text-slate-600">
              नीचे सर्च में कोई भी नाम या EPIC संख्या लिखें। देखें कि कार्यकर्ता फील्ड में सेकंडों में मतदाता पर्ची कैसे निकालते हैं।
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative mb-5">
              <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="मतदाता का नाम, EPIC या जाति लिखें (उदा. रामनिवास, शर्मा, विश्नोई, जाट, RJ/14)..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              {/* Voter list */}
              <div className="sm:col-span-7 space-y-2">
                {filteredVoters.map((voter) => (
                  <div
                    key={voter.id}
                    onClick={() => setSelectedVoter(voter)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedVoter.id === voter.id
                        ? 'bg-blue-50/70 border-blue-500 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          {voter.nameHi} <span className="text-[10px] text-slate-500">({voter.nameEn})</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {voter.relType}: {voter.relHi} &bull; आयु: {voter.age} वर्ष &bull; लिंग: {voter.gender}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-blue-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {voter.epic}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[10px] text-slate-500 mt-1.5">
                      <span>वार्ड {voter.ward}</span>
                      <span>&bull;</span>
                      <span>मकान #{voter.house}</span>
                      <span>&bull;</span>
                      <span className="font-medium text-slate-700">{voter.caste}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Voter Slip */}
              <div className="sm:col-span-5">
                <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm space-y-3 sticky top-20">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">लाइव पर्ची प्रीव्यू</span>
                    <span className="text-[10px] font-bold text-blue-700">वार्ड {selectedVoter.ward}</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div className="text-[10px] text-slate-500">मतदाता का नाम</div>
                      <div className="font-bold text-slate-900 text-sm">{selectedVoter.nameHi}</div>
                      <div className="text-[11px] text-slate-600">{selectedVoter.relType}: {selectedVoter.relHi}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-500 block">पहचान पत्र (EPIC)</span>
                        <span className="font-mono font-bold text-blue-700">{selectedVoter.epic}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-500 block">मकान / आयु</span>
                        <span className="font-bold text-slate-800">#{selectedVoter.house} / {selectedVoter.age} वर्ष</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-[10px]">
                      <span className="text-slate-500 block">मतदान केंद्र</span>
                      <span className="font-semibold text-slate-900 block mt-0.5">{selectedVoter.booth}</span>
                    </div>
                  </div>

                  <a
                    href={getWaLink(`नमस्ते ${selectedVoter.nameHi} जी, आपकी मतदान पर्ची: पहचान पत्र: ${selectedVoter.epic}, मतदान केंद्र: ${selectedVoter.booth}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full btn-whatsapp py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp पर भेजें</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE 6 ARCHITECTURAL PILLARS (BENTO GRID) */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-14">
            <span className="badge-minimal badge-blue">सिस्टम क्षमताएं • Core Architecture</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              आधुनिक चुनाव प्रबंधन के 6 मजबूत आधार
            </h2>
            <p className="text-xs text-slate-600">
              पारंपरिक कागज़ी चुनाव के दौर से निकलकर हाई-टेक डिजिटल वार-रूम तक का संपूर्ण समाधान।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1 */}
            <div className="minimal-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Database size={20} />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">AI ऑप्टिकल वोटर पार्सिंग (OCR)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ECI की मुद्रित और धुंधली स्कैन की गई PDF फाइलों से 99.8% सटीकता के साथ संपूर्ण डिजिटल डेटाबेस, मकान नंबर, आयु और परिवार समूह तैयार करना।
              </p>
            </div>

            {/* 2 */}
            <div className="minimal-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Smartphone size={20} />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">Meta Official WhatsApp Cloud API</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                बिना किसी नंबर बैन के डर के अधिकृत Meta Cloud API द्वारा मतदाता सूचना पर्चियां, प्रत्याशी संदेश और मतदान केंद्र मैप्स 1 सेकंड में भेजना।
              </p>
            </div>

            {/* 3 */}
            <div className="minimal-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <UserCheck size={20} />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">पन्ना प्रमुख माइक्रो-कमांड ऐप</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                हर कार्यकर्ता को केवल उसके पन्ने (30 वोटर) का मोबाइल डेटा। कोर समर्थक, स्विंग वोटर, प्रवासी और बुजुर्ग मतदाताओं का 1-टच वर्गीकरण।
              </p>
            </div>

            {/* 4 */}
            <div className="minimal-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">चुनाव दिवस लाइव टर्नआउट वॉर-रूम</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                मतदान केंद्र पर बस्ता ऑपरेटर द्वारा वोट दर्ज करते ही वॉर-रूम में लाइव टर्नआउट अपडेट। 3 बजे के बाद शेष मतदाताओं की प्राथमिकता कॉल लिस्ट।
              </p>
            </div>

            {/* 5 */}
            <div className="minimal-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <Users size={20} />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">पारिवारिक व गृह समूहीकरण (Clustering)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                मकान संख्या के आधार पर एक ही परिवार के सभी सदस्यों को स्वतः पहचानना। घर के मुखिया को 1 ही WhatsApp मैसेज में पूरे परिवार की पर्ची प्रेषण।
              </p>
            </div>

            {/* 6 */}
            <div className="minimal-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Shield size={20} />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">त्रि-स्तरीय सुरक्षा व डेटा गोपनीयता</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                प्रत्याशी, चुनाव संचालक और बूथ कार्यकर्ता के अलग-अलग सुरक्षित अधिकार। भारत में संगृहीत डेटा (AWS Mumbai) व शून्य डेटा बिक्री गारंटी।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 4-STEP CAMPAIGN WORKFLOW */}
      <section id="workflow" className="py-16 bg-[#f8fafc] border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="badge-minimal badge-blue">कार्यप्रणाली • 4-Step Process</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              बूथ से जीत तक: 4 आसान चरण
            </h2>
            <p className="text-xs text-slate-600">
              हमारी तकनीकी टीम आपके साथ रहकर केवल 24 घंटों में आपका संपूर्ण वॉर-रूम सक्रिय कर देती है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-blue-600 font-mono">चरण 01</div>
              <h4 className="font-heading text-sm font-bold text-slate-900">ECI वोटर लिस्ट अपलोड</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                अपने विधानसभा या वार्ड की आधिकारिक PDF फाइलें हमें प्रदान करें या पोर्टल पर सीधे अपलोड करें।
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-blue-600 font-mono">चरण 02</div>
              <h4 className="font-heading text-sm font-bold text-slate-900">AI पार्सिंग एवं मैपिंग</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                हमारा OCR इंजन 15 मिनट में पूरी लिस्ट को सर्च करने योग्य डिजिटल डेटाबेस और परिवार समूहों में बदल देता है।
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-blue-600 font-mono">चरण 03</div>
              <h4 className="font-heading text-sm font-bold text-slate-900">कार्यकर्ता ऑनबोर्डिंग</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                प्रत्येक पन्ना प्रमुख और बूथ अध्यक्ष को उनके मोबाइल पर उनके वार्ड व पन्ने का सीमित, सुरक्षित लॉगिन दें।
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-blue-600 font-mono">चरण 04</div>
              <h4 className="font-heading text-sm font-bold text-slate-900">मतदान दिवस विजय कमांड</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                चुनाव के दिन 1-क्लिक WhatsApp पर्चियां भेजें और वॉर-रूम टीवी स्क्रीन पर हर घंटे का लाइव टर्नआउट ट्रैक करें।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SIDE-BY-SIDE COMPARISON MATRIX (TRADITIONAL VS DIGITAL) */}
      <section id="comparison" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="badge-minimal badge-blue">तुलनात्मक विश्लेषण</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              पारंपरिक कागज़ी पर्ची बनाम Matdata Portal
            </h2>
            <p className="text-xs text-slate-500">देखें कि क्यों आधुनिक चुनाव प्रत्याशी डिजिटल वॉर-रूम अपना रहे हैं</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="grid grid-cols-3 bg-slate-50 p-3.5 border-b border-slate-200 text-xs font-bold text-slate-800">
              <div>मापदंड (Feature)</div>
              <div className="text-slate-500">पारंपरिक कागज़ी पर्ची</div>
              <div className="text-blue-700">Matdata Portal डिजिटल वॉर-रूम</div>
            </div>
            <div className="divide-y divide-slate-100 text-xs text-slate-600">
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">वितरण गति</span>
                <span className="text-slate-500">3 से 5 दिन (घर-घर जाना)</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><Check size={13} /> 1 सेकंड में WhatsApp</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">छपाई व कागज़ खर्च</span>
                <span className="text-slate-500">₹50,000 - ₹90,000 मुद्रण खर्च</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><Check size={13} /> 0 कागज़, 100% डिजिटल बचत</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">पर्ची खोने का जोखिम</span>
                <span className="text-slate-500">अक्सर वोटर से खो जाती है</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><Check size={13} /> मोबाइल में हमेशा सुरक्षित</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">लाइव टर्नआउट ट्रैकिंग</span>
                <span className="text-slate-500">शाम 6 बजे तक कोई डेटा नहीं</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><Check size={13} /> प्रति घंटा बूथ-वार टर्नआउट %</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">धीमे बूथों पर एक्शन</span>
                <span className="text-slate-500">संभव नहीं, केवल अंदाज़ा</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><Check size={13} /> 3 PM अलर्ट व तुरंत कार्यकर्ता प्रेषण</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ROLE-SPECIFIC SOLUTION HUB */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="badge-minimal badge-blue">टेलर-मेड अनुभव</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              प्रत्येक चुनावी भूमिका के लिए विशेष कंसोल
            </h2>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-slate-200/80 p-1 rounded-xl gap-1">
              <button
                onClick={() => setActiveRoleTab('candidate')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeRoleTab === 'candidate' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                प्रत्याशी व वॉर-रूम (Candidate)
              </button>
              <button
                onClick={() => setActiveRoleTab('manager')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeRoleTab === 'manager' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                चुनाव संयोजक (Manager)
              </button>
              <button
                onClick={() => setActiveRoleTab('worker')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeRoleTab === 'worker' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                पन्ना प्रमुख (Booth Worker)
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            {activeRoleTab === 'candidate' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="badge-minimal badge-blue">सर्वोच्च कमान (High Command)</span>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    प्रत्याशी के लिए: एक स्क्रीन पर पूरी विधानसभा का वास्तविक नियंत्रण।
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    बड़ी टीवी स्क्रीन पर लाइव वॉर-रूम डैशबोर्ड। किस बूथ पर हम मजबूत हैं, कहाँ टर्नआउट धीमा है और किन मोहल्लों में आखिरी 2 घंटे में अतिरिक्त ऊर्जा लगानी है — सब कुछ लाइव।
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> लाइव टर्नआउट प्रतिशत व लीड एनालिसिस</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> संपूर्ण डेटा सुरक्षा व केवल आपके लिए मास्टर एडमिन राइट्स</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 1-क्लिक महत्वपूर्ण घोषणा संदेश ब्रॉडकास्ट</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">प्रत्याशी डैशबोर्ड मैट्रिक्स</div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">कुल लक्षित वोटर्स:</span>
                    <span className="font-bold text-slate-900">2,48,920</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">पहुंच (WhatsApp Delivered):</span>
                    <span className="font-bold text-emerald-700">1,94,210 (78%)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">जीत अनुमान अंतर:</span>
                    <span className="font-bold text-blue-700">+8,240 वोट सुरक्षित</span>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'manager' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="badge-minimal badge-emerald">समन्वय व प्रबंधन</span>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    चुनाव संचालक के लिए: बूथ एजेंटों और बस्तों का सटीक मैनेजमेंट।
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    प्रत्येक बूथ पर बस्ता ऑपरेटर की उपस्थिति, स्टेशनरी और मतदाताओं की कतार की स्थिति। धीमी गति वाले बूथों पर तत्काल बैकअप टीम का प्रेषण।
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 214 बूथों के प्रभारियों की लाइव उपस्थिति</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> मतदाता पर्ची वितरण की प्रगति मॉनिटरिंग</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> आकस्मिक विवाद या ईवीएम खराबी का तत्काल अलर्ट</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">बूथ ऑपरेशन रिपोर्ट</div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">सक्रिय बस्ता टेबल:</span>
                    <span className="font-bold text-slate-900">214 / 214 (100%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">औसत पर्ची प्रिंट/सेंड समय:</span>
                    <span className="font-bold text-emerald-700">0.9 सेकंड</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">अलर्ट समाधान दर:</span>
                    <span className="font-bold text-blue-700">96.4% तुरंत निस्तारित</span>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'worker' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="badge-minimal badge-amber">ग्राउंड सैनिक</span>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    पन्ना प्रमुख के लिए: जेब में 30 वोटर्स की पॉकेट गाइड।
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    कार्यकर्ता को पूरी विधानसभा की भारी सूची नहीं, केवल उसके 30 मतदाताओं का हल्का मोबाइल पेज मिलता है। एक क्लिक में कॉल, एक क्लिक में WhatsApp पर्ची और एक क्लिक में वोट मार्क।
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 2G/धीमे इंटरनेट पर भी सुपर-फास्ट स्पीड</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> वोट पड़ते ही हरा टिक — डुप्लीकेट कॉल की कोई झंझट नहीं</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> परिवार के मुखिया के नाम से सीधा संपर्क</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">पन्ना प्रमुख पॉकेट व्यू (पन्ना #4)</div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">आवंटित मतदाता:</span>
                    <span className="font-bold text-slate-900">30 मतदाता (7 परिवार)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">वोट दे चुके:</span>
                    <span className="font-bold text-emerald-700">24 / 30 (80%)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">लंबित संपर्क:</span>
                    <span className="font-bold text-amber-700">6 मतदाता (कॉल लिस्ट तैयार)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 11. CASE STUDY HIGHLIGHT */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                फील्ड केस स्टडी • चुनाव 2024-25
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold leading-tight">
                कैसे 14,000 वोटों से पिछड़ रहे बूथों पर आखिरी 3 घंटे में टर्नआउट बढ़ाकर दर्ज की गई ऐतिहासिक जीत।
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                विधानसभा चुनाव के दौरान दोपहर 2 बजे सिस्टम अलर्ट ने दिखाया कि ग्रामीण क्षेत्र के 42 बूथों पर मतदान केवल 38% था। वॉर-रूम ने तुरंत 84 रिज़र्व कार्यकर्ताओं को उन विशिष्ट मोहल्लों में भेजा और शेष मतदाताओं को ऑटोमेटेड WhatsApp पर्चियां भेजीं। शाम 6 बजे तक उन बूथों पर 74% मतदान हुआ और प्रत्याशी 3,420 मतों से विजयी रहे।
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-400">
                <span>✓ 42 बूथों पर त्वरित सुधार</span>
                <span>✓ 8,400 अतिरिक्त मत पोलिंग स्टेशन पहुंचे</span>
                <span>✓ डेटा-संचालित निर्णायक विजय</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. TRANSPARENT PACKAGES */}
      <section id="pricing" className="py-20 bg-[#f8fafc] border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-14">
            <span className="badge-minimal badge-blue">पारदर्शी पैकेज • Packages</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              हर स्तर के चुनाव के लिए उपयुक्त पैकेज
            </h2>
            <p className="text-xs text-slate-600">वार्ड से लेकर विधानसभा व संसदीय क्षेत्र तक के लिए विशेष प्लान</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Ward */}
            <div className="minimal-card p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="badge-minimal text-[10px]">वार्ड व नगर निकाय</span>
                <h3 className="font-heading text-xl font-bold text-slate-900">वार्ड / पार्षद पैकेज</h3>
                <p className="text-xs text-slate-500">वार्ड पार्षद, सरपंच व नगर पालिका चुनाव हेतु।</p>
                <div className="py-3 border-y border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 1-3 वार्ड / बूथ कवरेज</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> संपूर्ण डिजिटल मतदाता खोज</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> WhatsApp पर्ची ऑटोमेशन</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> पन्ना प्रमुख लॉगिन एक्सेस</div>
                </div>
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full btn-secondary py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                कोटेशन प्राप्त करें
              </button>
            </div>

            {/* Assembly - Featured */}
            <div className="minimal-card-featured p-6 space-y-5 flex flex-col justify-between relative shadow-lg">
              <div className="space-y-3">
                <span className="badge-minimal badge-blue text-[10px]">सर्वाधिक लोकप्रिय • VIP War Room</span>
                <h3 className="font-heading text-xl font-bold text-slate-900">विधानसभा वॉर-रूम</h3>
                <p className="text-xs text-slate-500">विधानसभा के प्रमुख प्रत्याशी व कोर टीम हेतु संपूर्ण वॉर-रूम।</p>
                <div className="py-3 border-y border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> संपूर्ण विधानसभा (200+ बूथ)</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 2,50,000+ मतदाता डेटाबेस</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> अनलिमिटेड कार्यकर्ता खाते</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> ऑफिशियल Meta WhatsApp API</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> जाति समीकरण व प्रवासी एनालिटिक्स</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> चुनाव दिवस लाइव टीवी डैशबोर्ड</div>
                </div>
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full btn-accent py-3 rounded-xl text-xs font-bold cursor-pointer"
              >
                लाइव वॉर-रूम बुक करें
              </button>
            </div>

            {/* District / MP */}
            <div className="minimal-card p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="badge-minimal text-[10px]">लोकसभा व जिला संगठन</span>
                <h3 className="font-heading text-xl font-bold text-slate-900">लोकसभा / जिला संगठन</h3>
                <p className="text-xs text-slate-500">संसदीय क्षेत्र व राजनीतिक दलों के जिला संगठन हेतु।</p>
                <div className="py-3 border-y border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 8-10 विधानसभाओं का मल्टी-टेनेंट कंसोल</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> 15,00,000+ मतदाता कैपेसिटी</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> कस्टम सर्वर व डेटा आइसोलेशन</div>
                  <div className="flex items-center gap-2"><Check size={13} className="text-blue-600" /> हाई-कमांड रियल-टाइम रिपोर्टिंग</div>
                </div>
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full btn-secondary py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                एंटरप्राइज प्रस्ताव प्राप्त करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. LEGAL, DPDP ACT 2023 & ECI COMPLIANCE */}
      <section id="compliance" className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <Shield size={20} className="text-blue-600" />
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  कानूनी सुरक्षा एवं डेटा गोपनीयता प्रतिज्ञा
                </h3>
              </div>
              <a
                href="http://localhost:5003/privacy.html"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                <span>आधिकारिक नीति</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-0.5">शून्य डेटा बिक्री (Zero Sale)</strong>
                <p>हम कभी भी किसी भी मतदाता का फोन नंबर या डेटा किसी तीसरे पक्ष अथवा विज्ञापन एजेंसी को नहीं बेचते हैं।</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">भारत में होस्टेड सर्वर</strong>
                <p>समस्त डेटा भारत स्थित सुरक्षित डेटा केंद्रों में 256-बिट SSL एन्क्रिप्शन के साथ संगृहीत रहता है।</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">रोल-बेस्ड सुरक्षा (RBAC)</strong>
                <p>कार्यकर्ता केवल अपने वार्ड का डेटा देख सकते हैं। मास्टर डेटा केवल मुख्य प्रत्याशी के पास सुरक्षित रहता है।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. INTERACTIVE FAQ ACCORDION */}
      <section className="py-16 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              अक्सर पूछे जाने वाले प्रश्न (FAQ)
            </h2>
            <p className="text-xs text-slate-500">चुनाव अभियान तकनीकी से जुड़े महत्वपूर्ण प्रश्नों के स्पष्ट उत्तर</p>
          </div>

          <div className="space-y-2.5">
            {[
              { q: 'क्या WhatsApp पर बल्क पर्ची भेजने से नंबर ब्लॉक होने का खतरा है?', a: 'बिल्कुल नहीं। Matdata Portal व्यक्तिगत अनधिकृत बल्क सॉफ्टवेयर के बजाय Meta Platforms, Inc. की आधिकारिक WhatsApp Business Cloud API का उपयोग करता है। सभी संदेश ECI-अनुपालन पूर्व-स्वीकृत टेम्प्लेट में जाते हैं, जिससे नंबर बैन होने का जोखिम शून्य हो जाता है।' },
              { q: 'हमारे पास केवल चुनाव आयोग की मुद्रित या स्कैन की गई PDF सूची है, क्या यह काम करेगी?', a: 'हाँ! हमारा इन-हाउस AI OCR इंजन विशेष रूप से भारतीय निर्वाचन आयोग की मुद्रित और स्कैन की गई मतदाता सूचियों के लिए प्रशिक्षित है। यह 15 से 30 मिनटों में PDF को पूरी तरह डिजिटल डेटाबेस में बदल देता है।' },
              { q: 'क्या हमारे कार्यकर्ता दूसरे वार्ड या प्रत्याशी का डेटा देख सकते हैं?', a: 'नहीं। सिस्टम में रोल-बेस्ड एक्सेस कंट्रोल (RBAC) सुरक्षा लागू है। प्रत्येक कार्यकर्ता केवल अपने आवंटित वार्ड/बूथ का ही विवरण देख सकता है। मुख्य नियंत्रण केवल आपके पास रहता है।' },
              { q: 'सॉफ्टवेयर सेटअप होने और वॉर-रूम लाइव होने में कितना समय लगता है?', a: 'वोटर लिस्ट PDF प्राप्त होने के 24 से 48 घंटे के भीतर आपकी संपूर्ण विधानसभा अथवा वार्ड का वॉर-रूम पूरी तरह एक्टिव और लाइव कर दिया जाता है।' },
              { q: 'क्या ग्रामीण इलाकों में जहाँ इंटरनेट धीमा है, कार्यकर्ता इसे इस्तेमाल कर पाएंगे?', a: 'हाँ! पन्ना प्रमुख मोबाइल इंटरफेस को विशेष रूप से 2G/3G नेटवर्क के लिए ऑप्टिमाइज़ किया गया है। यह बहुत हल्का है और बिना किसी रुकावट के तुरंत लोड होता है।' },
              { q: 'क्या हमारी टीम को उपयोग के लिए ट्रेनिंग मिलेगी?', a: 'हाँ! हमारी तकनीकी टीम आपके वॉर-रूम इंचार्ज और बूथ संयोजकों को ऑनलाइन एवं वीडियो ट्यूटोरियल के माध्यम से संपूर्ण ट्रेनिंग प्रदान करती है।' },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. HIGH-CONVERSION VIP FINAL CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <span className="inline-block bg-slate-800 text-slate-300 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700">
            चुनाव विजय की आधुनिक रणनीति
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-white">
            अपने चुनाव क्षेत्र का डिजिटल वॉर-रूम आज ही शुरू करें
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            हमारी विशेषज्ञ चुनाव तकनीकी टीम आपके साथ 30 मिनट का लाइव ज़ूम अथवा इन-पर्सन डेमो शेड्यूल करेगी।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              लाइव डेमो फॉर्म भरें
            </button>
            <a
              href={getWaLink('नमस्ते, मुझे Matdata Portal सॉफ्टवेयर का लाइव डेमो चाहिए।')}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} className="text-emerald-400" />
              <span>WhatsApp पर तुरंत संपर्क करें ({DISPLAY_PHONE})</span>
            </a>
          </div>
        </div>
      </section>

      {/* 16. CORPORATE MINIMALIST LIGHT FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-10 text-slate-600 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Matdata Portal" className="w-8 h-8 object-contain rounded-lg" />
              <div>
                <span className="font-heading text-base font-black text-slate-900">
                  Matdata<span className="text-blue-600">Portal</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">लोकतांत्रिक चुनाव प्रबंधन एवं डिजिटल वॉर-रूम प्रणाली</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900">Terms of Service</Link>
              <Link href="/refund" className="hover:text-slate-900">Refund Policy</Link>
              <Link href="/contact" className="hover:text-slate-900">Contact Us</Link>
              <a href="http://localhost:5003/api/legal/policies" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                Backend Legal API (5003)
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
            <div>
              &copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित। ECI एवं DPDP Act 2023 दिशानिर्देशों के अनुरूप।
            </div>
            <div>हेल्पलाइन: {DISPLAY_PHONE} &bull; support@matdataportal.app</div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={getWaLink('नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम का डेमो चाहिए।')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-3.5 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 font-bold text-xs cursor-pointer"
      >
        <MessageCircle size={16} />
        <span className="hidden sm:inline">WhatsApp ({DISPLAY_PHONE})</span>
      </a>

      {/* LIVE DEMO BOOKING MODAL */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <X size={18} />
            </button>

            {leadSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">अनुरोध प्राप्त हुआ</h3>
                <p className="text-xs text-slate-600">
                  आपकी पूछताछ सफलतापूर्वक दर्ज हो गई है। हमारी चुनाव तकनीकी टीम WhatsApp पर आपसे तुरंत संपर्क करेगी।
                </p>
                <button
                  onClick={() => { setLeadSubmitted(false); setLeadModalOpen(false); }}
                  className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold mt-2 cursor-pointer"
                >
                  पूर्ण (Done)
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex items-start gap-2.5">
                  <img src="/logo.svg" alt="Matdata Portal" className="w-9 h-9 object-contain rounded-xl" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      लाइव वॉर-रूम डेमो
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      विवरण भरें, टीम आपको 30 मिनट का वॉकथ्रू देगी।
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      प्रत्याशी / आपका नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राजेश शर्मा"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      मोबाइल नंबर (WhatsApp सक्रिय) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10 अंकों का मोबाइल नंबर"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      विधानसभा / वार्ड का नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. हवामहल, जयपुर या वार्ड नं. 14"
                      value={leadForm.constituency}
                      onChange={(e) => setLeadForm({ ...leadForm, constituency: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      चुनाव का स्तर
                    </label>
                    <select
                      value={leadForm.electionType}
                      onChange={(e) => setLeadForm({ ...leadForm, electionType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                    >
                      <option value="विधानसभा (Assembly)">विधानसभा (Assembly)</option>
                      <option value="वार्ड / पार्षद (Ward)">वार्ड / पार्षद / पालिका</option>
                      <option value="नगर निगम (Corporation / Mayor)">नगर निगम / महापौर</option>
                      <option value="लोकसभा (Parliamentary)">लोकसभा (Parliamentary)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full btn-primary py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 mt-3 cursor-pointer"
                  >
                    {leadSubmitting ? (
                      <span>भेज रहे हैं...</span>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>डेमो अनुरोध भेजें</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
