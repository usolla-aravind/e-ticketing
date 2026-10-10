import React from 'react';
import { Seat } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface SeatMapProps {
  selectedSeats: string[];
  bookedSeats: string[];
  onSeatToggle: (seatId: string, seatPrice: number) => void;
  maxSeats?: number;
}

interface SeatLayoutRow {
  row: string;
  tier: 'VIP Recliner' | 'Prime' | 'Classic';
  price: number;
  seatsCount: number;
}

const SEAT_ROWS: SeatLayoutRow[] = [
  { row: 'A', tier: 'VIP Recliner', price: 950, seatsCount: 10 },
  { row: 'B', tier: 'Prime', price: 650, seatsCount: 12 },
  { row: 'C', tier: 'Prime', price: 650, seatsCount: 12 },
  { row: 'D', tier: 'Classic', price: 450, seatsCount: 12 },
];

export const SeatMap: React.FC<SeatMapProps> = ({
  selectedSeats,
  bookedSeats,
  onSeatToggle,
  maxSeats = 6,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-xl">
      {/* Screen Graphic */}
      <div className="mb-10 text-center">
        <div className="relative mx-auto max-w-lg h-3 rounded-t-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-lg shadow-indigo-500/50" />
        <p className="mt-3 text-xs tracking-widest uppercase font-semibold text-slate-400">
          Screen / Stage Facing Front
        </p>
      </div>

      {/* Seat Rows Container */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="min-w-[620px] flex flex-col items-center gap-4">
          {SEAT_ROWS.map((rowInfo) => (
            <div key={rowInfo.row} className="flex items-center gap-3">
              <span className="w-6 text-xs font-bold text-slate-400 text-center">
                {rowInfo.row}
              </span>

              <div className="flex items-center gap-2">
                {Array.from({ length: rowInfo.seatsCount }).map((_, idx) => {
                  const seatNumber = idx + 1;
                  const seatId = `${rowInfo.row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  // Divider between left and right aisles
                  const isAisle = (rowInfo.seatsCount === 12 && (seatNumber === 4 || seatNumber === 8)) ||
                                  (rowInfo.seatsCount === 10 && (seatNumber === 3 || seatNumber === 7));

                  return (
                    <React.Fragment key={seatId}>
                      <button
                        type="button"
                        disabled={isBooked}
                        onClick={() => onSeatToggle(seatId, rowInfo.price)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all duration-200 cursor-pointer ${
                          isBooked
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                            : isSelected
                            ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50 scale-105 ring-2 ring-indigo-400'
                            : rowInfo.tier === 'VIP Recliner'
                            ? 'bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 hover:scale-105'
                            : rowInfo.tier === 'Prime'
                            ? 'bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/40 text-indigo-200 hover:scale-105'
                            : 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:scale-105'
                        }`}
                        title={`${seatId} — ${rowInfo.tier} (${formatCurrency(rowInfo.price)})${
                          isBooked ? ' [Reserved]' : ''
                        }`}
                        aria-label={`Seat ${seatId}, ${rowInfo.tier}, ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                      >
                        {seatNumber}
                      </button>
                      {isAisle && <div className="w-4" />}
                    </React.Fragment>
                  );
                })}
              </div>

              <span className="w-6 text-xs font-bold text-slate-400 text-center">
                {rowInfo.row}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Tier Prices */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" />
            <span className="text-slate-300">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-tr from-indigo-500 to-purple-500" />
            <span className="text-slate-300">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800 text-slate-600 border border-slate-800 flex items-center justify-center font-bold text-[9px]">✕</div>
            <span className="text-slate-500">Booked</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <span className="text-amber-400 font-medium">VIP Recliner: ₹950</span>
          <span className="text-indigo-400 font-medium">Prime: ₹650</span>
          <span className="text-slate-300 font-medium">Classic: ₹450</span>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-slate-400">
        You can select a maximum of <strong className="text-indigo-400">{maxSeats} seats</strong> per booking.
      </div>
    </div>
  );
};
