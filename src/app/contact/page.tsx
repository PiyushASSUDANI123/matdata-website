import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Shield, ExternalLink, FileText, PhoneCall, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'संपर्क एवं सहायता (Contact Us) | Matdata Portal (मतदाता पोर्टल)',
  description: 'Matdata Portal (मतदाता पोर्टल) चुनाव अभियान, वॉर-रूम एवं तकनीकी सहायता संपर्क विवरण।',
};

const BACKEND_CONTACT_URL = 'http://localhost:5003/contact.html';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans">
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
              href={BACKEND_CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              <FileText size={13} className="text-emerald-600" />
              Backend HTML View
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
                Official Support Desk
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                संपर्क एवं शिकायत निवारण (Contact &amp; Grievance)
              </h1>
              <p className="text-xs text-slate-500 mt-2">
                Matdata Portal Support Desk &bull; 24/7 Election War-Room Assistance
              </p>
            </div>
            <div className="hidden sm:block">
              <Image src="/logo.svg" alt="Matdata Portal" width={48} height={48} className="rounded-xl shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">तकनीकी एवं वॉर-रूम सहायता</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                लाइव चुनाव दिवस सहायता, ऑपरेटर ट्रेनिंग एवं डेटाबेस सहायता के लिए।
              </p>
              <a href="mailto:support@matdataportal.app" className="inline-block text-sm font-bold text-emerald-700 hover:underline">
                support@matdataportal.app
              </a>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">डेटा गोपनीयता व अनुपालन सेल</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                DPDP Act 2023, चुनाव आयोग दिशा-निर्देश व मेटा व्हाट्सएप नीतियों हेतु।
              </p>
              <a href="mailto:compliance@matdataportal.app" className="inline-block text-sm font-bold text-emerald-700 hover:underline">
                compliance@matdataportal.app
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित।</div>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/refund" className="hover:underline">Refund</Link>
            <Link href="/contact" className="text-emerald-700 hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
