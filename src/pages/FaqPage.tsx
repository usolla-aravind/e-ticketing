import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Booking & Seating',
    q: 'How does seat selection work in QuickTix?',
    a: 'For cinema and auditorium events, QuickTix provides an interactive visual seat layout with a screen indicator and row letters (A to D). You can select up to 6 seats per booking. Seats update in real time with corresponding prices (VIP Recliner, Prime, Classic).',
  },
  {
    category: 'Booking & Seating',
    q: 'Can I book multiple ticket tiers for festivals?',
    a: 'For General Admission festivals and concerts, you can choose from General Access, VIP Deck, or Backstage Platinum passes with our ticket tier selector, adjusting quantities from 1 to 6 tickets.',
  },
  {
    category: 'Payment Simulation',
    q: 'Will my credit card or bank account actually be charged?',
    a: 'No. QuickTix is strictly a frontend demonstration web application built for a college Software Engineering PPVC evaluation. All payment flows (Demo UPI, Demo Card, Demo Wallet) are simulated entirely in the browser using JavaScript and localStorage. No actual money is ever debited.',
  },
  {
    category: 'Payment Simulation',
    q: 'Are there test discount coupons I can try?',
    a: 'Yes! On the Booking page, enter "COLLEGE10" for a 10% demo discount or "QUICK50" for an instant ₹150 deduction.',
  },
  {
    category: 'Digital Tickets',
    q: 'How do I access and print my digital ticket?',
    a: 'Once your booking is confirmed, you will receive an instant digital ticket pass with a perforated stub and simulated QR graphic. You can click "Print Ticket" or "Download" to trigger a formatted printout using our clean print stylesheet, or access it anytime from "My Bookings".',
  },
  {
    category: 'Digital Tickets',
    q: 'Can the QR code be scanned at an actual venue gate?',
    a: 'No. The QR code contains a non-sensitive demonstration reference ID clearly labeled "DEMO QR — NOT VALID FOR REAL-WORLD ENTRY". It demonstrates client-side ticket generation rather than cryptographically signed venue access.',
  },
  {
    category: 'Cancellation & Changes',
    q: 'Can I cancel a booking after generating a ticket?',
    a: 'Yes. In the "My Bookings" page, find any upcoming booking and click "Cancel Booking". After confirming the dialog, the booking status is changed to "Cancelled", and reserved seats or ticket quotas are automatically released back into the event demo inventory.',
  },
  {
    category: 'Admin Demonstration',
    q: 'How can faculty or evaluators access the Admin Dashboard?',
    a: 'Click "Admin" in the top navigation bar or switch your role to "Admin" using the role toggle in the top demo banner. In the Admin Dashboard, you can create new events, edit pricing, update booking statuses, and export CSV reports.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 2]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Common inquiries about booking flows, simulated payments, digital passes, and the demonstration architecture.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850 transition-colors"
                aria-expanded={isOpen}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base">{item.q}</h3>
                </div>
                <div
                  className={`w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-indigo-600 text-white' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
