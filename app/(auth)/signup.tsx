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
import { z } from "zod";

const signupSchema = z
  .object({
    email: z.email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    }),
    password: z.string().min(8),
    username: z.string().min(3),
    fullName: z.string().min(3),
  })
  .required();

const SignupPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      const validatedData = signupSchema.parse({
        email,
        password,
        username,
        fullName,
      });

      if (!validatedData) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: process.env.EXPO_PUBLIC_SUPABASE_REDIRECT_URL!,
          data: {
            username: validatedData.username,
            full_name: validatedData.fullName,
          },
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
        setLoading(false);
        return;
      }

      if (data.user && !data.session) {
        // Email confirmation is required
        Alert.alert(
          "Verification Email Sent",
          "Please check your email and click the verification link to activate your account.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/login" as Href),
            },
          ]
        );
      } else if (data.session) {
        // User is automatically logged in (email confirmation disabled)
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: () => router.replace("/dashboard" as Href),
          },
        ]);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const firstError = error.issues[0];
        Alert.alert("Validation Error", firstError.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
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
          Create an Account
        </Text>
        <Text
          variant="body"
          align="center"
          style={[styles.subtitle, { color: theme.colors.text }]}
        >
          Create an account to get started
        </Text>

        <View style={styles.form}>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="username"
            editable={!loading}
          />
          <Input
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="name"
            editable={!loading}
          />
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
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            editable={!loading}
            onSubmitEditing={handleSignup}
          />

          <Button
            variant="primary"
            fullWidth
            onPress={handleSignup}
            loading={loading}
            style={{ borderRadius: theme.radius.xxl }}
            size="lg"
          >
            Sign Up
          </Button>

          <View style={styles.signupContainer}>
            <Text
              variant="callout"
              color="secondary"
              style={{ marginTop: theme.spacing.sm }}
            >
              Already have an account?{" "}
            </Text>
            <Link href={"/login" as Href} asChild>
              <TouchableOpacity disabled={loading}>
                <Text
                  variant="callout"
                  color="tint"
                  style={{
                    marginTop: theme.spacing.sm,
                    marginLeft: theme.spacing.sm,
                  }}
                >
                  Sign In
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

export default SignupPage;
