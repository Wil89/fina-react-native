import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export default function PasswordTextInput(props: TextInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    value,
    placeholder,
    onChangeText,
    secureTextEntry,
    autoCapitalize,
    autoCorrect,
    textContentType,
    editable,
    onSubmitEditing,
    ...rest
  } = props;
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={!isVisible}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        textContentType={textContentType}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        {...rest}
      />
      <Ionicons
        style={styles.eyeIcon}
        name={isVisible ? "eye" : "eye-off"}
        size={24}
        onPress={() => setIsVisible(!isVisible)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    color: "#999",
    right: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
});
