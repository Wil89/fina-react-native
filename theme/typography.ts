export const FontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const FontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",

  // Fallback to system fonts if Inter is not loaded
  system: "System",
} as const;

export const Typography = {
    // Large Titles
    largeTitle: {
      fontSize: 34,
      lineHeight: 41,
      fontWeight: FontWeights.bold,
      letterSpacing: 0.37,
    },
    
    // Titles
    title1: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: FontWeights.bold,
      letterSpacing: 0.36,
    },
    title2: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: FontWeights.bold,
      letterSpacing: 0.35,
    },
    title3: {
      fontSize: 20,
      lineHeight: 25,
      fontWeight: FontWeights.semibold,
      letterSpacing: 0.38,
    },
    
    // Headlines
    headline: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: FontWeights.semibold,
      letterSpacing: -0.41,
    },
    
    // Body Text
    body: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: FontWeights.regular,
      letterSpacing: -0.41,
    },
    bodyEmphasized: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: FontWeights.semibold,
      letterSpacing: -0.41,
    },
    
    // Callout
    callout: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: FontWeights.regular,
      letterSpacing: -0.32,
    },
    calloutEmphasized: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: FontWeights.semibold,
      letterSpacing: -0.32,
    },
    
    // Subheadline
    subheadline: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: FontWeights.regular,
      letterSpacing: -0.24,
    },
    subheadlineEmphasized: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: FontWeights.semibold,
      letterSpacing: -0.24,
    },
    
    // Footnote
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: FontWeights.regular,
      letterSpacing: -0.08,
    },
    footnoteEmphasized: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: FontWeights.semibold,
      letterSpacing: -0.08,
    },
    
    // Caption
    caption1: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: FontWeights.regular,
      letterSpacing: 0,
    },
    caption2: {
      fontSize: 11,
      lineHeight: 13,
      fontWeight: FontWeights.regular,
      letterSpacing: 0.07,
    },
  } as const;
  
  export type TypographyVariant = keyof typeof Typography;
