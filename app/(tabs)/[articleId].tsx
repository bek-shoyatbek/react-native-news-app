import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ArticleScreen() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  console.log("Globals: ", glob.articleId);
  console.log("Locals: ", local.articleId);

  return (
    <View>
      <Text>ArticleId: {local.articleId}</Text>
    </View>
  );
}
