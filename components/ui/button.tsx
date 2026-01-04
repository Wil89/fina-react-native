import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { Text } from './text';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  
  // Size configurations
  const sizeConfig = {
    sm: {
      height: 40,
      paddingHorizontal: theme.spacing.md,
      fontSize: 15,
    },
    md: {
      height: 50,
      paddingHorizontal: theme.spacing.lg,
      fontSize: 17,
    },
    lg: {
      height: 56,
      paddingHorizontal: theme.spacing.xl,
      fontSize: 18,
    },
  }[size];
  
  // Variant configurations
  const variantConfig = {
    primary: {
      backgroundColor: theme.colors.tint,
      textColor: '#FFFFFF',
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: theme.colors.secondaryBackground,
      textColor: theme.colors.tint,
      borderWidth: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: theme.colors.tint,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    destructive: {
      backgroundColor: theme.colors.error,
      textColor: '#FFFFFF',
      borderWidth: 0,
    },
  }[variant];
  
  const isDisabled = disabled || loading;
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: sizeConfig.height,
          paddingHorizontal: sizeConfig.paddingHorizontal,
          backgroundColor: variantConfig.backgroundColor,
          borderRadius: theme.radius.md,
          ...theme.shadows.sm,
        },
        variantConfig.borderWidth > 0 && {
          borderWidth: variantConfig.borderWidth,
          borderColor: variantConfig.borderColor,
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantConfig.textColor} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            variant={size === 'sm' ? 'callout' : 'body'}
            style={[
              styles.text,
              {
                color: variantConfig.textColor,
                fontWeight: '600',
              },
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // Text styles handled by Text component
  },
});
