export interface TimezoneData {
  value: string;
  label: string;
  offset: string;
  region: string;
}

// Comprehensive list of world timezones
const TIMEZONE_LIST: TimezoneData[] = [
  // North America
  {
    value: "America/New_York",
    label: "Eastern Time (New York)",
    offset: "-05:00",
    region: "America",
  },
  {
    value: "America/Chicago",
    label: "Central Time (Chicago)",
    offset: "-06:00",
    region: "America",
  },
  {
    value: "America/Denver",
    label: "Mountain Time (Denver)",
    offset: "-07:00",
    region: "America",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (Los Angeles)",
    offset: "-08:00",
    region: "America",
  },
  {
    value: "America/Anchorage",
    label: "Alaska Time (Anchorage)",
    offset: "-09:00",
    region: "America",
  },
  {
    value: "Pacific/Honolulu",
    label: "Hawaii Time (Honolulu)",
    offset: "-10:00",
    region: "Pacific",
  },
  {
    value: "America/Toronto",
    label: "Eastern Time (Toronto)",
    offset: "-05:00",
    region: "America",
  },
  {
    value: "America/Vancouver",
    label: "Pacific Time (Vancouver)",
    offset: "-08:00",
    region: "America",
  },
  {
    value: "America/Mexico_City",
    label: "Central Standard Time (Mexico City)",
    offset: "-06:00",
    region: "America",
  },
  {
    value: "America/Phoenix",
    label: "Mountain Standard Time (Phoenix)",
    offset: "-07:00",
    region: "America",
  },

  // South America
  {
    value: "America/Sao_Paulo",
    label: "Brasilia Time (São Paulo)",
    offset: "-03:00",
    region: "America",
  },
  {
    value: "America/Buenos_Aires",
    label: "Argentina Time (Buenos Aires)",
    offset: "-03:00",
    region: "America",
  },
  {
    value: "America/Santiago",
    label: "Chile Time (Santiago)",
    offset: "-03:00",
    region: "America",
  },
  {
    value: "America/Lima",
    label: "Peru Time (Lima)",
    offset: "-05:00",
    region: "America",
  },
  {
    value: "America/Bogota",
    label: "Colombia Time (Bogotá)",
    offset: "-05:00",
    region: "America",
  },
  {
    value: "America/Caracas",
    label: "Venezuela Time (Caracas)",
    offset: "-04:00",
    region: "America",
  },

  // Europe
  {
    value: "Europe/London",
    label: "Greenwich Mean Time (London)",
    offset: "+00:00",
    region: "Europe",
  },
  {
    value: "Europe/Paris",
    label: "Central European Time (Paris)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Berlin",
    label: "Central European Time (Berlin)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Rome",
    label: "Central European Time (Rome)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Madrid",
    label: "Central European Time (Madrid)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Amsterdam",
    label: "Central European Time (Amsterdam)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Brussels",
    label: "Central European Time (Brussels)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Zurich",
    label: "Central European Time (Zurich)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Vienna",
    label: "Central European Time (Vienna)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Warsaw",
    label: "Central European Time (Warsaw)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Prague",
    label: "Central European Time (Prague)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Budapest",
    label: "Central European Time (Budapest)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Stockholm",
    label: "Central European Time (Stockholm)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Oslo",
    label: "Central European Time (Oslo)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Copenhagen",
    label: "Central European Time (Copenhagen)",
    offset: "+01:00",
    region: "Europe",
  },
  {
    value: "Europe/Helsinki",
    label: "Eastern European Time (Helsinki)",
    offset: "+02:00",
    region: "Europe",
  },
  {
    value: "Europe/Athens",
    label: "Eastern European Time (Athens)",
    offset: "+02:00",
    region: "Europe",
  },
  {
    value: "Europe/Istanbul",
    label: "Turkey Time (Istanbul)",
    offset: "+03:00",
    region: "Europe",
  },
  {
    value: "Europe/Moscow",
    label: "Moscow Standard Time",
    offset: "+03:00",
    region: "Europe",
  },
  {
    value: "Europe/Dublin",
    label: "Greenwich Mean Time (Dublin)",
    offset: "+00:00",
    region: "Europe",
  },

  // Asia
  {
    value: "Asia/Tokyo",
    label: "Japan Standard Time (Tokyo)",
    offset: "+09:00",
    region: "Asia",
  },
  {
    value: "Asia/Seoul",
    label: "Korea Standard Time (Seoul)",
    offset: "+09:00",
    region: "Asia",
  },
  {
    value: "Asia/Shanghai",
    label: "China Standard Time (Shanghai)",
    offset: "+08:00",
    region: "Asia",
  },
  {
    value: "Asia/Hong_Kong",
    label: "Hong Kong Time",
    offset: "+08:00",
    region: "Asia",
  },
  {
    value: "Asia/Singapore",
    label: "Singapore Standard Time",
    offset: "+08:00",
    region: "Asia",
  },
  {
    value: "Asia/Bangkok",
    label: "Indochina Time (Bangkok)",
    offset: "+07:00",
    region: "Asia",
  },
  {
    value: "Asia/Manila",
    label: "Philippine Time (Manila)",
    offset: "+08:00",
    region: "Asia",
  },
  {
    value: "Asia/Jakarta",
    label: "Western Indonesian Time (Jakarta)",
    offset: "+07:00",
    region: "Asia",
  },
  {
    value: "Asia/Kuala_Lumpur",
    label: "Malaysia Time (Kuala Lumpur)",
    offset: "+08:00",
    region: "Asia",
  },
  {
    value: "Asia/Dubai",
    label: "Gulf Standard Time (Dubai)",
    offset: "+04:00",
    region: "Asia",
  },
  {
    value: "Asia/Riyadh",
    label: "Arabia Standard Time (Riyadh)",
    offset: "+03:00",
    region: "Asia",
  },
  {
    value: "Asia/Doha",
    label: "Arabia Standard Time (Doha)",
    offset: "+03:00",
    region: "Asia",
  },
  {
    value: "Asia/Kuwait",
    label: "Arabia Standard Time (Kuwait)",
    offset: "+03:00",
    region: "Asia",
  },
  {
    value: "Asia/Kolkata",
    label: "India Standard Time (Mumbai)",
    offset: "+05:30",
    region: "Asia",
  },
  {
    value: "Asia/Karachi",
    label: "Pakistan Standard Time (Karachi)",
    offset: "+05:00",
    region: "Asia",
  },
  {
    value: "Asia/Dhaka",
    label: "Bangladesh Standard Time (Dhaka)",
    offset: "+06:00",
    region: "Asia",
  },
  {
    value: "Asia/Colombo",
    label: "Sri Lanka Time (Colombo)",
    offset: "+05:30",
    region: "Asia",
  },
  {
    value: "Asia/Tehran",
    label: "Iran Standard Time (Tehran)",
    offset: "+03:30",
    region: "Asia",
  },
  {
    value: "Asia/Jerusalem",
    label: "Israel Standard Time (Jerusalem)",
    offset: "+02:00",
    region: "Asia",
  },
  {
    value: "Asia/Beirut",
    label: "Eastern European Time (Beirut)",
    offset: "+02:00",
    region: "Asia",
  },

  // Australia & Oceania
  {
    value: "Australia/Sydney",
    label: "Australian Eastern Time (Sydney)",
    offset: "+10:00",
    region: "Australia",
  },
  {
    value: "Australia/Melbourne",
    label: "Australian Eastern Time (Melbourne)",
    offset: "+10:00",
    region: "Australia",
  },
  {
    value: "Australia/Brisbane",
    label: "Australian Eastern Time (Brisbane)",
    offset: "+10:00",
    region: "Australia",
  },
  {
    value: "Australia/Perth",
    label: "Australian Western Time (Perth)",
    offset: "+08:00",
    region: "Australia",
  },
  {
    value: "Australia/Adelaide",
    label: "Australian Central Time (Adelaide)",
    offset: "+09:30",
    region: "Australia",
  },
  {
    value: "Australia/Darwin",
    label: "Australian Central Time (Darwin)",
    offset: "+09:30",
    region: "Australia",
  },
  {
    value: "Pacific/Auckland",
    label: "New Zealand Standard Time (Auckland)",
    offset: "+12:00",
    region: "Pacific",
  },
  {
    value: "Pacific/Fiji",
    label: "Fiji Time",
    offset: "+12:00",
    region: "Pacific",
  },

  // Africa
  {
    value: "Africa/Cairo",
    label: "Eastern European Time (Cairo)",
    offset: "+02:00",
    region: "Africa",
  },
  {
    value: "Africa/Johannesburg",
    label: "South Africa Standard Time (Johannesburg)",
    offset: "+02:00",
    region: "Africa",
  },
  {
    value: "Africa/Lagos",
    label: "West Africa Time (Lagos)",
    offset: "+01:00",
    region: "Africa",
  },
  {
    value: "Africa/Nairobi",
    label: "East Africa Time (Nairobi)",
    offset: "+03:00",
    region: "Africa",
  },
  {
    value: "Africa/Casablanca",
    label: "Western European Time (Casablanca)",
    offset: "+00:00",
    region: "Africa",
  },
  {
    value: "Africa/Tunis",
    label: "Central European Time (Tunis)",
    offset: "+01:00",
    region: "Africa",
  },
  {
    value: "Africa/Algiers",
    label: "Central European Time (Algiers)",
    offset: "+01:00",
    region: "Africa",
  },

  // Caribbean & Central America
  {
    value: "America/Jamaica",
    label: "Eastern Standard Time (Jamaica)",
    offset: "-05:00",
    region: "America",
  },
  {
    value: "America/Havana",
    label: "Cuba Standard Time (Havana)",
    offset: "-05:00",
    region: "America",
  },
  {
    value: "America/Barbados",
    label: "Atlantic Standard Time (Barbados)",
    offset: "-04:00",
    region: "America",
  },
  {
    value: "America/Guatemala",
    label: "Central Standard Time (Guatemala)",
    offset: "-06:00",
    region: "America",
  },
  {
    value: "America/Costa_Rica",
    label: "Central Standard Time (Costa Rica)",
    offset: "-06:00",
    region: "America",
  },
];

