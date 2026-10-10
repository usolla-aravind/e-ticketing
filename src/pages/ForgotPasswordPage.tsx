import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Mail, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    showToast('Reset Link Dispatched (Demo)', 'Simulated password reset instructions sent.', 'info');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Recover Demo Password</h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter your email address to receive simulated recovery credentials.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white text-sm">Simulated Recovery Dispatched</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In this offline demonstration, you can simply use the <strong>Quick Demo Login</strong> button on the login screen to sign in instantly.
            </p>
            <div className="pt-2">
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full" type="submit">
              Send Simulated Reset Link
            </Button>
          </form>
        )}

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>This is an educational frontend sandbox. No actual SMTP transmission occurs.</span>
        </div>
      </div>
    </div>
  );
};
