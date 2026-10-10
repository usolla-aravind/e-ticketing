import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useFavorites } from '../context/FavoriteContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  Shield,
  LogOut,
  Save,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout, isAdmin } = useAuth();
  const { bookings } = useBookings();
  const { favorites } = useFavorites();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || 'Rahul Verma');
  const [email, setEmail] = useState(currentUser?.email || 'rahul.verma@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    setIsEditing(false);
    showToast('Profile Updated', 'Your profile details have been saved locally.', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Signed Out', 'You have been signed out.', 'info');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Account & Profile</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal details and view your QuickTix activity history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 text-center">
          <div className="relative inline-block mx-auto">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser?.name || 'Profile'}
              className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-indigo-600 text-white shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">{currentUser?.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
            <div className="mt-2.5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {isAdmin ? 'Demonstration Administrator' : 'Verified Demo Member'}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
            <Link
              to="/my-bookings"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors"
            >
              <span className="text-lg font-black text-white block">{bookings.length}</span>
              <span className="text-[11px] text-slate-400">Total Bookings</span>
            </Link>
            <Link
              to="/favorites"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors"
            >
              <span className="text-lg font-black text-rose-400 block">{favorites.length}</span>
              <span className="text-[11px] text-slate-400">Saved Favorites</span>
            </Link>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border-slate-800"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Right Column: Editable Profile Information */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Personal Information</h3>
              <p className="text-xs text-slate-400">Stored safely in browser localStorage</p>
            </div>
            {!isEditing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  leftIcon={<Save className="w-3.5 h-3.5" />}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Full Name</span>
                <span className="font-semibold text-white">{currentUser?.name}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Email Address</span>
                <span className="font-semibold text-white">{currentUser?.email}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Phone Number</span>
                <span className="font-semibold text-white">{currentUser?.phone || 'Not provided'}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Member Since</span>
                <span className="font-semibold text-white">{currentUser?.joinedDate || '2026-08-15'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
