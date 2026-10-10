import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EventItem } from '../../types';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatters';
import { useFavorites } from '../../context/FavoriteContext';
import { Calendar, MapPin, Heart, ArrowRight, Ticket } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  viewMode?: 'grid' | 'list';
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80';

export const EventCard: React.FC<EventCardProps> = ({ event, viewMode = 'grid' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(event.image);

  const favorited = isFavorite(event.id);

  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(event.id, event.title);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/booking/${event.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative sm:w-64 md:w-72 shrink-0 h-48 sm:h-auto overflow-hidden bg-slate-950">
          <img
            src={imgSrc}
            alt={event.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge category={event.category}>{event.category}</Badge>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-indigo-400 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(event.date)} • {formatTime(event.startTime)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {event.city}
              </span>
            </div>

            <Link to={`/events/${event.id}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                {event.title}
              </h3>
            </Link>

            <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-semibold">Starting from</span>
              <span className="text-lg font-extrabold text-white">
                {lowestPrice === 0 ? 'Free Entry' : formatCurrency(lowestPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/events/${event.id}`}
                className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Details
              </Link>
              <button
                onClick={handleBookNow}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Book Tickets</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Default)
  return (
    <div className="group bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge category={event.category}>{event.category}</Badge>
          {event.demoAvailability < 50 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/90 text-white shadow-sm">
              Filling Fast
            </span>
          )}
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium mb-2">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{formatDate(event.date)}</span>
            <span>•</span>
            <span>{formatTime(event.startTime)}</span>
          </div>

          <Link to={`/events/${event.id}`}>
            <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
              {event.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{event.venue}, {event.city}</span>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Starts At</span>
            <span className="text-base font-extrabold text-white">
              {lowestPrice === 0 ? 'Free' : formatCurrency(lowestPrice)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/events/${event.id}`}
              className="text-xs font-semibold px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="View full event details"
            >
              Details
            </Link>
            <button
              onClick={handleBookNow}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
