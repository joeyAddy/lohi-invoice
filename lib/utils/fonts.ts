// Font family constants - DM Sans for body, Playfair Display for headers

export const FONTS = {
  // DM Sans - Default for body text
  DM_SANS_REGULAR: "DMSans-Regular",
  DM_SANS_MEDIUM: "DMSans-Medium",
  DM_SANS_BOLD: "DMSans-Bold",
  DM_SANS_ITALIC: "DMSans-Italic",

  // Playfair Display - Headers only
  PLAYFAIR_BOLD: "PlayfairDisplay-Bold",
  PLAYFAIR_BLACK: "PlayfairDisplay-Black",
} as const;

// Helper function to get font family
export const getFontFamily = (
  type: "body" | "header" | "header-black" = "body",
  weight: "regular" | "medium" | "bold" = "regular"
): string => {
  if (type === "header") {
    return FONTS.PLAYFAIR_BOLD;
  }
  if (type === "header-black") {
    return FONTS.PLAYFAIR_BLACK;
  }

  // Body text - DM Sans
  switch (weight) {
    case "medium":
      return FONTS.DM_SANS_MEDIUM;
    case "bold":
      return FONTS.DM_SANS_BOLD;
    default:
      return FONTS.DM_SANS_REGULAR;
  }
};

// Font utility constants for easy styling
export const font = {
  // DM Sans variants
  dmSans: FONTS.DM_SANS_REGULAR,
  dmSansMedium: FONTS.DM_SANS_MEDIUM,
  dmSansBold: FONTS.DM_SANS_BOLD,

  // Playfair Display variants
  playfairBold: FONTS.PLAYFAIR_BOLD,
  playfairBlack: FONTS.PLAYFAIR_BLACK,
};
