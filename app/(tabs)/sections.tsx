import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { getItem } from "@/helpers/async-storage";

const { width } = Dimensions.get("window");

// Assuming your News type looks something like this:
interface News {
  id: string;
  title: string;
  snippet: string;
  imageUrl: string;
  category: string;
}

interface SectionData {
  title: string;
  data: News[];
}

export default function SectionsScreen() {
  const [error, setError] = useState<string | null>(null);
  const [sectionListData, setSectionListData] = useState<SectionData[]>([]);

  useEffect(() => {
    async function getNews() {
      try {
        const data: News[] = await getItem("news");
        if (data && Array.isArray(data)) {
          // Group news by category
          const groupedNews = data.reduce(
            (acc, news) => {
              if (!acc[news.category]) {
                acc[news.category] = [];
              }
              acc[news.category].push(news);
              return acc;
            },
            {} as Record<string, News[]>,
          );

          // Convert grouped news to section list format
          const newSectionListData: SectionData[] = Object.entries(
            groupedNews,
          ).map(([category, news]) => ({
            title: category,
            data: news,
          }));

          setSectionListData(newSectionListData);
        } else {
          setError("Invalid data format!");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load data");
      }
    }
    getNews();
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push(`/${item.id}`)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.snippet} numberOfLines={3}>
                {item.snippet}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
  },
  errorText: {
    fontSize: 18,
    color: "#E53E3E",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  snippet: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 20,
  },
  headerContainer: {
    backgroundColor: "#E6F0FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
  },
});
