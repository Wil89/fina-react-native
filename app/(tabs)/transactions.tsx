import { Text } from '@/components/ui'
import { useTheme } from '@/hooks/use-theme'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Transactions = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>Transactions</Text>
    </SafeAreaView>
  )
}

export default Transactions;