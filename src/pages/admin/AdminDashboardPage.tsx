import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { useBookings } from '../../context/BookingContext';
import { AdminChart } from '../../components/admin/AdminChart';
import { EventFormModal } from '../../components/admin/EventFormModal';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatters';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Calendar,
  Ticket,
  TrendingUp,
  XCircle,
  IndianRupee,
  Plus,
  FileSpreadsheet,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { events, addEvent, resetDemoEvents } = useEvents();
  const { bookings, exportBookingsCSV, resetDemoBookings } = useBookings();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Metrics
  const totalEvents = events.length;
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
  const totalDemoRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.total, 0);

  const recentBookings = bookings.slice(0, 5);

  const handleResetAll = () => {
    resetDemoEvents();
    resetDemoBookings();
    setResetConfirmOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              Faculty / Evaluator Console
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Admin Demonstration Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics and management controls for the QuickTix system.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={exportBookingsCSV}
            leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />}
          >
            Export CSV
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setResetConfirmOpen(true)}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-amber-400" />}
          >
            Reset Demo Data
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Event
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Events */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Events</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{totalEvents}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Catalog listings</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Bookings</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{totalBookings}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Processed orders</span>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Upcoming Active</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-emerald-400">{upcomingBookings}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Confirmed tickets</span>
          </div>
        </div>

        {/* Cancelled Bookings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Cancelled</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-rose-400">{cancelledBookings}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Voided passes</span>
          </div>
        </div>

        {/* Demo Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Demo Revenue</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-black text-white">{formatCurrency(totalDemoRevenue)}</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">Simulated volume</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <AdminChart bookings={bookings} />

      {/* Management Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/events"
          className="group bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-3xl transition-all duration-300 hover:shadow-xl flex items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              Manage Events Catalog
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add new events, update ticket pricing, or remove demonstration shows.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        <Link
          to="/admin/bookings"
          className="group bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 p-6 rounded-3xl transition-all duration-300 hover:shadow-xl flex items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              Manage Bookings & Statuses
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Search bookings by reference, update statuses, and export CSV reports.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Simulated Bookings</h3>
            <p className="text-xs text-slate-400">Latest transactions stored in local environment</p>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({bookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs text-slate-300 min-w-[700px]">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Reference</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400">{b.id}</td>
                  <td className="py-3 px-4 font-semibold text-white max-w-[200px] truncate">
                    {b.eventTitle}
                  </td>
                  <td className="py-3 px-4">{b.customerName}</td>
                  <td className="py-3 px-4 font-bold text-white">{formatCurrency(b.total)}</td>
                  <td className="py-3 px-4">{b.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <Badge status={b.status}>{b.status.toUpperCase()}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/tickets/${b.id}`}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 inline-flex items-center gap-1 transition-colors"
                      title="Inspect Digital Ticket"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creation Modal */}
      <EventFormModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={addEvent}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={resetConfirmOpen}
        title="Reset All Demonstration Data?"
        message="This action will restore all events and simulated booking records back to their initial seed state in localStorage. Any new bookings created during this session will be reset."
        confirmLabel="Reset Everything"
        variant="danger"
        onConfirm={handleResetAll}
        onCancel={() => setResetConfirmOpen(false)}
      />
    </div>
  );
};
