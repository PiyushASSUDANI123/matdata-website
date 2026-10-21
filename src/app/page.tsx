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
} from 'lucide-react';

const DISPLAY_PHONE = '+91 98765 43210';
const WHATSAPP_NUMBER = '919876543210';

// Sample voters for live interactive search sandbox
const SAMPLE_VOTERS = [
  { id: '1', epic: 'RJ/14/082/001001', nameHi: 'रामनिवास शर्मा', nameEn: 'Ramniwas Sharma', relHi: 'राधेश्याम शर्मा', relType: 'पिता', age: 48, gender: 'पुरुष', ward: '1', booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1', house: '12', caste: 'ब्राह्मण', voted: true },
  { id: '2', epic: 'RJ/14/082/001002', nameHi: 'सुनीता शर्मा', nameEn: 'Sunita Sharma', relHi: 'रामनिवास शर्मा', relType: 'पति', age: 44, gender: 'स्त्री', ward: '1', booth: 'राजकीय उच्च माध्यमिक विद्यालय, कक्ष 1', house: '12', caste: 'ब्राह्मण', voted: true },
  { id: '3', epic: 'RJ/14/082/001015', nameHi: 'मुकेश विश्नोई', nameEn: 'Mukesh Bishnoi', relHi: 'हनुमानराम विश्नोई', relType: 'पिता', age: 32, gender: 'पुरुष', ward: '2', booth: 'सामुदायिक भवन, कक्ष 2', house: '15', caste: 'विश्नोई', voted: false },
  { id: '4', epic: 'RJ/14/082/001016', nameHi: 'कविता विश्नोई', nameEn: 'Kavita Bishnoi', relHi: 'मुकेश विश्नोई', relType: 'पति', age: 29, gender: 'स्त्री', ward: '2', booth: 'सामुदायिक भवन, कक्ष 2', house: '15', caste: 'विश्नोई', voted: false },
  { id: '5', epic: 'RJ/14/082/001024', nameHi: 'सुरेश कुमार जाट', nameEn: 'Suresh Kumar Jat', relHi: 'भंवरलाल जाट', relType: 'पिता', age: 38, gender: 'पुरुष', ward: '3', booth: 'पंचायत समिति सभागार, कक्ष 3', house: '31', caste: 'जाट', voted: true },
  { id: '6', epic: 'RJ/14/082/001025', nameHi: 'मंजू चौधरी', nameEn: 'Manju Choudhary', relHi: 'सुरेश कुमार जाट', relType: 'पति', age: 35, gender: 'स्त्री', ward: '3', booth: 'पंचायत समिति सभागार, कक्ष 3', house: '31', caste: 'जाट', voted: false },
  { id: '7', epic: 'RJ/14/082/001032', nameHi: 'अशोक सिंह शेखावत', nameEn: 'Ashok Singh Shekhawat', relHi: 'डूंगर सिंह', relType: 'पिता', age: 42, gender: 'पुरुष', ward: '4', booth: 'राजकीय प्राथमिक विद्यालय, कक्ष 1', house: '45', caste: 'राजपूत', voted: false },
  { id: '8', epic: 'RJ/14/082/001045', nameHi: 'किशनलाल मेघवाल', nameEn: 'Kishanlal Meghwal', relHi: 'मोहनराम मेघवाल', relType: 'पिता', age: 55, gender: 'पुरुष', ward: '5', booth: 'गांधी बाल मंदिर, कक्ष 2', house: '62', caste: 'मेघवाल', voted: true },
  { id: '9', epic: 'RJ/14/082/001058', nameHi: 'प्रकाश प्रजापत', nameEn: 'Prakash Prajapat', relHi: 'बाबूलाल प्रजापत', relType: 'पिता', age: 26, gender: 'पुरुष', ward: '6', booth: 'नगर पालिका वाचनालय', house: '78', caste: 'प्रजापत', voted: false },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  // Workspace Demo Tab (0: Voter Slip, 1: Turnout Command, 2: Karyakarta Roster)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'slip' | 'turnout' | 'workers'>('slip');
  const [slipSentState, setSlipSentState] = useState(false);
  
  // Interactive Live Search Sandbox
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<typeof SAMPLE_VOTERS[0]>(SAMPLE_VOTERS[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lead Form
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

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#09090b] flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. EXECUTIVE MINIMAL NAVBAR */}
      <header className="sticky top-0 z-50 glass-nav-minimal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="Matdata Portal"
              className="w-10 h-10 object-contain rounded-xl transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-black tracking-tight text-slate-900 leading-none">
                Matdata<span className="text-blue-600">Portal</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">
                मतदाता प्रबंधन प्रणाली
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#capabilities" className="hover:text-slate-900 transition-colors">क्षमताएं (Capabilities)</a>
            <a href="#sandbox" className="hover:text-slate-900 transition-colors">लाइव सैंडबॉक्स (Live Demo)</a>
            <a href="#workflow" className="hover:text-slate-900 transition-colors">कार्यप्रणाली (Workflow)</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">पैकेज (Plans)</a>
            <a href="#compliance" className="hover:text-slate-900 transition-colors">कानूनी सुरक्षा (Compliance)</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://matdataportal.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <span>लॉगिन (Console)</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
            <button
              onClick={() => setLeadModalOpen(true)}
              className="btn-primary px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Zap size={14} className="text-blue-400" />
              <span>लाइव डेमो बुक करें</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-4 shadow-xl">
            <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-700">क्षमताएं</a>
            <a href="#sandbox" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-700">लाइव सैंडबॉक्स</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-700">कार्यप्रणाली</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-700">पैकेज</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-slate-700">कानूनी सुरक्षा</a>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); setLeadModalOpen(true); }}
                className="w-full btn-primary py-3 rounded-xl text-sm font-bold text-center"
              >
                लाइव डेमो बुक करें
              </button>
              <a
                href="https://matdataportal.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="w-full btn-secondary py-3 rounded-xl text-sm font-bold text-center"
              >
                कंसोल लॉगिन (Console)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION - MINIMALIST CIVIC OS */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-minimal-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>भारत का आधुनिक चुनाव वॉर-रूम ऑपरेटिंग सिस्टम</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              स्मार्ट बूथ इंटेलिजेंस एवं <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900">
                1-क्लिक डिजिटल मतदाता पर्ची
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              लाखों मतदाताओं की सटीक खोज, आधिकारिक Meta WhatsApp पर्ची वितरण, पन्ना प्रमुख लाइव ट्रैकिंग और चुनाव दिवस का रियल-टाइम टर्नआउट एनालिटिक्स — एक ही सुरक्षित प्लेटफ़ॉर्म पर।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full sm:w-auto btn-primary px-7 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>निःशुल्क लाइव डेमो शुरू करें</span>
                <ArrowRight size={16} />
              </button>
              <a
                href={getWaLink('नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम और वोटर पर्ची का लाइव डेमो चाहिए।')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto btn-secondary px-6 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} className="text-green-600" />
                <span>WhatsApp पर बात करें ({DISPLAY_PHONE})</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 pt-3 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-blue-600" /> 100% Zero-Block Meta WhatsApp API
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-blue-600" /> 0.1s त्वरित मतदाता खोज
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-blue-600" /> ECI एवं DPDP Act 2023 अनुपालन
              </span>
            </div>
          </div>

          {/* INTERACTIVE WORKSPACE PREVIEW BENTO */}
          <div className="mt-14 max-w-5xl mx-auto minimal-card p-4 sm:p-7 bg-white">
            {/* Minimalist Tab Navigation */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-slate-100/80 p-1 rounded-xl">
                <button
                  onClick={() => setActiveWorkspaceTab('slip')}
                  className={`tab-pill cursor-pointer flex items-center gap-2 ${activeWorkspaceTab === 'slip' ? 'active' : ''}`}
                >
                  <Smartphone size={15} />
                  <span>1-क्लिक डिजिटल पर्ची</span>
                </button>
                <button
                  onClick={() => setActiveWorkspaceTab('turnout')}
                  className={`tab-pill cursor-pointer flex items-center gap-2 ${activeWorkspaceTab === 'turnout' ? 'active' : ''}`}
                >
                  <BarChart3 size={15} />
                  <span>लाइव टर्नआउट वॉर-रूम</span>
                </button>
                <button
                  onClick={() => setActiveWorkspaceTab('workers')}
                  className={`tab-pill cursor-pointer flex items-center gap-2 ${activeWorkspaceTab === 'workers' ? 'active' : ''}`}
                >
                  <Users size={15} />
                  <span>पन्ना प्रमुख व कार्यकर्ता</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>लाइव सिस्टम सिमुलेटर</span>
              </div>
            </div>

            {/* TAB CONTENT 1: VOTER SLIP SIMULATOR */}
            {activeWorkspaceTab === 'slip' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-7 space-y-4">
                  <div className="badge-minimal badge-blue">
                    <Sparkles size={12} />
                    <span>WhatsApp डिलीवरी ऑटोमेशन</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">
                    प्रत्येक मतदाता को मिले उसकी आधिकारिक मतदान पर्ची सीधे WhatsApp पर
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    मतदाता का नाम, क्रम संख्या, भाग संख्या, मतदान केंद्र का पता और गूगल मैप्स लोकेशन 1 सेकंड में व्हाट्सएप पर। न कागज़ छपाई का खर्च, न पर्ची खोने का डर।
                  </p>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <span>सिस्टम डिलीवरी पैरामीटर</span>
                      <span className="text-emerald-700">Meta Cloud API V20.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">टेम्पलेट स्टेटस:</span>
                      <span className="font-semibold text-slate-900">Pre-approved Voter Notice</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">औसत प्रेषण गति:</span>
                      <span className="font-semibold text-slate-900">0.8 सेकंड / पर्ची</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ऑप्ट-आउट सुविधा:</span>
                      <span className="font-semibold text-emerald-700">STOP लिखने पर तत्काल निष्क्रिय</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSlipSentState(true);
                        setTimeout(() => setSlipSentState(false), 3500);
                      }}
                      className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                        slipSentState
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'btn-primary'
                      }`}
                    >
                      {slipSentState ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>WhatsApp पर सफलतापूर्वक भेजा गया (0.8s)</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>डेमो पर्ची भेजकर देखें (Test Send)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* THE DIGITAL SLIP CARD */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-sm bg-white border border-slate-300 rounded-2xl shadow-lg p-5 relative overflow-hidden">
                    {/* Header Stripe */}
                    <div className="h-2 bg-gradient-to-r from-amber-500 via-white to-emerald-600 -mx-5 -mt-5 mb-4" />

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">विधानसभा निर्वाचन 2026</div>
                        <div className="text-sm font-black text-slate-900">मतदाता सूचना पर्ची (Voter Slip)</div>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                        क्रमांक #12
                      </span>
                    </div>

                    <div className="py-4 space-y-2.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-dashed border-slate-200">
                        <span className="text-slate-500">मतदाता का नाम:</span>
                        <span className="font-bold text-slate-900">रामनिवास शर्मा</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-dashed border-slate-200">
                        <span className="text-slate-500">पिता का नाम:</span>
                        <span className="font-semibold text-slate-800">राधेश्याम शर्मा</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-dashed border-slate-200">
                        <span className="text-slate-500">पहचान पत्र (EPIC):</span>
                        <span className="font-mono font-bold text-blue-700">RJ/14/082/001001</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 py-1 border-b border-dashed border-slate-200">
                        <div>
                          <span className="text-slate-500 block">भाग संख्या:</span>
                          <span className="font-bold text-slate-900">14 (वार्ड 1)</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">क्रम संख्या:</span>
                          <span className="font-bold text-slate-900">12</span>
                        </div>
                      </div>
                      <div className="py-1">
                        <span className="text-slate-500 block">मतदान केंद्र (Booth):</span>
                        <span className="font-bold text-slate-900 block mt-0.5">
                          राजकीय उच्च माध्यमिक विद्यालय, कक्ष क्र. 1
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2.5 text-[11px] text-slate-600 flex items-center justify-between mt-2 border border-slate-200">
                      <span>मतदान समय: सुबह 7:00 से सायं 5:00</span>
                      <span className="font-bold text-emerald-700">मतदान अवश्य करें</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: LIVE TURNOUT */}
            {activeWorkspaceTab === 'turnout' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      लाइव टर्नआउट मॉनिटरिंग एवं पोलिंग बूथ कमांड
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      चुनाव दिवस पर हर घंटे मतदान का सटीक प्रतिशत और अन-वोटेड मतदाताओं की तत्काल सूची।
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">बूथ चुनें:</span>
                    <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800">
                      <option>समस्त बूथ (वार्ड 1-10) - कुल 12,450 वोट</option>
                      <option>बूथ क्र. 1 (रा.उ.मा.वि. कक्ष 1)</option>
                      <option>बूथ क्र. 2 (सामुदायिक केंद्र)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">कुल पंजीकृत मतदाता</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">12,450</div>
                    <span className="text-[10px] text-slate-500">10 वार्डों में विभाजित</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase">मतदान हुआ (Voted)</span>
                    <div className="text-2xl font-black text-emerald-700 mt-1">8,340</div>
                    <span className="text-[10px] font-bold text-emerald-800">66.98% कुल टर्नआउट</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-amber-800 uppercase">शेष मतदाता (Pending)</span>
                    <div className="text-2xl font-black text-amber-700 mt-1">4,110</div>
                    <span className="text-[10px] font-bold text-amber-800">लक्ष्य: 75% पार करना</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-blue-800 uppercase">सक्रिय पन्ना प्रमुख</span>
                    <div className="text-2xl font-black text-blue-700 mt-1">84 / 92</div>
                    <span className="text-[10px] text-blue-800">ग्राउंड पर लाइव एक्टिव</span>
                  </div>
                </div>

                {/* Simulated Turnout Chart Bars */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>घंटे-वार मतदान प्रगति (Hourly Turnout Progression)</span>
                    <span className="text-blue-700">लाइव अपडेट 3:30 PM</span>
                  </div>
                  <div className="space-y-2 pt-2">
                    {[
                      { time: '07:00 AM - 09:00 AM', pct: 18, voters: '2,240 वोट' },
                      { time: '09:00 AM - 11:00 AM', pct: 36, voters: '4,480 वोट' },
                      { time: '11:00 AM - 01:00 PM', pct: 52, voters: '6,470 वोट' },
                      { time: '01:00 PM - 03:00 PM', pct: 67, voters: '8,340 वोट' },
                      { time: '03:00 PM - 05:00 PM (वर्तमान चरण)', pct: 76, voters: 'लक्ष्य 9,500 वोट' },
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-semibold text-slate-700">{row.time}</span>
                          <span className="font-bold text-slate-900">{row.pct}% ({row.voters})</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: KARYAKARTA & PANNA PRAMUKH */}
            {activeWorkspaceTab === 'workers' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      पन्ना प्रमुख व कार्यकर्ता लाइव समन्वय
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      प्रत्येक पन्ने और परिवार की सीधी ज़िम्मेदारी। कौन से मतदाता से संपर्क हुआ, कौन बाकी है।
                    </p>
                  </div>
                  <span className="badge-minimal badge-amber text-xs">
                    <UserCheck size={13} />
                    <span>84 सक्रिय फील्ड कार्यकर्ता</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'राकेश चौधरी', ward: 'वार्ड 1 (पन्ना 1-3)', target: '180 मतदाता', done: '154 संपर्क', pct: 85, phone: '98291XXXXX' },
                    { name: 'विकास शर्मा', ward: 'वार्ड 2 (पन्ना 4-6)', target: '175 मतदाता', done: '162 संपर्क', pct: 92, phone: '98292XXXXX' },
                    { name: 'संजय विश्नोई', ward: 'वार्ड 3 (पन्ना 7-9)', target: '190 मतदाता', done: '138 संपर्क', pct: 72, phone: '98293XXXXX' },
                  ].map((worker, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{worker.name}</div>
                          <div className="text-xs text-slate-500">{worker.ward}</div>
                        </div>
                        <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {worker.pct}% पूर्ण
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${worker.pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-slate-600 pt-1">
                        <span>लक्ष्य: {worker.target}</span>
                        <span className="font-bold text-emerald-700">{worker.done}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. METRIC TICKER STRIP */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="px-4">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">0.1s</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">त्वरित मतदाता खोज गति</p>
            </div>
            <div className="px-4 pt-4 sm:pt-0">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">99.8%</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">ECI PDF से OCR सटीकता</p>
            </div>
            <div className="px-4 pt-4 sm:pt-0">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">100%</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">आधिकारिक Meta Cloud API</p>
            </div>
            <div className="px-4 pt-4 sm:pt-0">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">DPDP</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">Act 2023 पूर्ण अनुपालन</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE SEARCH SANDBOX (UNIQUE EXPERIENCE) */}
      <section id="sandbox" className="py-20 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="badge-minimal badge-blue">
              <SlidersHorizontal size={12} />
              <span>लाइव सैंडबॉक्स • चलाकर देखें</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              स्वयं खोजें और 1-क्लिक पर्ची देखें
            </h2>
            <p className="text-sm text-slate-600">
              नीचे सर्च बार में नाम, जाति या पहचान पत्र लिखकर देखें कि कार्यकर्ता फील्ड में कितनी आसानी से वोटर खोजते हैं।
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search Input Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="मतदाता का नाम या EPIC संख्या लिखें (उदा. रामनिवास, शर्मा, विश्नोई, RJ/14)..."
                className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filtered Voters List and Detail Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Results List */}
              <div className="md:col-span-7 space-y-2.5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  परिणाम ({filteredVoters.length} मतदाता मिले)
                </div>

                {filteredVoters.length === 0 ? (
                  <div className="minimal-card p-8 text-center text-slate-500 text-sm">
                    कोई मतदाता नहीं मिला। &quot;रामनिवास&quot; या &quot;शर्मा&quot; लिखकर खोजें।
                  </div>
                ) : (
                  filteredVoters.map((voter) => (
                    <div
                      key={voter.id}
                      onClick={() => setSelectedVoter(voter)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedVoter.id === voter.id
                          ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <span>{voter.nameHi}</span>
                            <span className="text-[11px] font-normal text-slate-500">({voter.nameEn})</span>
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            {voter.relType}: {voter.relHi} &bull; आयु: {voter.age} &bull; लिंग: {voter.gender}
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-blue-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          {voter.epic}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span>वार्ड नं. {voter.ward}</span>
                        <span>&bull;</span>
                        <span>मकान नं. {voter.house}</span>
                        <span>&bull;</span>
                        <span className="text-slate-700 font-medium">{voter.caste}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: Live Slip for Selected Voter */}
              <div className="md:col-span-5">
                <div className="sticky top-24 bg-white border border-slate-300 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="badge-minimal badge-blue text-[10px]">चुने गए मतदाता की पर्ची</span>
                    <span className="text-xs font-bold text-slate-700">वार्ड {selectedVoter.ward}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                      <div className="text-[11px] text-slate-500">मतदाता का नाम</div>
                      <div className="font-bold text-base text-slate-900">{selectedVoter.nameHi}</div>
                      <div className="text-xs text-slate-600">{selectedVoter.relType}: {selectedVoter.relHi}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 block">पहचान पत्र क्र.</span>
                        <span className="font-mono font-bold text-xs text-blue-700">{selectedVoter.epic}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 block">मकान / आयु</span>
                        <span className="font-bold text-xs text-slate-800">नं. {selectedVoter.house} / {selectedVoter.age} वर्ष</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 block">मतदान केंद्र</span>
                      <span className="font-semibold text-xs text-slate-900">{selectedVoter.booth}</span>
                    </div>
                  </div>

                  <a
                    href={getWaLink(`नमस्ते ${selectedVoter.nameHi} जी, आपकी मतदान पर्ची: पहचान पत्र: ${selectedVoter.epic}, मतदान केंद्र: ${selectedVoter.booth}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full btn-whatsapp py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <MessageCircle size={15} />
                    <span>इस मतदाता को WhatsApp भेजें</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE 4 STRATEGIC ARCHITECTURAL PILLARS (BENTO GRID) */}
      <section id="capabilities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="badge-minimal badge-blue">
              <Layers size={12} />
              <span>मूलभूत क्षमताएं • Architectural Pillars</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              आधुनिक चुनाव प्रबंधन के 4 मुख्य आधार
            </h2>
            <p className="text-sm text-slate-600">
              पारंपरिक कागज़ी चुनाव के दौर से निकलकर हाई-टेक डिजिटल वार-रूम तक का संपूर्ण समाधान।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="minimal-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Database size={24} />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  AI ऑप्टिकल वोटर पार्सिंग (OCR)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  चुनाव आयोग (ECI) की स्कैन की गई धुंधली पीडीएफ सूचियों से 99.8% सटीकता के साथ हिंदी-अंग्रेजी डेटाबेस, मकान नंबर और परिवार समूह तैयार करना।
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-blue-700 flex items-center gap-1">
                <span>15 मिनट में डिजिटल डेटा</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="minimal-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Smartphone size={24} />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Meta WhatsApp ऑफिशियल API
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  बिना किसी पर्सनल सिम ब्लॉक के डर के अधिकृत Meta Cloud API द्वारा मतदाता सूचना पर्चियां, प्रत्याशी संदेश और मतदान केंद्र मैप्स भेजना।
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <span>Zero Banning Guarantee</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="minimal-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <UserCheck size={24} />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  पन्ना प्रमुख व सूक्ष्म रणनीति
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  हर कार्यकर्ता को केवल उसके पन्ने और मोहल्ले का डेटा। कोर समर्थक, स्विंग वोटर, प्रवासी और बुजुर्ग मतदाताओं का 1-टच वर्गीकरण।
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-indigo-700 flex items-center gap-1">
                <span>सटीक बूथ समन्वय</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="minimal-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  चुनाव दिवस टर्नआउट कमांड
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  मतदान केंद्र पर बस्ता ऑपरेटर द्वारा वोट दर्ज करते ही वॉर-रूम में लाइव टर्नआउट अपडेट। 3 बजे के बाद शेष मतदाताओं की प्राथमिकता कॉल लिस्ट।
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-amber-700 flex items-center gap-1">
                <span>हर वोट सुनिश्चित करना</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STEP-BY-STEP WORKFLOW */}
      <section id="workflow" className="py-20 bg-[#f8fafc] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="badge-minimal badge-blue">
              <Clock size={12} />
              <span>सरल कार्यप्रणाली • Step-by-Step Protocol</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              मतदाता सूची से जीत तक: 4 सरल चरण
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'सूची अपलोड (Ingest)', desc: 'अपने क्षेत्र की आधिकारिक ECI वोटर लिस्ट PDF सिस्टम में अपलोड करें। OCR तकनीक स्वतः संपूर्ण डेटा व्यवस्थित कर देती है।' },
              { step: '02', title: 'कार्यकर्ता आवंटन (Map)', desc: 'बूथ अध्यक्षों और पन्ना प्रमुखों को उनके वार्ड के अनुसार लॉगिन क्रेडेंशियल प्रदान करें। वे केवल अपना क्षेत्र देखेंगे।' },
              { step: '03', title: 'डिजिटल संपर्क (Engage)', desc: 'व्हाट्सएप पर मतदाता पर्ची भेजें और संपर्क अभियान चलाएं। स्विंग और प्रवासी वोटरों को टैग करें।' },
              { step: '04', title: 'चुनाव दिवस नियंत्रण (Win)', desc: 'मतदान दिवस पर बस्ता टेबल से लाइव टर्नआउट मार्क करें और बाकी बचे वोटरों को तुरंत बूथ पर लाएं।' },
            ].map((st, i) => (
              <div key={i} className="minimal-card p-6 space-y-3 bg-white">
                <div className="text-2xl font-black text-blue-600 font-heading">{st.step}.</div>
                <h4 className="font-bold text-base text-slate-900">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENT PRICING & PACKAGES */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="badge-minimal badge-blue">
              <FileSpreadsheet size={12} />
              <span>सुलभ एवं पारदर्शी पैकेज • Election Packages</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              हर स्तर के चुनाव के लिए तैयार
            </h2>
            <p className="text-sm text-slate-600">
              चाहे वार्ड चुनाव हो या विधानसभा अथवा लोकसभा, हमारे पास हर अभियान के लिए सुदृढ़ तकनीकी समाधान उपलब्ध है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Plan 1 */}
            <div className="minimal-card p-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="badge-minimal">वार्ड व पार्षद स्तर</div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">वार्ड / नगर पालिका</h3>
                <p className="text-xs text-slate-500">
                  वार्ड पार्षद, ग्राम पंचायत सरपंच और नगर पालिका प्रत्याशियों हेतु।
                </p>
                <div className="py-3 border-y border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> 1-3 वार्ड / बूथ कवरेज</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> संपूर्ण डिजिटल मतदाता खोज</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> 1,500 WhatsApp पर्ची क्रेडिट</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> पन्ना प्रमुख लॉगिन एक्सेस</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> चुनाव दिवस लाइव पोल डेस्क</div>
                </div>
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full btn-secondary py-3 rounded-xl text-xs font-bold cursor-pointer"
              >
                कोटेशन प्राप्त करें
              </button>
            </div>

            {/* Plan 2 - Featured */}
            <div className="minimal-card-active p-7 space-y-6 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                सर्वाधिक लोकप्रिय • VIP War Room
              </div>
              <div className="space-y-4 pt-1">
                <div className="badge-minimal badge-blue">विधानसभा प्रत्याशी</div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">विधानसभा वॉर-रूम</h3>
                <p className="text-xs text-slate-500">
                  विधानसभा चुनाव लड़ रहे प्रमुख प्रत्याशियों एवं कोर चुनाव प्रबंधन समिति हेतु।
                </p>
                <div className="py-3 border-y border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> संपूर्ण विधानसभा (200+ बूथ)</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> 2,50,000+ मतदाताओं का पूरा डेटाबेस</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> अनलिमिटेड कार्यकर्ता / पन्ना प्रमुख खाते</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> ऑफिशियल Meta WhatsApp API इंटिग्रेशन</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> जातिगत समीकरण व प्रवासी वोटर एनालिटिक्स</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> चुनाव दिवस वॉर-रूम लाइव टीवी डैशबोर्ड</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> समर्पित 24/7 तकनीकी इंजीनियर ऑन-साइट</div>
                </div>
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full btn-accent py-3.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                लाइव वॉर-रूम बुक करें
              </button>
            </div>

            {/* Plan 3 */}
            <div className="minimal-card p-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="badge-minimal">जिला संगठन एवं सांसद</div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">लोकसभा / जिला संगठन</h3>
                <p className="text-xs text-slate-500">
                  संसदीय क्षेत्र, महापौर चुनाव व राजनीतिक दलों की जिला चुनाव समितियों हेतु।
                </p>
                <div className="py-3 border-y border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> 8-10 विधानसभाओं का मल्टी-टेनेंट कंसोल</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> 15,00,000+ मतदाता डेटाबेस कैपेसिटी</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> कस्टम सर्वर व डेटा आइसोलेशन</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> पार्टी हाई-कमांड रियल-टाइम रिपोर्टिंग</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> वीआईपी प्रायोरिटी सपोर्ट SLA</div>
                </div>
              </div>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full btn-secondary py-3 rounded-xl text-xs font-bold cursor-pointer"
              >
                एंटरप्राइज प्रस्ताव प्राप्त करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECURITY & LEGAL COMPLIANCE GUARANTEE */}
      <section id="compliance" className="py-16 bg-[#f8fafc] border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    कानूनी सुरक्षा एवं डेटा गोपनीयता प्रतिज्ञा
                  </h3>
                  <p className="text-xs text-slate-500">
                    DPDP Act 2023, IT Act 2000 एवं भारतीय चुनाव आयोग के दिशा-निर्देशों का 100% पालन
                  </p>
                </div>
              </div>
              <a
                href="http://localhost:5003/privacy.html"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <span>आधिकारिक नीति पढ़ें</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock size={14} className="text-blue-600" />
                  शून्य व्यावसायिक डेटा बिक्री
                </div>
                <p>हम कभी भी किसी भी मतदाता का फोन नंबर या डेटा किसी तीसरे पक्ष अथवा विज्ञापन एजेंसी को नहीं बेचते हैं।</p>
              </div>
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Server size={14} className="text-blue-600" />
                  भारत में होस्टेड सुरक्षित सर्वर
                </div>
                <p>समस्त डेटा भारत स्थित सुरक्षित डेटा केंद्रों में 256-बिट SSL/TLS एन्क्रिप्शन के साथ संगृहीत रहता है।</p>
              </div>
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileCheck size={14} className="text-blue-600" />
                  रोल-बेस्ड सुरक्षा (RBAC)
                </div>
                <p>कार्यकर्ता केवल अपने वार्ड का डेटा देख सकते हैं। मास्टर डेटा केवल प्रत्याशी और एडमिन के पास सुरक्षित रहता है।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <h2 className="font-heading text-3xl font-extrabold text-slate-900">
              अक्सर पूछे जाने वाले प्रश्न (FAQ)
            </h2>
            <p className="text-xs text-slate-500">
              चुनाव सॉफ्टवेयर और WhatsApp ऑटोमेशन के संबंध में महत्वपूर्ण जानकारियां।
            </p>
          </div>

          <div className="space-y-3">
            {[
              { q: 'क्या WhatsApp पर बल्क पर्ची भेजने से नंबर ब्लॉक होने का खतरा है?', a: 'बिल्कुल नहीं। Matdata Portal व्यक्तिगत अनधिकृत ऑटोमेशन टूल्स के बजाय Meta Platforms, Inc. की आधिकारिक WhatsApp Business Cloud API का उपयोग करता है। सभी संदेश पूर्व-स्वीकृत टेम्प्लेट में जाते हैं, जिससे नंबर ब्लॉक होने का कोई खतरा नहीं रहता।' },
              { q: 'हमारे पास केवल चुनाव आयोग की स्कैन की गई PDF सूची है, क्या यह काम करेगी?', a: 'हाँ! हमारा इन-हाउस AI OCR इंजन विशेष रूप से भारतीय निर्वाचन आयोग की मुद्रित और स्कैन की गई मतदाता सूचियों के लिए प्रशिक्षित है। यह कुछ ही मिनटों में PDF को पूरी तरह डिजिटल और खोजने योग्य डेटाबेस में बदल देता है।' },
              { q: 'क्या हमारे कार्यकर्ता दूसरे वार्ड या प्रत्याशी का डेटा देख सकते हैं?', a: 'नहीं। सिस्टम में रोल-बेस्ड एक्सेस कंट्रोल (RBAC) सुरक्षा लागू है। प्रत्येक कार्यकर्ता केवल अपने आवंटित वार्ड/बूथ का ही विवरण देख सकता है। मुख्य एडमिन के पास संपूर्ण नियंत्रण रहता है।' },
              { q: 'सॉफ्टवेयर सेटअप होने में कितना समय लगता है?', a: 'वोटर लिस्ट प्राप्त होने के 24 से 48 घंटे के भीतर आपकी संपूर्ण विधानसभा अथवा वार्ड का वॉर-रूम पूरी तरह एक्टिव और लाइव कर दिया जाता है।' },
            ].map((faq, idx) => (
              <div key={idx} className="minimal-card overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. EXECUTIVE FINAL CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
            <span>चुनाव जीत की आधुनिक रणनीति</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white">
            अपने चुनाव क्षेत्र का डिजिटल वॉर-रूम आज ही शुरू करें
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            हमारी विशेषज्ञ चुनाव तकनीकी टीम आपके साथ 30 मिनट का लाइव ज़ूम / इन-पर्सन डेमो शेड्यूल करेगी।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-blue-900/40 cursor-pointer"
            >
              लाइव डेमो फॉर्म भरें
            </button>
            <a
              href={getWaLink('नमस्ते, मुझे Matdata Portal सॉफ्टवेयर का लाइव डेमो चाहिए।')}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} className="text-green-400" />
              <span>WhatsApp पर तुरंत संपर्क करें</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. MINIMALIST EXECUTIVE FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Matdata Portal" className="w-9 h-9 object-contain rounded-xl" />
              <div>
                <span className="font-heading text-lg font-black text-slate-900">
                  Matdata<span className="text-blue-600">Portal</span>
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">लोकतांत्रिक चुनाव प्रबंधन एवं वॉर-रूम प्रणाली</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-semibold text-slate-600">
              <Link href="/privacy" className="hover:text-slate-900">गोपनीयता नीति (Privacy)</Link>
              <Link href="/terms" className="hover:text-slate-900">नियम और शर्तें (Terms)</Link>
              <Link href="/refund" className="hover:text-slate-900">रिफंड नीति (Refund)</Link>
              <Link href="/contact" className="hover:text-slate-900">सहायता डेस्क (Contact)</Link>
              <a href="http://localhost:5003/api/legal/policies" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                Legal API (5003)
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <div>
              &copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित। भारतीय निर्वाचन आयोग (ECI) एवं DPDP Act 2023 के दिशानिर्देशों के अनुरूप।
            </div>
            <div className="flex items-center gap-3">
              <span>हेल्पलाइन: {DISPLAY_PHONE}</span>
              <span>&bull;</span>
              <span>ईमेल: support@matdataportal.app</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING QUICK WHATSAPP BUTTON */}
      <a
        href={getWaLink('नमस्ते Matdata Portal टीम, मुझे चुनाव वॉर-रूम का डेमो चाहिए।')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-4 py-3 rounded-full shadow-xl transition-transform hover:scale-105 font-bold text-xs cursor-pointer"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">WhatsApp सहायता ({DISPLAY_PHONE})</span>
      </a>

      {/* LEAD CAPTURE MODAL - CLEAN MINIMALIST */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
            >
              <X size={20} />
            </button>

            {leadSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">धन्यवाद! अनुरोध प्राप्त हुआ</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  आपकी पूछताछ दर्ज हो गई है। हमारी टीम WhatsApp पर आपसे तुरंत संपर्क करेगी।
                </p>
                <button
                  onClick={() => { setLeadSubmitted(false); setLeadModalOpen(false); }}
                  className="btn-primary w-full py-3 rounded-xl text-xs font-bold mt-2"
                >
                  पूर्ण (Done)
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-start gap-3">
                  <img src="/logo.svg" alt="Matdata Portal" className="w-10 h-10 object-contain rounded-xl" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      चुनाव वॉर-रूम लाइव डेमो अनुरोध
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      विवरण भरें, हमारी टीम आपको तुरंत लाइव डेमो व कोटेशन प्रदान करेगी।
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      आपका नाम / प्रत्याशी का नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राजेश शर्मा"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      विधानसभा क्षेत्र / वार्ड / नगर का नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. हवामहल, जयपुर या वार्ड नं. 14"
                      value={leadForm.constituency}
                      onChange={(e) => setLeadForm({ ...leadForm, constituency: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      चुनाव का स्तर (Election Type)
                    </label>
                    <select
                      value={leadForm.electionType}
                      onChange={(e) => setLeadForm({ ...leadForm, electionType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
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
                    className="w-full btn-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {leadSubmitting ? (
                      <span>अनुरोध दर्ज हो रहा है...</span>
                    ) : (
                      <>
                        <Send size={14} />
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
