import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { Tag, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface PriceSummaryProps {
  unitPrice: number;
  quantity: number;
  selectedSeats?: string[];
  ticketTypeName?: string;
  onProceed: () => void;
  discountCode?: string;
  onApplyDiscount: (code: string) => void;
  disabled?: boolean;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  unitPrice,
  quantity,
  selectedSeats,
  ticketTypeName,
  onProceed,
  discountCode = '',
  onApplyDiscount,
  disabled = false,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const { showToast } = useToast();

  const subtotal = unitPrice * quantity;
  const convenienceFee = subtotal > 0 ? Math.max(40, Math.round(subtotal * 0.05)) : 0;

  let discount = 0;
  if (discountCode.toUpperCase() === 'COLLEGE10') {
    discount = Math.round(subtotal * 0.1);
  } else if (discountCode.toUpperCase() === 'QUICK50') {
    discount = Math.min(subtotal, 150);
  }

  const grandTotal = Math.max(0, subtotal + convenienceFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'COLLEGE10' || code === 'QUICK50') {
      onApplyDiscount(code);
      showToast('Promo Code Applied!', `Code ${code} discount applied successfully.`, 'success');
      setPromoInput('');
    } else {
      showToast('Invalid Promo Code', 'Try demo promo codes: "COLLEGE10" or "QUICK50"', 'warning');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
        Order Price Summary
      </h3>

      {/* Item Details */}
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-slate-300">
          <span>
            {ticketTypeName || 'Selected Seats'} ({quantity} {quantity === 1 ? 'ticket' : 'tickets'})
          </span>
          <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
        </div>

        {selectedSeats && selectedSeats.length > 0 && (
          <div className="text-xs text-indigo-400 bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20">
            <strong>Seats:</strong> {selectedSeats.join(', ')}
          </div>
        )}

        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1">
            <span>Convenience Fee (5% or ₹40)</span>
          </span>
          <span>{formatCurrency(convenienceFee)}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-400 font-medium">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Promo Discount ({discountCode})</span>
            </span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="font-bold text-white text-base">Total Payable</span>
          <span className="font-extrabold text-xl text-white">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Promo Code (e.g. COLLEGE10)"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white uppercase placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
        <p className="text-[11px] text-slate-400">
          Tip: Test with <strong className="text-indigo-400">COLLEGE10</strong> or <strong className="text-indigo-400">QUICK50</strong>
        </p>
      </form>

      {/* Proceed Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={onProceed}
        disabled={disabled || quantity <= 0}
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Proceed to Checkout
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>100% Simulated Payment Demonstration</span>
      </div>
    </div>
  );
};
