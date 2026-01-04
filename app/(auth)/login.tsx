import PasswordTextInput from "@/components/password-text-input";
import { Button, Input, Text } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { supabase } from "@/utils/supabase";
import { Href, Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        Alert.alert("Login Failed", error.message);
      } else if (data.user) {
        // Navigate to dashboard
        router.replace("/dashboard" as Href);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text variant="largeTitle" align="center" style={styles.title}>
          Welcome Back
        </Text>
        <Text
          variant="body"
          align="center"
          color="secondary"
          style={[styles.subtitle, { color: theme.colors.text }]}
        >
          Sign in to your account
        </Text>

        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={!loading}
          />

          <PasswordTextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.secondaryBackground,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={theme.colors.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            editable={!loading}
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push("/forgot-password" as Href)}
            disabled={loading}
          >
            <Text variant="callout" color="tint">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            variant="primary"
            fullWidth
            onPress={handleLogin}
            loading={loading}
            style={{ borderRadius: theme.radius.xxl }}
            size="lg"
          >
            Sign In
          </Button>

          <View style={styles.signupContainer}>
            <Text
              variant="callout"
              color="primary"
              style={{ marginTop: theme.spacing.sm }}
            >
              Don&apos;t have an account?{" "}
            </Text>
            <Link href={"/signup" as Href} asChild>
              <TouchableOpacity disabled={loading}>
                <Text
                  variant="callout"
                  color="tint"
                  style={{
                    marginTop: theme.spacing.sm,
                    marginLeft: theme.spacing.sm,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default LoginPage;
