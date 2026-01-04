import SignOutButton from '@/components/social-auth-buttons/sign-out-button';
import { Text } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Budget = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>Budget</Text>
      <SignOutButton />
    </SafeAreaView>
  )
};

export default Budget;