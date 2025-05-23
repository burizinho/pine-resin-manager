
// Date formatter
export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj);
}

// Currency formatter
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Number formatter with custom decimal places
export function formatNumber(value: number, decimalPlaces: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  }).format(value);
}

// Format area in hectares
export function formatArea(hectares: number): string {
  return `${formatNumber(hectares)} ha`;
}

// Format weight in kilograms
export function formatWeight(kg: number): string {
  return `${formatNumber(kg)} kg`;
}

// Format date range
export function formatDateRange(startDate: Date, endDate: Date): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

// Format percentage
export function formatPercentage(value: number, decimalPlaces: number = 1): string {
  return `${formatNumber(value, decimalPlaces)}%`;
}

// Format price per kilogram
export function formatPricePerKg(value: number): string {
  return `${formatCurrency(value)}/kg`;
}
