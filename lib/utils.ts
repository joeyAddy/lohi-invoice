import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// TODO: Re-enable currency utilities after fixing navigation issue
// export * from "./utils/currency";
