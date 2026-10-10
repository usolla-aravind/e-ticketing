# QuickTix — Online E-Ticketing System

**QuickTix** is a modern, responsive, and fully functional online event discovery and e-ticketing web application engineered from scratch for a college Software Engineering capstone project and Practical Project Viva Voce (PPVC) demonstration.

---

## 🌟 Key Application Features

1. **Event Discovery & Filtering:**
   - Multi-criteria real-time search across event titles, venues, artists, and keywords.
   - Filter by categories: *Concerts, Movies, Sports, College Events, Theatre, Comedy, Workshops, Festivals*.
   - Filter by major cities: *Bengaluru, Mumbai, Delhi NCR, Pune, Hyderabad, Chennai, Goa*.
   - Price range filters (Under ₹500, ₹500–₹1,500, ₹1,500–₹3,000, Above ₹3,000).
   - Dynamic sorting (Most Popular, Date Earliest, Price Low-to-High, Price High-to-Low).
   - Responsive Grid and List layouts with URL query parameter synchronization.

2. **Interactive Seating & Ticket Selection:**
   - **Cinema / Theatre Mode:** Visual interactive auditorium seating layout with screen orientation indicator, categorized seat tiers (*VIP Recliner, Prime, Classic*), real-time pricing calculation, and 6-seat transaction cap.
   - **General Admission Mode:** Tier selector (*General Access, VIP Deck, Backstage Platinum*) with increment/decrement steppers and availability validation.
   - Live recalculation of subtotal, convenience fees, and demo promo code application (`COLLEGE10` for 10% off, `QUICK50` for ₹150 off).

3. **Simulated Payment & Checkout:**
   - Attendee contact details capture with client-side validation.
   - Multiple simulated payment options: Demo UPI (VPA intent), Demo Card, and Demo Wallet.
   - Protection against accidental duplicate submissions.
   - Clear and prominent educational disclaimers: *"DEMO PAYMENT — NO REAL MONEY WILL BE CHARGED."*

4. **Digital Pass & Ticket Stub Generation:**
   - Perforated ticket stub aesthetic with cutout notches and dashed tear lines.
   - Embedded SVG demonstration QR code labeled *"DEMO QR — NOT VALID FOR REAL-WORLD ENTRY"*.
   - Integrated print stylesheet (`window.print()`) for direct printable tickets.
   - Client-side ticket download and link sharing.

5. **Booking Management & History:**
   - Categorized tabs: *All, Upcoming Active, Past Attended, Cancelled*.
   - In-place cancellation with double-confirmation dialog.
   - Automatic release of reserved seats and ticket quotas back to the demo event pool upon cancellation.

6. **Faculty Admin Demonstration Console:**
   - Real-time KPI summary cards (Total Events, Total Bookings, Active Upcoming, Cancelled, Simulated Revenue).
   - Visual status breakdown and category revenue distribution chart.
   - Complete event catalog CRUD (Create, Read, Update, Delete) with local storage persistence.
   - Live booking fulfillment status changer (*Confirmed, Attended, Cancelled*).
   - One-click CSV export of all audit booking records.
   - "Reset Demonstration Data" action with confirmation.

7. **User Profiles, Saved Favorites & Quick Role Switcher:**
   - One-click quick login for faculty testing: **Demo User** (`Rahul Verma`) or **Demo Admin** (`Administrator`).
   - Saved favorites with local bookmarking.
   - Editable user profile.

---

## 🛠️ Technology Stack

- **Frontend Library:** React 19 (TypeScript)
- **Bundler & Build Tool:** Vite 8
- **Styling & Design System:** Tailwind CSS v4 with custom color tokens and smooth animations
- **Icons:** Lucide React
- **Client Routing:** React Router v7 (`react-router-dom`)
- **Celebration Effects:** Canvas Confetti
- **State Management:** Decoupled React Context API (`AuthContext`, `EventContext`, `BookingContext`, `FavoriteContext`, `ToastContext`)
- **Persistence:** Versioned HTML5 `localStorage` with defensive JSON handling

---

## 📁 Project Architecture & Directory Structure

