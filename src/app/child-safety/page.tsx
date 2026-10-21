import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Mail, Phone, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Child Safety Standards & CSAE Prevention Policy | Matdata Portal',
  description: 'Matdata Portal child safety standards, zero-tolerance policy against Child Sexual Abuse and Exploitation (CSAE), and reporting procedures.',
};

const CONTACT_EMAIL = 'moxrathore@gmail.com';
const DISPLAY_PHONE = '+91 72310 77770';

export default function ChildSafetyPage() {
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
            मुख्य वेबसाइट पर वापस जाएं (Back to Home)
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <ShieldAlert size={14} className="text-emerald-400" />
            Child Safety Standards
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full mb-3">
              Official Safety Standards &bull; Google Play Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Child Safety Standards &amp; Anti-CSAE Policy
            </h1>
            <p className="text-sm font-medium text-emerald-300 mt-1">
              बाल सुरक्षा मानक एवं बाल यौन शोषण व दुर्व्यवहार रोकथाम नीति
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Matdata Portal Platform &bull; Last Updated: 2026
            </p>
          </div>

          {/* Quick Notice Box */}
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-4 sm:p-5 text-rose-200 text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-300 text-base">
              <AlertTriangle size={18} className="text-rose-400 flex-shrink-0" />
              <span>Zero Tolerance Policy Against Child Sexual Abuse and Exploitation (CSAE / CSAM)</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
              Matdata Portal strictly prohibits any form of Child Sexual Abuse Material (CSAM), grooming, sexual exploitation, or any conduct that endangers minors. Any violation results in immediate content removal, permanent account termination, and automatic referral to relevant law enforcement agencies and child protection authorities.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. Policy Scope &amp; Purpose (उद्देश्य एवं दायरा)
            </h2>
            <p>
              Matdata Portal is an election campaign management and voter communication platform. Although designed for civic, political campaign, and community coordination, we uphold the highest global standards for child safety across all mobile applications, web portals, messaging modules, and user-generated interactions.
            </p>
            <p>
              This policy outlines our commitments and strict standards in full compliance with Google Play&apos;s Child Safety Policy and applicable international and local child protection laws.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. Prohibited Content &amp; Behavior (प्रतिबंधित सामग्री एवं आचरण)
            </h2>
            <p>
              Under no circumstances does Matdata Portal tolerate or facilitate:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Child Sexual Abuse Material (CSAM):</strong> Creating, uploading, transmitting, displaying, storing, or sharing any visual depictions or materials featuring child sexual abuse.</li>
              <li><strong>Child Sexual Exploitation and Abuse (CSAE):</strong> Soliciting, encouraging, facilitating, or promoting sexual abuse or exploitation of any individual under the age of 18.</li>
              <li><strong>Child Grooming &amp; Sextortion:</strong> Attempting to build an emotional relationship with a minor to exploit or sexually abuse them, or coercing minors into sharing sensitive imagery or information.</li>
              <li><strong>Trafficking &amp; Harmful Solicitation:</strong> Facilitating or encouraging human trafficking, child labor exploitation, or illicit endangerment of minors.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              3. In-App Reporting &amp; User Mechanisms (शिकायत दर्ज करने के तरीके)
            </h2>
            <p>
              Matdata Portal provides robust in-app and external channels for users, moderators, and observers to report any suspected violation immediately:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-400 text-sm">
                  <CheckCircle2 size={16} />
                  In-App Reporting
                </div>
                <p className="text-xs text-slate-400">
                  Users can flag suspect messages, community posts, or user profiles directly within the mobile application by tapping the <strong>Report</strong> or <strong>Flag</strong> button on any content or conversation.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-400 text-sm">
                  <Mail size={16} />
                  Dedicated Email Reporting
                </div>
                <p className="text-xs text-slate-400">
                  Direct reports can be submitted 24/7 to our designated safety team at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-400 font-medium hover:underline">
                    {CONTACT_EMAIL}
                  </a>{' '}
                  with screenshots, user details, and context.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Moderation, Response &amp; Account Termination (त्वरित कार्रवाई)
            </h2>
            <p>
              When a report of CSAM/CSAE is received or detected:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
              <li><strong>Immediate Removal:</strong> The reported material is quarantined and permanently removed from public and private view within minutes.</li>
              <li><strong>Account Ban:</strong> The associated user account is permanently terminated and prohibited from re-registering across all Matdata Portal services.</li>
              <li><strong>Evidence Preservation:</strong> Audit logs, IP addresses, and metadata are securely preserved for statutory legal compliance and law enforcement handoff.</li>
            </ol>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              5. Law Enforcement Cooperation &amp; Statutory Reporting (कानूनी सहयोग)
            </h2>
            <p>
              We actively cooperate with global and domestic regulatory and law enforcement bodies:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>NCMEC:</strong> Any instance of CSAM is reported to the National Center for Missing &amp; Exploited Children (NCMEC) in compliance with international reporting protocols.</li>
              <li><strong>Cyber Crime Cell (India):</strong> Incidents in India are reported to the National Cyber Crime Reporting Portal (<a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">cybercrime.gov.in</a>) and concerned police authorities under the POCSO Act (Protection of Children from Sexual Offences) and IT Act.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              6. Designated Point of Contact (आधिकारिक संपर्क अधिकारी)
            </h2>
            <p>
              In accordance with Google Play standards, the designated point of contact responsible for child sexual abuse material (CSAM) prevention practices, inquiries, and regulatory compliance is:
            </p>

            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 space-y-3">
              <div className="font-bold text-white text-base">
                Matdata Portal Safety &amp; Compliance Desk
              </div>
              <div className="text-xs text-slate-400">
                Entity: Matdata Portal Operations
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-emerald-400" />
                  <span className="text-slate-400">Email:</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-300 hover:underline font-semibold">
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-emerald-400" />
                  <span className="text-slate-400">Helpline:</span>
                  <span className="text-slate-200 font-semibold">{DISPLAY_PHONE}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              7. Policy Accessibility (सार्वजनिक उपलब्धता)
            </h2>
            <p className="text-xs text-slate-400">
              This Child Safety Standards policy is publicly available, continuously active, and non-editable by third parties worldwide. It is reviewed periodically to ensure continuous compliance with evolving safety laws and platform requirements.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>&copy; 2026 Matdata Portal. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
          <span>&bull;</span>
          <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          <span>&bull;</span>
          <Link href="/child-safety" className="text-emerald-400 hover:underline">Child Safety Standards</Link>
        </div>
      </footer>
    </div>
  );
}
