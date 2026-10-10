import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Booking } from '../../types';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatters';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Search,
  FileSpreadsheet,
  ArrowLeft,
  RotateCcw,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  X,
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, exportBookingsCSV, resetDemoBookings } = useBookings();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      b.eventTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'cancelled' | 'attended') => {
    updateBookingStatus(bookingId, newStatus);
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Booking & Order Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search orders, alter fulfillment statuses, and export CSV audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={resetDemoBookings}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Bookings
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={exportBookingsCSV}
            leftIcon={<FileSpreadsheet className="w-3.5 h-3.5" />}
          >
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search reference, customer name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed Only</option>
            <option value="attended">Attended Only</option>
            <option value="cancelled">Cancelled Only</option>
          </select>
          <span className="text-xs text-slate-400 hidden sm:inline">
            ({filteredBookings.length} results)
          </span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs text-slate-300 min-w-[900px]">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Event Details</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Ticket Type / Seats</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{b.id}</td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white max-w-[200px] truncate">{b.eventTitle}</p>
                    <p className="text-[11px] text-slate-400">
                      {formatDate(b.eventDate)} • {b.city}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-white">{b.customerName}</p>
                    <p className="text-[11px] text-slate-400">{b.customerEmail}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-300">
                      {b.ticketTypeName || 'Assigned Seats'} ({b.quantity})
                    </span>
                    {b.selectedSeats && b.selectedSeats.length > 0 && (
                      <p className="text-[10px] text-indigo-300 font-mono">
                        {b.selectedSeats.join(', ')}
                      </p>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    {formatCurrency(b.total)}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {b.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                      className={`text-xs font-semibold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : b.status === 'attended'
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      <option value="confirmed" className="bg-slate-900 text-white">Confirmed</option>
                      <option value="attended" className="bg-slate-900 text-white">Attended</option>
                      <option value="cancelled" className="bg-slate-900 text-white">Cancelled</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                        title="View Full Booking Modal"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        to={`/tickets/${b.id}`}
                        className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white transition-colors"
                      >
                        Pass
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                {selectedBooking.id}
              </span>
              <Badge status={selectedBooking.status}>
                {selectedBooking.status.toUpperCase()}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{selectedBooking.eventTitle}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedBooking.venue}, {selectedBooking.city} • {formatDate(selectedBooking.eventDate)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Customer:</span>
                <span className="font-semibold text-white">{selectedBooking.customerName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Email:</span>
                <span className="font-semibold text-white">{selectedBooking.customerEmail}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Phone:</span>
                <span className="font-semibold text-white">{selectedBooking.customerPhone}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Quantity / Tier:</span>
                <span className="font-semibold text-white">
                  {selectedBooking.ticketTypeName || 'Assigned'} ({selectedBooking.quantity})
                </span>
              </div>
              {selectedBooking.selectedSeats && (
                <div className="flex justify-between text-indigo-300">
                  <span>Seats:</span>
                  <span className="font-mono font-bold">{selectedBooking.selectedSeats.join(', ')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 text-sm">
                <span className="font-bold text-white">Grand Total:</span>
                <span className="font-black text-white">{formatCurrency(selectedBooking.total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to={`/tickets/${selectedBooking.id}`}
                className="text-xs font-semibold text-indigo-400 hover:underline"
              >
                Open Full Printable Ticket Pass →
              </Link>
              <Button variant="secondary" size="sm" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
