import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, Text } from "react-native";

export default function SectionsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Sections Screen</Text>
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
