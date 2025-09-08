// Store exports
export { store } from "./store";
export type { AppDispatch, RootState } from "./store";

// Hooks exports
export { useAppDispatch, useAppSelector } from "./hooks/redux";
export { useAuth } from "./hooks/useAuth";
export { useOnboarding } from "./hooks/useOnboarding";

// Data exports
export {
  getAllCurrencies,
  getCurrenciesByRegion,
  getCurrencyByCode,
  getPopularCurrencies,
  searchCurrencies,
} from "./data/currencies";
export type { CurrencyData } from "./data/currencies";
export {
  getAllTimezones,
  getPopularTimezones,
  getUserTimezone,
} from "./data/timezones";
export type { TimezoneData } from "./data/timezones";

// Utility exports
export * from "./utils/advancedValidation";
export * from "./utils/validation";

// Provider exports
export { ReduxProvider } from "./providers/ReduxProvider";

// API exports - export all hooks and the api instance
export * from "./api/rtkApi";

// Slice exports
export * from "./store/slices/authSlice";

// Types exports (re-export from interfaces)
export type * from "../interfaces";
