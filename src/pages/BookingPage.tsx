import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useBookings } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { SeatMap } from '../components/booking/SeatMap';
import { QuantitySelector } from '../components/booking/QuantitySelector';
import { PriceSummary } from '../components/booking/PriceSummary';
import { calculatePricing, formatDate, formatTime } from '../utils/formatters';
import { ArrowLeft, Calendar, MapPin, Ticket, AlertCircle } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEvents();
  const { setDraftBooking, draftBooking } = useBookings();
  const { showToast } = useToast();

  const event = getEventById(eventId || '');

  // Booking state
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState<string>(() => {
    return event?.ticketTypes[0]?.id || '';
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatPrices, setSeatPrices] = useState<Record<string, number>>({});
  const [discountCode, setDiscountCode] = useState<string>('');

  // Initialize or restore draft if same event
  useEffect(() => {
    if (draftBooking && draftBooking.eventId === eventId) {
      if (draftBooking.ticketTypeId) setSelectedTicketTypeId(draftBooking.ticketTypeId);
      if (draftBooking.quantity) setQuantity(draftBooking.quantity);
      if (draftBooking.selectedSeats) setSelectedSeats(draftBooking.selectedSeats);
    } else if (event) {
      setSelectedTicketTypeId(event.ticketTypes[0]?.id || '');
    }
  }, [eventId, draftBooking, event]);

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Event Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          The booking target could not be verified. Please return to the event catalog.
        </p>
        <div className="pt-2">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const isSeated = !!event.isSeated;

  // Handle seat toggle
  const handleSeatToggle = (seatId: string, seatPrice: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
      setSeatPrices((prev) => {
        const copy = { ...prev };
        delete copy[seatId];
        return copy;
      });
    } else {
      if (selectedSeats.length >= 6) {
        showToast('Limit Reached', 'You can select up to 6 seats per transaction.', 'warning');
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
      setSeatPrices((prev) => ({ ...prev, [seatId]: seatPrice }));
    }
  };

  // Pricing calculations
  const currentTicketType = event.ticketTypes.find((t) => t.id === selectedTicketTypeId) || event.ticketTypes[0];

  let currentUnitPrice = currentTicketType ? currentTicketType.price : 0;
  let currentQty = quantity;

  if (isSeated) {
    currentQty = selectedSeats.length;
    // Calculate average unit price or sum
    const totalSeatPrice = Object.values(seatPrices).reduce((a, b) => a + b, 0);
    currentUnitPrice = currentQty > 0 ? Math.round(totalSeatPrice / currentQty) : 450;
  }

  const pricing = calculatePricing(currentUnitPrice, currentQty, discountCode);

  const handleProceedToCheckout = () => {
    if (isSeated && selectedSeats.length === 0) {
      showToast('No Seats Selected', 'Please click on the seat map to select at least 1 seat.', 'warning');
      return;
    }
    if (!isSeated && quantity <= 0) {
      showToast('Invalid Quantity', 'Please choose at least 1 ticket.', 'warning');
      return;
    }

    // Save draft booking to context and localStorage
    setDraftBooking({
      eventId: event.id,
      ticketTypeId: isSeated ? undefined : selectedTicketTypeId,
      selectedSeats: isSeated ? selectedSeats : undefined,
      quantity: currentQty,
      unitPrice: currentUnitPrice,
      subtotal: pricing.subtotal,
      convenienceFee: pricing.convenienceFee,
      discount: pricing.discount,
      total: pricing.total,
    });

    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Back & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Event Details</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Select Your Tickets & Seats
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-400 mt-1">
            <span className="font-semibold text-slate-200">{event.title}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {formatDate(event.date)} at {formatTime(event.startTime)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {event.venue}, {event.city}
            </span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
            {isSeated ? 'Auditorium Seat Selection' : 'General Admission Pass'}
          </span>
        </div>
      </div>

      {/* Main Grid: Selection Area (Left) and Price Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          {isSeated ? (
            <SeatMap
              selectedSeats={selectedSeats}
              bookedSeats={event.bookedSeats || []}
              onSeatToggle={handleSeatToggle}
              maxSeats={6}
            />
          ) : (
            <QuantitySelector
              ticketTypes={event.ticketTypes}
              selectedTicketTypeId={selectedTicketTypeId}
              onSelectTicketType={setSelectedTicketTypeId}
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={6}
            />
          )}
        </div>

        {/* Price Breakdown & Checkout Action */}
        <div>
          <div className="sticky top-24">
            <PriceSummary
              unitPrice={currentUnitPrice}
              quantity={currentQty}
              selectedSeats={isSeated ? selectedSeats : undefined}
              ticketTypeName={isSeated ? 'Assigned Seats' : currentTicketType?.name}
              onProceed={handleProceedToCheckout}
              discountCode={discountCode}
              onApplyDiscount={setDiscountCode}
              disabled={isSeated ? selectedSeats.length === 0 : quantity <= 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
