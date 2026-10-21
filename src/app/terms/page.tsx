import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'नियम व शर्तें (Terms of Service) | Matdata Portal',
  description: 'Matdata Portal (मतदाता पोर्टल) चुनाव प्रबंधन सॉफ्टवेयर और वॉर रूम उपयोग हेतु सेवा शर्तें।',
};

const DISPLAY_PHONE = '+91 98765 43210';
const WHATSAPP_NUMBER = '919876543210';

export default function TermsPage() {
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
            <FileText size={14} className="text-emerald-400" />
            Terms of Service
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full mb-3">
              Terms of Use
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              नियम व शर्तें (Terms of Service)
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Matdata Portal Campaign Management Platform &bull; अंतिम अद्यतन: 2026
            </p>
          </div>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. सेवा की स्वीकृति (Acceptance of Terms)
            </h2>
            <p>
              Matdata Portal (मतदाता पोर्टल) सॉफ्टवेयर, वेबसाइट या मोबाइल एप्लिकेशन का उपयोग करके आप इन सेवा शर्तों से बाध्य होने की सहमति देते हैं। यह सेवा राजनीतिक अभियानों, चुनाव प्रत्याशियों तथा उनके अधिकृत कार्यकर्ताओं के वैध चुनाव प्रबंधन कार्यों हेतु ही प्रदान की जाती है।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. अनुमेय उपयोग (Permitted Use &amp; ECI Compliance)
            </h2>
            <p>
              उपयोगकर्ता यह सुनिश्चित करने के लिए पूर्णतः जिम्मेदार हैं कि सॉफ्टवेयर द्वारा संचालित कोई भी चुनावी गतिविधि:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>भारत निर्वाचन आयोग (ECI) की आदर्श आचार संहिता (Model Code of Conduct - MCC) का पूर्णतः पालन करती हो।</li>
              <li>मतदान समाप्त होने से 48 घंटे पूर्व सांविधिक मौन अवधि (Silence Period) का सम्मान करती हो।</li>
              <li>किसी भी भ्रामक, अनुचित, साम्प्रदायिक या गैर-कानूनी प्रचार में लिप्त न हो।</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              3. WhatsApp व डिजिटल मैसेजिंग दिशानिर्देश (Messaging Rules)
            </h2>
            <p>
              WhatsApp पर्ची भेजने की सुविधा केवल वास्तविक मतदाता सहायता व मतदान केंद्र सूचना प्रदान करने हेतु है। स्पैमिंग, अवांछित सामूहिक संदेश (Bulk Spamming) या भ्रामक सूचना प्रेषण सख्त वर्जित है। Meta एवं मतदाता पोर्टल की नीतियों के उल्लंघन पर खाता तत्काल निलंबित किया जा सकता है।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. खाता सुरक्षा एवं निलंबन (Account Security &amp; Suspension)
            </h2>
            <p>
              एडमिन पैनल को किसी भी खाते को बिना पूर्व सूचना के निलंबित करने का अधिकार है यदि खाते द्वारा सेवा शर्तों, चुनावी कानूनों या सुरक्षा नीतियों का उल्लंघन पाया जाता है।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-300 leading-relaxed bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              5. संपर्क विवरण (Contact &amp; Support)
            </h2>
            <p className="text-slate-400 text-xs">
              सेवा शर्तों या कानूनी अनुपालन से संबंधित किसी भी प्रश्न के लिए सीधे संपर्क करें:
            </p>
            <div className="space-y-2 pt-2">
              <div className="font-bold text-white">Matdata Portal Legal Desk</div>
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
