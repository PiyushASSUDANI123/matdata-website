import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, ExternalLink, CheckCircle2, Lock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) | Matdata Portal (मतदाता पोर्टल)',
  description: 'Matdata Portal (मतदाता पोर्टल) चुनाव प्रबंधन सॉफ्टवेयर और Meta WhatsApp बिजनेस मैसेजिंग हेतु आधिकारिक गोपनीयता नीति।',
};

const BACKEND_POLICY_URL = 'http://localhost:5003/privacy.html';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft size={16} />
            मुख्य वेबसाइट पर वापस जाएं
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={BACKEND_POLICY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              <FileText size={13} className="text-emerald-600" />
              Backend HTML View
              <ExternalLink size={12} />
            </a>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              <Shield size={13} className="text-emerald-600" />
              ECI &amp; DPDP 2023 Compliant
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
                Official Compliance Document
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                गोपनीयता नीति (Privacy Policy)
              </h1>
              <p className="text-xs text-slate-500 mt-2">
                Matdata Portal Election Platform &amp; Meta WhatsApp Services &bull; लागू: 2026 &bull; अंतिम अद्यतन: अक्टूबर 2026
              </p>
            </div>
            <div className="hidden sm:block">
              <Image src="/logo.svg" alt="Matdata Portal" width={48} height={48} className="rounded-xl shadow-sm" />
            </div>
          </div>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              1. परिचय एवं उद्देश्य (Introduction &amp; Scope)
            </h2>
            <p>
              <strong>Matdata Portal (मतदाता पोर्टल)</strong> एक उच्च-स्तरीय लोकतांत्रिक चुनाव अभियान प्रबंधन सॉफ्टवेयर प्रणाली है। यह प्लेटफ़ॉर्म चुनाव अभियानों, प्रत्याशियों, बूथ कार्यकर्ताओं और मतदाताओं के बीच सुचारू संचार, आधिकारिक मतदाता पर्ची वितरण (Voter Information Slip) तथा बूथ प्रबंधन की सुविधा प्रदान करता है।
            </p>
            <p>
              हम आपके व्यक्तिगत डेटा की सुरक्षा और गोपनीयता के प्रति पूर्णतः प्रतिबद्ध हैं। यह नीति स्पष्ट करती है कि हम किस प्रकार सार्वजनिक चुनाव रिकॉर्ड और उपयोगकर्ता जानकारी को विधि-सम्मत तरीके से सुरक्षित रखते हैं।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              2. हम कौन सा डेटा प्रोसेस करते हैं (Data Collection)
            </h2>
            <ul className="space-y-2 list-disc list-inside text-slate-700 pl-2">
              <li><strong>संगठन एवं कार्यकर्ता विवरण:</strong> अधिकृत कार्यकर्ताओं का नाम, संपर्क नंबर, पासवर्ड और चुनावी भूमिका।</li>
              <li><strong>सार्वजनिक निर्वाचन डेटा (Public Electoral Roll Data):</strong> चुनाव आयोग (ECI) द्वारा सार्वजनिक डोमेन में प्रकाशित मतदाता सूची से प्राप्त नाम, आयु, लिंग, संबंधी का नाम, मकान नंबर, भाग संख्या व वोटर कार्ड (EPIC) नंबर।</li>
              <li><strong>मतदाता सूचना पर्ची प्रेषण:</strong> मतदाता अथवा कार्यकर्ता द्वारा उसकी डिजिटल पर्ची WhatsApp पर मंगाने हेतु प्रदान किया गया फोन नंबर।</li>
              <li><strong>मैसेजिंग स्थिति:</strong> संदेश प्रेषण समय, डिलीवरी रिपोर्ट (Sent/Delivered/Read) व मेटा एपीआई स्थिति।</li>
            </ul>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs sm:text-sm">
              <strong className="text-emerald-800 font-bold block mb-1">
                🔒 डेटा बिक्री पर पूर्ण प्रतिबंध (Strict Zero Commercial Sale Policy):
              </strong>
              Matdata Portal किसी भी मतदाता अथवा कार्यकर्ता के फोन नंबर, पते अथवा व्यक्तिगत विवरण को किसी भी बाह्य विज्ञापन एजेंसी, टेलीमार्केटर, डेटा ब्रोकर अथवा व्यावसायिक संस्था को कभी भी नहीं बेचता और न ही व्यापार करता है।
            </div>
          </section>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              3. Meta WhatsApp Business API का अनुपालन
            </h2>
            <p>
              हमारी प्रणाली Meta Platforms, Inc. की आधिकारिक <strong>WhatsApp Business Cloud API</strong> के पूर्ण अनुपालन में संचालित होती है:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  अनुमोदित टेम्पलेट्स
                </div>
                <p className="text-xs text-slate-600">केवल Meta द्वारा पूर्व-स्वीकृत संदेश प्रारूपों से आधिकारिक मतदाता सूचना पर्ची प्रेषित की जाती है।</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                  <Lock size={14} className="text-emerald-600" />
                  तत्काल ऑप्ट-आउट (STOP)
                </div>
                <p className="text-xs text-slate-600">प्राप्तकर्ता केवल <strong>"STOP"</strong> अथवा <strong>"बंद करें"</strong> लिखकर किसी भी समय संदेश प्राप्त करना बंद कर सकता है।</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              4. भारतीय विधियों एवं ECI दिशा-निर्देशों का अनुपालन
            </h2>
            <p>
              Matdata Portal भारत के <strong>डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 (DPDP Act 2023)</strong>, <strong>सूचना प्रौद्योगिकी अधिनियम 2000</strong> तथा भारतीय निर्वाचन आयोग (ECI) की आदर्श आचार संहिता के पूर्ण सम्मान एवं दिशा-निर्देशों के अनुसार संचालित होता है।
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900">
              5. शिकायत निवारण एवं संपर्क अधिकारी (Grievance Officer)
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <p><strong>अधिकारी:</strong> Matdata Portal Data Protection &amp; Compliance Cell</p>
              <p><strong>ईमेल:</strong> <a href="mailto:compliance@matdataportal.app" className="text-emerald-700 underline font-semibold">compliance@matdataportal.app</a> / <a href="mailto:support@matdataportal.app" className="text-emerald-700 underline font-semibold">support@matdataportal.app</a></p>
              <p><strong>बैकएंड डायरेक्ट लिंक:</strong> <a href="http://localhost:5003/privacy.html" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">http://localhost:5003/privacy.html</a></p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित।</div>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <Link href="/privacy" className="text-emerald-700 hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/refund" className="hover:underline">Refund</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
