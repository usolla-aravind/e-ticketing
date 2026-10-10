import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/events/EventCard';
import { EventFilters, FilterState } from '../components/events/EventFilters';
import { Calendar, SearchX, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ExploreEventsPage: React.FC = () => {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Sync state with URL params
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    priceRange: searchParams.get('price') || 'all',
    sortBy: (searchParams.get('sort') as any) || 'popularity',
  });

  // Keep URL parameters updated
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.search) params.q = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.city) params.city = filters.city;
    if (filters.priceRange !== 'all') params.price = filters.priceRange;
    if (filters.sortBy !== 'popularity') params.sort = filters.sortBy;
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      city: '',
      priceRange: 'all',
      sortBy: 'popularity',
    });
    setVisibleCount(8);
  };

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search query
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((e) => e.category.toLowerCase() === filters.category.toLowerCase());
    }

    // City
    if (filters.city && filters.city !== 'All Cities') {
      result = result.filter((e) => e.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Price range
    if (filters.priceRange !== 'all') {
      result = result.filter((e) => {
        const minPrice = Math.min(...e.ticketTypes.map((t) => t.price));
        if (filters.priceRange === '0-500') return minPrice <= 500;
        if (filters.priceRange === '500-1500') return minPrice >= 500 && minPrice <= 1500;
        if (filters.priceRange === '1500-3000') return minPrice >= 1500 && minPrice <= 3000;
        if (filters.priceRange === '3000-plus') return minPrice > 3000;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      const aMinPrice = Math.min(...a.ticketTypes.map((t) => t.price));
      const bMinPrice = Math.min(...b.ticketTypes.map((t) => t.price));

      if (filters.sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (filters.sortBy === 'price-asc') {
        return aMinPrice - bMinPrice;
      }
      if (filters.sortBy === 'price-desc') {
        return bMinPrice - aMinPrice;
      }
      // default: popularity
      return b.reviewsCount - a.reviewsCount;
    });

    return result;
  }, [events, filters]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore Live Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
          Filter through concerts, movies, hackathons, sports derbies, and cultural fests.
        </p>
      </div>

      {/* Filter Component */}
      <EventFilters
        filters={filters}
        onFilterChange={(newF) => {
          setFilters(newF);
          setVisibleCount(8);
        }}
        onReset={handleResetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredEvents.length}
      />

      {/* Results Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-8">
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredEvents.length && (
            <div className="text-center pt-4">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setVisibleCount((prev) => prev + 8)}
              >
                Load More Events ({filteredEvents.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No Events Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We couldn't find any events matching your selected filters. Try broadening your keywords or clearing selected tags.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleResetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
