import { FloatingActionButton, GlassTabBar } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function MainLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => (
          <GlassTabBar
            {...props}
            floatingActionButton={
              <FloatingActionButton
                style={{
                  backgroundColor: theme.colors.glassBackground,
                  width: 64,
                  height: 64,
                }}
                onPress={() => {
                  // Navigate to a new transaction or AI screen
                  console.log("FAB pressed!");
                  // router.push('/add-transaction');
                }}
              >
                <MaterialCommunityIcons
                  name="brain"
                  size={32}
                  color={theme.colors.secondaryText}
                />
              </FloatingActionButton>
            }
          />
        )}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.tint,
          tabBarInactiveTintColor: theme.colors.tertiaryText,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budget",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Activity",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="ai-assistant"
          options={{
            title: "AI",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="brain" size={size} color={color} />
            ),
          }}
        /> */}
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default MainLayout;
