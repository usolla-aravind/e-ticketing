export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (timeStr: string): string => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  if (!hours || !minutes) return timeStr;
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHours = h % 12 || 12;
  const displayMinutes = m < 10 ? `0${m}` : m;
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

export const generateBookingId = (): string => {
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  const year = new Date().getFullYear();
  return `QTX-${year}-${randomChars}`;
};

export const calculatePricing = (unitPrice: number, quantity: number, discountCode?: string) => {
  const subtotal = unitPrice * quantity;
  // Standard convenience fee: 5% of subtotal or min ₹40 (per order)
  const convenienceFee = subtotal > 0 ? Math.max(40, Math.round(subtotal * 0.05)) : 0;
  let discount = 0;

  if (discountCode && discountCode.toUpperCase() === 'COLLEGE10') {
    discount = Math.round(subtotal * 0.1);
  } else if (discountCode && discountCode.toUpperCase() === 'QUICK50') {
    discount = Math.min(subtotal, 150);
  }

  const total = Math.max(0, subtotal + convenienceFee - discount);

  return {
    unitPrice,
    quantity,
    subtotal,
    convenienceFee,
    discount,
    total,
  };
};
