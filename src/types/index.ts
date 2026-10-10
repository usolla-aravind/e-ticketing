export type EventCategory =
  | 'Movies'
  | 'Concerts'
  | 'Sports'
  | 'College Events'
  | 'Theatre'
  | 'Comedy'
  | 'Workshops'
  | 'Festivals';

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  total: number;
}

export interface Seat {
  id: string; // e.g., 'A1', 'C4'
  row: string;
  number: number;
  tier: 'VIP Recliner' | 'Prime' | 'Classic';
  price: number;
  status: 'available' | 'booked' | 'selected';
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  description: string;
  fullDescription: string;
  image: string;
  bannerImage: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;
  venue: string;
  address: string;
  city: string;
  organizer: string;
  ticketTypes: TicketType[];
  isSeated?: boolean;
  bookedSeats?: string[]; // e.g. ['A3', 'B5']
  capacity: number;
  demoAvailability: number;
  featured: boolean;
  trending: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  rules: string[];
  highlights: string[];
  ageGuidance: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  joinedDate: string;
  avatar?: string;
}

export interface Booking {
  id: string; // QTX-2026-XXXXX
  userId: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventCategory: EventCategory;
  eventDate: string;
  eventTime: string;
  venue: string;
  address: string;
  city: string;
  ticketTypeName?: string;
  selectedSeats?: string[];
  quantity: number;
  unitPrice: number;
  subtotal: number;
  convenienceFee: number;
  discount: number;
  total: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'attended';
  paymentMethod: 'Demo UPI' | 'Demo Card' | 'Demo Wallet';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface DraftBooking {
  eventId: string;
  ticketTypeId?: string;
  selectedSeats?: string[];
  quantity: number;
  unitPrice: number;
  subtotal: number;
  convenienceFee: number;
  discount: number;
  total: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}
