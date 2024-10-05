import { Image, StyleSheet, View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d7cfcd",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
});
