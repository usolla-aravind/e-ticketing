import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { useBookings } from '../../context/BookingContext';
import { ShieldAlert, RotateCcw, UserCheck, ShieldCheck } from 'lucide-react';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';

export const DemoBanner: React.FC = () => {
  const { currentUser, demoLogin, isAdmin } = useAuth();
  const { resetDemoEvents } = useEvents();
  const { resetDemoBookings } = useBookings();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetDemoEvents();
    resetDemoBookings();
    setShowResetConfirm(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-indigo-500/20 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-slate-200">
              <strong className="text-white">College Demonstration Mode:</strong> All payments & tickets are simulated via localStorage.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/60 text-slate-300">
              <span>Acting as:</span>
              <button
                onClick={() => demoLogin(isAdmin ? 'user' : 'admin')}
                className="inline-flex items-center gap-1 font-semibold text-indigo-300 hover:text-indigo-200 underline transition-colors cursor-pointer"
                title="Click to toggle between Demo User and Demo Admin"
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-purple-400" />
                    Admin ({currentUser?.name || 'Admin'})
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3 h-3 text-emerald-400" />
                    User ({currentUser?.name || 'Rahul Verma'})
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer py-0.5 px-1.5 rounded hover:bg-slate-800/50"
              title="Reset all demo events, bookings, and localStorage to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showResetConfirm}
        title="Reset Demonstration Data?"
        message="This will reset all events, seat reservations, and simulated bookings back to the original seed state. Any new test bookings you created will be restored to default."
        confirmLabel="Reset Everything"
        variant="danger"
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </>
  );
};
