'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Sparkles,
  BarChart3,
  Clock,
  Send,
  UserCheck,
  MapPin,
  Check,
  SlidersHorizontal,
  Smartphone,
  Zap,
  Globe,
  Award,
  ChevronRight,
  TrendingUp,
  Vote,
  QrCode,
  Share2,
  Printer,
  FileText,
  BadgeCheck,
  Flame,
  Calculator,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const DISPLAY_PHONE = '+91 98765 43210';
const WHATSAPP_NUMBER = '919876543210';
const DEMO_PORTAL_URL = 'https://app.chunavranniti.online';

// Sample voters for live interactive search sandbox
const SAMPLE_VOTERS = [
  { id: '1', epic: 'RJ/14/082/001001', nameHi: 'रामनिवास शर्मा', nameEn: 'Ramniwas Sharma', relHi: 'राधेश्याम शर्मा', relType: 'पिता', age: 48, gender: 'पुरुष', ward: '1', booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1', house: '12', caste: 'ब्राह्मण', voted: true, phone: '98290XXXXX' },
  { id: '2', epic: 'RJ/14/082/001002', nameHi: 'सुनीता शर्मा', nameEn: 'Sunita Sharma', relHi: 'रामनिवास शर्मा', relType: 'पति', age: 44, gender: 'स्त्री', ward: '1', booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1', house: '12', caste: 'ब्राह्मण', voted: true, phone: '98290XXXXX' },
  { id: '3', epic: 'RJ/14/082/001015', nameHi: 'मुकेश विश्नोई', nameEn: 'Mukesh Bishnoi', relHi: 'हनुमानराम विश्नोई', relType: 'पिता', age: 32, gender: 'पुरुष', ward: '2', booth: 'सामुदायिक भवन, कक्ष 2', house: '15', caste: 'विश्नोई', voted: false, phone: '94140XXXXX' },
  { id: '4', epic: 'RJ/14/082/001016', nameHi: 'कविता विश्नोई', nameEn: 'Kavita Bishnoi', relHi: 'मुकेश विश्नोई', relType: 'पति', age: 29, gender: 'स्त्री', ward: '2', booth: 'सामुदायिक भवन, कक्ष 2', house: '15', caste: 'विश्नोई', voted: false, phone: '94140XXXXX' },
  { id: '5', epic: 'RJ/14/082/001024', nameHi: 'सुरेश कुमार जाट', nameEn: 'Suresh Kumar Jat', relHi: 'भंवरलाल जाट', relType: 'पिता', age: 38, gender: 'पुरुष', ward: '3', booth: 'पंचायत समिति सभागार, कक्ष 3', house: '31', caste: 'जाट', voted: true, phone: '97840XXXXX' },
  { id: '6', epic: 'RJ/14/082/001032', nameHi: 'अशोक सिंह शेखावत', nameEn: 'Ashok Singh Shekhawat', relHi: 'डूंगर सिंह', relType: 'पिता', age: 42, gender: 'पुरुष', ward: '4', booth: 'राजकीय प्राथमिक विद्यालय, कक्ष 1', house: '45', caste: 'राजपूत', voted: false, phone: '99280XXXXX' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Hero Interactive Tabs: 'parchi' | 'turnout' | 'caste' | 'workers'
  const [activeHeroTab, setActiveHeroTab] = useState<'parchi' | 'turnout' | 'caste' | 'workers'>('parchi');
  
  // Interactive Simulator Slip sent state
  const [simulatedSlipSent, setSimulatedSlipSent] = useState(false);

  // Live Search Sandbox state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<typeof SAMPLE_VOTERS[0]>(SAMPLE_VOTERS[0]);

  // Turnout & Victory ROI Calculator State
  const [voterCount, setVoterCount] = useState<number>(35000);
  const [electionType, setElectionType] = useState<string>('vidhan_sabha');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    constituency: '',
    role: 'प्रत्याशी (Candidate)',
    notes: '',
  });

  // Filter voters for sandbox
  const filteredVoters = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_VOTERS;
    const q = searchQuery.toLowerCase().trim();
    return SAMPLE_VOTERS.filter(v =>
      v.nameHi.includes(q) ||
      v.nameEn.toLowerCase().includes(q) ||
      v.epic.toLowerCase().includes(q) ||
      v.ward.includes(q)
    );
  }, [searchQuery]);

  // Calculator outputs
  const calcOutput = useMemo(() => {
    const extraTurnoutPct = electionType === 'panchayat' ? 14 : electionType === 'ward' ? 12 : electionType === 'nagar_palika' ? 9.5 : 8.2;
    const extraVotes = Math.round((voterCount * extraTurnoutPct) / 100);
    const slipDispatchMinutes = Math.max(3, Math.round(voterCount / 1800));
    const paperCostSaved = Math.round(voterCount * 2.8);
    return { extraTurnoutPct, extraVotes, slipDispatchMinutes, paperCostSaved };
  }, [voterCount, electionType]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone.trim() || !leadForm.name.trim()) return;
    setLeadSubmitting(true);
    setTimeout(() => {
      setLeadSubmitting(false);
      setLeadSubmitted(true);
      const text = encodeURIComponent(
        `नमस्कार Chunav Ranniti टीम! मैं ${leadForm.name} हूँ (${leadForm.role}, क्षेत्र: ${leadForm.constituency || 'जानकारी नहीं'})। मुझे सॉफ्टवेयर का लाइव डेमो व मूल्य जानना है। फोन: ${leadForm.phone}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 text-white text-xs py-2 px-4 text-center border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap font-medium">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40 text-[11px]">
            <Flame size={12} className="text-orange-400" /> चुनाव 2026 स्पेशल
          </span>
          <span>आगामी चुनावों के लिए डिजिटल वॉर-रूम बुकिंग शुरू! 24 घंटे में अपनी विधानसभा/वार्ड लाइव कराएं।</span>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="underline underline-offset-2 font-bold text-orange-300 hover:text-white transition-colors ml-1"
          >
            लाइव डेमो बुक करें &rarr;
          </button>
        </div>
      </div>

      {/* 2. STICKY LUXURY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size="lg" subtitleText="चुनाव रणनीति" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[14.5px] font-semibold text-slate-700">
            <a href="#features" className="hover:text-orange-600 transition-colors">मुख्य फीचर्स</a>
            <a href="#simulator" className="hover:text-orange-600 transition-colors">लाइव पर्ची डेमो</a>
            <a href="#comparison" className="hover:text-orange-600 transition-colors">पारंपरिक vs डिजिटल</a>
            <a href="#calculator" className="hover:text-orange-600 transition-colors">जीत कैलकुलेटर</a>
            <a href="#pricing" className="hover:text-orange-600 transition-colors">योजनाएं व मूल्य</a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={DEMO_PORTAL_URL}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 font-bold text-sm transition-all"
            >
              लॉगिन
            </Link>
            <button
              onClick={() => setLeadModalOpen(true)}
              className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Sparkles size={16} className="text-amber-200" />
              <span>फ्री डेमो लें</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3 font-semibold text-slate-800 text-base">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>मुख्य फीचर्स</a>
              <a href="#simulator" onClick={() => setMobileMenuOpen(false)}>लाइव पर्ची डेमो</a>
              <a href="#comparison" onClick={() => setMobileMenuOpen(false)}>पारंपरिक vs डिजिटल</a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>जीत कैलकुलेटर</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>योजनाएं व मूल्य</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            </div>
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                href={DEMO_PORTAL_URL}
                className="w-full text-center py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800"
              >
                डैशबोर्ड लॉगिन
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setLeadModalOpen(true); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-center shadow-md shadow-orange-500/30"
              >
                फ्री डेमो बुक करें
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION WITH BESPOKE LIGHT AESTHETICS */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft Background Architectural Mesh */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-orange-100/70 via-amber-50/40 to-transparent blur-3xl rounded-full" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-100/40 blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* National Sovereign Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-xs sm:text-sm font-bold mb-6 hover:border-orange-300 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>🇮🇳 भारत का सबसे आधुनिक इलेक्शन इंटेलिजेंस प्लेटफ़ॉर्म</span>
              <span className="text-slate-400">|</span>
              <span className="text-orange-600 font-black">Chunav Ranniti</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
              बूथ का हर एक वोट, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent">
                अब आपकी मुट्ठी में।
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              कागज़ की पर्चियों का जमाना गया। <strong className="text-slate-900 font-semibold">10 सेकंड में 10,000+ मतदाताओं</strong> को WhatsApp पर फ़ोटो-युक्त डिजिटल वोटर पर्ची पहुंचाएं, बूथ का लाइव मतदान प्रतिशत ट्रैक करें और निर्णायक जीत हासिल करें।
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Zap size={18} className="text-amber-200 fill-amber-200" />
                <span>लाइव वॉर-रूम डेमो देखें</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('नमस्ते Chunav Ranniti! मुझे चुनाव प्रबंधन सॉफ्टवेयर का लाइव डेमो देखना है।')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-300 text-slate-800 hover:text-slate-950 hover:border-slate-400 font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle size={20} className="text-emerald-600 fill-emerald-500/10" />
                <span>WhatsApp पर बात करें</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>100% WhatsApp डिलीवरी</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>ECI दिशा-निर्देश अनुकूल</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone size={16} className="text-orange-600" />
                <span>बिना ऐप डाउनलोड के वोटर को पर्ची</span>
              </div>
            </div>
          </div>

          {/* 4. HERO INTERACTIVE COMMAND CONSOLE MOCKUP */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden">
              {/* Window Header */}
              <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">
                    CHUNAV RANNITI &bull; WAR ROOM CONSOLE v4.2
                  </span>
                </div>

                {/* Live Booth Selector / Status */}
                <div className="flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>वार्ड 1 - बूथ 14 (राजकीय उ. मा. विद्यालय) • लाइव मतदान: 68.4%</span>
                </div>
              </div>

              {/* Tab Navigation in Console */}
              <div className="bg-slate-100/60 p-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
                {[
                  { key: 'parchi', label: '1. डिजिटल वोटर पर्ची (Parchi)', icon: QrCode },
                  { key: 'turnout', label: '2. बूथ पोल डेस्क (Live Turnout)', icon: Activity },
                  { key: 'caste', label: '3. जातीय समीकरण (Demographics)', icon: Users },
                  { key: 'workers', label: '4. पन्ना प्रमुख व कार्यकर्ता (Workers)', icon: UserCheck },
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setActiveHeroTab(t.key as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      activeHeroTab === t.key
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 text-orange-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <t.icon size={16} className={activeHeroTab === t.key ? 'text-orange-600' : 'text-slate-400'} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Console Body Tab View */}
              <div className="p-6 sm:p-8 bg-white min-h-[360px]">
                {activeHeroTab === 'parchi' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left: Voter Slip Preview Card */}
                    <div className="md:col-span-6 bg-gradient-to-br from-orange-50/60 to-amber-50/40 p-5 rounded-2xl border-2 border-dashed border-orange-200 relative">
                      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 relative overflow-hidden">
                        {/* Slip Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-700 text-xs">
                              CR
                            </span>
                            <div>
                              <p className="text-[11px] font-black text-slate-900">मतदाता सूचना पर्ची (Voter Slip)</p>
                              <p className="text-[10px] text-slate-500 font-medium">विधानसभा चुनाव 2026</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            सत्यापित पर्ची
                          </span>
                        </div>

                        {/* Slip Voter Details */}
                        <div className="space-y-1.5 text-xs text-slate-700">
                          <div className="flex justify-between">
                            <span className="text-slate-500">मतदाता का नाम:</span>
                            <span className="font-black text-slate-950">रामनिवास शर्मा (Ramniwas Sharma)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">पिता का नाम:</span>
                            <span className="font-semibold text-slate-800">राधेश्याम शर्मा</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">EPIC कार्ड संख्या:</span>
                            <span className="font-mono font-bold text-orange-700">RJ/14/082/001001</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">मकान संख्या / वार्ड:</span>
                            <span className="font-bold text-slate-800">12 / वार्ड 1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">क्रम संख्या (Serial No):</span>
                            <span className="font-black text-emerald-700 text-sm"># 1</span>
                          </div>
                          <div className="pt-2 border-t border-slate-100 text-[11px]">
                            <p className="text-slate-500">मतदान केंद्र (Polling Station):</p>
                            <p className="font-bold text-slate-900">राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1 (उत्तर भाग)</p>
                          </div>
                        </div>

                        {/* Slip Footer with Simulated Candidate Photo / QR */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                              फोटो
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">आपका प्रत्याशी</p>
                              <p className="text-[10px] text-orange-600 font-bold">कमल / हाथ / तीर चुनाव चिन्ह</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 font-bold text-slate-700">
                            <QrCode size={18} className="text-slate-700" />
                            <span className="text-[10px]">Google Map QR</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Explanation & Instant WhatsApp Action */}
                    <div className="md:col-span-6 space-y-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
                        <Sparkles size={14} /> 1-Click WhatsApp Delivery
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        मतदाता के फोन पर सीधे पहुंचेगी उनकी फ़ोटो-युक्त पर्ची।
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        कागज़ ढूंढने का झंझट खत्म। मतदाता को उनके नाम, परिवार के सदस्यों, बूथ का पता और Google Maps लोकेशन के साथ खूबसूरत WhatsApp संदेश जाता है।
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setSimulatedSlipSent(true);
                            setTimeout(() => setSimulatedSlipSent(false), 3000);
                          }}
                          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md ${
                            simulatedSlipSent
                              ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                          }`}
                        >
                          {simulatedSlipSent ? (
                            <>
                              <CheckCircle size={18} />
                              <span>WhatsApp पर पर्ची सफलतापूर्वक भेजी गई!</span>
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              <span>यहाँ क्लिक करके WhatsApp पर्ची डेमो देखें</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeHeroTab === 'turnout' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h4 className="font-black text-xl text-slate-900">बूथ स्तर पर रियल-टाइम मतदान मॉनिटर</h4>
                        <p className="text-slate-500 text-xs sm:text-sm">मतदान दिवस पर पन्ना प्रमुख सीधे बटन दबाकर 'Voted' मार्क करते हैं।</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                          वोट पड़े: 684 / 1000 (68.4%)
                        </span>
                        <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                          शेष वोट: 316 (31.6%)
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden flex">
                      <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: '68.4%' }} />
                      <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: '31.6%' }} />
                    </div>

                    {/* Quick Voter Row Simulator */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                      {SAMPLE_VOTERS.slice(0, 3).map((v) => (
                        <div key={v.id} className="p-3.5 flex items-center justify-between text-xs sm:text-sm">
                          <div>
                            <span className="font-bold text-slate-900">{v.nameHi}</span>
                            <span className="text-slate-500 ml-2">({v.relHi} - मकान {v.house})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${v.voted ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {v.voted ? '✓ वोट डाला' : '✗ वोट बाकी'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeHeroTab === 'caste' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-black text-xl text-slate-900">जातिगत व सामाजिक समीकरण इंटेलिजेंस</h4>
                      <p className="text-slate-500 text-xs sm:text-sm">वार्ड और बूथ अनुसार समुदाय-वार वोटों का सटीक विश्लेषण।</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'ब्राह्मण समाज', count: '1,420 वोट', pct: '28%', color: 'border-l-4 border-l-blue-500' },
                        { label: 'जाट / किसान वर्ग', count: '1,280 वोट', pct: '25%', color: 'border-l-4 border-l-orange-500' },
                        { label: 'राजपूत समाज', count: '940 वोट', pct: '18%', color: 'border-l-4 border-l-amber-500' },
                        { label: 'मेघवाल / SC वर्ग', count: '890 वोट', pct: '17%', color: 'border-l-4 border-l-emerald-500' },
                      ].map((c, idx) => (
                        <div key={idx} className={`p-4 bg-slate-50 rounded-xl border border-slate-200 ${c.color}`}>
                          <p className="text-xs text-slate-500 font-bold">{c.label}</p>
                          <p className="text-lg font-black text-slate-900 mt-1">{c.count}</p>
                          <p className="text-xs font-semibold text-slate-600 mt-0.5">{c.pct} हिस्सेदारी</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeHeroTab === 'workers' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-black text-xl text-slate-900">पन्ना प्रमुख व बूथ कार्यकर्ता कमान</h4>
                      <p className="text-slate-500 text-xs sm:text-sm">प्रत्येक 60 मतदाताओं पर एक पन्ना प्रमुख को जिम्मेदारी और मोबाइल एक्सेस।</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200">
                        <p className="text-xs font-bold text-orange-700">सक्रिय पन्ना प्रमुख</p>
                        <p className="text-2xl font-black text-slate-950 mt-1">124 कार्यकर्ता</p>
                        <p className="text-xs text-slate-600 mt-1">100% बूथ कवर्ड</p>
                      </div>
                      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                        <p className="text-xs font-bold text-emerald-700">कॉलिंग संपर्क दर</p>
                        <p className="text-2xl font-black text-slate-950 mt-1">94.2%</p>
                        <p className="text-xs text-slate-600 mt-1">मतदाता संतुष्ट</p>
                      </div>
                      <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
                        <p className="text-xs font-bold text-blue-700">प्रवासी वोटर कनवर्टेड</p>
                        <p className="text-2xl font-black text-slate-950 mt-1">480 मतदाता</p>
                        <p className="text-xs text-slate-600 mt-1">मतदान हेतु घर पहुंचे</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE VOTER SEARCH & SLIP SIMULATOR (Tangible Demo) */}
      <section id="simulator" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              INTERACTIVE DEMO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              स्वयं टेस्ट करें: 0.2 सेकंड में वोटर खोज व पर्ची
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              नीचे सर्च बॉक्स में कोई भी नाम या वार्ड नंबर टाइप करके देखें कि कैसे 1 क्लिक में पर्ची तैयार होती है।
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg">
            {/* Search Input Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="मतदाता का नाम (हिंदी या अंग्रेजी), EPIC नंबर या वार्ड खोजें... (उदा: शर्मा, मुकेश, RJ)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  क्लियर
                </button>
              )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVoters.map((voter) => (
                <div
                  key={voter.id}
                  onClick={() => setSelectedVoter(voter)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                    selectedVoter.id === voter.id
                      ? 'border-orange-500 ring-2 ring-orange-200 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-black text-base text-slate-900">{voter.nameHi}</h4>
                      <p className="text-xs text-slate-500 font-medium">{voter.nameEn}</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      वार्ड {voter.ward}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 space-y-1">
                    <p><span className="text-slate-400">रिश्ता:</span> {voter.relType} {voter.relHi}</p>
                    <p><span className="text-slate-400">EPIC:</span> <span className="font-mono">{voter.epic}</span></p>
                    <p><span className="text-slate-400">बूथ:</span> {voter.booth}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-600">
                      मकान नं. {voter.house}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVoter(voter);
                        const msg = encodeURIComponent(
                          `*मतदाता सूचना पर्ची (Chunav Ranniti)*\n\nनाम: ${voter.nameHi}\nपिता/पति: ${voter.relHi}\nEPIC: ${voter.epic}\nवार्ड: ${voter.ward}\nमतदान केंद्र: ${voter.booth}\n\nकृपया अपना अमूल्य वोट अवश्य डालें!`
                        );
                        window.open(`https://wa.me/?text=${msg}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Share2 size={13} /> WhatsApp पर्ची भेजें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON: TRADITIONAL VS CHUNAV RANNITI */}
      <section id="comparison" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              THE BIG DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-3">
              पारंपरिक पर्चा-पर्ची बनाम चुनाव रणनीति
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              जानिए क्यों 48+ विजेता प्रत्याशियों ने अपनी पूरी कैंपेन को हमारे डिजिटल वॉर-रूम में शिफ्ट किया।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Old Way Card */}
            <div className="bg-white p-8 rounded-3xl border border-rose-200/80 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                  ✕
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">पारंपरिक कागजी तरीका</h3>
                  <p className="text-xs text-rose-600 font-bold">धीमा, खर्चीला और अनिश्चित</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>हज़ारों पर्चियाँ छपवाना:</strong> 4-5 दिन प्रिंटिंग में बर्बाद और ₹50,000+ का भारी कागजी खर्च।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>घर-घर भटकना:</strong> कार्यकर्ता पर्चियाँ बांटते-बांटते थक जाते हैं, 40% पर्चियाँ घर बंद होने से नहीं पहुंचती।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>वोटिंग के दिन अंधकार:</strong> दोपहर 3 बजे तक पता नहीं चलता कि हमारे कोर समर्थक ने वोट डाला या नहीं।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>प्रवासी वोटर छूटना:</strong> शहर से बाहर रहने वाले समर्थकों से संपर्क टूटना और वोट का नुकसान।</span>
                </li>
              </ul>
            </div>

            {/* New Chunav Ranniti Way */}
            <div className="bg-white p-8 rounded-3xl border-2 border-emerald-500 shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                100% WINNING EDGE
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  ✓
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">चुनाव रणनीति डिजिटल वॉर-रूम</h3>
                  <p className="text-xs text-emerald-600 font-bold">तेज़, 100% सटीक और निर्णायक</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>1-Click WhatsApp पर्ची:</strong> 10 मिनट में पूरे वार्ड या विधानसभा के फोन पर फ़ोटो-युक्त पर्ची पहुंचती है।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Google Map बूथ लोकेशन:</strong> वोटर को पर्ची में दिए लिंक से सीधे अपने मतदान केंद्र का GPS रास्ता मिल जाता है।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>रियल-टाइम पोलिंग डेस्क:</strong> दोपहर 2 बजे पता चल जाता है कि किस समर्थक ने वोट नहीं डाला, तुरंत कॉल करके बूथ पर बुलाएं।</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>प्रवासी वोटर ट्रैकिंग:</strong> बाहर रहने वाले हर एक वोटर की लिस्ट, कॉलिंग स्टेटस और ट्रैवल कन्फर्मेशन।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE TURNOUT & VICTORY ROI CALCULATOR */}
      <section id="calculator" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              VICTORY CALCULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              अपनी जीत का गणित कैलकुलेट करें
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              अपनी सीट और मतदाताओं की संख्या चुनें और देखें कि चुनाव रणनीति आपको कितने अतिरिक्त वोटों की बढ़त दिला सकती है।
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Sliders & Inputs */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    चुनाव का स्तर (Election Level)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'panchayat', label: 'ग्राम पंचायत' },
                      { key: 'ward', label: 'वार्ड पार्षद' },
                      { key: 'nagar_palika', label: 'नगर पालिका' },
                      { key: 'vidhan_sabha', label: 'विधानसभा' },
                    ].map(t => (
                      <button
                        key={t.key}
                        onClick={() => setElectionType(t.key)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          electionType === t.key
                            ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      कुल मतदाता संख्या (Total Voters)
                    </label>
                    <span className="font-mono font-black text-lg text-orange-400">
                      {voterCount.toLocaleString('en-IN')} मतदाता
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="260000"
                    step="1000"
                    value={voterCount}
                    onChange={(e) => setVoterCount(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>3,000</span>
                    <span>1,30,000</span>
                    <span>2,60,000</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 leading-relaxed">
                  * आंकड़े पिछले 48 चुनावों के वास्तविक बूथ-लेवल डेटा और टर्नआउट वृद्धि पर आधारित हैं।
                </div>
              </div>

              {/* Dynamic Output Box */}
              <div className="md:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  संभावित बढ़त व बचत (Estimated Edge)
                </p>

                <div>
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                    +{calcOutput.extraVotes.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">संभावित अतिरिक्त समर्थक वोट</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>अनुमानित टर्नआउट वृद्धि:</span>
                    <span className="font-bold text-white">+{calcOutput.extraTurnoutPct}%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>पर्ची डिलीवरी का समय:</span>
                    <span className="font-bold text-white">~{calcOutput.slipDispatchMinutes} मिनट</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>कागज़ व मैनपावर की बचत:</span>
                    <span className="font-bold text-emerald-300">₹{calcOutput.paperCostSaved.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setLeadModalOpen(true)}
                  className="w-full mt-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs uppercase tracking-wider text-white shadow-lg transition-colors"
                >
                  इस सीट के लिए वॉर-रूम बुक करें
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CORE 6 POWER PILLARS */}
      <section id="features" className="py-20 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              COMPLETE SUITE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              एक ही प्लेटफ़ॉर्म में 6 शक्तिशाली टूल्स
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              चुनाव प्रचार के पहले दिन से लेकर काउंटिंग के अंतिम राउंड तक का संपूर्ण डिजिटल समाधान।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: QrCode,
                color: 'text-orange-600 bg-orange-100',
                title: 'डिजिटल WhatsApp वोटर पर्ची',
                desc: 'उम्मीदवार की फोटो, चुनाव चिन्ह और मतदान केंद्र के Google Maps QR कोड के साथ व्यक्तिगत पर्ची 1-क्लिक में रवाना।'
              },
              {
                icon: Activity,
                color: 'text-emerald-600 bg-emerald-100',
                title: 'लाइव बूथ पोल डेस्क',
                desc: 'मतदान दिवस पर हर 15 मिनट का बूथ टर्नआउट। जिन्होंने वोट नहीं डाला, उनकी तत्काल लिस्ट निकालकर उन्हें फोन करें।'
              },
              {
                icon: Users,
                color: 'text-blue-600 bg-blue-100',
                title: 'जातीय व सामाजिक समीकरण',
                desc: 'वार्ड व बूथ अनुसार जातिगत प्रभाव और पन्ना स्तर पर मतदाताओं का सटीक वर्गीकरण। वोट बैंक का मजबूत विश्लेषण।'
              },
              {
                icon: Smartphone,
                color: 'text-purple-600 bg-purple-100',
                title: 'प्रवासी मतदाता आउटरीच',
                desc: 'बाहर रहने वाले मतदाताओं की अलग सूची, उनके आने की तारीख और वाहन समन्वय की लाइव कॉलिंग ट्रैकिंग।'
              },
              {
                icon: UserCheck,
                color: 'text-amber-600 bg-amber-100',
                title: 'पन्ना प्रमुख व कार्यकर्ता मैनेजमेंट',
                desc: 'हर कार्यकर्ता को उनके 60 मतदाताओं का सुरक्षित मोबाइल एक्सेस। काम की लाइव मॉनिटरिंग और रिपोर्टिंग।'
              },
              {
                icon: FileText,
                color: 'text-teal-600 bg-teal-100',
                title: 'हाई-स्पीड PDF OCR इंजन',
                desc: 'सरकारी निर्वाचन नामावली (PDF) को 2 मिनट में 100% सटीक डिजिटल डेटाबेस में तब्दील करने का इन-हाउस इंजन।'
              },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all group">
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRANSPARENT PRICING & WAR ROOM PACKAGES */}
      <section id="pricing" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              WAR ROOM PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              सरल, पारदर्शी और परिणाम-उन्मुख योजनाएं
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              अपनी सीट के आकार के अनुसार उपयुक्त पैकेज चुनें। कोई छिपा हुआ शुल्क नहीं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan 1: Ward / Panchayat */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">वार्ड / पंचायत</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">स्टार्टर वॉर-रूम</h3>
                <p className="text-xs text-slate-500 mt-1">वार्ड पार्षद, सरपंच व पंचायत समिति चुनाव हेतु</p>
              </div>

              <div className="text-3xl font-black text-slate-900">
                ₹9,999 <span className="text-xs font-bold text-slate-500">/ चुनाव</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 5,000 मतदाताओं तक कवरेज</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> डिजिटल वोटर पर्ची जनरेटर</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> WhatsApp 1-क्लिक शेयरिंग</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> बूथ पोल डेस्क मोबाइल ऐप</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 5 कार्यकर्ता लॉगिन खाते</li>
              </ul>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-3 rounded-xl border-2 border-slate-900 font-bold text-xs uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                यह प्लान चुनें
              </button>
            </div>

            {/* Plan 2: Municipal / Council (Popular) */}
            <div className="p-8 rounded-3xl bg-white border-2 border-orange-500 shadow-2xl relative space-y-6">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                सर्वाधिक लोकप्रिय
              </div>

              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">नगर पालिका / परिषद</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">प्रोफेशनल वॉर-रूम</h3>
                <p className="text-xs text-slate-500 mt-1">नगर पालिका, नगर परिषद व जिला परिषद हेतु</p>
              </div>

              <div className="text-3xl font-black text-slate-900">
                ₹24,999 <span className="text-xs font-bold text-slate-500">/ चुनाव</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 25,000 मतदाताओं तक कवरेज</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> फोटो-युक्त कस्टमाइज़्ड वोटर पर्ची</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> ऑटोमेटेड बल्क WhatsApp डिस्पैच</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> जातिगत समीकरण व परिवार मैपिंग</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> 25 कार्यकर्ता खाते + लाइव ट्रैकिंग</li>
              </ul>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition-colors"
              >
                अभी एक्टिवेट करें
              </button>
            </div>

            {/* Plan 3: Assembly / Parliamentary Command */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">विधानसभा / लोकसभा</span>
                <h3 className="text-2xl font-black text-white mt-1">कमांड वॉr-रूम</h3>
                <p className="text-xs text-slate-400 mt-1">विधायक, सांसद व बड़े राजनीतिक दलों हेतु</p>
              </div>

              <div className="text-3xl font-black text-white">
                कस्टम कोटेशन <span className="text-xs font-bold text-slate-400">/ सीट</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> 2,50,000+ मतदाता डेटाबेस</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> डेडिकेटेड सर्वर व 100% डेटा आइसोलेशन</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> 300+ पन्ना प्रमुख व बूथ एजेंट खाते</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> प्रवासी वोटर आउटरीच व कॉलिंग CRM</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> 24x7 ऑन-ग्राउंड टेक्निकल टीम सपोर्ट</li>
              </ul>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                कंसल्टेशन बुक करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              अक्सर पूछे जाने वाले सवाल (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'क्या WhatsApp पर पर्चियां भेजने से हमारा नंबर बैन हो सकता है?',
                a: 'बिल्कुल नहीं! हमारा सिस्टम स्मार्ट रेट-लिमिटिंग और वेरिफाइड पर्सनल लिंक डिस्पैच तकनीक का उपयोग करता है, जिससे WhatsApp स्पैम डिडक्शन ट्रिगर नहीं होता और 100% सुरक्षित डिलीवरी मिलती है।'
              },
              {
                q: 'हमारे पास केवल सरकारी वोटर लिस्ट (PDF) है, उसे कैसे अपलोड करें?',
                a: 'आपको बस अपनी वोटर लिस्ट की PDF फाइल हमारे सिस्टम में अपलोड करनी है। हमारा इन-हाउस हाई-स्पीड OCR इंजन कुछ ही मिनटों में सभी मतदाताओं के नाम, फोटो, मकान नंबर और संबंधियों का डिजिटल डेटाबेस तैयार कर देता है।'
              },
              {
                q: 'क्या हमारे कार्यकर्ताओं को कोई भारी ऐप डाउनलोड करना पड़ेगा?',
                a: 'नहीं! यह एक हल्का, अल्ट्रा-फास्ट वेब-ऐप है जो किसी भी साधारण स्मार्टफोन (Android / iPhone) के ब्राउज़र में तुरंत खुल जाता है। कम इंटरनेट स्पीड (2G/3G) में भी आसानी से काम करता है।'
              },
              {
                q: 'हमारा चुनावी डेटा कितना सुरक्षित रहेगा?',
                a: 'डेटा सुरक्षा हमारी सर्वोच्च प्राथमिकता है। आपका संपूर्ण मतदाता व कार्यकर्ता डेटा 256-बिट बैंक-ग्रेड एन्क्रिप्शन के साथ आपके अपने डेडिकेटेड पार्टीशन में सुरक्षित रहता है। आपके अलावा इसे कोई नहीं देख सकता।'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 text-sm sm:text-base"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-orange-600' : ''}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black">
            क्या आप इस बार चुनाव में निर्णायक बढ़त के लिए तैयार हैं?
          </h2>
          <p className="mt-3 text-orange-100 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            अपनी विधानसभा, नगर पालिका या वार्ड का वॉर-रूम आज ही सेटअप करवाएं। हमारी टेक्निकल टीम 24 घंटे में आपका पूरा डेटा लाइव कर देगी।
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-base shadow-xl transition-all"
            >
              लाइव वॉर-रूम डेमो बुक करें
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('नमस्ते Chunav Ranniti! मुझे वॉर रूम सेटअप की पूरी जानकारी चाहिए।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-base shadow-xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
            >
              <Phone size={18} className="text-emerald-600" />
              <span>{DISPLAY_PHONE} पर बात करें</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. MODERN LIGHT FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
            {/* Col 1: Brand Info */}
            <div className="space-y-4 md:col-span-1">
              <BrandLogo size="md" subtitleText="चुनाव रणनीति" />
              <p className="text-slate-500 text-xs leading-relaxed">
                भारत का सबसे आधुनिक, विश्वसनीय और परिणाम-उन्मुख डिजिटल चुनाव प्रबंधन एवं वॉर-रूम प्लेटफ़ॉर्म।
              </p>
              <div className="text-xs text-slate-500 space-y-1">
                <p>हेल्पलाइन: <strong className="text-slate-900">{DISPLAY_PHONE}</strong></p>
                <p>ईमेल: support@chunavranniti.com</p>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">प्लेटफ़ॉर्म फीचर्स</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-orange-600">डिजिटल वोटर पर्ची</a></li>
                <li><a href="#features" className="hover:text-orange-600">बूथ पोल डेस्क</a></li>
                <li><a href="#features" className="hover:text-orange-600">जातीय समीकरण</a></li>
                <li><a href="#features" className="hover:text-orange-600">प्रवासी वोटर ट्रैकिंग</a></li>
                <li><a href="#features" className="hover:text-orange-600">पन्ना प्रमुख मैनेजमेंट</a></li>
              </ul>
            </div>

            {/* Col 3: Elections */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">समाधान (Solutions)</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#pricing" className="hover:text-orange-600">विधानसभा चुनाव वॉर-रूम</a></li>
                <li><a href="#pricing" className="hover:text-orange-600">नगर निगम व परिषद चुनाव</a></li>
                <li><a href="#pricing" className="hover:text-orange-600">ग्राम पंचायत व वार्ड चुनाव</a></li>
                <li><a href="#calculator" className="hover:text-orange-600">वोटर टर्नआउट कैलकुलेटर</a></li>
              </ul>
            </div>

            {/* Col 4: Legal & Security */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">सुरक्षा व नीतियां</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/privacy" className="hover:text-orange-600">गोपनीयता नीति (Privacy Policy)</Link></li>
                <li><Link href="/terms" className="hover:text-orange-600">नियम व शर्तें (Terms of Service)</Link></li>
                <li><Link href="/refund" className="hover:text-orange-600">रिफंड नीति (Refund Policy)</Link></li>
                <li><Link href="/child-safety" className="hover:text-orange-600">बाल सुरक्षा मानक (Child Safety)</Link></li>
                <li><Link href="/contact" className="hover:text-orange-600">संपर्क करें (Contact Support)</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Chunav Ranniti (चुनाव रणनीति). All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>SSL 256-Bit Encrypted</span>
              <span>&bull;</span>
              <span>Hostinger High-Security Infrastructure</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. LEAD CAPTURE MODAL */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
            <button
              onClick={() => { setLeadModalOpen(false); setLeadSubmitted(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1"
            >
              <X size={20} />
            </button>

            {leadSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">धन्यवाद!</h3>
                <p className="text-slate-600 text-sm">
                  आपकी जानकारी प्राप्त हो गई है। हमारी टीम 15 मिनट के अंदर आपसे संपर्क करेगी। आपको WhatsApp चैट पर रीडायरेक्ट किया जा रहा है...
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-black text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full">
                    FREE LIVE DEMO
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    लाइव वॉर-रूम डेमो बुक करें
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    अपना विवरण दर्ज करें, हमारी तकनीकी टीम आपकी सीट का सैंपल डेटा लाइव दिखाएगी।
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">आपका नाम *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="उदा: राजवेन्द्र सिंह"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">मोबाइल नंबर (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="उदा: 98290XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">विधानसभा / वार्ड / नगर पालिका का नाम</label>
                  <input
                    type="text"
                    value={leadForm.constituency}
                    onChange={(e) => setLeadForm({ ...leadForm, constituency: e.target.value })}
                    placeholder="उदा: ओसियां / वार्ड 12"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">आपकी भूमिका (Role)</label>
                  <select
                    value={leadForm.role}
                    onChange={(e) => setLeadForm({ ...leadForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="प्रत्याशी (Candidate)">प्रत्याशी (Candidate)</option>
                    <option value="चुनाव प्रबंधक (Campaign Manager)">चुनाव प्रबंधक (Campaign Manager)</option>
                    <option value="राजनीतिक सलाहकार (Political Strategist)">राजनीतिक सलाहकार (Political Strategist)</option>
                    <option value="पार्टी पदाधिकारी (Party Representative)">पार्टी पदाधिकारी (Party Representative)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2"
                >
                  {leadSubmitting ? (
                    <span>सबमिट हो रहा है...</span>
                  ) : (
                    <>
                      <span>तुरंत डेमो बुक करें</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
