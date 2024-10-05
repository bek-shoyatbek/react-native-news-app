import { NewsItem } from "@/components/NewsItem";
import { useNews } from "@/hooks/useNews";
import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";

export default function HomeScreen() {
  const { data, loading, error } = useNews("latest news");

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.news}
        renderItem={({ item }) => <NewsItem {...item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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
