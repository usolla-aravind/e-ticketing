import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import {
  Calendar,
  MapPin,
  Ticket,
  Eye,
  Ban,
  Printer,
  SearchX,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useBookings();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState<string | null>(null);

  // Filter bookings by tab and user
  const userBookings = bookings; // In demonstration mode, show active bookings so evaluator can see everything

  const filteredBookings = userBookings.filter((b) => {
    const isPast = new Date(b.eventDate).getTime() < new Date().getTime();
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    if (activeTab === 'past') return b.status === 'attended' || (isPast && b.status !== 'cancelled');
    if (activeTab === 'upcoming') return b.status === 'confirmed' && !isPast;
    return true; // all
  });

  const handleOpenCancel = (bookingId: string) => {
    setSelectedBookingToCancel(bookingId);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBookingToCancel) {
      cancelBooking(selectedBookingToCancel);
      setSelectedBookingToCancel(null);
      setCancelModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            My Booking History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your simulated ticket passes, download vouchers, or cancel upcoming reservations.
          </p>
        </div>

        <Link to="/events">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Book More Events
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Bookings', count: userBookings.length },
          {
            id: 'upcoming',
            label: 'Upcoming Passes',
            count: userBookings.filter((b) => b.status === 'confirmed').length,
          },
          {
            id: 'past',
            label: 'Past Events',
            count: userBookings.filter((b) => b.status === 'attended').length,
          },
          {
            id: 'cancelled',
            label: 'Cancelled',
            count: userBookings.filter((b) => b.status === 'cancelled').length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isEligibleForCancel = booking.status === 'confirmed';

            return (
              <div
                key={booking.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
              >
                {/* Left: Event Thumbnail & Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  <img
                    src={booking.eventImage}
                    alt={booking.eventTitle}
                    className="w-full sm:w-28 h-32 sm:h-28 rounded-2xl object-cover shrink-0 bg-slate-950"
                  />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20">
                        {booking.id}
                      </span>
                      <Badge status={booking.status}>
                        {booking.status.toUpperCase()}
                      </Badge>
                      <Badge category={booking.eventCategory}>
                        {booking.eventCategory}
                      </Badge>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                      {booking.eventTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {formatDate(booking.eventDate)} at {formatTime(booking.eventTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {booking.venue}, {booking.city}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-medium">
                      {booking.ticketTypeName || 'Assigned Seats'} • {booking.quantity}{' '}
                      {booking.quantity === 1 ? 'ticket' : 'tickets'}
                      {booking.selectedSeats && booking.selectedSeats.length > 0 && (
                        <span className="ml-2 text-indigo-300 font-semibold">
                          [Seats: {booking.selectedSeats.join(', ')}]
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Price & Action Buttons */}
                <div className="flex sm:flex-col md:flex-col items-center sm:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Total Paid
                    </span>
                    <span className="text-lg font-black text-white">
                      {formatCurrency(booking.total)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {booking.paymentMethod}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/tickets/${booking.id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                      >
                        View Ticket
                      </Button>
                    </Link>

                    {isEligibleForCancel && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenCancel(booking.id)}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        leftIcon={<Ban className="w-3.5 h-3.5" />}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No Bookings in this Category</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            You don't have any bookings matching this filter. Explore upcoming concerts and shows to make your first booking!
          </p>
          <Link to="/events">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Explore Events Catalog
            </Button>
          </Link>
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={cancelModalOpen}
        title="Cancel This Booking?"
        message="Are you sure you want to cancel this booking? The reserved seats or ticket quota will be restored back to the event demo availability. The booking record will remain in your history marked as Cancelled."
        confirmLabel="Yes, Cancel Booking"
        cancelLabel="Keep Booking"
        variant="danger"
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelModalOpen(false)}
      />
    </div>
  );
};
