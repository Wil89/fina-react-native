export const Colors = {
    // Primary Brand Colors
    primary: {
      50: '#E6F4FE',
      100: '#CCE9FD',
      200: '#99D3FB',
      300: '#66BDF9',
      400: '#33A7F7',
      500: '#0091F5', // Main brand color
      600: '#0074C4',
      700: '#005793',
      800: '#003A62',
      900: '#001D31',
    },
  
    // iOS System Blues
    blue: {
      light: '#007AFF',
      dark: '#0A84FF',
    },
  
    // Neutral/Gray Scale
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  
    // Semantic Colors - Light Mode
    light: {
      background: '#FFFFFF',
      secondaryBackground: '#F2F2F7',
      tertiaryBackground: '#FFFFFF',
      
      // Glass/Blur backgrounds
      glassBackground: 'rgba(255, 255, 255, 0.7)',
      glassSecondary: 'rgba(242, 242, 247, 0.8)',
      
      text: '#000000',
      secondaryText: '#3C3C43',
      tertiaryText: '#8E8E93',
      placeholder: '#C7C7CC',
      
      border: '#C6C6C8',
      separator: '#E5E5EA',
      
      // Card backgrounds
      card: '#FFFFFF',
      cardElevated: '#FFFFFF',
      
      // System colors
      tint: '#007AFF',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5AC8FA',
    },
  
    // Semantic Colors - Dark Mode
    dark: {
      background: '#000000',
      secondaryBackground: '#1C1C1E',
      tertiaryBackground: '#2C2C2E',
      
      // Glass/Blur backgrounds
      glassBackground: 'rgba(28, 28, 30, 0.7)',
      glassSecondary: 'rgba(44, 44, 46, 0.8)',
      
      text: '#FFFFFF',
      secondaryText: '#EBEBF5',
      tertiaryText: '#8E8E93',
      placeholder: '#4D4D4D',
      
      border: '#38383A',
      separator: '#3A3A3C',
      
      // Card backgrounds
      card: '#1C1C1E',
      cardElevated: '#2C2C2E',
      
      // System colors
      tint: '#0A84FF',
      success: '#32D74B',
      warning: '#FF9F0A',
      error: '#FF453A',
      info: '#64D2FF',
    },
  
    // Always the same regardless of theme
    common: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
  } as const;
  
  export type ColorScheme = 'light' | 'dark';