import React from "react";
import { News } from "@/types";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Redirect } from "expo-router";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export function NewsItem({ id, title, imageUrl, snippet }: News) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Button Pressed, articleId: ", id);
        router.navigate(`/${id}`);
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={styles.description}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {snippet}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
