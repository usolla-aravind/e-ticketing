import React from 'react';
import { EventCategory } from '../../types';
import { Search, RotateCcw, LayoutGrid, ListFilter, SlidersHorizontal, MapPin } from 'lucide-react';

export interface FilterState {
  search: string;
  category: string;
  city: string;
  priceRange: string;
  sortBy: 'popularity' | 'date' | 'price-asc' | 'price-desc';
}

interface EventFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalResults: number;
}

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Movies',
  'Concerts',
  'Sports',
  'College Events',
  'Theatre',
  'Comedy',
  'Workshops',
  'Festivals',
];

const CITIES = ['All Cities', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Goa'];

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ₹500', value: '0-500' },
  { label: '₹500 to ₹1,500', value: '500-1500' },
  { label: '₹1,500 to ₹3,000', value: '1500-3000' },
  { label: 'Above ₹3,000', value: '3000-plus' },
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  viewMode,
  onViewModeChange,
  totalResults,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8 space-y-5">
      {/* Search & Top Action Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by event title, artist, venue, or keywords..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 justify-between md:justify-end">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="date">Date (Earliest First)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Grid / List switch */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
              aria-label="List view"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Scroll Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {CATEGORIES.map((cat) => {
          const isSelected = (cat === 'All' && !filters.category) || filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onFilterChange({ ...filters, category: cat === 'All' ? '' : cat })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* City & Price filter dropdowns + reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* City filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <select
              value={filters.city}
              onChange={(e) => onFilterChange({ ...filters, city: e.target.value === 'All Cities' ? '' : e.target.value })}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-200">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              {PRICE_RANGES.map((pr) => (
                <option key={pr.value} value={pr.value} className="bg-slate-900 text-slate-200">
                  {pr.label}
                </option>
              ))}
            </select>
          </div>

          {(filters.search || filters.category || filters.city || filters.priceRange !== 'all') && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        <div className="text-slate-400">
          Showing <span className="font-bold text-white">{totalResults}</span> event{totalResults === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  );
};
