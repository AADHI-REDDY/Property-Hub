// Currency utilities
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', code: 'USD' },
  EUR: { symbol: '€', name: 'Euro', code: 'EUR' },
  GBP: { symbol: '£', name: 'British Pound', code: 'GBP' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD' },
  INR: { symbol: '₹', name: 'Indian Rupee', code: 'INR' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', code: 'AUD' },
  JPY: { symbol: '¥', name: 'Japanese Yen', code: 'JPY' },
};

export const TIMEZONES = {
  'UTC-8': { name: 'Pacific Time', offset: -8 },
  'UTC-7': { name: 'Mountain Time', offset: -7 },
  'UTC-6': { name: 'Central Time', offset: -6 },
  'UTC-5': { name: 'Eastern Time', offset: -5 },
  'UTC+0': { name: 'Greenwich Mean Time', offset: 0 },
  'UTC+1': { name: 'Central European Time', offset: 1 },
  'UTC+5:30': { name: 'India Standard Time', offset: 5.5 },
  'UTC+8': { name: 'China Standard Time', offset: 8 },
  'UTC+9': { name: 'Japan Standard Time', offset: 9 },
};

// ✅ UPDATED: Default is now 'INR' instead of 'USD'
export const formatCurrency = (amount: number, currencyCode: string = 'INR'): string => {
  const currency = CURRENCIES[currencyCode as keyof typeof CURRENCIES];
  if (!currency) return `$${amount.toLocaleString()}`;
  
  // Special formatting for different currencies
  switch (currencyCode) {
    case 'INR':
      // Indian number formatting with commas (e.g., 1,50,000)
      return `₹${amount.toLocaleString('en-IN')}`;
    case 'JPY':
      return `¥${Math.round(amount).toLocaleString()}`;
    case 'EUR':
      return `€${amount.toLocaleString('de-DE')}`;
    case 'GBP':
      return `£${amount.toLocaleString('en-GB')}`;
    default:
      return `${currency.symbol}${amount.toLocaleString()}`;
  }
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  // Mock exchange rates (relative to USD)
  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    CAD: 1.25,
    INR: 83.12,
    AUD: 1.35,
    JPY: 110.0,
  };
  
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  return (amount / fromRate) * toRate;
};

// ✅ NOTE: You already had this correct for India (UTC+5:30)
export const formatDateTime = (date: Date, timezone: string = 'UTC+5:30'): string => {
  const tz = TIMEZONES[timezone as keyof typeof TIMEZONES];
  if (!tz) return date.toLocaleString();
  
  // Simple timezone offset calculation
  const offsetHours = tz.offset;
  const offsetMs = offsetHours * 60 * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + offsetMs);
  
  return adjustedDate.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};