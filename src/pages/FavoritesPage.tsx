import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useFavorites } from '../context/FavoriteContext';
import { EventCard } from '../components/events/EventCard';
import { Button } from '../components/ui/Button';
import { Heart, ArrowRight } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { events } = useEvents();
  const { favorites } = useFavorites();

  const favoriteEvents = events.filter((e) => favorites.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span>Saved Favorites</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your bookmarked events, concerts, and cinema premieres.
        </p>
      </div>

      {favoriteEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Saved Events Yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Click the heart icon on any event card to save it here for quick access later.
          </p>
          <Link to="/events">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Explore Events
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
