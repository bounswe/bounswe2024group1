import { Text } from "@/components/ui";
import { View } from "react-native";

export function IndexRoute() {
  return (
    <>
      <View className="container flex flex-col gap-2 py-8">
        <Text className="mb-4 text-4xl font-bold">
          Welcome to Programming Languages Forum
        </Text>
      </View>
    </>
  );
}
