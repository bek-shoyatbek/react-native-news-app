import React, { LegacyRef, useRef, useState } from "react";
import { NewsItem } from "@/components/NewsItem";
import { useNews } from "@/hooks/useNews";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("latest news");
  const { data, loading, error } = useNews(searchQuery);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News Feed</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter search term"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error.message}</Text>
      ) : (
        <FlatList
          data={data?.news}
          renderItem={({ item }) => <NewsItem {...item} />}
          keyExtractor={(item, index) => index!.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },

  listContainer: {
    paddingVertical: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
