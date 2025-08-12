// Font utility for Playfair Display usage throughout the app
export const PlayfairFonts = {
  regular: "PlayfairDisplay-Regular",
  italic: "PlayfairDisplay-Italic",
  bold: "PlayfairDisplay-Bold",
  boldItalic: "PlayfairDisplay-BoldItalic",
  black: "PlayfairDisplay-Black",
  blackItalic: "PlayfairDisplay-BlackItalic",
} as const;

// Tailwind-compatible font family classes
export const fontClasses = {
  // For headings and important text
  heading: "font-playfair-bold",
  headingBold: "font-playfair-black",

  // For body text
  body: "font-playfair-regular",
  bodyItalic: "font-playfair-italic",

  // For labels and UI text
  label: "font-playfair-regular",

  // For special emphasis
  emphasis: "font-playfair-bold",
  emphasisItalic: "font-playfair-bold-italic",
} as const;

// React Native StyleSheet compatible font families
export const fontStyles = {
  regular: { fontFamily: PlayfairFonts.regular },
  italic: { fontFamily: PlayfairFonts.italic },
  bold: { fontFamily: PlayfairFonts.bold },
  boldItalic: { fontFamily: PlayfairFonts.boldItalic },
  black: { fontFamily: PlayfairFonts.black },
  blackItalic: { fontFamily: PlayfairFonts.blackItalic },
} as const;
