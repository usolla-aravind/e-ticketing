import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getItemSafe, setItemSafe, STORAGE_KEYS } from '../utils/storage';
import { useToast } from './ToastContext';

interface FavoriteContextType {
  favorites: string[];
  toggleFavorite: (eventId: string, eventTitle?: string) => void;
  isFavorite: (eventId: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return getItemSafe<string[]>(STORAGE_KEYS.FAVORITES, ['evt-01', 'evt-02']);
  });
  const { showToast } = useToast();

  useEffect(() => {
    setItemSafe(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const toggleFavorite = (eventId: string, eventTitle?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Removed from Favorites', eventTitle ? `"${eventTitle}" was removed.` : undefined, 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Added to Favorites', eventTitle ? `"${eventTitle}" was saved to your favorites.` : undefined, 'success');
        return [...prev, eventId];
      }
    });
  };

  const isFavorite = (eventId: string) => {
    return favorites.includes(eventId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
