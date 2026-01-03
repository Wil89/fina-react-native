import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen name="dashboard" options={{ headerShown: false }} />
        <Tabs.Screen name="budget" options={{ headerShown: false }} />
        <Tabs.Screen name="transactions" options={{ headerShown: false }} />
        <Tabs.Screen name="ai-assistant" options={{ headerShown: false }} />
        <Tabs.Screen name="settings" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
        <Tabs.Screen name="notifications" options={{ headerShown: false }} />
        <Tabs.Screen name="help" options={{ headerShown: false }} />
        <Tabs.Screen name="about" options={{ headerShown: false }} />
        <Tabs.Screen name="contact" options={{ headerShown: false }} />
        <Tabs.Screen name="terms" options={{ headerShown: false }} />
        <Tabs.Screen name="privacy" options={{ headerShown: false }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default MainLayout;
