import { getItem } from "@/helpers/async-storage";
import { News } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ArticleScreen() {
  const local = useLocalSearchParams();
  const articleId = local.articleId;
  const [news, setNews] = useState<News | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getNews() {
      try {
        const data = await getItem("news");

        if (data && Array.isArray(data)) {
          const article = data.find((e) => e.id == articleId);

          if (article) {
            setNews(article);
          } else {
            setError("Article not found");
          }
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load article");
      }
    }
    getNews();
  }, [articleId]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {news.imageUrl ? (
        <Image
          source={{ uri: news.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.snippet}>{news.snippet}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#6c757d",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#dc3545",
    textAlign: "center",
  },
  image: {
    width: width,
    height: 250,
  },
  placeholderImage: {
    width: width,
    height: 250,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#6c757d",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  snippet: {
    fontSize: 16,
    lineHeight: 24,
    color: "#495057",
  },
});
