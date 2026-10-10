import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { DigitalTicket } from '../components/tickets/DigitalTicket';
import { Button } from '../components/ui/Button';
import confetti from 'canvas-confetti';
import { CheckCircle2, Home, Calendar, ArrowRight, AlertCircle, ShieldAlert } from 'lucide-react';

export const BookingSuccessPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useBookings();

  const booking = getBookingById(bookingId || '');

  // Trigger celebration confetti on load
  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981'],
        });
      } catch (e) {
        // graceful fallback if canvas-confetti is not loaded
      }
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Booking Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          We could not locate this booking record in the current localStorage state.
        </p>
        <div className="pt-2">
          <Link
            to="/my-bookings"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            <span>Go to My Bookings</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner Alert */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Simulated Booking Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Your demo transaction was processed successfully. A simulated ticket pass has been generated and saved into your browser storage.
        </p>
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
          Ref: <strong className="text-indigo-400">{booking.id}</strong>
        </div>
      </div>

      {/* Embedded Digital Ticket Pass Card */}
      <DigitalTicket booking={booking} />

      {/* Navigation and Actions */}
      <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 print:hidden">
        <Link to="/my-bookings">
          <Button variant="secondary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
            View All My Bookings
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/events">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore More Events
          </Button>
        </Link>
      </div>

      {/* Educational Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center text-xs text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-2 print:hidden">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Demo QR Code is simulated for academic presentation and cannot be scanned for real event entry.</span>
      </div>
    </div>
  );
};
