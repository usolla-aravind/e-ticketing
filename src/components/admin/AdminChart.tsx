import React from 'react';
import { Booking } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface AdminChartProps {
  bookings: Booking[];
}

export const AdminChart: React.FC<AdminChartProps> = ({ bookings }) => {
  // Aggregate bookings by status
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const attendedCount = bookings.filter((b) => b.status === 'attended').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;
  const total = bookings.length || 1;

  const confirmedPct = Math.round((confirmedCount / total) * 100);
  const attendedPct = Math.round((attendedCount / total) * 100);
  const cancelledPct = Math.round((cancelledCount / total) * 100);

  // Category revenue aggregates
  const categoryRevenue: Record<string, number> = {};
  bookings.forEach((b) => {
    if (b.status !== 'cancelled') {
      categoryRevenue[b.eventCategory] = (categoryRevenue[b.eventCategory] || 0) + b.total;
    }
  });

  const categoryEntries = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1]);
  const maxRevenue = Math.max(...categoryEntries.map((e) => e[1]), 1000);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Booking Status Distribution */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
          Demo Booking Status Distribution
        </h4>
        <p className="text-xs text-slate-400 mb-6">Proportion of orders across confirmation statuses</p>

        {/* Custom Progress Bar Segment */}
        <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex shadow-inner mb-6">
          <div
            style={{ width: `${confirmedPct}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`Confirmed: ${confirmedPct}%`}
          />
          <div
            style={{ width: `${attendedPct}%` }}
            className="bg-indigo-500 transition-all duration-500"
            title={`Attended: ${attendedPct}%`}
          />
          <div
            style={{ width: `${cancelledPct}%` }}
            className="bg-rose-500 transition-all duration-500"
            title={`Cancelled: ${cancelledPct}%`}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Confirmed</span>
            <span className="text-lg font-black text-emerald-400">{confirmedCount}</span>
            <span className="text-[10px] text-slate-500 block">({confirmedPct}%)</span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Attended</span>
            <span className="text-lg font-black text-indigo-400">{attendedCount}</span>
            <span className="text-[10px] text-slate-500 block">({attendedPct}%)</span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Cancelled</span>
            <span className="text-lg font-black text-rose-400">{cancelledCount}</span>
            <span className="text-[10px] text-slate-500 block">({cancelledPct}%)</span>
          </div>
        </div>
      </div>

      {/* Category Simulated Revenue Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
          Simulated Revenue by Category
        </h4>
        <p className="text-xs text-slate-400 mb-6">Top performing genres by demo volume (INR)</p>

        <div className="space-y-3.5">
          {categoryEntries.length > 0 ? (
            categoryEntries.slice(0, 5).map(([cat, rev]) => {
              const widthPct = Math.min(100, Math.round((rev / maxRevenue) * 100));
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cat}</span>
                    <span className="font-mono font-bold text-indigo-300">{formatCurrency(rev)}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500 text-center py-6">No revenue data recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
