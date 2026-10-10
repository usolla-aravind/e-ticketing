import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layers,
  ShieldCheck,
  Zap,
  Target,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Software Engineering Capstone • Academic Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          About QuickTix E-Ticketing System
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A modern, decoupled, frontend-driven e-ticketing platform designed and implemented for a collegiate Software Engineering project and PPVC practical demonstration.
        </p>
      </div>

      {/* Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Problem Statement</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Traditional collegiate and regional ticketing workflows are often plagued by cumbersome manual spreadsheets, slow box-office queues, fragmented event discovery, and lack of visual seating transparency. Students and attendees frequently face difficulties reserving seats and obtaining verified digital credentials.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Project Objectives</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Develop a responsive, visually compelling, and architecturally decoupled web application that facilitates real-time event filtering, interactive auditorium seat selection, instant client-side price calculation, simulated checkout, and downloadable digital ticketing passes.
          </p>
        </div>
      </div>

      {/* Main System Modules */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Core System Modules</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">1. Event Discovery & Search</h3>
            <p className="text-slate-400 text-xs">
              Multi-criteria filtering by category, city, date, and price range with instant URL synchronization.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">2. Visual Seating & Tier Engine</h3>
            <p className="text-slate-400 text-xs">
              Interactive screen layout for cinema/theatre with dynamic row letters, tier price calculation, and order limits.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">3. Simulated Checkout Gateway</h3>
            <p className="text-slate-400 text-xs">
              Safe demo payment flow featuring UPI intent, card, and wallet simulation with idempotency checks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">4. Perforated Digital Ticket Pass</h3>
            <p className="text-slate-400 text-xs">
              Ticket stub aesthetic with SVG simulated QR codes, client-side print layout, and download capability.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">5. Booking Management & Cancellation</h3>
            <p className="text-slate-400 text-xs">
              Full lifecycle tracking with status tabs, cancel confirmation, and automatic seat quota restoration.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="font-bold text-white">6. Faculty Admin Demonstration</h3>
            <p className="text-slate-400 text-xs">
              Complete CRUD event catalog manipulation, booking status updates, real-time analytics, and CSV exports.
            </p>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          <span>Technologies & Architecture</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="font-bold text-white block">React 19 & TypeScript</span>
            <span className="text-[11px] text-slate-400">Strict Component Typings</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="font-bold text-white block">Tailwind CSS v4</span>
            <span className="text-[11px] text-slate-400">Custom Design Tokens</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="font-bold text-white block">Vite Build System</span>
            <span className="text-[11px] text-slate-400">Ultra-fast HMR Bundling</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="font-bold text-white block">Context API</span>
            <span className="text-[11px] text-slate-400">Decoupled State Architecture</span>
          </div>
        </div>
      </div>

      {/* Limitations & Future Enhancements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Demonstration Limitations</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
            <li>State persistence is isolated to browser localStorage; not synchronized across external devices.</li>
            <li>Simulated payment processing only; no actual monetary debits or banking rails.</li>
            <li>Client-side route guards are illustrative and do not replace server authorization.</li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>Future Enhancements</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
            <li>Spring Boot / Node.js backend integration with PostgreSQL / Redis caches.</li>
            <li>Razorpay / Stripe webhook integration with PKI cryptographic QR signing.</li>
            <li>Dynamic real-time WebSocket seat locking to eliminate race conditions.</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/events">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer">
            <span>Explore the Live Demo Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};
