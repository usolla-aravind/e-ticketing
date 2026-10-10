import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Project Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                QuickTix
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              QuickTix is an end-to-end Online E-Ticketing System built for a collegiate Software Engineering capstone and PPVC practical evaluation. Seamlessly discover live concerts, movies, sports, and tech conferences.
            </p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Simulated Environment</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Frontend demonstration application. Uses browser localStorage for mock persistence. No real credit cards or actual financial transactions take place.
              </p>
            </div>
          </div>

          {/* Explore Categories */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {['Concerts', 'Movies', 'Sports', 'College Events', 'Theatre', 'Comedy', 'Workshops', 'Festivals'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/events?category=${encodeURIComponent(cat)}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Navigation */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/events" className="hover:text-indigo-400 transition-colors">
                  Explore All Events
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-indigo-400 transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-indigo-400 transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  <span>Admin Dashboard</span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-400 transition-colors">
                  User Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Legal */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Project & Docs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">
                  About Project & Architecture
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-indigo-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Form (Demo)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Demonstration
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy & Data Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 QuickTix E-Ticketing System. Developed for Software Engineering Academic Project.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> React & Vite
            </span>
            <Link to="/about" className="text-indigo-400 hover:underline">
              System Modules
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
