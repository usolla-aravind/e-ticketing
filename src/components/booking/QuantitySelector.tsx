import React from 'react';
import { TicketType } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Minus, Plus, Users, Sparkles } from 'lucide-react';

interface QuantitySelectorProps {
  ticketTypes: TicketType[];
  selectedTicketTypeId: string;
  onSelectTicketType: (ticketTypeId: string) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  maxQuantity?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  ticketTypes,
  selectedTicketTypeId,
  onSelectTicketType,
  quantity,
  onQuantityChange,
  maxQuantity = 6,
}) => {
  const currentTicketType = ticketTypes.find((t) => t.id === selectedTicketTypeId) || ticketTypes[0];

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    const maxAvailable = Math.min(maxQuantity, currentTicketType?.available || maxQuantity);
    if (quantity < maxAvailable) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Select Ticket Category</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Choose your desired ticket experience and specify the number of guests.
        </p>
      </div>

      {/* Ticket Tier Cards */}
      <div className="space-y-3">
        {ticketTypes.map((tier) => {
          const isSelected = tier.id === selectedTicketTypeId;
          const isSoldOut = tier.available <= 0;

          return (
            <div
              key={tier.id}
              onClick={() => !isSoldOut && onSelectTicketType(tier.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSoldOut
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">{tier.name}</span>
                    {isSoldOut ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300">
                        Sold Out
                      </span>
                    ) : tier.available < 30 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300">
                        Only {tier.available} left
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tier.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-extrabold text-white block">
                    {formatCurrency(tier.price)}
                  </span>
                  <span className="text-[11px] text-slate-500">per ticket</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Quantity Stepper */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-white block">Number of Tickets</span>
          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Max {maxQuantity} tickets per transaction</span>
          </span>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-2xl p-1.5 shadow-inner">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Decrease ticket quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-8 text-center text-base font-extrabold text-white">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= maxQuantity || quantity >= (currentTicketType?.available || maxQuantity)}
            className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Increase ticket quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