```
c:/E-Ticketing/
├── index.html                  # HTML entry point with fonts & metadata
├── vite.config.ts              # Vite 8 configuration with Tailwind v4
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.app.json           # Application TypeScript options
├── package.json                # Dependencies and scripts
├── src/
│   ├── main.tsx                # Application mounting entry point
│   ├── App.tsx                 # Router definition and context providers
│   ├── index.css               # Global styling, tokens, scrollbar, print CSS
│   ├── types/
│   │   └── index.ts            # Core TypeScript interfaces (EventItem, Booking, User, Seat)
│   ├── data/
│   │   ├── initialEvents.ts    # 14 initial demonstration events
│   │   └── initialBookings.ts  # Pre-seeded test bookings
│   ├── utils/
│   │   ├── formatters.ts       # Currency (INR), date, time, and fee calculation helpers
│   │   └── storage.ts          # Safe localStorage wrapper functions
│   ├── context/
│   │   ├── AuthContext.tsx     # Demo authentication & user roles
│   │   ├── EventContext.tsx    # Event catalog state, seat reservation & CRUD
│   │   ├── BookingContext.tsx  # Booking lifecycle, status updates & CSV export
│   │   ├── FavoriteContext.tsx # User saved events
│   │   └── ToastContext.tsx    # Non-blocking notification toasts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Responsive header with navigation & user dropdown
│   │   │   ├── Footer.tsx      # Comprehensive site footer with legal/academic notices
│   │   │   └── DemoBanner.tsx  # Top alert banner & instant role switcher
│   │   ├── ui/
│   │   │   ├── Button.tsx      # Reusable button with variants & loading state
│   │   │   ├── Badge.tsx       # Category and booking status badges
│   │   │   └── ConfirmationDialog.tsx # Accessible modal confirmation
│   │   ├── events/
│   │   │   ├── EventCard.tsx   # Responsive card supporting Grid & List views
│   │   │   ├── EventFilters.tsx# Search, category pills, city and price filters
│   │   │   └── ShareModal.tsx  # Social sharing & copy link modal
│   │   ├── booking/
│   │   │   ├── SeatMap.tsx     # Interactive cinema/auditorium seat selection layout
│   │   │   ├── QuantitySelector.tsx # General admission ticket tier stepper
│   │   │   └── PriceSummary.tsx# Subtotal, convenience fee & promo calculations
│   │   ├── tickets/
│   │   │   └── DigitalTicket.tsx # Printable perforated pass with QR code
│   │   └── admin/
│   │       ├── AdminChart.tsx  # Visual status & revenue distribution bars
│   │       └── EventFormModal.tsx # Event creation & modification modal
│   └── pages/
│       ├── HomePage.tsx        # Hero, categories, featured/trending shows
│       ├── ExploreEventsPage.tsx # Catalog with full search & filtering
│       ├── EventDetailsPage.tsx# Event banner, highlights, venue rules & CTA
│       ├── BookingPage.tsx     # Seat & ticket selection page
│       ├── CheckoutPage.tsx    # Review & simulated payment gateway
│       ├── BookingSuccessPage.tsx # Confetti celebration & digital ticket
│       ├── MyBookingsPage.tsx  # Booking history & cancellation manager
│       ├── TicketViewPage.tsx  # Standalone printable pass view
│       ├── LoginPage.tsx       # Login & quick faculty demo buttons
│       ├── RegisterPage.tsx    # Registration form
│       ├── ForgotPasswordPage.tsx # Simulated password recovery
│       ├── ProfilePage.tsx     # User profile management
│       ├── FavoritesPage.tsx   # Saved events
│       ├── AboutPage.tsx       # Software Engineering documentation & architecture
│       ├── ContactPage.tsx     # Contact inquiry form (demo)
│       ├── FaqPage.tsx         # Categorized accordion FAQ
│       ├── TermsPage.tsx       # Demonstration terms & conditions
│       ├── PrivacyPage.tsx     # Client storage privacy policy
│       ├── NotFoundPage.tsx    # Custom 404 handler
│       └── admin/
│           ├── AdminDashboardPage.tsx # KPIs, analytics, recent bookings
│           ├── AdminEventsPage.tsx    # Event catalog management
│           └── AdminBookingsPage.tsx  # Booking audit & CSV export
```

---

## 🚀 Running the Application Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev -- --host 0.0.0.0
```
Or:
```bash
npm run dev
```

The application will be accessible at:
👉 **`http://localhost:5173/`**

### 3. Production Build & Validation
To test production compilation:
```bash
npm run build
```

---

## 🧪 Evaluation Test Plan (Viva Voce Checklist)

1. **Explore Events (`/events`):** Test search bar with queries like "Rahman" or "IMAX", change categories (Movies, Sports, Concerts), and toggle Grid vs List mode.
2. **Interactive Seat Selection (`/booking/evt-02` or `evt-03`):** Select up to 6 seats on the visual cinema grid. Observe the live recalculation of subtotal and convenience fees.
3. **Discount Codes (`/booking/:eventId`):** Enter `COLLEGE10` (10% off) or `QUICK50` (₹150 off) and verify the deduction.
4. **Simulated Payment (`/checkout`):** Fill attendee contact details, select Demo UPI or Demo Card, and click pay. Verify the duplicate submission lock.
5. **Digital Pass (`/booking-success/:bookingId`):** Observe celebratory confetti, verify the unique `QTX-2026-XXXXX` booking ID, and click "Print Ticket" to test print layout.
6. **Cancellation & Quota Restoration (`/my-bookings`):** Cancel any active booking with confirmation. Verify the status updates to "Cancelled" and the seats/quota are released.
7. **Admin Demonstration (`/admin`):** Switch to Admin role in the top banner. Inspect KPI cards, create or edit an event, change booking statuses, and click "Export to CSV" to download the report.
8. **Reset Demo Data:** Click "Reset Data" in the top banner to reset localStorage back to the initial 14 events.

---

## 🔒 Demonstration & Academic Limitations

- **Simulated Payment:** No real bank or credit card information is collected or processed.
- **Client Persistence:** Data is stored in browser `localStorage`. It does not sync across different physical machines or private browsing windows.
- **Security:** In this frontend-only academic demonstration, client-side route guards are illustrative and demonstrate UI flow rather than cryptographic server authorization.
