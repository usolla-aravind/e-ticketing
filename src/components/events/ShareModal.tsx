import React from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, eventTitle }) => {
  const [copied, setCopied] = React.useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast('Copied to Clipboard!', 'Share link has been copied.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${eventTitle} on QuickTix: ${currentUrl}`)}`,
      color: 'bg-emerald-600 hover:bg-emerald-500',
    },
    {
      name: 'Twitter (X)',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${eventTitle} on QuickTix: ${currentUrl}`)}`,
      color: 'bg-sky-600 hover:bg-sky-500',
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(`QuickTix: ${eventTitle}`)}&body=${encodeURIComponent(`I found this event on QuickTix: ${currentUrl}`)}`,
      color: 'bg-indigo-600 hover:bg-indigo-500',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Share Event</h3>
            <p className="text-xs text-slate-400">Invite friends or colleagues to join you</p>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {shareOptions.map((opt) => (
            <a
              key={opt.name}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl text-center text-xs font-semibold text-white transition-colors ${opt.color}`}
            >
              {opt.name}
            </a>
          ))}
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="w-full bg-transparent px-2 text-xs text-slate-300 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
