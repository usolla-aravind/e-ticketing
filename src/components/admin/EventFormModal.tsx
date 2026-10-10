import React, { useState, useEffect } from 'react';
import { EventItem, EventCategory } from '../../types';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: EventItem | null;
  onSave: (eventData: any) => void;
}

const CATEGORIES: EventCategory[] = [
  'Movies',
  'Concerts',
  'Sports',
  'College Events',
  'Theatre',
  'Comedy',
  'Workshops',
  'Festivals',
];

export const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  eventToEdit,
  onSave,
}) => {
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Concerts');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('18:00');
  const [venue, setVenue] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [organizer, setOrganizer] = useState('');
  const [image, setImage] = useState('');
  const [ticketPrice, setTicketPrice] = useState(499);
  const [capacity, setCapacity] = useState(500);
  const [isSeated, setIsSeated] = useState(false);

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setCategory(eventToEdit.category);
      setDescription(eventToEdit.description);
      setDate(eventToEdit.date);
      setStartTime(eventToEdit.startTime);
      setVenue(eventToEdit.venue);
      setAddress(eventToEdit.address);
      setCity(eventToEdit.city);
      setOrganizer(eventToEdit.organizer);
      setImage(eventToEdit.image);
      setTicketPrice(eventToEdit.ticketTypes[0]?.price || 499);
      setCapacity(eventToEdit.capacity);
      setIsSeated(!!eventToEdit.isSeated);
    } else {
      setTitle('');
      setCategory('Concerts');
      setDescription('');
      setDate('2026-11-20');
      setStartTime('18:00');
      setVenue('');
      setAddress('');
      setCity('Bengaluru');
      setOrganizer('');
      setImage('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80');
      setTicketPrice(499);
      setCapacity(500);
      setIsSeated(false);
    }
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !venue.trim() || !date.trim()) {
      showToast('Validation Error', 'Title, venue, and date are required.', 'error');
      return;
    }

    const payload = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      description,
      fullDescription: description,
      image: image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      bannerImage: image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      date,
      startTime,
      endTime: '22:00',
      venue,
      address: address || `${venue}, ${city}`,
      city,
      organizer: organizer || 'QuickTix Campus Host',
      ticketTypes: [
        {
          id: `tt-${Date.now().toString().slice(-4)}`,
          name: 'General Admission',
          price: Number(ticketPrice),
          description: 'Standard event pass',
          available: Number(capacity),
          total: Number(capacity),
        },
      ],
      isSeated,
      capacity: Number(capacity),
      demoAvailability: Number(capacity),
      featured: false,
      trending: false,
      rating: 4.8,
      reviewsCount: 12,
      tags: [category, city],
      rules: ['Standard venue admissions apply.'],
      highlights: ['Demonstration event added via Admin Panel'],
      ageGuidance: 'All Ages',
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2">
          {eventToEdit ? 'Edit Demo Event' : 'Create New Demo Event'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Fields are saved locally into browser localStorage for evaluation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bangalore Tech & Design Summit 2026"
              className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru, Mumbai"
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Date (YYYY-MM-DD) *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Start Time (HH:MM)
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Venue Name *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Grand Convention Center"
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Organizer Name
              </label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="e.g. TechCorp & College Council"
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Base Ticket Price (INR)
              </label>
              <input
                type="number"
                min="0"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Capacity / Demo Seats
              </label>
              <input
                type="number"
                min="10"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Event Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a compelling overview of the event..."
              className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isSeatedCheckbox"
              checked={isSeated}
              onChange={(e) => setIsSeated(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="isSeatedCheckbox" className="text-xs text-slate-300 cursor-pointer">
              Enable assigned interactive seat map (Cinema / Auditorium layout)
            </label>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <Button variant="secondary" size="md" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              {eventToEdit ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
