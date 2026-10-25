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
  CheckCheck,
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
  Mic,
  Tag,
  Building2,
  Radio,
  FileSpreadsheet,
  CalendarCheck,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const DISPLAY_PHONE = '+91 98765 43210';
const WHATSAPP_NUMBER = '919876543210';
const DEMO_PORTAL_URL = 'https://app.chunavranniti.online';

// Sample voters for live interactive search sandbox
const SAMPLE_VOTERS = [
  {
    id: '1',
    epic: 'RJ/14/082/001001',
    nameHi: 'रामनिवास शर्मा',
    nameEn: 'Ramniwas Sharma',
    relHi: 'राधेश्याम शर्मा',
    relType: 'पिता',
    age: 48,
    gender: 'पुरुष',
    ward: '1',
    booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1',
    house: '12',
    caste: 'ब्राह्मण',
    voted: true,
    phone: '98290XXXXX',
    familyCount: 5,
  },
  {
    id: '2',
    epic: 'RJ/14/082/001002',
    nameHi: 'सुनीता शर्मा',
    nameEn: 'Sunita Sharma',
    relHi: 'रामनिवास शर्मा',
    relType: 'पति',
    age: 44,
    gender: 'स्त्री',
    ward: '1',
    booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1',
    house: '12',
    caste: 'ब्राह्मण',
    voted: true,
    phone: '98290XXXXX',
    familyCount: 5,
  },
  {
    id: '3',
    epic: 'RJ/14/082/001015',
    nameHi: 'मुकेश विश्नोई',
    nameEn: 'Mukesh Bishnoi',
    relHi: 'हनुमानराम विश्नोई',
    relType: 'पिता',
    age: 32,
    gender: 'पुरुष',
    ward: '2',
    booth: 'सामुदायिक भवन, कक्ष 2',
    house: '15',
    caste: 'विश्नोई',
    voted: false,
    phone: '94140XXXXX',
    familyCount: 4,
  },
  {
    id: '4',
    epic: 'RJ/14/082/001016',
    nameHi: 'कविता विश्नोई',
    nameEn: 'Kavita Bishnoi',
    relHi: 'मुकेश विश्नोई',
    relType: 'पति',
    age: 29,
    gender: 'स्त्री',
    ward: '2',
    booth: 'सामुदायिक भवन, कक्ष 2',
    house: '15',
    caste: 'विश्नोई',
    voted: false,
    phone: '94140XXXXX',
    familyCount: 4,
  },
  {
    id: '5',
    epic: 'RJ/14/082/001024',
    nameHi: 'सुरेश कुमार जाट',
    nameEn: 'Suresh Kumar Jat',
    relHi: 'भंवरलाल जाट',
    relType: 'पिता',
    age: 38,
    gender: 'पुरुष',
    ward: '3',
    booth: 'पंचायत समिति सभागार, कक्ष 3',
    house: '31',
    caste: 'जाट',
    voted: true,
    phone: '97840XXXXX',
    familyCount: 6,
  },
  {
    id: '6',
    epic: 'RJ/14/082/001032',
    nameHi: 'अशोक सिंह शेखावत',
    nameEn: 'Ashok Singh Shekhawat',
    relHi: 'डूंगर सिंह',
    relType: 'पिता',
    age: 42,
    gender: 'पुरुष',
    ward: '4',
    booth: 'राजकीय प्राथमिक विद्यालय, कक्ष 1',
    house: '45',
    caste: 'राजपूत',
    voted: false,
    phone: '99280XXXXX',
    familyCount: 3,
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Hero Interactive Tabs: 'parchi' | 'marketing' | 'family' | 'turnout' | 'workers'
  const [activeHeroTab, setActiveHeroTab] = useState<'parchi' | 'marketing' | 'family' | 'turnout' | 'workers'>('parchi');

  // Interactive Live Search Sandbox state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<typeof SAMPLE_VOTERS[0]>(SAMPLE_VOTERS[0]);
  const [sandboxFilter, setSandboxFilter] = useState<'all' | 'unvoted' | 'family'>('all');

  // Interactive Caste Tagging Demo state
  const [demoFamilyCaste, setDemoFamilyCaste] = useState('ब्राह्मण');

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
    let list = SAMPLE_VOTERS;
    if (sandboxFilter === 'unvoted') {
      list = list.filter((v) => !v.voted);
    } else if (sandboxFilter === 'family') {
      list = list.filter((v) => v.house === '12');
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (v) =>
        v.nameHi.includes(q) ||
        v.nameEn.toLowerCase().includes(q) ||
        v.epic.toLowerCase().includes(q) ||
        v.ward.includes(q) ||
        v.house.includes(q) ||
        v.caste.includes(q)
    );
  }, [searchQuery, sandboxFilter]);

  // Calculator outputs
  const calcOutput = useMemo(() => {
    const extraTurnoutPct =
      electionType === 'panchayat' ? 14 : electionType === 'ward' ? 12 : electionType === 'nagar_palika' ? 9.5 : 8.2;
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
        `नमस्कार Chunav Ranniti टीम! मैं ${leadForm.name} हूँ (${leadForm.role}, क्षेत्र: ${
          leadForm.constituency || 'जानकारी नहीं'
        })। मुझे सॉफ्टवेयर का लाइव डेमो व मूल्य जानना है। फोन: ${leadForm.phone}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-orange-600 selection:text-white">
      {/* 1. TOP LIVE ELECTION ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white text-xs py-2.5 px-4 text-center border-b border-orange-500/20 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 flex-wrap font-medium">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40 text-[11px]">
            <Flame size={12} className="text-orange-400" /> चुनाव 2026 स्पेशल इलेक्शन मैनेजमेंट
          </span>
          <span className="text-slate-200">
            आगामी विधानसभा, नगर निकाय व पंचायत चुनावों के लिए डिजिटल इलेक्शन मैनेजमेंट बुकिंग जारी!
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="inline-flex items-center gap-1 font-bold text-orange-300 hover:text-white underline underline-offset-4 transition-colors"
          >
            <span>लाइव डेमो देखें</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* 2. STICKY MODERN GLASS HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size="lg" subtitleText="चुनाव रणनीति" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7 text-[14px] font-bold text-slate-700">
            <a href="#features" className="hover:text-orange-600 transition-colors">
              मुख्य फीचर्स
            </a>
            <a href="#simulator" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              <span>लाइव इलेक्शन मैनेजमेंट</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-full">
                LIVE
              </span>
            </a>
            <a href="#marketing" className="hover:text-orange-600 transition-colors">
              WhatsApp मार्केटिंग
            </a>
            <a href="#comparison" className="hover:text-orange-600 transition-colors">
              पारंपरिक vs डिजिटल
            </a>
            <a href="#calculator" className="hover:text-orange-600 transition-colors">
              जीत कैलकुलेटर
            </a>
            <a href="#pricing" className="hover:text-orange-600 transition-colors">
              योजनाएं व मूल्य
            </a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={DEMO_PORTAL_URL}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:text-slate-950 hover:border-slate-400 font-bold text-sm transition-all"
            >
              डैशबोर्ड लॉगिन
            </Link>
            <button
              onClick={() => setLeadModalOpen(true)}
              className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Sparkles size={15} className="text-amber-200" />
              <span>फ्री डेमो लें</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3 font-bold text-slate-800 text-base">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                मुख्य फीचर्स
              </a>
              <a href="#simulator" onClick={() => setMobileMenuOpen(false)}>
                लाइव इलेक्शन मैनेजमेंट सिम्युलेटर
              </a>
              <a href="#marketing" onClick={() => setMobileMenuOpen(false)}>
                WhatsApp मार्केटिंग व बल्क ब्रॉडकास्ट
              </a>
              <a href="#comparison" onClick={() => setMobileMenuOpen(false)}>
                पारंपरिक vs डिजिटल तुलना
              </a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>
                जीत कैलकुलेटर
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                योजनाएं व मूल्य
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                अक्सर पूछे जाने वाले सवाल (FAQ)
              </a>
            </div>
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                href={DEMO_PORTAL_URL}
                className="w-full text-center py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800"
              >
                डैशबोर्ड लॉगिन
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLeadModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-center shadow-md shadow-orange-500/30"
              >
                फ्री डेमो बुक करें
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION WITH RICH AESTHETICS & TRICOLOR GLOW */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft Ambient Background Mesh */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-orange-100/70 via-amber-50/40 to-transparent blur-3xl rounded-full" />
          <div className="absolute top-48 left-10 w-96 h-96 bg-blue-100/40 blur-3xl rounded-full" />
          <div className="absolute top-48 right-10 w-96 h-96 bg-emerald-100/40 blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* National Sovereign Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-xs sm:text-sm font-bold mb-6 hover:border-orange-300 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>🇮🇳 भारत का #1 चुनाव प्रबंधन व डिजिटल इलेक्शन मैनेजमेंट इंटेलिजेंस</span>
              <span className="text-slate-300">|</span>
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
              कागज़ की पर्चियों का जमाना गया। <strong className="text-slate-900 font-semibold">10 सेकंड में 10,000+ मतदाताओं</strong> को WhatsApp पर फ़ोटो-युक्त डिजिटल पर्ची, लाइव मतदान पोल डेस्क, बल्क मार्केटिंग और 1-क्लिक परिवार जाति समीकरण से निर्णायक बढ़त पाएं।
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-black text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Zap size={18} className="text-amber-200 fill-amber-200" />
                <span>लाइव इलेक्शन मैनेजमेंट डेमो देखें</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'नमस्ते Chunav Ranniti! मुझे चुनाव प्रबंधन सॉफ्टवेयर और WhatsApp मार्केटिंग का लाइव डेमो देखना है।'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-300 text-slate-800 hover:text-slate-950 hover:border-slate-400 font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle size={20} className="text-emerald-600 fill-emerald-500/10" />
                <span>WhatsApp पर तुरंत बात करें</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>100% Meta WhatsApp Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>ECI गाइडलाइन 100% अनुकूल</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone size={16} className="text-orange-600" />
                <span>वोटर को बिना ऐप डाउनलोड के पर्ची</span>
              </div>
            </div>
          </div>

          {/* 4. HERO INTERACTIVE MULTI-TAB COMMAND CONSOLE */}
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
                    CHUNAV RANNITI &bull; ELECTION MANAGEMENT CONSOLE v4.5 (PRO)
                  </span>
                </div>

                {/* Live Booth Status Chip */}
                <div className="flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>वार्ड 1 - बूथ 14 • लाइव मतदान: 71.2% • कुल मतदाता: 1,180</span>
                </div>
              </div>

              {/* Tab Navigation in Console */}
              <div className="bg-slate-100/70 p-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
                {[
                  { key: 'parchi', label: '1. डिजिटल वोटर पर्ची (Parchi)', icon: QrCode },
                  { key: 'marketing', label: '2. WhatsApp मार्केटिंग (Live Broadcast)', icon: MessageCircle },
                  { key: 'family', label: '3. परिवार व जाति समीकरण (Family & Caste)', icon: Users },
                  { key: 'turnout', label: '4. लाइव बूथ पोल डेस्क (Turnout)', icon: Activity },
                  { key: 'workers', label: '5. पन्ना प्रमुख व कार्यकर्ता (Workers)', icon: UserCheck },
                ].map((t) => (
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
              <div className="p-6 sm:p-8 bg-white min-h-[380px]">
                {/* TAB 1: DIGITAL VOTER SLIP */}
                {activeHeroTab === 'parchi' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 bg-gradient-to-br from-orange-50/70 to-amber-50/40 p-5 rounded-2xl border-2 border-dashed border-orange-200">
                      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-700 text-xs">
                              CR
                            </span>
                            <div>
                              <p className="text-[11px] font-black text-slate-900">मतदाता सूचना पर्ची (Voter Slip)</p>
                              <p className="text-[9.5px] text-slate-500">विधानसभा निर्वाचन क्षेत्र - 2026</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                            ✓ ECI APPROVED
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                          <div className="col-span-2 space-y-1">
                            <p className="text-sm font-black text-slate-900">रामनिवास शर्मा (Ramniwas Sharma)</p>
                            <p className="text-slate-600 text-[11px]">पिता: राधेश्याम शर्मा</p>
                            <p className="font-mono text-[11px] text-orange-700 font-bold">EPIC: RJ/14/082/001001</p>
                            <p className="text-slate-600 text-[11px]">मकान नं: 12 • आयु: 48 • लिंग: पुरुष</p>
                          </div>
                          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 border border-slate-200">
                            <QrCode size={48} className="text-slate-800" />
                            <span className="text-[9px] font-bold text-slate-500 mt-1">बूथ लोकेशन QR</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 space-y-0.5">
                          <p className="font-bold text-slate-900">📍 मतदान केंद्र (Polling Station):</p>
                          <p>कक्ष 1, राजकीय उच्च माध्यमिक विद्यालय, मुख्य भवन</p>
                          <p className="text-slate-500 text-[10px]">मतदान समय: प्रातः 7:00 बजे से सायं 6:00 बजे तक</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-2.5 py-0.5 rounded-full">
                        INSTANT 1-CLICK DISPATCH
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        व्हाट्सएप पर फोटो और क्यूआर युक्त डिजिटल पर्ची
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        पारंपरिक पर्ची छापने और घर-घर बांटने में लाखों रुपये और हफ्तों का समय बर्बाद होता है। Chunav Ranniti से सेकंडों में हर वोटर के WhatsApp नंबर पर उसकी व्यक्तिगत पर्ची पहुंच जाती है, जिसमें मतदान केंद्र का Google Maps लिंक भी शामिल होता है।
                      </p>
                      <ul className="space-y-2 text-xs font-semibold text-slate-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>द्विभाषी नाम (हिंदी + English) और वोटर आईडी फोटो</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>संयुक्त परिवार पर्ची (एक ही पर्ची में घर के सभी सदस्य)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>व्हाट्सएप डिलीवरी रिपोर्ट (सिंगल, डबल व ब्लू टिक ट्रैकिंग)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 2: WHATSAPP MARKETING & BROADCAST ENGINE */}
                {activeHeroTab === 'marketing' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 bg-[#0B141A] rounded-2xl p-4 text-white font-sans shadow-xl border border-slate-800">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                            CR
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Chunav Ranniti Campaign Web</p>
                            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 24-hr Active Window
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300 font-mono">
                          9,450 Sent
                        </span>
                      </div>

                      {/* Mock Chat Bubble */}
                      <div className="space-y-2.5 my-2">
                        <div className="bg-[#005C4B] rounded-xl p-3 text-xs max-w-[92%] ml-auto shadow">
                          <p className="font-bold text-emerald-200 text-[11px] mb-1">
                            📢 जन-कल्याण संकल्प पत्र 2026 (घोषणा पत्र)
                          </p>
                          <p className="text-slate-100 text-[11.5px] leading-relaxed">
                            प्रिय मतदाता रामनिवास जी, हमारे क्षेत्र के विकास, बेहतर सड़कों, शुद्ध पेयजल और युवाओं के रोजगार के लिए अपना अमूल्य वोट अवश्य दें!
                          </p>
                          <div className="flex items-center justify-end gap-1 text-[9.5px] text-emerald-200 mt-1">
                            <span>10:42 AM</span>
                            <CheckCheck size={13} className="text-[#53BDEB]" />
                          </div>
                        </div>

                        <div className="bg-[#202C33] rounded-xl p-2.5 text-xs max-w-[85%] text-slate-200 shadow">
                          <p className="text-[11px]">जी धन्यवाद! हमारा पूरा परिवार आपके साथ है। 👍</p>
                          <span className="text-[9px] text-slate-400 block text-right mt-0.5">10:45 AM</span>
                        </div>
                      </div>

                      <div className="bg-[#202C33] rounded-xl p-2 flex items-center gap-2 mt-4">
                        <input
                          type="text"
                          readOnly
                          value="घोषणा पत्र व मतदान केंद्र विवरण भेजा गया..."
                          className="bg-transparent text-xs text-slate-300 outline-none w-full"
                        />
                        <button className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                          <Send size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        OFFICIAL META WHATSAPP ENGINE
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        प्रामाणिक WhatsApp वेब इंटरफ़ेस व बल्क ब्रॉडकास्ट
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Excel या CSV फाइल अपलोड करें, सिस्टम अपने आप मोबाइल नंबर और नाम डिटेक्ट कर लेता है। घोषणा पत्र, अपील और डिजिटल पर्चियां बिना नंबर ब्लॉक हुए 100% डिलीवर होती हैं।
                      </p>
                      <ul className="space-y-2 text-xs font-semibold text-slate-700">
                        <li className="flex items-center gap-2">
                          <CheckCheck size={16} className="text-sky-500 flex-shrink-0" />
                          <span>लाइव टिक ट्रैकिंग: सिंगल टिक (Sent), डबल टिक (Delivered), ब्लू टिक (Read)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>24-घंटे चैट विंडो सपोर्ट व मतदाता से लाइव टू-वे संवाद</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileSpreadsheet size={16} className="text-orange-600 flex-shrink-0" />
                          <span>ऑटो-डिटेक्ट एक्सेल इम्पोर्टर (बिना सिरदर्द किसी भी कॉलम से नंबर पिक)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 3: SMART FAMILY & CASTE GROUPING */}
                {activeHeroTab === 'family' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">मकान #12 परिवार दृश्य</span>
                            <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                              5 सदस्य
                            </span>
                          </div>
                          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                            🏷️ {demoFamilyCaste}
                          </span>
                        </div>

                        <div className="mt-3 text-xs space-y-2">
                          <p className="text-slate-600">
                            <strong>वरिष्ठ / मुखिया:</strong> रामनिवास शर्मा (पिता: राधेश्याम शर्मा)
                          </p>
                          <p className="text-slate-600">
                            <strong>परिवार मोबाइल:</strong> +91 98290XXXXX
                          </p>
                        </div>

                        {/* 1-Click Caste Tag Demo Selector */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <p className="text-[11px] font-bold text-slate-500 mb-2">
                            1-क्लिक में पूरे परिवार को जाति टैग दें:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {['ब्राह्मण', 'जाट', 'राजपूत', 'विश्नोई', 'गुर्जर', 'यादव', 'दलित / SC'].map((c) => (
                              <button
                                key={c}
                                onClick={() => setDemoFamilyCaste(c)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                  demoFamilyCaste === c
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                {demoFamilyCaste === c ? '✓ ' : ''}
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <span className="text-xs font-black text-purple-600 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded-full">
                        SMART HOUSEHOLD ENGINE
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        स्मार्ट परिवार समूह व 1-क्लिक जाति समीकरण
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        मतदाता सूची के मकान नंबर से पूरे परिवार को स्वचालित एक ग्रुप में लाएं। एक क्लिक में पूरे परिवार को जाति टैग दें और संयुक्त परिवार पर्ची बनाएं।
                      </p>
                      <ul className="space-y-2 text-xs font-semibold text-slate-700">
                        <li className="flex items-center gap-2">
                          <Users size={16} className="text-purple-600 flex-shrink-0" />
                          <span>पूरे परिवार को एक साथ जाति आवंटन (1-Click Direct Family Caste Tag)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-600 flex-shrink-0" />
                          <span>संयुक्त परिवार पर्ची (एक ही WhatsApp मैसेज में 6-8 सदस्यों की जानकारी)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>टॉगल अन-सेलेक्ट सपोर्ट (परिवार फ़िल्टर हटाते ही तुरंत पूरी मतदाता सूची)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 4: LIVE BOOTH TURNOUT */}
                {activeHeroTab === 'turnout' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 bg-slate-900 rounded-2xl p-5 text-white shadow-xl">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <p className="text-xs text-slate-400">लाइव बूथ डैशबोर्ड</p>
                          <p className="text-sm font-bold text-white">बूथ संख्या 14 - राजकीय विद्यालय</p>
                        </div>
                        <span className="text-xs font-black bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/40">
                          71.2% मतदान
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 my-4 text-center">
                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <p className="text-[10px] text-slate-400">कुल मतदाता</p>
                          <p className="text-base font-black text-white mt-0.5">1,180</p>
                        </div>
                        <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                          <p className="text-[10px] text-emerald-300">वोट डाला (Voted)</p>
                          <p className="text-base font-black text-emerald-400 mt-0.5">840</p>
                        </div>
                        <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                          <p className="text-[10px] text-rose-300">शेष (Remaining)</p>
                          <p className="text-base font-black text-rose-400 mt-0.5">340</p>
                        </div>
                      </div>

                      <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                        <p className="text-slate-300 font-bold mb-1">⏰ दोपहर 3 बजे की कॉलिंग लिस्ट तैयार:</p>
                        <p className="text-slate-400 text-[11px]">
                          शेष 340 मतदाताओं में से आपके 142 पक्के मतदाता अभी तक पोलिंग बूथ नहीं पहुंचे हैं। तुरंत वाहन रवाना करें!
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <span className="text-xs font-black text-rose-600 uppercase tracking-wider bg-rose-100 px-2.5 py-0.5 rounded-full">
                        ELECTION DAY DECIDER
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        मतदान दिवस का लाइव पोल डेस्क व टर्नआउट ट्रैकर
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        चुनाव केवल प्रचार से नहीं, बल्कि मतदान दिवस के अंतिम 3 घंटों के टर्नआउट से जीता जाता है। Chunav Ranniti आपके बूथ एजेंट को एक क्लिक में वोट डालने वाले का टिक लगाने देती है।
                      </p>
                      <ul className="space-y-2 text-xs font-semibold text-slate-700">
                        <li className="flex items-center gap-2">
                          <Activity size={16} className="text-rose-600 flex-shrink-0" />
                          <span>जिन्होंने वोट नहीं डाला, उनकी सेकंडों में फिल्टर लिस्ट व मोबाइल नंबर</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart3 size={16} className="text-blue-600 flex-shrink-0" />
                          <span>घंटे-वार टर्नआउट ग्राफ (सुबह 9, 11, दोपहर 1, 3 व शाम 5 बजे की स्थिति)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
                          <span>100% पक्का / 50-50 / विरोधी वोटर वर्गीकरण से अंतिम राउंड का सटीक अनुमान</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 5: PANNA PRAMUKH */}
                {activeHeroTab === 'workers' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="font-extrabold text-sm text-slate-900">पन्ना प्रमुख: सुरेश गुर्जर</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          पन्ना नं. 14
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        <p className="font-bold text-slate-900">आवंटित मतदाता: 60 (क्रम संख्या 781 से 840)</p>
                        <p className="text-emerald-700 font-semibold">✓ 54 मतदाताओं से संपर्क पूर्ण (90%)</p>
                        <p className="text-amber-700 font-semibold">⚠️ 6 प्रवासी मतदाता (सूरत से कल पहुंचेंगे)</p>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <span className="text-xs font-black text-amber-600 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-full">
                        MICRO-TARGETING
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        पन्ना प्रमुख व कार्यकर्ता मोबाइल मैनेजमेंट
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        हर कार्यकर्ता को केवल उसके 60 मतदाताओं का सीमित सुरक्षित एक्सेस दिया जाता है। मुख्य इलेक्शन मैनेजमेंट से लाइव दिखता है कि किस कार्यकर्ता ने कितने घरों में संपर्क किया।
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE SEARCH & PARCHI SIMULATOR */}
      <section id="simulator" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              INTERACTIVE SANDBOX
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              स्वयं टेस्ट करें: 0.2 सेकंड में वोटर खोज व पर्ची
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              नीचे सर्च बॉक्स में कोई भी नाम या वार्ड नंबर टाइप करके देखें कि कैसे 1 क्लिक में डिजिटल पर्ची तैयार होती है।
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg">
            {/* Quick Filter Pill Buttons */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold text-slate-500 mr-1">त्वरित फ़िल्टर:</span>
              <button
                onClick={() => setSandboxFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  sandboxFilter === 'all' ? 'bg-orange-600 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                सभी मतदाता
              </button>
              <button
                onClick={() => setSandboxFilter('unvoted')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  sandboxFilter === 'unvoted' ? 'bg-rose-600 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                जिन्होंने वोट नहीं दिया (Unvoted)
              </button>
              <button
                onClick={() => setSandboxFilter('family')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  sandboxFilter === 'family' ? 'bg-purple-600 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                मकान #12 परिवार
              </button>
            </div>

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
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        वार्ड {voter.ward}
                      </span>
                      <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                        {voter.caste}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 space-y-1">
                    <p>
                      <span className="text-slate-400">रिश्ता:</span> {voter.relType} {voter.relHi}
                    </p>
                    <p>
                      <span className="text-slate-400">EPIC:</span> <span className="font-mono">{voter.epic}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">बूथ:</span> {voter.booth}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-600">मकान नं. {voter.house}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVoter(voter);
                        const msg = encodeURIComponent(
                          `*मतदाता सूचना पर्ची (Chunav Ranniti)*\n\nनाम: ${voter.nameHi}\nपिता/पति: ${voter.relHi}\nEPIC: ${voter.epic}\nवार्ड: ${voter.ward}\nमतदान केंद्र: ${voter.booth}\n\nकृपया अपना अमूल्य वोट अवश्य डालें!`
                        );
                        window.open(`https://wa.me/?text=${msg}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
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

      {/* 6. WHATSAPP MARKETING & BULK MESSAGING OS SECTION */}
      <section id="marketing" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              ENTERPRISE WHATSAPP ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              WhatsApp मार्केटिंग व घोषणा पत्र ब्रॉडकास्ट
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              लाखों मतदाताओं तक 1-क्लिक में अपना संकल्प पत्र, भाषण वीडियो और व्यक्तिगत अपील पहुंचाएं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Excel / CSV ऑटो-डिटेक्ट</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                फाइल कैसी भी हो, हमारा AI इंजन फोन नंबर, नाम और बूथ कॉलम अपने आप पहचान लेता है। किसी भी जटिल फॉर्मेटिंग की आवश्यकता नहीं।
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <CheckCheck size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">लाइव टिक स्टेटस रिपोर्ट</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                अकसर अन्य टूल्स में पता नहीं चलता कि मैसेज पहुंचा या नहीं। Chunav Ranniti पर सिंगल टिक, डबल टिक और ब्लू टिक (Read) की स्पष्ट लाइव रिपोर्ट मिलती है।
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">24-घंटे टू-वे लाइव चैट</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                मतदाता जब आपके मैसेज का जवाब देते हैं, तो पूरी WhatsApp चैट विंडो आपके डैशबोर्ड पर लाइव खुल जाती है जिससे तुरंत बात की जा सकती है।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STRATEGIC COMPARISON: OLD WAY VS CHUNAV RANNITI */}
      <section id="comparison" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              STRATEGIC COMPARISON
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              पारंपरिक प्रचार बनाम Chunav Ranniti इलेक्शन मैनेजमेंट
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              जानें कि आधुनिक डिजिटल उम्मीदवार 8-14% अतिरिक्त वोट कैसे जुटाते हैं।
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-2 bg-slate-900 text-white text-xs sm:text-sm font-bold text-center py-4">
              <div className="text-rose-400">❌ पुराना पारंपरिक तरीका (Old Way)</div>
              <div className="text-emerald-400">✅ Chunav Ranniti डिजिटल इलेक्शन मैनेजमेंट</div>
            </div>

            <div className="divide-y divide-slate-200 text-xs sm:text-sm">
              {[
                {
                  old: 'हजारों कागज़ की पर्चियां छपवाना, भारी खर्च और सड़कों पर बिखरना',
                  pro: '10 सेकंड में 10,000+ मतदाताओं के फोन पर सुरक्षित डिजिटल पर्ची',
                },
                {
                  old: 'मतदान दिवस पर अंधेरे में रहना कि कौन वोट दे गया, कौन बाकी है',
                  pro: 'लाइव बूथ पोल डेस्क: 1-क्लिक में बाकी मतदाताओं की सूची और कॉलिंग',
                },
                {
                  old: 'जाति और परिवार का अंदाजा लगाना, गलत अनुमान से नुकसान',
                  pro: '1-क्लिक परिवार समूह व सटीक जातिगत वर्गीकरण से मजबूत वोट बैंक',
                },
                {
                  old: 'कार्यकर्ताओं का फर्जी दावा कि "पूरे इलाके में घूम आया हूँ"',
                  pro: 'पन्ना प्रमुख मैनेजमेंट: 60 मतदाताओं पर रियल-टाइम ट्रैकिंग रिपोर्ट',
                },
                {
                  old: 'प्रवासी मतदाताओं (बाहर रहने वाले) का कोई रिकॉर्ड नहीं होना',
                  pro: 'प्रवासी वोटर आउटरीच: आने की तारीख, टिकट व वाहन समन्वय ट्रैकिंग',
                },
                {
                  old: 'अंतिम 3 घंटों में कोई रणनीति नहीं, भाग्य के भरोसे बैठना',
                  pro: 'अंतिम 3 घंटे की आपात कॉलिंग और पक्के वोटर्स को बूथ तक लाना',
                },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 p-4 sm:p-5 gap-4 items-center">
                  <div className="text-slate-600 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✗</span>
                    <span>{row.old}</span>
                  </div>
                  <div className="text-slate-900 font-bold flex items-start gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-emerald-600 font-extrabold">✓</span>
                    <span>{row.pro}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE VICTORY & TURNOUT ROI CALCULATOR */}
      <section id="calculator" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              VICTORY CALCULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              अपनी सीट के लिए संभावित अतिरिक्त वोटों की गणना करें
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              स्लाइडर खिसकाकर देखें कि Chunav Ranniti से आपकी सीट पर कितने अतिरिक्त वोट निकल सकते हैं।
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
            {/* Election Type Selection */}
            <div className="mb-8">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
                चुनाव का प्रकार चुनें:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'vidhan_sabha', label: 'विधानसभा चुनाव', avg: '2,00,000+ वोट' },
                  { key: 'nagar_palika', label: 'नगर निगम / परिषद', avg: '40,000+ वोट' },
                  { key: 'ward', label: 'नगर पालिका / वार्ड', avg: '12,000+ वोट' },
                  { key: 'panchayat', label: 'ग्राम पंचायत', avg: '4,500+ वोट' },
                ].map((type) => (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => {
                      setElectionType(type.key);
                      if (type.key === 'vidhan_sabha') setVoterCount(180000);
                      else if (type.key === 'nagar_palika') setVoterCount(45000);
                      else if (type.key === 'ward') setVoterCount(12000);
                      else if (type.key === 'panchayat') setVoterCount(4500);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      electionType === type.key
                        ? 'bg-orange-50 border-orange-500 text-orange-700 font-extrabold ring-2 ring-orange-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700 font-semibold hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{type.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{type.avg}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Voter Count Slider */}
            <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-700">आपकी सीट के कुल मतदाता:</span>
                <span className="text-2xl font-black text-orange-600">{voterCount.toLocaleString('en-IN')} मतदाता</span>
              </div>
              <input
                type="range"
                min={2000}
                max={250000}
                step={1000}
                value={voterCount}
                onChange={(e) => setVoterCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>

            {/* Calculator Output KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-emerald-800">संभावित अतिरिक्त वोट लाभ</p>
                <p className="text-3xl font-black text-emerald-600 mt-1">
                  +{calcOutput.extraVotes.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  (+{calcOutput.extraTurnoutPct}% टर्नआउट वृद्धि)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-blue-800">पर्ची वितरण में समय</p>
                <p className="text-3xl font-black text-blue-600 mt-1">
                  ~{calcOutput.slipDispatchMinutes} मिनट
                </p>
                <p className="text-[11px] text-blue-700 font-medium mt-1">
                  (पारंपरिक रूप से 10-12 दिन लगते हैं)
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-orange-800">कागज़ व छपाई बचत</p>
                <p className="text-3xl font-black text-orange-600 mt-1">
                  ₹{calcOutput.paperCostSaved.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-orange-700 font-medium mt-1">
                  (प्रिंटिंग व बांटने का खर्च शून्य)
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>इस डेटा पर अपनी सीट का इलेक्शन मैनेजमेंट बुक करें</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TRANSPARENT ELECTION MANAGEMENT PACKAGES & PRICING */}
      <section id="pricing" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              ELECTION MANAGEMENT PLANS
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">वार्ड व पंचायत</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">बेसिक इलेक्शन मैनेजमेंट</h3>
                <p className="text-slate-600 text-xs mt-1">वार्ड, ग्राम पंचायत व पार्षद चुनाव हेतु</p>
              </div>

              <div>
                <span className="text-3xl font-black text-slate-900">₹3,999</span>
                <span className="text-slate-500 text-xs font-bold"> / चुनाव संपूर्ण</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>5,000 मतदाताओं तक संपूर्ण डेटाबेस</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>डिजिटल WhatsApp वोटर पर्ची</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>परिवार समूह व 1-क्लिक जाति टैगिंग</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>लाइव पोलिंग बूथ टर्नआउट डेस्क</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>5 कार्यकर्ताओं हेतु मोबाइल लॉगिन</span>
                </li>
              </ul>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-3 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-slate-900 transition-colors"
              >
                प्लान चुनें व डेमो लें
              </button>
            </div>

            {/* Plan 2: Nagar Palika (Featured) */}
            <div className="p-8 rounded-3xl bg-white border-2 border-orange-500 shadow-2xl shadow-orange-500/10 space-y-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                MOST POPULAR
              </span>

              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">नगर पालिका / परिषद</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">प्रो इलेक्शन मैनेजमेंट</h3>
                <p className="text-slate-600 text-xs mt-1">मध्यम नगर परिषद व विधानसभा वार्ड्स</p>
              </div>

              <div>
                <span className="text-3xl font-black text-slate-900">₹14,999</span>
                <span className="text-slate-500 text-xs font-bold"> / चुनाव संपूर्ण</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>35,000 मतदाताओं तक संपूर्ण डेटाबेस</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>WhatsApp मार्केटिंग व बल्क ब्रॉडकास्ट</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>संयुक्त परिवार पर्ची व जाति समीकरण</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>प्रवासी मतदाता आउटरीच व कॉलिंग</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>25 कार्यकर्ताओं हेतु मोबाइल ऐप एक्सेस</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>24/7 फोन व WhatsApp सपोर्ट</span>
                </li>
              </ul>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all"
              >
                प्रो प्लान तुरंत बुक करें
              </button>
            </div>

            {/* Plan 3: Vidhan Sabha Enterprise */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">विधानसभा संपूर्ण</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">एंटरप्राइज इलेक्शन मैनेजमेंट</h3>
                <p className="text-slate-600 text-xs mt-1">संपूर्ण विधानसभा क्षेत्र (2.5 लाख वोटर)</p>
              </div>

              <div>
                <span className="text-3xl font-black text-slate-900">₹39,999</span>
                <span className="text-slate-500 text-xs font-bold"> / चुनाव संपूर्ण</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>असीमित मतदाता व 300+ बूथ लाइव</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>समर्पित टेक्निकल मैनेजर व इलेक्शन मैनेजमेंट ऑनबोर्डिंग</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>पन्ना प्रमुख व बूथ अध्यक्ष असीमित लॉगिन</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>कस्टम चुनावी घोषणा पत्र व वीडियो ब्रॉडकास्ट</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>मतदान दिवस रियल-टाइम टर्नआउट कंट्रोल सेंटर</span>
                </li>
              </ul>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-3 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-slate-900 transition-colors"
              >
                एंटरप्राइज प्लान संपर्क करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COMPREHENSIVE FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              अक्सर पूछे जाने वाले सवाल (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'क्या WhatsApp पर पर्चियां भेजने से हमारा नंबर ब्लॉक हो सकता है?',
                a: 'बिल्कुल नहीं। हम आधिकारिक Meta WhatsApp Cloud API और ECI अनुमोदित टेम्पलेट्स का उपयोग करते हैं। इससे 100% सुरक्षित डिलीवरी होती है और नंबर बैन होने का कोई जोखिम नहीं रहता।',
              },
              {
                q: 'क्या वोटर को कोई ऐप डाउनलोड करना पड़ेगा?',
                a: 'नहीं। मतदाता को सीधे उनके सामान्य WhatsApp पर फोटो और क्यूआर कोड युक्त पर्ची मिलती है। उन्हें कोई भी ऐप या सॉफ्टवेयर डाउनलोड करने की जरूरत नहीं होती।',
              },
              {
                q: 'हमारा चुनावी डेटा कितना सुरक्षित और गोपनीय रहेगा?',
                a: 'आपका संपूर्ण डेटाबेस 256-Bit SSL एन्क्रिप्टेड सर्वर पर होस्ट होता है। आपके डेटा का एक्सेस केवल आपके मुख्य इलेक्शन मैनेजमेंट एडमिन के पास होता है। आपके विरोधी या किसी अन्य व्यक्ति को इसकी भनक भी नहीं लग सकती।',
              },
              {
                q: 'परिवार समूह (Family Grouping) और जाति टैगिंग कैसे काम करती है?',
                a: 'सॉफ्टवेयर सरकारी वोटर लिस्ट के मकान नंबर के आधार पर पूरे परिवार को स्वतः पहचान लेता है। 1-क्लिक में पूरे परिवार को जाति आवंटित की जा सकती है और एक ही WhatsApp संदेश में संयुक्त परिवार पर्ची भेजी जा सकती है।',
              },
              {
                q: 'सॉफ्टवेयर सेटअप होने में कितना समय लगता है?',
                a: 'जैसे ही आप हमें अपनी सीट की निर्वाचन नामावली (PDF या एक्सेल) देते हैं, हमारी टेक्निकल टीम 12 से 24 घंटे के अंदर आपकी पूरी सीट का इलेक्शन मैनेजमेंट लाइव कर देती है।',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center text-sm sm:text-base"
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

      {/* 11. HIGH-CONVERTING FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black">
            क्या आप इस बार चुनाव में निर्णायक बढ़त के लिए तैयार हैं?
          </h2>
          <p className="mt-3 text-orange-100 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            अपनी विधानसभा, नगर पालिका या वार्ड का इलेक्शन मैनेजमेंट आज ही सेटअप करवाएं। हमारी टेक्निकल टीम 24 घंटे में आपका पूरा डेटा लाइव कर देगी।
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-base shadow-xl transition-all"
            >
              लाइव इलेक्शन मैनेजमेंट डेमो बुक करें
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('नमस्ते Chunav Ranniti! मुझे इलेक्शन मैनेजमेंट सेटअप की पूरी जानकारी चाहिए।')}`}
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

      {/* 12. MODERN MULTI-COLUMN FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
            {/* Col 1: Brand Info */}
            <div className="space-y-4 md:col-span-1">
              <BrandLogo size="md" subtitleText="चुनाव रणनीति" />
              <p className="text-slate-500 text-xs leading-relaxed">
                भारत का सबसे आधुनिक, विश्वसनीय और परिणाम-उन्मुख डिजिटल चुनाव प्रबंधन एवं इलेक्शन मैनेजमेंट प्लेटफ़ॉर्म।
              </p>
              <div className="text-xs text-slate-500 space-y-1">
                <p>
                  हेल्पलाइन: <strong className="text-slate-900">{DISPLAY_PHONE}</strong>
                </p>
                <p>ईमेल: support@chunavranniti.online</p>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">प्लेटफ़ॉर्म फीचर्स</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#features" className="hover:text-orange-600">
                    डिजिटल वोटर पर्ची
                  </a>
                </li>
                <li>
                  <a href="#marketing" className="hover:text-orange-600">
                    WhatsApp मार्केटिंग OS
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-orange-600">
                    बूथ पोल डेस्क
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-orange-600">
                    परिवार व जाति समीकरण
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-orange-600">
                    पन्ना प्रमुख मैनेजमेंट
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Elections */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">समाधान (Solutions)</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#pricing" className="hover:text-orange-600">
                    विधानसभा इलेक्शन मैनेजमेंट
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-orange-600">
                    नगर निगम व परिषद चुनाव
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-orange-600">
                    ग्राम पंचायत व वार्ड चुनाव
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-orange-600">
                    वोटर टर्नआउट कैलकुलेटर
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Security */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">सुरक्षा व नीतियां</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/privacy" className="hover:text-orange-600">
                    गोपनीयता नीति (Privacy Policy)
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-orange-600">
                    नियम व शर्तें (Terms of Service)
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-orange-600">
                    रिफंड नीति (Refund Policy)
                  </Link>
                </li>
                <li>
                  <Link href="/child-safety" className="hover:text-orange-600">
                    बाल सुरक्षा मानक (Child Safety)
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-600">
                    संपर्क करें (Contact Support)
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Chunav Ranniti (चुनाव रणनीति). सर्वाधिकार सुरक्षित।</p>
            <div className="flex items-center gap-4">
              <span>SSL 256-Bit Encrypted</span>
              <span>&bull;</span>
              <span>ECI Guidelines Compliant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. LEAD CAPTURE MODAL */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
            <button
              onClick={() => {
                setLeadModalOpen(false);
                setLeadSubmitted(false);
              }}
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
                  <h3 className="text-2xl font-black text-slate-900 mt-2">लाइव इलेक्शन मैनेजमेंट डेमो बुक करें</h3>
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
