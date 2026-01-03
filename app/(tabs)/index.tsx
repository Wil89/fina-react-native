import { ScrollView, StyleSheet, Text, View } from 'react-native'

// import { HelloWave } from '@/components/hello-wave'
// import ParallaxScrollView from '@/components/parallax-scroll-view'
// import { ThemedText } from '@/components/themed-text'
// import { ThemedView } from '@/components/themed-view'
import SignOutButton from '@/components/social-auth-buttons/sign-out-button'
import { useAuthContext } from '@/hooks/use-auth-context'

export default function HomeScreen() {
  const { profile } = useAuthContext()

  return (
    <ScrollView
      style={{ backgroundColor: '#A1CEDC' }}
    >
      <View style={styles.titleContainer}>
        <Text>Welcome!</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text>Username</Text>
        <Text>{profile?.username}</Text>
        <Text>Full name</Text>
        <Text>{profile?.full_name}</Text>
      </View>
      <SignOutButton />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})