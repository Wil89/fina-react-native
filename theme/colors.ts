export const Colors = {
  // Primary Brand Colors
  primary: {
    100: "#F2F0FF",
    200: "#E7E7FF",
    300: "#C6C4FF",
    400: "#9990FF",
    500: "#6B4EFF", // Main brand color
    600: "#5538EE",
    700: "#422FCC",
    800: "#33269F",
    900: "#241D7B",
  },

  green: {
    100: "#F0FDF4",
    200: "#ECFCE5",
    300: "#7DDE86",
    400: "#4CD471",
    500: "#23C16B",
    600: "#198155",
    700: "#106040",
    800: "#0A402A",
    900: "#052015",
  },

  red: {
    100: "#FFF1F1",
    200: "#FFE5E5",
    300: "#FF9898",
    400: "#FF6D6D",
    500: "#FF5247",
    600: "#D3180C",
    700: "#B30D07",
    800: "#8E0B06",
    900: "#6B0804",
  },

  yellow: {
    100: "#FFF8E5",
    200: "#FFEFD7",
    300: "#FFD188",
    400: "#FFC462",
    500: "#FFB323",
    600: "#A05E03",
    700: "#804A02",
    800: "#603701",
    900: "#402501",
  },

  // iOS System Blues
  blue: {
    100: "#E6F4FE",
    200: "#C9F0FF",
    300: "#9BDCFD",
    400: "#6EC2FB",
    500: "#48A7F8",
    600: "#0065D0",
    700: "#004E9E",
    800: "#003B78",
    900: "#002952",
  },

  // Neutral/Gray Scale
  gray: {
    100: "#F3F4F6",
    200: "#F7F9FA",
    300: "#F2F4F5",
    400: "#E3E5E5",
    500: "#CDCFD0",
    600: "#979C9E",
    700: "#73777A",
    800: "#52585E",
    900: "#373A3C",
  },

  // Semantic Colors - Dark Mode
  dark: {
    background: "#000000",
    secondaryBackground: "#1C1C1E",
    tertiaryBackground: "#2C2C2E",

    // Glass/Blur backgrounds
    glassBackground: "rgba(28, 28, 30, 0.7)",
    glassSecondary: "rgba(44, 44, 46, 0.8)",

    text: "#FFFFFF",
    secondaryText: "#EBEBF5",
    tertiaryText: "#8E8E93",
    placeholder: "#4D4D4D",

    border: "#38383A",
    separator: "#3A3A3C",

    // Card backgrounds
    card: "#1C1C1E",
    cardElevated: "#2C2C2E",

    // System colors
    tint: "#0A84FF",
    success: "#32D74B",
    warning: "#FF9F0A",
    error: "#FF453A",
    info: "#64D2FF",
  },

  // Always the same regardless of theme
  common: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
} as const;

export const ThemeColors = {
  light: {
    background: Colors.primary[200],
    secondaryBackground: Colors.gray[200],
    tertiaryBackground: Colors.gray[100],

    // Glass/Blur backgrounds
    glassBackground: "rgba(255, 255, 255, 0.7)",
    glassSecondary: "rgba(242, 242, 247, 0.8)",

    text: Colors.gray[900],
    secondaryText: Colors.gray[800],
    tertiaryText: Colors.gray[700],
    placeholder: Colors.gray[600],

    border: Colors.gray[400],
    separator: Colors.gray[300],

    // Card backgrounds
    card: Colors.gray[200],
    cardElevated: Colors.gray[100],

    // System colors
    tint: Colors.primary[500],
    success: Colors.green[500],
    warning: Colors.yellow[500],
    error: Colors.red[500],
    info: Colors.blue[500],
  },
  dark: {
    background: Colors.gray[900],
    secondaryBackground: Colors.gray[800],
    tertiaryBackground: Colors.gray[700],

    // Glass/Blur backgrounds
    glassBackground: Colors.gray[800],
    glassSecondary: Colors.gray[700],

    text: Colors.gray[100],
    secondaryText: Colors.gray[200],
    tertiaryText: Colors.gray[700],
    placeholder: Colors.gray[600],

    border: Colors.gray[400],
    separator: Colors.gray[300],

    // Card backgrounds
    card: Colors.gray[800],
    cardElevated: Colors.gray[700],

    // System colors
    tint: Colors.primary[500],
    success: Colors.green[500],
    warning: Colors.yellow[500],
    error: Colors.red[500],
    info: Colors.blue[500],
  },
};
  
  export type ColorScheme = 'light' | 'dark';