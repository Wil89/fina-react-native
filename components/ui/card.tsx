import { useTheme } from '@/hooks/use-theme';
import { ShadowSize } from '@/theme';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { GlassView } from './glass-view';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  glass?: boolean;
  shadow?: ShadowSize;
  padding?: number;
}

export function Card({
  children,
  glass = false,
  shadow = 'md',
  padding,
  style,
  ...props
}: CardProps) {
  const theme = useTheme();
  
  const paddingValue = padding ?? theme.spacing.md;
  
  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.lg,
      padding: paddingValue,
      ...theme.shadows[shadow],
    },
    style,
  ];
  
  if (glass) {
    return (
      <GlassView style={[cardStyle, { backgroundColor: 'transparent' }]} {...props}>
        {children}
      </GlassView>
    );
  }
  
  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});