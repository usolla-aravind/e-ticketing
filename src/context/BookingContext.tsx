import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, DraftBooking } from '../types';
import { INITIAL_BOOKINGS } from '../data/initialBookings';
import { getItemSafe, setItemSafe, STORAGE_KEYS } from '../utils/storage';
import { generateBookingId } from '../utils/formatters';
import { useEvents } from './EventContext';
import { useToast } from './ToastContext';

interface CreateBookingParams {
  userId: string;
  eventId: string;
  ticketTypeName?: string;
  ticketTypeId?: string;
  selectedSeats?: string[];
  quantity: number;
  unitPrice: number;
  subtotal: number;
  convenienceFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Demo UPI' | 'Demo Card' | 'Demo Wallet';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface BookingContextType {
  bookings: Booking[];
  draftBooking: DraftBooking | null;
  setDraftBooking: (draft: DraftBooking | null) => void;
  createBooking: (params: CreateBookingParams) => Booking | null;
  cancelBooking: (bookingId: string) => boolean;
  updateBookingStatus: (bookingId: string, status: 'confirmed' | 'cancelled' | 'attended') => boolean;
  getBookingById: (id: string) => Booking | undefined;
  exportBookingsCSV: () => void;
  resetDemoBookings: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    return getItemSafe<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  });

  const [draftBooking, setDraftBookingState] = useState<DraftBooking | null>(() => {
    return getItemSafe<DraftBooking | null>(STORAGE_KEYS.DRAFT_BOOKING, null);
  });

  const { getEventById, reserveSeats, releaseSeats, decrementAvailability, incrementAvailability } = useEvents();
  const { showToast } = useToast();

  useEffect(() => {
    setItemSafe(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  const setDraftBooking = (draft: DraftBooking | null) => {
    setDraftBookingState(draft);
    if (draft) {
      setItemSafe(STORAGE_KEYS.DRAFT_BOOKING, draft);
    } else {
      localStorage.removeItem(STORAGE_KEYS.DRAFT_BOOKING);
    }
  };

  const getBookingById = (id: string) => {
    return bookings.find((b) => b.id.toUpperCase() === id.toUpperCase());
  };

  const createBooking = (params: CreateBookingParams): Booking | null => {
    const event = getEventById(params.eventId);
    if (!event) {
      showToast('Booking Failed', 'Event not found or has been removed.', 'error');
      return null;
    }

    const bookingId = generateBookingId();
    const newBooking: Booking = {
      id: bookingId,
      userId: params.userId,
      eventId: params.eventId,
      eventTitle: event.title,
      eventImage: event.image,
      eventCategory: event.category,
      eventDate: event.date,
      eventTime: event.startTime,
      venue: event.venue,
      address: event.address,
      city: event.city,
      ticketTypeName: params.ticketTypeName,
      selectedSeats: params.selectedSeats,
      quantity: params.quantity,
      unitPrice: params.unitPrice,
      subtotal: params.subtotal,
      convenienceFee: params.convenienceFee,
      discount: params.discount,
      total: params.total,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      paymentMethod: params.paymentMethod,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
    };

    // Update event inventory
    if (params.selectedSeats && params.selectedSeats.length > 0) {
      reserveSeats(params.eventId, params.selectedSeats);
    } else {
      decrementAvailability(params.eventId, params.quantity, params.ticketTypeId);
    }

    setBookings((prev) => [newBooking, ...prev]);
    setDraftBooking(null);
    showToast('Booking Confirmed!', `Booking ID: ${bookingId}. Your digital ticket is ready!`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId: string): boolean => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    if (target.status === 'cancelled') {
      showToast('Already Cancelled', 'This booking has already been cancelled.', 'info');
      return false;
    }

    // Release seats or ticket availability
    if (target.selectedSeats && target.selectedSeats.length > 0) {
      releaseSeats(target.eventId, target.selectedSeats);
    } else {
      incrementAvailability(target.eventId, target.quantity);
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    showToast('Booking Cancelled', `Booking ${bookingId} has been successfully cancelled.`, 'info');
    return true;
  };

  const updateBookingStatus = (bookingId: string, status: 'confirmed' | 'cancelled' | 'attended'): boolean => {
    let updated = false;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          updated = true;
          return { ...b, status };
        }
        return b;
      })
    );
    if (updated) {
      showToast('Status Updated', `Booking ${bookingId} marked as ${status}.`, 'info');
    }
    return updated;
  };

  const exportBookingsCSV = () => {
    if (bookings.length === 0) {
      showToast('Export Failed', 'No bookings to export.', 'warning');
      return;
    }

    const headers = [
      'Booking ID',
      'Customer Name',
      'Customer Email',
      'Event Title',
      'Category',
      'City',
      'Event Date',
      'Ticket Type / Seats',
      'Quantity',
      'Total Amount (INR)',
      'Payment Method',
      'Status',
      'Booking Date',
    ];

    const rows = bookings.map((b) => [
      b.id,
      `"${b.customerName.replace(/"/g, '""')}"`,
      `"${b.customerEmail.replace(/"/g, '""')}"`,
      `"${b.eventTitle.replace(/"/g, '""')}"`,
      b.eventCategory,
      b.city,
      b.eventDate,
      b.selectedSeats && b.selectedSeats.length > 0 ? `"${b.selectedSeats.join(', ')}"` : (b.ticketTypeName || 'Standard'),
      b.quantity,
      b.total,
      b.paymentMethod,
      b.status,
      b.bookingDate,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `QuickTix_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Export Successful', 'Downloaded bookings CSV report.', 'success');
  };

  const resetDemoBookings = () => {
    setBookings(INITIAL_BOOKINGS);
    setItemSafe(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    showToast('Bookings Reset', 'All demonstration bookings restored to default state.', 'info');
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        draftBooking,
        setDraftBooking,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        getBookingById,
        exportBookingsCSV,
        resetDemoBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
