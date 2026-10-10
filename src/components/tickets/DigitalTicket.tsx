import React, { useRef } from 'react';
import { Booking } from '../../types';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Printer, Download, Share2, Ticket, MapPin, Calendar, Clock, User, QrCode } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface DigitalTicketProps {
  booking: Booking;
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({ booking }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `QuickTix Ticket: ${booking.eventTitle}`,
        text: `Here is my QuickTix demo ticket for ${booking.eventTitle} (${booking.id})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Ticket link copied to clipboard.', 'success');
    }
  };

  const handleDownload = () => {
    // Generate clean SVG-based printable ticket document or trigger print
    showToast('Preparing Ticket', 'Opening system print/save dialog...', 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Ticket Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="text-xs text-slate-400">
          Booking Reference: <strong className="text-indigo-400 font-mono">{booking.id}</strong>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            leftIcon={<Share2 className="w-3.5 h-3.5" />}
          >
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print Ticket
          </Button>
        </div>
      </div>

      {/* Ticket Physical Pass Card */}
      <div
        ref={ticketRef}
        className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto print:border-black print:text-black print:bg-white print:shadow-none"
      >
        {/* Top Header Banner */}
        <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-950">
          <img
            src={booking.eventImage}
            alt={booking.eventTitle}
            className="w-full h-full object-cover opacity-60 print:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent print:from-white print:via-white/60" />

          <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 print:bg-white print:border-black">
              <Ticket className="w-4 h-4 text-indigo-400" />
              <span className="font-extrabold text-xs tracking-wider text-white print:text-black">
                QuickTix E-PASS
              </span>
            </div>
            <Badge status={booking.status}>
              {booking.status === 'confirmed' ? 'CONFIRMED PASS' : booking.status.toUpperCase()}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
              {booking.eventCategory}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white print:text-black leading-tight drop-shadow-md">
              {booking.eventTitle}
            </h2>
          </div>
        </div>

        {/* Middle Details Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Date
              </span>
              <p className="font-bold text-white print:text-black text-sm">{formatDate(booking.eventDate)}</p>
            </div>

            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Showtime
              </span>
              <p className="font-bold text-white print:text-black text-sm">{formatTime(booking.eventTime)}</p>
            </div>

            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1 font-medium">
                <Ticket className="w-3.5 h-3.5 text-indigo-400" /> Quantity
              </span>
              <p className="font-bold text-white print:text-black text-sm">
                {booking.quantity} {booking.quantity === 1 ? 'Guest' : 'Guests'}
              </p>
            </div>

            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5 text-indigo-400" /> Primary Guest
              </span>
              <p className="font-bold text-white print:text-black text-sm truncate">{booking.customerName}</p>
            </div>
          </div>

          {/* Venue & Seat details */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:bg-slate-100 print:border-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white print:text-black text-sm">{booking.venue}</p>
                <p className="text-xs text-slate-400 print:text-slate-600">{booking.address}</p>
              </div>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <span className="text-[11px] text-slate-400 block">Class / Tier</span>
              <span className="font-extrabold text-sm text-indigo-300 print:text-indigo-800">
                {booking.ticketTypeName || 'Assigned Seating'}
              </span>
              {booking.selectedSeats && booking.selectedSeats.length > 0 && (
                <div className="text-xs font-bold text-white print:text-black mt-0.5">
                  Seats: {booking.selectedSeats.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Perforated Divider with cutouts */}
        <div className="relative my-1">
          {/* Left cutout notch */}
          <div className="absolute -left-4 -top-3 w-7 h-7 rounded-full bg-slate-950 border-r border-slate-800 print:hidden" />
          {/* Right cutout notch */}
          <div className="absolute -right-4 -top-3 w-7 h-7 rounded-full bg-slate-950 border-l border-slate-800 print:hidden" />
          {/* Dashed line */}
          <div className="border-b-2 border-dashed border-slate-800 mx-5 print:border-black" />
        </div>

        {/* Bottom Stub with Simulated QR Code */}
        <div className="p-6 sm:p-8 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-6 print:bg-white">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-slate-500 uppercase tracking-widest block font-semibold">
              Simulated Payment
            </span>
            <div className="text-lg font-black text-white print:text-black">
              {formatCurrency(booking.total)}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center justify-center sm:justify-start gap-1">
              <span>●</span> Demo Payment Complete ({booking.paymentMethod})
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Issued: {new Date(booking.bookingDate).toLocaleDateString()}
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200 shadow-inner">
            {/* SVG simulated QR Code */}
            <svg
              className="w-24 h-24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="white" />
              {/* Corner position markers */}
              <rect x="5" y="5" width="26" height="26" fill="black" />
              <rect x="9" y="9" width="18" height="18" fill="white" />
              <rect x="13" y="13" width="10" height="10" fill="black" />

              <rect x="69" y="5" width="26" height="26" fill="black" />
              <rect x="73" y="9" width="18" height="18" fill="white" />
              <rect x="77" y="13" width="10" height="10" fill="black" />

              <rect x="5" y="69" width="26" height="26" fill="black" />
              <rect x="9" y="73" width="18" height="18" fill="white" />
              <rect x="13" y="77" width="10" height="10" fill="black" />

              {/* Data matrix dots */}
              <rect x="36" y="8" width="8" height="8" fill="black" />
              <rect x="48" y="8" width="6" height="6" fill="black" />
              <rect x="36" y="20" width="6" height="12" fill="black" />
              <rect x="48" y="22" width="12" height="6" fill="black" />
              <rect x="10" y="38" width="14" height="6" fill="black" />
              <rect x="30" y="38" width="8" height="8" fill="black" />
              <rect x="45" y="36" width="10" height="10" fill="black" />
              <rect x="62" y="38" width="14" height="6" fill="black" />
              <rect x="82" y="38" width="8" height="8" fill="black" />
              <rect x="36" y="52" width="10" height="8" fill="black" />
              <rect x="52" y="50" width="8" height="14" fill="black" />
              <rect x="68" y="52" width="12" height="8" fill="black" />
              <rect x="38" y="68" width="6" height="14" fill="black" />
              <rect x="50" y="72" width="14" height="8" fill="black" />
              <rect x="70" y="70" width="12" height="14" fill="black" />
              <rect x="42" y="88" width="16" height="6" fill="black" />
              <rect x="64" y="88" width="10" height="6" fill="black" />
            </svg>
            <span className="text-[8px] font-bold text-slate-800 tracking-wider mt-1 uppercase text-center max-w-[120px]">
              DEMO QR — NOT VALID FOR REAL-WORLD ENTRY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
