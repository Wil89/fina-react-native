import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DashboardPage = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login" as any);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardPage;
