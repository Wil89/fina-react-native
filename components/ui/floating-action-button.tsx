// components/ui/floating-action-button.tsx
import { GlassView } from '@/components/ui/glass-view';
import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface FloatingActionButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  size?: number;
}

export function FloatingActionButton({ 
  children, 
  size = 64,
  style,
  ...props 
}: FloatingActionButtonProps) {
  const theme = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <GlassView
        intensity={30}
        style={[
          styles.glassContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            // borderWidth: 1,
            // borderColor: theme.colors.separator,
          },
        ]}
      >
        {children}
      </GlassView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  glassContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});