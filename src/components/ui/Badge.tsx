import React from 'react';
import { EventCategory } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'category' | 'status' | 'outline' | 'price';
  category?: EventCategory;
  status?: 'confirmed' | 'cancelled' | 'attended';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'category',
  category,
  status,
  className = '',
}) => {
  let badgeStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide';

  if (category) {
    const categoryColors: Record<EventCategory, string> = {
      Movies: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
      Concerts: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
      Sports: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
      'College Events': 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
      Theatre: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      Comedy: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
      Workshops: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
      Festivals: 'bg-pink-500/15 text-pink-300 border border-pink-500/30',
    };
    badgeStyles += ` ${categoryColors[category] || 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'}`;
  } else if (status) {
    const statusColors = {
      confirmed: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
      cancelled: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      attended: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
    };
    badgeStyles += ` ${statusColors[status]}`;
  } else if (variant === 'price') {
    badgeStyles += ' bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold';
  } else {
    badgeStyles += ' bg-slate-800 text-slate-300 border border-slate-700';
  }

  return <span className={`${badgeStyles} ${className}`}>{children}</span>;
};
