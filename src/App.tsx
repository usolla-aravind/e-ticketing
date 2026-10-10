import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { BookingProvider } from './context/BookingContext';
import { FavoriteProvider } from './context/FavoriteContext';

// Layout
import { DemoBanner } from './components/layout/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExploreEventsPage } from './pages/ExploreEventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { TicketViewPage } from './pages/TicketViewPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <EventProvider>
          <BookingProvider>
            <FavoriteProvider>
              <BrowserRouter>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
                  {/* Top Demonstration Notification & Role Switcher Banner */}
                  <DemoBanner />

                  {/* Main Header / Navigation */}
                  <Navbar />

                  {/* Page Routing */}
                  <main className="flex-1">
                    <Routes>
                      {/* Main Endpoints */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/events" element={<ExploreEventsPage />} />
                      <Route path="/events/:eventId" element={<EventDetailsPage />} />
                      <Route path="/booking/:eventId" element={<BookingPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/booking-success/:bookingId" element={<BookingSuccessPage />} />
                      <Route path="/my-bookings" element={<MyBookingsPage />} />
                      <Route path="/tickets/:bookingId" element={<TicketViewPage />} />

                      {/* User Account Endpoints */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />

                      {/* Institutional & Information Endpoints */}
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/faq" element={<FaqPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />

                      {/* Admin Demonstration Dashboard */}
                      <Route path="/admin" element={<AdminDashboardPage />} />
                      <Route path="/admin/events" element={<AdminEventsPage />} />
                      <Route path="/admin/bookings" element={<AdminBookingsPage />} />

                      {/* 404 Catch-All */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>

                  {/* Site Footer */}
                  <Footer />
                </div>
              </BrowserRouter>
            </FavoriteProvider>
          </BookingProvider>
        </EventProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
