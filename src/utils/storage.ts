export const STORAGE_KEYS = {
  EVENTS: 'quicktix_events_v1',
  BOOKINGS: 'quicktix_bookings_v1',
  USER: 'quicktix_user_v1',
  FAVORITES: 'quicktix_favorites_v1',
  DRAFT_BOOKING: 'quicktix_draft_booking_v1',
} as const;

export function getItemSafe<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[QuickTix Storage] Error reading key "${key}":`, error);
    return fallback;
  }
}

export function setItemSafe<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[QuickTix Storage] Error saving key "${key}":`, error);
    return false;
  }
}

export function removeItemSafe(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[QuickTix Storage] Error removing key "${key}":`, error);
  }
}

export function clearDemoStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  } catch (error) {
    console.warn('[QuickTix Storage] Error resetting demo storage:', error);
  }
}
