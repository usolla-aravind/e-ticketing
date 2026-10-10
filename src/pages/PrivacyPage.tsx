import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy & Data Architecture</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Last updated: October 2026 • Frontend Client-Only Data Principles
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero External Data Collection</span>
          </h2>
          <p>
            QuickTix does not transmit any user inputs, contact records, credit card numbers, or mock passwords to external tracking servers or third-party analytics platforms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Browser Local Storage Usage</h2>
          <p>
            QuickTix utilizes HTML5 <code>window.localStorage</code> solely to provide realistic state persistence within your browser session. The data stored includes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
            <li><code>quicktix_events_v1</code>: Active event catalog with seat reservation states.</li>
            <li><code>quicktix_bookings_v1</code>: List of created demonstration bookings.</li>
            <li><code>quicktix_favorites_v1</code>: Array of bookmarked event IDs.</li>
            <li><code>quicktix_user_v1</code>: Selected demo account profile details.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Clearing Your Data</h2>
          <p>
            You can completely wipe all locally stored QuickTix demo data at any time by clicking "Reset Data" in the top demonstration banner or by clearing your browser cache/cookies for this domain.
          </p>
        </section>
      </div>
    </div>
  );
};