// Get all available timezones and create formatted data
export const getAllTimezones = (): TimezoneData[] => {
  return TIMEZONE_LIST.sort((a, b) => {
    // Sort by region first, then by offset, then by label
    if (a.region !== b.region) {
      const regionOrder = [
        "America",
        "Europe",
        "Asia",
        "Australia",
        "Pacific",
        "Africa",
      ];
      const aIndex = regionOrder.indexOf(a.region);
      const bIndex = regionOrder.indexOf(b.region);
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      return a.region.localeCompare(b.region);
    }

    // Then by offset
    if (a.offset !== b.offset) {
      return a.offset.localeCompare(b.offset);
    }

    // Finally by label
    return a.label.localeCompare(b.label);
  });
};

// Popular timezones for quick access
export const getPopularTimezones = (): TimezoneData[] => {
  const popularZones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Toronto",
    "America/Vancouver",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Asia/Tokyo",
    "Asia/Seoul",
    "Asia/Shanghai",
    "Asia/Hong_Kong",
    "Asia/Singapore",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Australia/Sydney",
    "Australia/Melbourne",
    "Pacific/Auckland",
  ];

  return TIMEZONE_LIST.filter((tz) => popularZones.includes(tz.value));
};

// Get user's local timezone
export const getUserTimezone = (): TimezoneData | null => {
  try {
    // Try to detect user's timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const found = TIMEZONE_LIST.find((tz) => tz.value === timeZone);
    if (found) {
      return found;
    }

    // Fallback to a common timezone
    return TIMEZONE_LIST.find((tz) => tz.value === "America/New_York") || null;
  } catch {
    return null;
  }
};
