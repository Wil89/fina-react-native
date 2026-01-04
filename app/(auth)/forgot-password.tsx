import { Button, Input, Text } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { supabase } from "@/utils/supabase";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const emailSchema = z.email({
  pattern:
    /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // Validation
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!emailSchema.safeParse(email).success) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${process.env.EXPO_PUBLIC_SUPABASE_REDIRECT_URL}://reset-password`,
        }
      );

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        // Success - show message and redirect
        Alert.alert(
          "Check Your Email",
          "We've sent you a password reset link. Please check your email and follow the instructions.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/login" as Href),
            },
          ]
        );
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text variant="largeTitle" align="center" style={styles.title}>
          Reset Password
        </Text>
        <Text
          variant="body"
          align="center"
          color="secondary"
          style={[styles.subtitle, { color: theme.colors.text }]}
        >
          Enter your email and we&apos;ll send you a link to reset your password
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
            onSubmitEditing={handleResetPassword}
          />

          <Button
            variant="primary"
            fullWidth
            onPress={handleResetPassword}
            loading={loading}
            style={{ borderRadius: theme.radius.xxl }}
            size="lg"
          >
            Send Reset Link
          </Button>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text variant="callout" color="tint">
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textAlign: "center",
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
  backButton: {
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default ForgotPasswordPage;
