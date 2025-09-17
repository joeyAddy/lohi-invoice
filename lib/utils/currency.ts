import { CurrencyData } from "../data/currencies";

/**
 * Format amount with currency symbol and proper locale formatting
 * @param amount - The numeric amount to format
 * @param currency - The currency data object containing symbol and code
 * @param locale - Optional locale for number formatting (defaults to 'en-US')
 * @param options - Additional formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyData,
  locale: string = "en-US",
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
    symbolPosition?: "before" | "after";
  }
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSymbol = true,
    symbolPosition = "before",
  } = options || {};

  // Format the number with proper locale
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);

  if (!showSymbol) {
    return formattedNumber;
  }

  // Handle symbol positioning
  if (symbolPosition === "after") {
    return `${formattedNumber} ${currency.symbol}`;
  }

  // Default: symbol before
  return `${currency.symbol}${formattedNumber}`;
}

/**
 * Format amount with default USD currency (fallback)
 * @param amount - The numeric amount to format
 * @param minimumFractionDigits - Minimum decimal places (default: 2)
 * @param maximumFractionDigits - Maximum decimal places (default: 2)
 * @returns Formatted currency string with $ symbol
 */
export function formatPrice(
  amount: number,
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Format amount for display without currency symbol
 * @param amount - The numeric amount to format
 * @param locale - Locale for number formatting (defaults to 'en-US')
 * @param minimumFractionDigits - Minimum decimal places (default: 2)
 * @param maximumFractionDigits - Maximum decimal places (default: 2)
 * @returns Formatted number string
 */
export function formatAmount(
  amount: number,
  locale: string = "en-US",
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Get currency-specific formatting preferences
 * @param currencyCode - ISO currency code (e.g., 'USD', 'EUR')
 * @returns Formatting preferences for the currency
 */
export function getCurrencyFormatting(currencyCode: string) {
  const formatMap: Record<
    string,
    {
      locale: string;
      symbolPosition: "before" | "after";
      minimumFractionDigits: number;
      maximumFractionDigits: number;
    }
  > = {
    USD: {
      locale: "en-US",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    EUR: {
      locale: "de-DE",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    GBP: {
      locale: "en-GB",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    JPY: {
      locale: "ja-JP",
      symbolPosition: "before",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    CAD: {
      locale: "en-CA",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    AUD: {
      locale: "en-AU",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    CHF: {
      locale: "de-CH",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    CNY: {
      locale: "zh-CN",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    INR: {
      locale: "en-IN",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    SGD: {
      locale: "en-SG",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    HKD: {
      locale: "en-HK",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    NZD: {
      locale: "en-NZ",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    KRW: {
      locale: "ko-KR",
      symbolPosition: "before",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    SEK: {
      locale: "sv-SE",
      symbolPosition: "after",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    NOK: {
      locale: "nb-NO",
      symbolPosition: "after",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    DKK: {
      locale: "da-DK",
      symbolPosition: "after",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    BRL: {
      locale: "pt-BR",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    MXN: {
      locale: "es-MX",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    ZAR: {
      locale: "en-ZA",
      symbolPosition: "before",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  };

  return (
    formatMap[currencyCode] || {
      locale: "en-US",
      symbolPosition: "before" as const,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
}

/**
 * Smart currency formatter that uses currency-specific formatting
 * @param amount - The numeric amount to format
 * @param currency - The currency data object
 * @returns Properly formatted currency string based on currency conventions
 */
export function formatCurrencySmart(
  amount: number,
  currency: CurrencyData
): string {
  const formatting = getCurrencyFormatting(currency.code);

  return formatCurrency(amount, currency, formatting.locale, {
    minimumFractionDigits: formatting.minimumFractionDigits,
    maximumFractionDigits: formatting.maximumFractionDigits,
    symbolPosition: formatting.symbolPosition,
  });
}

/**
 * Parse currency string back to number
 * @param currencyString - The currency string to parse
 * @param currency - The currency data object
 * @returns Parsed number or 0 if invalid
 */
export function parseCurrency(
  currencyString: string,
  currency?: CurrencyData
): number {
  if (!currencyString) return 0;

  // Remove currency symbol and any non-numeric characters except decimal separator
  let cleanString = currencyString.replace(/[^\d.,\-]/g, "");

  // Handle different decimal separators (comma vs period)
  // This is a simplified approach - for production, you might want more sophisticated parsing
  if (cleanString.includes(",") && cleanString.includes(".")) {
    // Assume comma is thousands separator and period is decimal
    cleanString = cleanString.replace(/,/g, "");
  } else if (cleanString.includes(",") && !cleanString.includes(".")) {
    // Assume comma is decimal separator (European style)
    cleanString = cleanString.replace(",", ".");
  }

  const parsed = parseFloat(cleanString);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validate if a string is a valid currency amount
 * @param value - String to validate
 * @returns Boolean indicating if valid
 */
export function isValidCurrencyAmount(value: string): boolean {
  if (!value || value.trim() === "") return false;

  const parsed = parseCurrency(value);
  return !isNaN(parsed) && parsed >= 0;
}
