import { useTheme } from "@/hooks/use-theme";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, View, ViewProps } from "react-native";

interface GlassViewProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number; // 0-100
  tint?: "light" | "dark" | "default";
  borderRadius?: number;
}

export function GlassView({
  children,
  intensity = 20,
  tint = "default",
  borderRadius = 16,
  style,
  ...props
}: GlassViewProps) {
  const theme = useTheme();
  const colorScheme = theme.colorScheme;

  // Determine blur tint
  const blurTint =
    tint === "default" ? (colorScheme === "dark" ? "dark" : "light") : tint;

  if (Platform.OS === "web") {
    // Web fallback without blur
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.glassBackground,
            borderRadius,
            // borderWidth: 1,
            // borderColor: theme.colors.border,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={intensity}
      tint={blurTint}
      style={[
        styles.container,
        {
          borderRadius,
          overflow: "hidden",
          backgroundColor: "transparent",
        },
        style,
      ]}
      {...props}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: theme.colors.glassSecondary,
            borderRadius,
            // borderWidth: 0.5,
            // borderColor: 'rgba(255, 255, 255, 0.1)'
          },
        ]}
      />
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});
