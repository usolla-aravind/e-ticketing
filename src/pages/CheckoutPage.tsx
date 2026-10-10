import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { useBookings } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import {
  CreditCard,
  QrCode,
  Wallet,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Ticket,
  ArrowLeft,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getEventById } = useEvents();
  const { draftBooking, createBooking } = useBookings();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'Demo UPI' | 'Demo Card' | 'Demo Wallet'>('Demo UPI');
  const [upiId, setUpiId] = useState('demo-student@oksbi');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('***');
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Rahul Verma');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'rahul.verma@example.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no draft booking exists
  if (!draftBooking) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <Ticket className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">No Active Booking Selection</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Your booking cart is currently empty or has expired. Please select an event to proceed.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Find Events to Book</span>
          </Link>
        </div>
      </div>
    );
  }

  const event = getEventById(draftBooking.eventId);
  if (!event) {
    return null;
  }

  const ticketType = event.ticketTypes.find((t) => t.id === draftBooking.ticketTypeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim()) {
      showToast('Missing Contact Information', 'Please provide a valid full name and email address.', 'error');
      return;
    }

    if (!termsAccepted) {
      showToast('Terms Required', 'Please accept the demonstration terms to complete your order.', 'warning');
      return;
    }

    if (isSubmitting) return; // Prevent duplicate submission
    setIsSubmitting(true);

    // Simulate 1.2 second payment gateway transaction
    setTimeout(() => {
      const booking = createBooking({
        userId: currentUser?.id || 'usr-guest-01',
        eventId: event.id,
        ticketTypeName: ticketType ? ticketType.name : draftBooking.selectedSeats ? 'Assigned Seats' : 'Standard',
        ticketTypeId: draftBooking.ticketTypeId,
        selectedSeats: draftBooking.selectedSeats,
        quantity: draftBooking.quantity,
        unitPrice: draftBooking.unitPrice,
        subtotal: draftBooking.subtotal,
        convenienceFee: draftBooking.convenienceFee,
        discount: draftBooking.discount,
        total: draftBooking.total,
        paymentMethod,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
      });

      setIsSubmitting(false);

      if (booking) {
        navigate(`/booking-success/${booking.id}`);
      }
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <Link
          to={`/booking/${event.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Ticket Selection</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Review & Simulated Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete the simulated payment step to generate your digital entry ticket.
        </p>
      </div>

      {/* Prominent Demo Notice Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <h4 className="font-bold text-amber-300">DEMO PAYMENT — NO REAL MONEY WILL BE CHARGED</h4>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">
            This checkout simulates a real payment gateway for college PPVC evaluation. Browser localStorage cannot guarantee ticket inventory consistency across different external devices.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact details & Simulated Payment methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Details Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              1. Attendee Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (for e-ticket) *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (SMS notification)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              2. Choose Simulated Payment Method
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Demo UPI', icon: <QrCode className="w-4 h-4" />, label: 'Demo UPI' },
                { id: 'Demo Card', icon: <CreditCard className="w-4 h-4" />, label: 'Demo Card' },
                { id: 'Demo Wallet', icon: <Wallet className="w-4 h-4" />, label: 'Demo Wallet' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {m.icon}
                  <span className="text-xs font-bold">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Simulated Payment Inputs depending on chosen method */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              {paymentMethod === 'Demo UPI' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Simulated UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@okaxis"
                    className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Simulates instant UPI intent / QR authorization.
                  </p>
                </div>
              )}

              {paymentMethod === 'Demo Card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Simulated Test Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Demo Wallet' && (
                <div className="text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-200">Demo Wallet Balance Available: ₹25,000</p>
                  <p className="text-[11px]">Instant simulated one-click deduction from simulated sandbox wallet.</p>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="termsCheck"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="termsCheck" className="text-xs text-slate-400 cursor-pointer leading-normal">
                I understand that this is a college demonstration application with no actual money transfer or real ticket issuance.
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review Summary & Pay Button */}
        <div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Order Review
            </h3>

            {/* Event Miniature */}
            <div className="flex gap-3">
              <img
                src={event.image}
                alt={event.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1">{event.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span className="truncate">{event.city}</span>
                </div>
              </div>
            </div>

            {/* Items summary */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>
                  {draftBooking.selectedSeats
                    ? `Assigned Seats (${draftBooking.quantity})`
                    : `${ticketType?.name || 'Pass'} × ${draftBooking.quantity}`}
                </span>
                <span className="font-bold text-white">{formatCurrency(draftBooking.subtotal)}</span>
              </div>

              {draftBooking.selectedSeats && draftBooking.selectedSeats.length > 0 && (
                <div className="text-[11px] text-indigo-300 bg-indigo-500/10 p-2 rounded-lg">
                  Seats: {draftBooking.selectedSeats.join(', ')}
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Convenience Fee</span>
                <span>{formatCurrency(draftBooking.convenienceFee)}</span>
              </div>

              {draftBooking.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span>-{formatCurrency(draftBooking.discount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                <span className="font-bold text-white">Amount Payable</span>
                <span className="font-black text-lg text-white">
                  {formatCurrency(draftBooking.total)}
                </span>
              </div>
            </div>

            {/* Confirm Simulated Payment Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting || !termsAccepted}
              leftIcon={<Lock className="w-4 h-4" />}
            >
              {isSubmitting ? 'Simulating Payment...' : `Pay ${formatCurrency(draftBooking.total)} (Demo)`}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero Risk Sandbox Demo</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
