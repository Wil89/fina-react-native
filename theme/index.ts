import { Colors, ColorScheme, ThemeColors } from "./colors";
import { Radius, Shadows, Spacing } from "./spacing";
import { FontFamily, FontWeights, Typography } from "./typography";

export const createTheme = (colorScheme: ColorScheme = "light") => ({
  colors: colorScheme === "light" ? ThemeColors.light : ThemeColors.dark,
  colorScheme,
  palette: Colors,
  typography: Typography,
  fonts: FontFamily,
  fontWeights: FontWeights,

  spacing: Spacing,
  radius: Radius,
  shadows: Shadows,

  // Utility values
  layout: {
    screenPadding: Spacing.md,
    containerMaxWidth: 480,
  },

  // Animation durations (in ms)
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  // Glass/Blur effects intensity
  blur: {
    light: 10,
    medium: 20,
    strong: 30,
  },
});

export type Theme = ReturnType<typeof createTheme>;

// Export individual modules
export { Colors, ColorScheme, ThemeColors } from "./colors";
export { Radius, Shadows, ShadowSize, Spacing } from "./spacing";
export {
  FontFamily,
  FontWeights,
  Typography,
  TypographyVariant,
} from "./typography";

// Export default light theme
export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
