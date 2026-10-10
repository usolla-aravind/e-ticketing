import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { EventItem } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EventFormModal } from '../../components/admin/EventFormModal';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  RotateCcw,
  Eye,
  ExternalLink,
} from 'lucide-react';

export const AdminEventsPage: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, resetDemoEvents } = useEvents();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventItem | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCategory || e.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenCreate = () => {
    setEventToEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (event: EventItem) => {
    setEventToEdit(event);
    setModalOpen(true);
  };

  const handleOpenDelete = (event: EventItem) => {
    setEventToDelete(event);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      setEventToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const handleSaveModal = (data: any) => {
    if (eventToEdit) {
      updateEvent(eventToEdit.id, data);
    } else {
      addEvent(data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Event Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, edit, and organize demonstration event listings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={resetDemoEvents}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Events
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create New Event
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, venue, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="">All Categories</option>
            {['Movies', 'Concerts', 'Sports', 'College Events', 'Theatre', 'Comedy', 'Workshops', 'Festivals'].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </select>
          <span className="text-xs text-slate-400 hidden sm:inline">
            ({filteredEvents.length} listed)
          </span>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs text-slate-300 min-w-[850px]">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Event</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">City / Venue</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Starting Price</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredEvents.map((evt) => {
                const minPrice = Math.min(...evt.ticketTypes.map((t) => t.price));
                return (
                  <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 bg-slate-950"
                        />
                        <div>
                          <p className="font-bold text-white max-w-[220px] truncate">{evt.title}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{evt.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge category={evt.category}>{evt.category}</Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-white">{evt.city}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{evt.venue}</p>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {formatDate(evt.date)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white">
                      {formatCurrency(minPrice)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-400">
                        {evt.demoAvailability} / {evt.capacity}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/events/${evt.id}`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Event"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(evt)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <EventFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventToEdit={eventToEdit}
        onSave={handleSaveModal}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        title="Delete Event Listing?"
        message={`Are you sure you want to remove "${eventToDelete?.title}" from the demo catalog?`}
        confirmLabel="Delete Event"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};
