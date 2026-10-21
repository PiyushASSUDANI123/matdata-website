import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) | Matdata Portal',
  description: 'Matdata Portal (मतदाता पोर्टल) चुनाव प्रबंधन सॉफ्टवेयर और Meta WhatsApp बिजनेस मैसेजिंग हेतु आधिकारिक गोपनीयता नीति।',
};

const DISPLAY_PHONE = '+91 98765 43210';
const WHATSAPP_NUMBER = '919876543210';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft size={16} />
            मुख्य वेबसाइट पर वापस जाएं
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Shield size={14} className="text-emerald-400" />
            Legal &amp; Compliance
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full mb-3">
              Official Privacy Policy
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Matdata Portal Election Platform &amp; Meta WhatsApp Services &bull; अंतिम अद्यतन: 2026
            </p>
          </div>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. परिचय एवं उद्देश्य (Introduction &amp; Scope)
            </h2>
            <p>
              Matdata Portal (मतदाता पोर्टल) एक राजनीतिक चुनाव प्रबंधन सॉफ्टवेयर है। यह प्लेटफॉर्म चुनाव अभियानों, प्रत्याशियों और मतदाताओं के बीच सुचारू संचार, मतदाता पर्ची वितरण तथा बूथ प्रबंधन की सुविधा प्रदान करता है।
            </p>
            <p>
              हम आपके व्यक्तिगत डेटा की सुरक्षा और गोपनीयता के प्रति पूर्णतः प्रतिबद्ध हैं। यह नीति स्पष्ट करती है कि हम किस प्रकार डेटा एकत्र, उपयोग और सुरक्षित रखते हैं।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. एकत्र की जाने वाली जानकारी (Data Collection)
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong>मतदाता सूची विवरण:</strong> भारत निर्वाचन आयोग (ECI) द्वारा सार्वजनिक रूप से प्रकाशित मतदाता नामावलियों से प्राप्त नाम, पहचान पत्र (EPIC) नंबर, भाग संख्या व क्रम संख्या।</li>
              <li><strong>अभियान संपर्क:</strong> चुनाव कार्यकर्ता, पन्ना प्रमुख एवं मतदाताओं द्वारा सहमति से साझा किया गया मोबाइल नंबर।</li>
              <li><strong>लॉग एवं ऑडिट डेटा:</strong> Meta Cloud API के माध्यम से भेजे गए संदेशों की डिलीवरी स्थिति, समय और मैसेज आईडी।</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              3. WhatsApp व Meta API संदेश नीति (Meta Messaging Compliance)
            </h2>
            <p>
              Matdata Portal केवल अधिकृत Meta WhatsApp Cloud API के माध्यम से चुनाव सूचनाएं एवं मतदाता पर्चियां प्रेषित करता है:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong>सहमति व अनुमति:</strong> संदेश केवल संबंधित मतदाताओं और कार्यकर्ताओं को उनके मतदान केंद्र की सूचना हेतु भेजे जाते हैं।</li>
              <li><strong>अनसब्सक्राइब सुविधा (Opt-Out):</strong> कोई भी प्राप्तकर्ता किसी भी समय संदेश के उत्तर में <strong>&quot;STOP&quot;</strong> या <strong>&quot;बंद करें&quot;</strong> लिखकर सेवा रोक सकता है।</li>
              <li><strong>डेटा बिक्री निषेध:</strong> हम किसी भी तीसरे पक्ष या विज्ञापनदाता को डेटा साझा, बेच या किराए पर नहीं देते हैं।</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. डेटा सुरक्षा (Data Security &amp; Storage)
            </h2>
            <p>
              सभी डेटा आधुनिक एन्क्रिप्शन (TLS/SSL व AES-256), सख्त भूमिका-आधारित एक्सेस कंट्रोल (RBAC) तथा आइसोलेटेड मल्टी-टेनेंट आर्किटेक्चर के तहत सुरक्षित रखा जाता है।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              5. संपर्क एवं शिकायत निवारण (Contact &amp; Grievance)
            </h2>
            <p className="text-slate-400 text-xs">
              किसी भी प्रश्न, सुझाव या गोपनीयता संबंधित शिकायत हेतु सीधे हमारी अधिकृत एजेंसी से संपर्क करें:
            </p>
            <div className="space-y-2 pt-2">
              <div className="font-bold text-white">Matdata Portal Support</div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                >
                  <MessageCircle size={14} /> WhatsApp: {DISPLAY_PHONE}
                </a>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                >
                  <Phone size={14} /> कॉल: {DISPLAY_PHONE}
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>&copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित।</p>
      </footer>
    </div>
  );
}
