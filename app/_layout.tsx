import { SplashScreenController } from "@/components/splash-screen-controller";
import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";
import { supabase } from "@/utils/supabase";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";

// IMPORTANT: Shim Buffer for parsing
// eslint-disable-next-line
global.Buffer = global.Buffer || require("buffer").Buffer;

// Parse Supabase URLs (they use # instead of ?)
const parseSupabaseUrl = (url: string) => {
  if (url.includes("#")) {
    return url.replace("#", "?");
  }
  return url;
};

function RootNavigator() {
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    // Handle deep links for password reset
    const handleDeepLink = async (event: { url: string }) => {
      const transformedUrl = parseSupabaseUrl(event.url);
      const parsedUrl = Linking.parse(transformedUrl);

      console.log("Deep link received:", transformedUrl);
      console.log("Parsed params:", parsedUrl.queryParams);

      const accessToken = parsedUrl.queryParams?.access_token;
      const refreshToken = parsedUrl.queryParams?.refresh_token;
      const type = parsedUrl.queryParams?.type;

      // Only set session for recovery type (password reset)
      if (
        type === "recovery" &&
        typeof accessToken === "string" &&
        typeof refreshToken === "string"
      ) {
        console.log("Setting session with tokens for password recovery...");

        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Error setting session:", error);
        } else {
          console.log("Recovery session set successfully");
          // Don't navigate - Expo Router will handle it based on the URL
        }
      }
    };

    // Listen for incoming links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check if app was opened with a URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log("Initial URL:", url);
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      {/* Reset password accessible regardless of auth state */}
      <Stack.Screen
        name="reset-password"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}