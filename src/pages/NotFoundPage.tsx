import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, Search, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20 shadow-xl shadow-indigo-500/10">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-sm font-extrabold text-indigo-400">404 ERROR</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The page or ticket route you are trying to visit does not exist or may have been moved.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/events">
          <Button variant="secondary" size="md" leftIcon={<Search className="w-4 h-4" />}>
            Explore Events
          </Button>
        </Link>
      </div>
    </div>
  );
};
