import { CartItem } from '../types/catalog';

export function formatPrice(priceInr: number | null, placeholder = '₹[PRICE]'): string {
  if (priceInr === null || Number.isNaN(priceInr)) {
    return placeholder;
  }
  return `₹${priceInr.toLocaleString('en-IN')}`;
}

export function calculateCartTotal(items: CartItem[]): {
  hasPlaceholders: boolean;
  numericTotal: number;
  formattedTotal: string;
} {
  if (items.length === 0) {
    return {
      hasPlaceholders: false,
      numericTotal: 0,
      formattedTotal: '₹0',
    };
  }

  let numericTotal = 0;
  let hasPlaceholders = false;

  for (const item of items) {
    if (item.priceInr === null || Number.isNaN(item.priceInr)) {
      hasPlaceholders = true;
    } else {
      numericTotal += item.priceInr * item.quantity;
    }
  }

  if (hasPlaceholders && numericTotal === 0) {
    return {
      hasPlaceholders: true,
      numericTotal: 0,
      formattedTotal: '₹[PRICE]',
    };
  }

  if (hasPlaceholders) {
    return {
      hasPlaceholders: true,
      numericTotal,
      formattedTotal: `₹${numericTotal.toLocaleString('en-IN')} + ₹[PRICE]`,
    };
  }

  return {
    hasPlaceholders: false,
    numericTotal,
    formattedTotal: `₹${numericTotal.toLocaleString('en-IN')}`,
  };
}
