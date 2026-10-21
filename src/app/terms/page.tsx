import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'नियम और शर्तें (Terms of Service) | Matdata Portal (मतदाता पोर्टल)',
  description: 'Matdata Portal (मतदाता पोर्टल) चुनाव अभियान एवं डिजिटल वॉर-रूम सेवाओं हेतु आधिकारिक नियम व सेवा शर्तें।',
};

const BACKEND_TERMS_URL = 'http://localhost:5003/terms.html';

export default function TermsPage() {
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
              href={BACKEND_TERMS_URL}
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
              Legal Terms
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6 flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
                Terms of Use
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                नियम और शर्तें (Terms of Service)
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
              1. सेवा की स्वीकृति (Acceptance of Terms)
            </h2>
            <p>
              <strong>Matdata Portal (मतदाता पोर्टल)</strong> वेब एप्लिकेशन, एपीआई, और मोबाइल ऐप का उपयोग करने पर आप इन नियमों व शर्तों से पूर्णतः आबद्ध होने की सहमति प्रदान करते हैं।
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              2. अनुमत उपयोग एवं चुनाव आयोग अनुपालन
            </h2>
            <p>
              इस प्लेटफ़ॉर्म का उपयोग केवल वैध और लोकतांत्रिक चुनाव अभियान प्रबंधन, कार्यकर्ता समन्वय, और मतदाताओं को सार्वजनिक मतदान केंद्र सूचना प्रदान करने हेतु किया जा सकता है।
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 text-xs sm:text-sm">
              <strong>आदर्श आचार संहिता (Model Code of Conduct):</strong> किसी भी भ्रामक, नफरती अथवा गैर-कानूनी प्रचार सामग्री का प्रेषण पूर्णतः निषिद्ध है। चुनाव आयोग द्वारा घोषित साइलेंस पीरियड के दौरान कोई भी बल्क मैसेजिंग नहीं की जाएगी।
            </div>
          </section>

          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              3. बौद्धिक संपदा अधिकार (Intellectual Property)
            </h2>
            <p>
              Matdata Portal के समस्त सॉफ्टवेयर एल्गोरिदम, यूआई डिज़ाइन, ट्रेडमार्क, और ब्रांडिंग सर्वाधिकार सुरक्षित हैं। सिस्टम का अनधिकृत क्लोन बनाना अथवा रिवर्स इंजीनियरिंग कानूनन वर्जित है।
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; 2026 Matdata Portal (मतदाता पोर्टल). सर्वाधिकार सुरक्षित।</div>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="text-emerald-700 hover:underline">Terms</Link>
            <Link href="/refund" className="hover:underline">Refund</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
