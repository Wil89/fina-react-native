import PasswordTextInput from "@/components/password-text-input";
import { supabase } from "@/utils/supabase";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if user has a session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        Alert.alert(
          "Error",
          "Invalid or expired reset link. Please request a new one.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/forgot-password" as Href),
            },
          ]
        );
      } else {
        setChecking(false);
      }
    };

    // Small delay to let the linking handler set the session
    setTimeout(checkSession, 500);
  }, [router]);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        await supabase.auth.signOut();

        Alert.alert("Success", "Your password has been reset successfully!", [
          { text: "OK", onPress: () => router.replace("/login" as Href) },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.subtitle}>Verifying reset link...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Set New Password</Text>
        <Text style={styles.subtitle}>Enter your new password below</Text>

        <View style={styles.form}>
          <PasswordTextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            editable={!loading}
          />

          <PasswordTextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            editable={!loading}
            onSubmitEditing={handleUpdatePassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});

export default ResetPasswordPage;
