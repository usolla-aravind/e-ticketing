import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EventItem } from '../types';
import { INITIAL_EVENTS } from '../data/initialEvents';
import { getItemSafe, setItemSafe, STORAGE_KEYS } from '../utils/storage';
import { useToast } from './ToastContext';

interface EventContextType {
  events: EventItem[];
  getEventById: (id: string) => EventItem | undefined;
  addEvent: (eventData: Omit<EventItem, 'id'>) => EventItem;
  updateEvent: (id: string, eventData: Partial<EventItem>) => boolean;
  deleteEvent: (id: string) => boolean;
  reserveSeats: (eventId: string, seats: string[]) => void;
  releaseSeats: (eventId: string, seats: string[]) => void;
  decrementAvailability: (eventId: string, quantity: number, ticketTypeId?: string) => void;
  incrementAvailability: (eventId: string, quantity: number, ticketTypeId?: string) => void;
  resetDemoEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventItem[]>(() => {
    return getItemSafe<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  });
  const { showToast } = useToast();

  useEffect(() => {
    setItemSafe(STORAGE_KEYS.EVENTS, events);
  }, [events]);

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id || e.slug === id);
  };

  const addEvent = (eventData: Omit<EventItem, 'id'>): EventItem => {
    const newId = `evt-${Date.now().toString().slice(-4)}`;
    const newEvent: EventItem = {
      ...eventData,
      id: newId,
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast('Event Created', `"${newEvent.title}" has been published.`, 'success');
    return newEvent;
  };

  const updateEvent = (id: string, eventData: Partial<EventItem>): boolean => {
    let updated = false;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          updated = true;
          return { ...e, ...eventData };
        }
        return e;
      })
    );
    if (updated) {
      showToast('Event Updated', 'Changes were saved successfully.', 'success');
    }
    return updated;
  };

  const deleteEvent = (id: string): boolean => {
    const target = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event Deleted', target ? `"${target.title}" was removed.` : undefined, 'info');
    return true;
  };

  const reserveSeats = (eventId: string, seats: string[]) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const currentBooked = evt.bookedSeats || [];
          const updatedBooked = Array.from(new Set([...currentBooked, ...seats]));
          const newAvailability = Math.max(0, evt.demoAvailability - seats.length);
          return {
            ...evt,
            bookedSeats: updatedBooked,
            demoAvailability: newAvailability,
          };
        }
        return evt;
      })
    );
  };

  const releaseSeats = (eventId: string, seats: string[]) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const currentBooked = evt.bookedSeats || [];
          const updatedBooked = currentBooked.filter((s) => !seats.includes(s));
          const newAvailability = Math.min(evt.capacity, evt.demoAvailability + seats.length);
          return {
            ...evt,
            bookedSeats: updatedBooked,
            demoAvailability: newAvailability,
          };
        }
        return evt;
      })
    );
  };

  const decrementAvailability = (eventId: string, quantity: number, ticketTypeId?: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const newDemoAvailability = Math.max(0, evt.demoAvailability - quantity);
          let updatedTicketTypes = evt.ticketTypes;
          if (ticketTypeId) {
            updatedTicketTypes = evt.ticketTypes.map((tt) =>
              tt.id === ticketTypeId ? { ...tt, available: Math.max(0, tt.available - quantity) } : tt
            );
          }
          return {
            ...evt,
            demoAvailability: newDemoAvailability,
            ticketTypes: updatedTicketTypes,
          };
        }
        return evt;
      })
    );
  };

  const incrementAvailability = (eventId: string, quantity: number, ticketTypeId?: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const newDemoAvailability = Math.min(evt.capacity, evt.demoAvailability + quantity);
          let updatedTicketTypes = evt.ticketTypes;
          if (ticketTypeId) {
            updatedTicketTypes = evt.ticketTypes.map((tt) =>
              tt.id === ticketTypeId ? { ...tt, available: Math.min(tt.total, tt.available + quantity) } : tt
            );
          }
          return {
            ...evt,
            demoAvailability: newDemoAvailability,
            ticketTypes: updatedTicketTypes,
          };
        }
        return evt;
      })
    );
  };

  const resetDemoEvents = () => {
    setEvents(INITIAL_EVENTS);
    setItemSafe(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    showToast('Events Reset', 'All demonstration events restored to default state.', 'info');
  };

  return (
    <EventContext.Provider
      value={{
        events,
        getEventById,
        addEvent,
        updateEvent,
        deleteEvent,
        reserveSeats,
        releaseSeats,
        decrementAvailability,
        incrementAvailability,
        resetDemoEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
