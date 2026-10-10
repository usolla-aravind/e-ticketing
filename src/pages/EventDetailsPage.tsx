import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useFavorites } from '../context/FavoriteContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/events/EventCard';
import { ShareModal } from '../components/events/ShareModal';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Ticket,
  ShieldCheck,
  Star,
  Users,
  Info,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

export const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById, events } = useEvents();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const event = getEventById(eventId || '');

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Event Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          The event you are looking for might have been removed or the URL link is invalid.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(event.id);
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));
  const relatedEvents = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <div className="pb-16 space-y-12">
      {/* Event Hero Banner */}
      <div className="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-slate-950 border-b border-slate-800">
        <img
          src={event.bannerImage || event.image}
          alt={event.title}
          className="w-full h-full object-cover object-center filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute top-6 left-4 sm:left-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Events</span>
          </Link>
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-6 right-4 sm:right-8 flex items-center gap-2">
          <button
            onClick={() => setShareModalOpen(true)}
            className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Share Event"
            aria-label="Share Event"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(event.id, event.title)}
            className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-rose-400 transition-colors"
            title="Save to Favorites"
            aria-label="Save to Favorites"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title & Category Banner Text */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge category={event.category}>{event.category}</Badge>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{event.rating}</span>
              <span className="text-amber-400/80 text-[10px]">({event.reviewsCount} reviews)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
              {event.ageGuidance}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Description, Highlights, Rules */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Event Date</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{formatDate(event.date)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Timing</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate">{event.city}</span>
                </div>
              </div>
            </div>

            {/* About the Event */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">About the Event</h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {event.fullDescription || event.description}
              </p>
            </div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Event Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue & Organizer Details */}
            <div className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>Venue & Address</span>
              </h3>
              <p className="font-bold text-white text-sm">{event.venue}</p>
              <p className="text-xs text-slate-400">{event.address}</p>
              <div className="pt-2 text-xs text-slate-400">
                Organized by: <strong className="text-slate-200">{event.organizer}</strong>
              </div>
            </div>

            {/* Terms and Guidelines */}
            {event.rules && event.rules.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-400" />
                  <span>Entry Rules & Guidelines</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Ticket Card & Booking CTA */}
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl sticky top-24 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
                    Tickets Starting From
                  </span>
                  <span className="text-2xl font-black text-white">
                    {lowestPrice === 0 ? 'Free Entry' : formatCurrency(lowestPrice)}
                  </span>
                </div>
                <Badge variant="status" status="confirmed">
                  {event.demoAvailability} Tickets Left
                </Badge>
              </div>

              {/* Ticket Types Overview */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-300 block">Available Passes</span>
                {event.ticketTypes.map((tier) => (
                  <div
                    key={tier.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-white">{tier.name}</p>
                      <p className="text-[11px] text-slate-400">{tier.available} available</p>
                    </div>
                    <span className="font-bold text-indigo-300">{formatCurrency(tier.price)}</span>
                  </div>
                ))}
              </div>

              {/* Seating indicator */}
              <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <Ticket className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  {event.isSeated
                    ? 'Assigned Seating: Interactive seat picker available'
                    : 'General Admission: Instant quantity selection'}
                </span>
              </div>

              {/* Book Tickets CTA Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => navigate(`/booking/${event.id}`)}
                rightIcon={<Ticket className="w-4 h-4" />}
              >
                Book Tickets Now
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Simulated Pass • College Demo Mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-800 space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Related {event.category} Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedEvents.map((rel) => (
                <EventCard key={rel.id} event={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        eventTitle={event.title}
      />
    </div>
  );
};
