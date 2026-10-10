import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { DigitalTicket } from '../components/tickets/DigitalTicket';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const TicketViewPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useBookings();

  const booking = getBookingById(bookingId || '');

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Ticket Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          The requested ticket pass reference ({bookingId}) could not be retrieved from demo storage.
        </p>
        <div className="pt-2">
          <Link
            to="/my-bookings"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Bookings</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Link
          to="/my-bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Bookings</span>
        </Link>
        <span className="text-xs text-slate-400">Digital Pass Reference: {booking.id}</span>
      </div>

      <DigitalTicket booking={booking} />
    </div>
  );
};
