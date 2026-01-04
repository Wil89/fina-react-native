import { createTheme, Theme } from "@/theme";
import { useColorScheme } from "react-native";

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return createTheme(colorScheme === "dark" ? "dark" : "light");
}

export function useColorSchemeValue() {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? "dark" : "light";
}
