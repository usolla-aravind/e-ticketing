import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/events/EventCard';
import {
  Search,
  Sparkles,
  Flame,
  Calendar,
  Ticket,
  ShieldCheck,
  Zap,
  MapPin,
  ChevronRight,
  Music,
  Film,
  Trophy,
  GraduationCap,
  Drama,
  Laugh,
  BookOpen,
  PartyPopper,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { EventCategory } from '../types';

export const HomePage: React.FC = () => {
  const { events } = useEvents();
  const navigate = useNavigate();

  const [heroSearch, setHeroSearch] = useState('');
  const [heroCategory, setHeroCategory] = useState<string>('');

  const featuredEvents = events.filter((e) => e.featured).slice(0, 8);
  const trendingEvents = events.filter((e) => e.trending).slice(0, 4);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroSearch.trim()) params.set('q', heroSearch.trim());
    if (heroCategory) params.set('category', heroCategory);
    navigate(`/events?${params.toString()}`);
  };

  const categoriesData: { name: EventCategory; icon: React.ReactNode; color: string }[] = [
    { name: 'Concerts', icon: <Music className="w-5 h-5" />, color: 'from-purple-600 to-indigo-600' },
    { name: 'Movies', icon: <Film className="w-5 h-5" />, color: 'from-amber-600 to-orange-600' },
    { name: 'Sports', icon: <Trophy className="w-5 h-5" />, color: 'from-emerald-600 to-teal-600' },
    { name: 'College Events', icon: <GraduationCap className="w-5 h-5" />, color: 'from-blue-600 to-cyan-600' },
    { name: 'Theatre', icon: <Drama className="w-5 h-5" />, color: 'from-rose-600 to-pink-600' },
    { name: 'Comedy', icon: <Laugh className="w-5 h-5" />, color: 'from-yellow-600 to-amber-600' },
    { name: 'Workshops', icon: <BookOpen className="w-5 h-5" />, color: 'from-cyan-600 to-blue-600' },
    { name: 'Festivals', icon: <PartyPopper className="w-5 h-5" />, color: 'from-fuchsia-600 to-purple-600' },
  ];

  const popularCities = [
    { name: 'Bengaluru', count: events.filter((e) => e.city === 'Bengaluru').length, img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mumbai', count: events.filter((e) => e.city === 'Mumbai').length, img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Delhi NCR', count: events.filter((e) => e.city === 'Delhi NCR').length, img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80' },
    { name: 'Goa', count: events.filter((e) => e.city === 'Goa').length, img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Project Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen E-Ticketing System • Software Engineering Project</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Discover Events.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Book Tickets.
            </span>{' '}
            Make Memories.
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            QuickTix delivers a seamless online ticket booking experience with interactive seating maps, instant digital passes, simulated payments, and event discovery.
          </p>

          {/* Hero Search Box */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
            <form
              onSubmit={handleHeroSubmit}
              className="bg-slate-900/90 border border-slate-800 p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex-1 w-full flex items-center gap-2 px-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search concerts, movies, sports, or venues..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="w-full sm:w-auto h-px sm:h-8 bg-slate-800 my-1 sm:my-0" />

              <div className="w-full sm:w-44 px-3">
                <select
                  value={heroCategory}
                  onChange={(e) => setHeroCategory(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-200">
                    All Categories
                  </option>
                  {categoriesData.map((c) => (
                    <option key={c.name} value={c.name} className="bg-slate-900 text-slate-200">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Find Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/60 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">{events.length}+</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Demo Events</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">8</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Categories</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">Interactive</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Seat Selection</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">100%</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Client Storage</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Explore Categories</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Browse live experiences tailored to your interests</p>
          </div>
          <Link
            to="/events"
            className="text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
          >
            <span>See All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categoriesData.map((cat) => (
            <Link
              key={cat.name}
              to={`/events?category=${encodeURIComponent(cat.name)}`}
              className="group bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform mb-3`}
              >
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED EVENTS SECTION (8 items) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Featured Events</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Handpicked premiere concerts, films, and college galas</p>
          </div>
          <Link
            to="/events"
            className="text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
          >
            <span>View All ({events.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* TRENDING EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Trending Right Now</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                High Demand Shows
              </h2>
            </div>
            <Link
              to="/events"
              className="text-xs sm:text-sm font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span>Popular Cities</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Discover live entertainment across India’s major hubs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCities.map((city) => (
            <Link
              key={city.name}
              to={`/events?city=${encodeURIComponent(city.name)}`}
              className="group relative h-40 rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:shadow-xl hover:border-indigo-500/50"
            >
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-white">{city.name}</h3>
                  <span className="text-xs text-indigo-300 font-medium">{city.count} Events Available</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How QuickTix Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Three simple steps to secure your event passes in our simulated environment.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-bold text-white text-base">Discover & Filter</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Filter by category, city, or date. Review show descriptions, venue highlights, and ticket tier pricing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 relative">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-bold text-white text-base">Select Seats & Simulate Checkout</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Pick your preferred cinema seats on the interactive screen layout or select GA tier passes with live fee calculation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 relative">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-bold text-white text-base">Get Digital Ticket & Pass</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Receive an instant perforated ticket with demo QR code. Print or download your pass, and manage your booking history anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE QUICKTIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Designed for Academic Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Why QuickTix Stands Out
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Engineered with clean architectural principles, responsive Tailwind CSS tokens, type-safe data modeling, and zero server or payment gateway dependencies.
            </p>

            <div className="mt-6 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Safe & Simulated Payments</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Test demo UPI, card, and wallet flows without risking actual financial information.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Visual Seat Grid & Real-Time Math</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Dynamic recalculation of subtotal, convenience fees, and discount coupons.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Admin Management & CSV Exports</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Faculty evaluators can create, edit, delete events and export booking records directly to CSV.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
                alt="Event Concert Crowd"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Live Event Demo Status</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Client Engine Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Powered by React 19, TypeScript, Vite & localStorage state persistence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 p-8 sm:p-14 text-center border border-indigo-500/30 shadow-2xl">
          <div className="relative max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Test Your First Booking?
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Explore 14+ fictional live concerts, IMAX screenings, stand-up comedy shows, and university tech festivals.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/events"
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 shadow-xl transition-all flex items-center gap-2"
              >
                <span>Browse All Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-950 text-white font-semibold text-sm border border-indigo-500/40 transition-all"
              >
                <span>Read Project Architecture</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
