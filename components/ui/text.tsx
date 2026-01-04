import { useTheme } from "@/hooks/use-theme";
import { TypographyVariant } from "@/theme";
import React from "react";
import {
    Text as RNText,
    TextProps as RNTextProps,
    StyleSheet,
} from "react-native";

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "tint"
    | "error"
    | "success"
    | "warning";
  align?: "left" | "center" | "right" | "justify";
  children: React.ReactNode;
}

export function Text({
  variant = "body",
  color = "primary",
  align = "left",
  style,
  children,
  ...props
}: TextProps) {
  const theme = useTheme();

  // Get typography styles
  const typographyStyle = theme.typography[variant];

  // Get color
  const textColor = {
    primary: theme.colors.text,
    secondary: theme.colors.secondaryText,
    tertiary: theme.colors.tertiaryText,
    tint: theme.colors.tint,
    error: theme.colors.error,
    success: theme.colors.success,
    warning: theme.colors.warning,
  }[color];

  return (
    <RNText
      style={[
        styles.base,
        typographyStyle,
        { color: textColor, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    // Base text styles
  },
});
