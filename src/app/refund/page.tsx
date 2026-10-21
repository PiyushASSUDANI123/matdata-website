import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, ExternalLink, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'धनवापसी नीति (Refund Policy) | Matdata Portal (मतदाता पोर्टल)',
  description: 'Matdata Portal (मतदाता पोर्टल) चुनाव अभियान सेवाओं हेतु आधिकारिक रिफंड एवं रद्दीकरण नीति।',
};

const BACKEND_REFUND_URL = 'http://localhost:5003/refund.html';

export default function RefundPage() {
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
              href={BACKEND_REFUND_URL}
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
                Commercial Terms
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                धनवापसी एवं रद्दीकरण नीति (Refund Policy)
              </h1>
              <p className="text-xs text-slate-500 mt-2">
                Matdata Portal Platform &bull; लागू तिथि: 1 जनवरी 2026
              </p>
            </div>
            <div className="hidden sm:block">
              <Image src="/logo.svg" alt="Matdata Portal" width={48} height={48} className="rounded-xl shadow-sm" />
            </div>
          </div>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              1. सेवा सक्रियण एवं क्लाउड प्रावधान
            </h2>
            <p>
              चुनाव अभियान हेतु सर्वर प्रावधान, डेटाबेस सुरक्षा और व्हाट्सएप बिजनेस क्लाउड एपीआई सेटअप तुरंत सक्रिय किए जाते हैं। खाता सक्रियण के पश्चात प्रारंभिक सेटअप शुल्क अप्रतिदेय (Non-Refundable) है।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              2. तकनीकी व्यवधान एवं धनवापसी दावा
            </h2>
            <p>
              यदि हमारी तकनीकी प्रणाली में किसी अभूतपूर्व खराबी के कारण सेवा 48 घंटे से अधिक समय तक लगातार बाधित रहती है, तो अप्रयुक्त अवधि अथवा मैसेजिंग क्रेडिट का आनुपातिक रिफंड 5 से 7 कार्य दिवसों में संसाधित किया जाता है।
            </p>
            <p>
              दावे हेतु खाताधारक अपने पंजीकृत ईमेल से <strong className="text-slate-900">billing@matdataportal.app</strong> पर संपर्क कर सकते हैं।
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित।</div>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/refund" className="text-emerald-700 hover:underline">Refund</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
