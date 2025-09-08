export interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
  region: string;
  popular?: boolean;
}

// Comprehensive list of world currencies
const CURRENCY_DATA: CurrencyData[] = [
  // Popular currencies
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    region: "North America",
    popular: true,
  },
  { code: "EUR", name: "Euro", symbol: "€", region: "Europe", popular: true },
  {
    code: "GBP",
    name: "British Pound Sterling",
    symbol: "£",
    region: "Europe",
    popular: true,
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    region: "Asia",
    popular: true,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    region: "North America",
    popular: true,
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    region: "Oceania",
    popular: true,
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    region: "Europe",
    popular: true,
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    region: "Asia",
    popular: true,
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    region: "Asia",
    popular: true,
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    region: "Asia",
    popular: true,
  },

  // Major currencies by region

  // Europe
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", region: "Europe" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", region: "Europe" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", region: "Europe" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", region: "Europe" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", region: "Europe" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", region: "Europe" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", region: "Europe" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", region: "Europe" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", region: "Europe" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", region: "Europe" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", region: "Europe" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", region: "Europe" },

  // Asia
  { code: "KRW", name: "South Korean Won", symbol: "₩", region: "Asia" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", region: "Asia" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$", region: "Asia" },
  { code: "THB", name: "Thai Baht", symbol: "฿", region: "Asia" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", region: "Asia" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", region: "Asia" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", region: "Asia" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", region: "Asia" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", region: "Asia" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", region: "Asia" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", region: "Asia" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", region: "Asia" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", region: "Asia" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼", region: "Asia" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", region: "Asia" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", region: "Asia" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼", region: "Asia" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", region: "Asia" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", region: "Asia" },

  // Americas
  { code: "MXN", name: "Mexican Peso", symbol: "$", region: "North America" },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    region: "South America",
  },
  { code: "ARS", name: "Argentine Peso", symbol: "$", region: "South America" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", region: "South America" },
  { code: "COP", name: "Colombian Peso", symbol: "$", region: "South America" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", region: "South America" },
  {
    code: "UYU",
    name: "Uruguayan Peso",
    symbol: "$U",
    region: "South America",
  },
  {
    code: "VES",
    name: "Venezuelan Bolívar",
    symbol: "Bs.",
    region: "South America",
  },

  // Africa
  { code: "ZAR", name: "South African Rand", symbol: "R", region: "Africa" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", region: "Africa" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", region: "Africa" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م.", region: "Africa" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت", region: "Africa" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", region: "Africa" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", region: "Africa" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", region: "Africa" },

  // Oceania
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", region: "Oceania" },
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$", region: "Oceania" },

  // Caribbean & Central America
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$", region: "Caribbean" },
  {
    code: "TTD",
    name: "Trinidad and Tobago Dollar",
    symbol: "TT$",
    region: "Caribbean",
  },
  {
    code: "BBD",
    name: "Barbadian Dollar",
    symbol: "Bds$",
    region: "Caribbean",
  },
  {
    code: "XCD",
    name: "East Caribbean Dollar",
    symbol: "EC$",
    region: "Caribbean",
  },
  {
    code: "GTQ",
    name: "Guatemalan Quetzal",
    symbol: "Q",
    region: "Central America",
  },
  {
    code: "CRC",
    name: "Costa Rican Colón",
    symbol: "₡",
    region: "Central America",
  },

  // Cryptocurrencies (if needed)
  { code: "BTC", name: "Bitcoin", symbol: "₿", region: "Digital" },
  { code: "ETH", name: "Ethereum", symbol: "Ξ", region: "Digital" },
];

// Get all currencies with popular ones first
export const getAllCurrencies = (): CurrencyData[] => {
  return CURRENCY_DATA.sort((a: CurrencyData, b: CurrencyData) => {
    // Popular currencies first
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;

    // Then by name
    return a.name.localeCompare(b.name);
  });
};

// Get popular currencies for quick access
export const getPopularCurrencies = (): CurrencyData[] => {
  return CURRENCY_DATA.filter((currency) => currency.popular);
};

// Get currencies by region
export const getCurrenciesByRegion = (region: string): CurrencyData[] => {
  return CURRENCY_DATA.filter((currency) => currency.region === region);
};

// Search currencies by code or name
export const searchCurrencies = (query: string): CurrencyData[] => {
  const searchTerm = query.toLowerCase();
  return CURRENCY_DATA.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm) ||
      currency.name.toLowerCase().includes(searchTerm) ||
      currency.symbol.includes(query)
  );
};

// Get currency by code
export const getCurrencyByCode = (code: string): CurrencyData | undefined => {
  return CURRENCY_DATA.find((currency) => currency.code === code);
};

// Common currency codes for validation
export const COMMON_CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "INR",
  "SGD",
  "HKD",
  "NZD",
  "SEK",
  "NOK",
  "DKK",
  "ZAR",
  "BRL",
  "MXN",
  "KRW",
  "THB",
];
