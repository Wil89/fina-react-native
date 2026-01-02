import { StyleSheet, Text, View } from "react-native";

const DashboardPage = () => {
  return (
    <View>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default DashboardPage;
