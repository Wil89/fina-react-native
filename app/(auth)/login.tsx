import { StyleSheet, Text, View } from 'react-native'

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})

export default LoginPage